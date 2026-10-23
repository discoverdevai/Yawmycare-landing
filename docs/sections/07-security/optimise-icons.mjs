// Regenerates src/assets/security/<name>.webp (animated) and <name>-still.webp (first frame, for
// prefers-reduced-motion / the page pause control) from the original GIFs kept in ./assets-original.
//   node docs/sections/07-security/optimise-icons.mjs
// The icons render at 85px, so the output is 170px (2x) for every density. Size win: 375 -> 170px,
// every FRAME_STEP-th frame (30ms x 5 = 150ms, about 7fps) and low quality; the animation is decorative.
import { createRequire } from "node:module";
import { readdirSync, statSync } from "node:fs";
const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const srcDir = "docs/sections/07-security/assets-original";
const outDir = process.env.OUT ?? "src/assets/security";
const SIZE = Number(process.env.SIZE ?? 170);
const FRAME_STEP = Number(process.env.FRAME_STEP ?? 5);
const QUALITY = Number(process.env.QUALITY ?? 20);
const ALPHA_QUALITY = Number(process.env.ALPHA_QUALITY ?? 15); // the alpha plane is most of the bytes at the default 100

for (const f of readdirSync(srcDir).filter((f) => f.endsWith(".gif"))) {
  const name = f.replace(/\.gif$/, "");
  const { data, info } = await sharp(`${srcDir}/${f}`, { animated: true }).resize(SIZE, SIZE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pageHeight = info.pageHeight ?? SIZE;
  const pages = info.height / pageHeight;
  const frameBytes = SIZE * pageHeight * 4;
  const kept = [];
  for (let i = 0; i < pages; i += FRAME_STEP) kept.push(data.subarray(i * frameBytes, (i + 1) * frameBytes));

  await sharp(Buffer.concat(kept), { raw: { width: SIZE, height: pageHeight * kept.length, channels: 4, pageHeight } })
    .webp({ quality: QUALITY, effort: 6, loop: 0, delay: Array(kept.length).fill(30 * FRAME_STEP), alphaQuality: ALPHA_QUALITY, smartSubsample: true })
    .toFile(`${outDir}/${name}.webp`);
  await sharp(kept[0], { raw: { width: SIZE, height: pageHeight, channels: 4 } }).webp({ quality: 80, effort: 6 }).toFile(`${outDir}/${name}-still.webp`);
  console.log(name.padEnd(12), `frames ${pages}->${kept.length}`, `gif ${statSync(`${srcDir}/${f}`).size} -> webp ${statSync(`${outDir}/${name}.webp`).size} (still ${statSync(`${outDir}/${name}-still.webp`).size})`);
}
