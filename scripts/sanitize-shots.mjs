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
    // covers ", Shreyas 👋" after "Welcome back"; in-painted by cloning the
    // clean same-row gradient from just right of the text
    patch: { x: 746, y: 120, w: 294, h: 50 },
    clone: { x: 1046, y: 120 },
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
    // covers ", Shreyas 👋" after "Good morning"
    patch: { x: 600, y: 88, w: 245, h: 54 },
    clone: { x: 850, y: 88 },
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

async function sanitizeGreeting(theme) {
  const file = `${theme.dir}/dashboard${theme.ext}`;
  const g = theme.greeting;
  // clone a clean same-size block of gradient from the same rows, just to
  // the right of the text — identical vertical gradient, seamless patch
  const patch = await sharp(file)
    .extract({ left: g.clone.x, top: g.clone.y, width: g.patch.w, height: g.patch.h })
    .png()
    .toBuffer();
  const img = sharp(file).composite([
    { input: patch, left: g.patch.x, top: g.patch.y },
  ]);
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

// Steps must run on PRISTINE captures (the greeting clone assumes the
// original layout). Modes: "light" | "dark" | "redo" (only dashboard +
// companion-brief, after restoring them from the originals) | default both.
const arg = process.argv[2] ?? "all";

if (arg === "hello-dark") {
  await sanitizeHello(DARK);
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
