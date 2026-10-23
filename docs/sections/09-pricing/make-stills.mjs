// Writes src/assets/pricing/<name>-still.webp: the first GIF frame, shown instead of the animated WebP when the
// visitor prefers reduced motion (WCAG 2.2.2). Same approach as docs/sections/05-features/optimise-illustrations.mjs.
//   node docs/sections/09-pricing/make-stills.mjs
import { createRequire } from "node:module";
import { readdirSync, statSync } from "node:fs";
const require = createRequire(process.cwd() + "/package.json");
const sharp = require("sharp");

const srcDir = "docs/sections/09-pricing/assets-original";
const outDir = "src/assets/pricing";
for (const f of readdirSync(srcDir).filter((f) => f.endsWith(".gif"))) {
  const name = f.replace(/\.gif$/, "");
  const out = `${outDir}/${name}-still.webp`;
  await sharp(`${srcDir}/${f}`, { page: 0 }).resize(375, 375).webp({ quality: 82, effort: 6 }).toFile(out);
  console.log(name.padEnd(10), `still ${statSync(out).size} bytes`);
}
