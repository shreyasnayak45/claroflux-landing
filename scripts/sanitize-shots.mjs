/**
 * Removes personal information from the product screenshots in
 * public/shots/: the sidebar profile chip (photo, name, email) becomes a
 * generic user icon + "USER" label, and greetings lose the personal name.
 * Gradient areas are in-painted by stretching a clean strip sampled just
 * above the text, so no seams appear. Run: node scripts/sanitize-shots.mjs
 */
import { writeFileSync } from "node:fs";
import sharp from "sharp";

// Without this, libvips keeps source files mmap-open in its operation
// cache and Windows refuses to overwrite them in-place.
sharp.cache(false);

/** OneDrive briefly locks recently-synced files; retry a few times. */
async function writeRetry(file, buf, attempts = 5) {
  for (let i = 1; ; i++) {
    try {
      writeFileSync(file, buf);
      return;
    } catch (err) {
      if (i >= attempts) throw err;
      console.log(`  (write locked, retry ${i}/${attempts - 1}...)`);
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

const LIGHT = {
  dir: "public/shots/light",
  ext: ".png",
  chip: {
    // offsets from the bottom edge (heights vary slightly between captures)
    patch: { x: 8, w: 284, fromBottom: 85, h: 78 },
    avatar: { cx: 46, cyFromBottom: 56, r: 18 },
    label: { x: 78, baselineFromBottom: 50, size: 15 },
    circleFill: "#E2E8F0",
    glyph: "#64748B",
    text: "#0F172A",
  },
  greeting: {
    // covers ", Shreyas 👋" after "Welcome back"; filled with a smooth
    // (Laplace) surface reconstructed from the surrounding banner gradient.
    // left edge abuts the "k", bottom edge abuts the subtitle — so both use
    // a zero-gradient boundary instead of sampling that (non-gradient) text.
    patch: { x: 746, y: 120, w: 294, h: 50 },
    edges: { left: "neumann", bottom: "neumann" },
  },
  hello: {
    // "Hello, Shreyas." → "Hello." (dot drawn after the original word)
    patch: { x: 93, y: 128, w: 172, h: 30 },
    bgSample: { x: 380, y: 140 },
    dot: { cx: 97, cy: 149, r: 2.5, fill: "#0F172A" },
  },
};

const DARK = {
  dir: "public/shots/dark",
  ext: ".webp",
  chip: {
    patch: { x: 6, w: 232, fromBottom: 64, h: 58 },
    avatar: { cx: 37, cyFromBottom: 42, r: 15 },
    label: { x: 64, baselineFromBottom: 37, size: 13 },
    circleFill: "#283040",
    glyph: "#94A3B8",
    text: "#F1F5F9",
  },
  greeting: {
    // covers ", Shreyas 👋" after "Good morning"; filled with a smooth
    // (Laplace) surface reconstructed from the surrounding banner gradient.
    // left edge abuts the "g" of "morning" — use a zero-gradient boundary
    // there instead of sampling the glyph.
    patch: { x: 600, y: 88, w: 245, h: 54 },
    edges: { left: "neumann" },
  },
  hello: {
    // "Good morning, Shreyas." → "Good morning."
    patch: { x: 163, y: 128, w: 92, h: 34 },
    bgSample: { x: 400, y: 145 },
    dot: { cx: 166.5, cy: 149.5, r: 2.4, fill: "#F1F5F9" },
  },
};

const CHIP_FILES = [
  "dashboard",
  "dashboard-detail",
  "tracker",
  "tasks",
  "analytics",
  "intelligence",
  "patterns",
  "coach",
];

async function bgColorAt(file, x, y) {
  const { data } = await sharp(file)
    .extract({ left: x, top: y, width: 6, height: 6 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return `rgb(${data[0]},${data[1]},${data[2]})`;
}

/** Person-in-circle icon + "USER" label, drawn over a solid patch. */
function chipSvg(theme, W, H, bg) {
  const c = theme.chip;
  const p = c.patch;
  const y0 = H - p.fromBottom;
  const cy = H - c.avatar.cyFromBottom;
  const baseline = H - c.label.baselineFromBottom;
  const r = c.avatar.r;
  // simple person silhouette inside the avatar circle
  const headR = r * 0.32;
  const headCy = cy - r * 0.22;
  const bodyRx = r * 0.52;
  return Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${p.x}" y="${y0}" width="${p.w}" height="${p.h}" fill="${bg}"/>
  <circle cx="${c.avatar.cx}" cy="${cy}" r="${r}" fill="${c.circleFill}"/>
  <circle cx="${c.avatar.cx}" cy="${headCy}" r="${headR}" fill="${c.glyph}"/>
  <path d="M ${c.avatar.cx - bodyRx} ${cy + r * 0.78}
           a ${bodyRx} ${bodyRx * 0.9} 0 0 1 ${bodyRx * 2} 0 z" fill="${c.glyph}"/>
  <text x="${c.label.x}" y="${baseline}" font-family="Segoe UI, Arial, sans-serif"
        font-size="${c.label.size}" font-weight="600" letter-spacing="0.4"
        fill="${c.text}">USER</text>
</svg>`);
}

async function sanitizeChip(theme, name) {
  const file = `${theme.dir}/${name}${theme.ext}`;
  const meta = await sharp(file).metadata();
  const { width: W, height: H } = meta;
  const bg = await bgColorAt(file, 150, H - theme.chip.patch.fromBottom - 16);
  const img = sharp(file).composite([{ input: chipSvg(theme, W, H, bg), left: 0, top: 0 }]);
  const buf = await (theme.ext === ".webp"
    ? img.webp({ quality: 92 }).toBuffer()
    : img.png().toBuffer());
  await writeRetry(file, buf);
  console.log(`chip    ${file}`);
}

/**
 * Erase the name after the greeting by reconstructing the banner gradient
 * underneath it. The hero banner is a smooth radial-ish gradient with no
 * texture, so we solve Laplace's equation over the covered rectangle and let
 * the surrounding clean pixels drive it: the result is the smoothest surface
 * that meets the real gradient at the edges, leaving no seam (the old
 * approach cloned a block from further right — a slightly brighter part of
 * the gradient — which read as a lighter rectangle).
 *
 * Edges that abut clean gradient use a fixed (Dirichlet) boundary sampled
 * just outside the rectangle. Edges that abut the kept greeting text or the
 * subtitle have no gradient to sample, so they use a zero-gradient (Neumann)
 * boundary — the fill simply flattens toward them, which matches the gentle
 * gradient there and never picks up the glyphs.
 */
async function sanitizeGreeting(theme) {
  const file = `${theme.dir}/dashboard${theme.ext}`;
  const g = theme.greeting;
  const edges = g.edges || {};
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, C = info.channels;
  const idx = (x, y) => (y * W + x) * C;

  const x0 = g.patch.x, x1 = g.patch.x + g.patch.w - 1;
  const y0 = g.patch.y, y1 = g.patch.y + g.patch.h - 1;
  const rw = x1 - x0 + 1, rh = y1 - y0 + 1;

  // Average a few pixels outward so a Dirichlet boundary is a clean gradient
  // sample, not a single noisy/compressed pixel.
  const depth = 3;
  const out = (x, y, dx, dy, ch) => {
    let s = 0;
    for (let k = 1; k <= depth; k++) s += data[idx(x + dx * k, y + dy * k) + ch];
    return s / depth;
  };

  for (let ch = 0; ch < 3; ch++) {
    // Per-edge fixed boundary values (only filled for Dirichlet edges).
    const top = new Float64Array(rw), bot = new Float64Array(rw);
    const left = new Float64Array(rh), right = new Float64Array(rh);
    let seed = 0, seedN = 0;
    if (edges.top !== "neumann")
      for (let i = 0; i < rw; i++) { top[i] = out(x0 + i, y0 - 1, 0, -1, ch); seed += top[i]; seedN++; }
    if (edges.bottom !== "neumann")
      for (let i = 0; i < rw; i++) { bot[i] = out(x0 + i, y1 + 1, 0, 1, ch); seed += bot[i]; seedN++; }
    if (edges.left !== "neumann")
      for (let j = 0; j < rh; j++) { left[j] = out(x0 - 1, y0 + j, -1, 0, ch); seed += left[j]; seedN++; }
    if (edges.right !== "neumann")
      for (let j = 0; j < rh; j++) { right[j] = out(x1 + 1, y0 + j, 1, 0, ch); seed += right[j]; seedN++; }

    // Ghost-cell lookup: Neumann edges mirror the interior (zero gradient),
    // Dirichlet edges return their fixed boundary value.
    const grid = new Float64Array(rw * rh).fill(seed / seedN);
    const at = (i, j) =>
      i < 0 ? (edges.left === "neumann" ? grid[j * rw] : left[j])
      : i >= rw ? (edges.right === "neumann" ? grid[j * rw + rw - 1] : right[j])
      : j < 0 ? (edges.top === "neumann" ? grid[i] : top[i])
      : j >= rh ? (edges.bottom === "neumann" ? grid[(rh - 1) * rw + i] : bot[i])
      : grid[j * rw + i];

    const omega = 1.9;
    for (let it = 0; it < 1500; it++)
      for (let j = 0; j < rh; j++)
        for (let i = 0; i < rw; i++) {
          const avg = 0.25 * (at(i - 1, j) + at(i + 1, j) + at(i, j - 1) + at(i, j + 1));
          const k = j * rw + i;
          grid[k] += omega * (avg - grid[k]);
        }

    for (let j = 0; j < rh; j++)
      for (let i = 0; i < rw; i++)
        data[idx(x0 + i, y0 + j) + ch] = Math.max(0, Math.min(255, Math.round(grid[j * rw + i])));
  }

  const img = sharp(data, { raw: { width: W, height: info.height, channels: C } });
  const buf = await (theme.ext === ".webp"
    ? img.webp({ quality: 92 }).toBuffer()
    : img.png().toBuffer());
  await writeRetry(file, buf);
  console.log(`greet   ${file}`);
}

async function sanitizeHello(theme) {
  const file = `${theme.dir}/companion-brief${theme.ext}`;
  const h = theme.hello;
  const bg = await bgColorAt(file, h.bgSample.x, h.bgSample.y);
  const svg = Buffer.from(`
<svg width="${h.patch.x + h.patch.w}" height="${h.patch.y + h.patch.h}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${h.patch.x}" y="${h.patch.y}" width="${h.patch.w}" height="${h.patch.h}" fill="${bg}"/>
  <circle cx="${h.dot.cx}" cy="${h.dot.cy}" r="${h.dot.r}" fill="${h.dot.fill}"/>
</svg>`);
  const img = sharp(file).composite([{ input: svg, left: 0, top: 0 }]);
  const buf = await (theme.ext === ".webp"
    ? img.webp({ quality: 92 }).toBuffer()
    : img.png().toBuffer());
  await writeRetry(file, buf);
  console.log(`hello   ${file}`);
}

// The chip/hello steps must run on PRISTINE captures (they redraw over the
// original layout). The greeting step is now boundary-based, so it is
// idempotent and safe to re-run on already-sanitized shots. Modes: "light"
// | "dark" | "greeting" (only the greeting fill, both themes) | "redo"
// (dashboard + companion-brief, after restoring them) | default both.
const arg = process.argv[2] ?? "all";

if (arg === "hello-dark") {
  await sanitizeHello(DARK);
} else if (arg === "greeting") {
  await sanitizeGreeting(LIGHT);
  await sanitizeGreeting(DARK);
} else if (arg === "redo") {
  for (const theme of [LIGHT, DARK]) {
    await sanitizeChip(theme, "dashboard");
    await sanitizeGreeting(theme);
    await sanitizeHello(theme);
  }
} else {
  const themes =
    arg === "light" ? [LIGHT] : arg === "dark" ? [DARK] : [LIGHT, DARK];
  for (const theme of themes) {
    for (const name of CHIP_FILES) await sanitizeChip(theme, name);
    await sanitizeGreeting(theme);
    await sanitizeHello(theme);
  }
}
console.log("done -- remember to regenerate og.png (node scripts/make-og.mjs)");
