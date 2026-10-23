// Regenerates src/assets/pricing/<name>.webp (animated) and <name>-still.webp (first frame, for
// prefers-reduced-motion / the page pause control) from the GIFs kept in ./assets-original.
//   node docs/sections/09-pricing/optimise-illustrations.mjs
// Each size is 2x of the largest slot the illustration is shown in (see Pricing.astro), capped at the 375px source.
// Size win: right-sized, every FRAME_STEP-th frame (30ms x 3 = 90ms, about 11fps) and a low alpha quality.
import { createRequire } from "node:module";
import { readdirSync, statSync } from "node:fs";
const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const srcDir = "docs/sections/09-pricing/assets-original";
const outDir = "src/assets/pricing";
const SIZES = { recurring: 375, daycare: 250, diplomacy: 340 };
const FRAME_STEP = Number(process.env.FRAME_STEP ?? 3);
const QUALITY = Number(process.env.QUALITY ?? 60);
const ALPHA_QUALITY = Number(process.env.ALPHA_QUALITY ?? 30);

for (const f of readdirSync(srcDir).filter((f) => f.endsWith(".gif"))) {
  const name = f.replace(/\.gif$/, "");
  const SIZE = SIZES[name] ?? 375;
  const { data, info } = await sharp(`${srcDir}/${f}`, { animated: true }).resize(SIZE, SIZE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pageHeight = info.pageHeight ?? SIZE;
  const pages = info.height / pageHeight;
  const frameBytes = SIZE * pageHeight * 4;
  const kept = [];
  for (let i = 0; i < pages; i += FRAME_STEP) kept.push(data.subarray(i * frameBytes, (i + 1) * frameBytes));

  await sharp(Buffer.concat(kept), { raw: { width: SIZE, height: pageHeight * kept.length, channels: 4, pageHeight } })
    .webp({ quality: QUALITY, effort: 4, alphaQuality: ALPHA_QUALITY, loop: 0, delay: Array(kept.length).fill(30 * FRAME_STEP) })
    .toFile(`${outDir}/${name}.webp`);
  await sharp(kept[0], { raw: { width: SIZE, height: pageHeight, channels: 4 } }).webp({ quality: 82, effort: 6 }).toFile(`${outDir}/${name}-still.webp`);
  console.log(name.padEnd(10), `frames ${pages}->${kept.length}`, `${SIZE}px gif ${statSync(`${srcDir}/${f}`).size} -> webp ${statSync(`${outDir}/${name}.webp`).size} (still ${statSync(`${outDir}/${name}-still.webp`).size})`);
}
