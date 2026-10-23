// Regenerates the favicon set in public/ from src/assets/logo.png. Run: node scripts/generate-icons.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const src = "src/assets/logo.png";
const cream = "#fffff5"; // --color-surface; apple-touch-icon must be opaque

/** Logo centred on a square canvas, with `pad` as a fraction of the side. */
async function square(size, { pad, background }) {
  const inner = Math.round(size * (1 - pad * 2));
  const logo = await sharp(src).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

const outputs = {
  "public/favicon-32.png": await square(32, { pad: 0.04 }),
  "public/apple-touch-icon.png": await square(180, { pad: 0.14, background: cream }),
  "public/icon-192.png": await square(192, { pad: 0.1 }),
  "public/icon-512.png": await square(512, { pad: 0.1 }),
};
for (const [file, buf] of Object.entries(outputs)) writeFileSync(file, buf);

// favicon.ico: a single 32x32 PNG image inside an ICO container.
const png = outputs["public/favicon-32.png"];
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header[6] = 32; // width
header[7] = 32; // height
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
writeFileSync("public/favicon.ico", Buffer.concat([header, png]));
console.log("icons written");
