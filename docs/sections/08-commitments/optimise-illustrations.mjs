// Regenerates src/assets/commitments/*.webp from the original GIFs (kept in ./assets-original).
//   node docs/sections/08-commitments/optimise-illustrations.mjs
// Output per illustration: <name>.webp (animated) and <name>-still.webp (first frame, for
// prefers-reduced-motion). Lossy animated WebP of these 180-frame / 30ms illustrations is LARGER than the
// GIF at equal frame rate, so the size win comes from: 220x220 (2x of the 110px slot, source is 375),
// every FRAME_STEP-th frame (30ms x 3 = 90ms, about 11fps) and quality 60.
import { createRequire } from "node:module";
import { readdirSync, statSync, mkdirSync } from "node:fs";
const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const srcDir = "docs/sections/08-commitments/assets-original";
const outDir = "src/assets/commitments";
const SIZE = Number(process.env.SIZE ?? 220);
const FRAME_STEP = Number(process.env.FRAME_STEP ?? 3);
const QUALITY = Number(process.env.QUALITY ?? 60);
mkdirSync(outDir, { recursive: true });

let totalGif = 0;
let total = 0;
for (const f of readdirSync(srcDir).filter((f) => f.endsWith(".gif"))) {
  const name = f.replace(/^commitment-/, "").replace(/\.gif$/, "");
  const input = `${srcDir}/${f}`;

  const { data, info } = await sharp(input, { animated: true })
    .resize(SIZE, SIZE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pageHeight = info.pageHeight ?? SIZE;
  const pages = info.height / pageHeight;
  const frameBytes = SIZE * pageHeight * 4;
  const kept = [];
  for (let i = 0; i < pages; i += FRAME_STEP) kept.push(data.subarray(i * frameBytes, (i + 1) * frameBytes));

  await sharp(Buffer.concat(kept), { raw: { width: SIZE, height: pageHeight * kept.length, channels: 4, pageHeight } })
    .webp({ quality: QUALITY, effort: 4, loop: 0, delay: Array(kept.length).fill(30 * FRAME_STEP) })
    .toFile(`${outDir}/${name}.webp`);
  await sharp(kept[0], { raw: { width: SIZE, height: pageHeight, channels: 4 } })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${outDir}/${name}-still.webp`);

  const gif = statSync(input).size;
  const a = statSync(`${outDir}/${name}.webp`).size;
  const s = statSync(`${outDir}/${name}-still.webp`).size;
  totalGif += gif;
  total += a;
  console.log(name.padEnd(16), `frames ${pages}->${kept.length}`, `gif ${gif} -> webp ${a} (still ${s})`);
}
console.log(`total gif ${totalGif} -> animated webp ${total}`);
