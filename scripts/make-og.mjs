/**
 * Builds public/og.png (1200x630) — branded Open Graph card composed from
 * the real dark-mode dashboard screenshot. Run once: node scripts/make-og.mjs
 */
import sharp from "sharp";

const W = 1200;
const H = 630;
const SHOT_W = 1010;
const SHOT_X = (W - SHOT_W) / 2;
const SHOT_Y = 286;

const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06121C"/>
      <stop offset="1" stop-color="#03070C"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.5" cy="0.05" r="0.85">
      <stop offset="0" stop-color="#00D1C1" stop-opacity="0.32"/>
      <stop offset="0.55" stop-color="#00D1C1" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.12" cy="0.95" r="0.7">
      <stop offset="0" stop-color="#4A8CFF" stop-opacity="0.22"/>
      <stop offset="0.6" stop-color="#4A8CFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>
  <rect x="0" y="0" width="${W}" height="2" fill="#00D1C1" opacity="0.55"/>
  <text x="172" y="118" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="700" fill="#F1F5F9" letter-spacing="-1">ClaroFlux</text>
  <text x="600" y="216" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#CBD5E1" letter-spacing="-0.5">Make every study hour <tspan fill="#00D1C1">count</tspan>.</text>
</svg>`);

const VISIBLE_H = H - SHOT_Y; // composite must not overflow the canvas

const roundedMask = Buffer.from(
  `<svg width="${SHOT_W}" height="${VISIBLE_H}"><rect width="${SHOT_W}" height="${VISIBLE_H + 24}" rx="18" fill="#fff"/></svg>`,
);

const shot = await sharp("public/shots/dark/dashboard.webp")
  .resize({ width: SHOT_W })
  .extract({ left: 0, top: 0, width: SHOT_W, height: VISIBLE_H })
  .composite([{ input: roundedMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const logo = await sharp("public/logo.png").resize(84, 84).png().toBuffer();

await sharp(background)
  .composite([
    { input: logo, left: 76, top: 52 },
    { input: shot, left: SHOT_X, top: SHOT_Y },
  ])
  .png()
  .toFile("public/og.png");

console.log("public/og.png written");
