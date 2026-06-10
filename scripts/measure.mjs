// Dev helper: 2x zoom crops with a 20px coordinate grid, for locating
// patch regions in the screenshots. Outputs land in the workspace root.
import sharp from "sharp";

sharp.cache(false);

function grid(w, h, x0, y0, step) {
  let s = "";
  for (let x = Math.ceil(x0 / step) * step; x <= x0 + w / 2; x += step) {
    const px = (x - x0) * 2;
    s += `<line x1="${px}" y1="0" x2="${px}" y2="${h}" stroke="red" stroke-width="1" opacity="0.5"/>`;
    s += `<text x="${px + 2}" y="12" font-size="11" fill="red">${x}</text>`;
  }
  for (let y = Math.ceil(y0 / step) * step; y <= y0 + h / 2; y += step) {
    const py = (y - y0) * 2;
    s += `<line x1="0" y1="${py}" x2="${w}" y2="${py}" stroke="cyan" stroke-width="1" opacity="0.5"/>`;
    s += `<text x="2" y="${py - 2}" font-size="11" fill="cyan">${y}</text>`;
  }
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${s}</svg>`);
}

async function ruler(src, out, x0, y0, w, h) {
  const buf = await sharp(src)
    .extract({ left: x0, top: y0, width: w, height: h })
    .resize(w * 2, h * 2, { kernel: "nearest" })
    .png()
    .toBuffer();
  await sharp(buf)
    .composite([{ input: grid(w * 2, h * 2, x0, y0, 20), left: 0, top: 0 }])
    .toFile(out);
}

// usage: node scripts/measure.mjs <src> <out> <x0> <y0> <w> <h>
const [src, out, ...nums] = process.argv.slice(2);
if (src) {
  const [x0, y0, w, h] = nums.map(Number);
  await ruler(src, out, x0, y0, w, h);
} else {
  await ruler("public/shots/light/dashboard.png", "../_m_greet_light.png", 620, 80, 420, 100);
  await ruler("public/shots/dark/dashboard.webp", "../_m_greet_dark.png", 520, 60, 320, 100);
  await ruler("public/shots/light/companion-brief.png", "../_m_hello_light.png", 30, 90, 260, 80);
  await ruler("public/shots/dark/companion-brief.webp", "../_m_hello_dark.png", 30, 80, 280, 80);
}
console.log("done");
