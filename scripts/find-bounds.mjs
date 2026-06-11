// Dev helper: locate the chat panel inside the companion-brief captures by
// scanning row/column mean luminance for the page-bg → panel transition.
import sharp from "sharp";

sharp.cache(false);

async function probe(file) {
  const { data, info } = await sharp(file)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  const colMean = (x, y0, y1) => {
    let s = 0;
    for (let y = y0; y < y1; y++) s += data[y * W + x];
    return s / (y1 - y0);
  };
  const rowMean = (y, x0, x1) => {
    let s = 0;
    for (let x = x0; x < x1; x++) s += data[y * W + x];
    return s / (x1 - x0);
  };

  // sample bands well inside the panel to characterise both shades
  const left = [];
  for (let x = 0; x < 60; x++) left.push(`${x}:${colMean(x, 200, 600).toFixed(0)}`);
  const right = [];
  for (let x = W - 60; x < W; x++) right.push(`${x}:${colMean(x, 200, 600).toFixed(0)}`);
  const top = [];
  for (let y = 0; y < 40; y++) top.push(`${y}:${rowMean(y, 150, 450).toFixed(0)}`);
  const bottom = [];
  for (let y = H - 40; y < H; y++) bottom.push(`${y}:${rowMean(y, 150, 450).toFixed(0)}`);

  console.log(`\n=== ${file} (${W}x${H}) ===`);
  console.log("LEFT  cols:", left.join(" "));
  console.log("RIGHT cols:", right.join(" "));
  console.log("TOP   rows:", top.join(" "));
  console.log("BOT   rows:", bottom.join(" "));
}

await probe("public/shots/dark/companion-brief.webp");
await probe("public/shots/light/companion-brief.png");
