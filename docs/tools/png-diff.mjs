// Usage: node docs/tools/png-diff.mjs a.png b.png [--inset=N] (ignore an N px border, e.g. the dialog's rounded corners) -> prints size of each and the % of differing pixels (needs `sharp`-free decode: uses Chrome? no: pure zlib PNG decode, 8-bit RGBA/RGB only).
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
function decode(p) {
  const b = readFileSync(p); let o = 8; let w, h, ct; const idat = [];
  while (o < b.length) { const len = b.readUInt32BE(o); const type = b.toString("ascii", o + 4, o + 8); const d = b.subarray(o + 8, o + 8 + len);
    if (type === "IHDR") { w = d.readUInt32BE(0); h = d.readUInt32BE(4); ct = d[9]; } else if (type === "IDAT") idat.push(d); o += 12 + len; }
  const bpp = ct === 6 ? 4 : 3; const raw = inflateSync(Buffer.concat(idat)); const stride = w * bpp; const out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) { const f = raw[y * (stride + 1)]; for (let x = 0; x < stride; x++) { const v = raw[y * (stride + 1) + 1 + x];
    const a = x >= bpp ? out[y * stride + x - bpp] : 0, up = y ? out[(y - 1) * stride + x] : 0, c = x >= bpp && y ? out[(y - 1) * stride + x - bpp] : 0;
    const pa = Math.abs(up - c), pb = Math.abs(a - c), pc = Math.abs(a + up - 2 * c);
    out[y * stride + x] = (v + (f === 0 ? 0 : f === 1 ? a : f === 2 ? up : f === 3 ? ((a + up) >> 1) : (pa <= pb && pa <= pc ? a : pb <= pc ? up : c))) & 255; } }
  return { w, h, bpp, out };
}
const inset = Number((process.argv.find((a) => a.startsWith("--inset=")) ?? "--inset=0").slice(8));
const [A, B] = process.argv.slice(2).filter((a) => !a.startsWith("--")).map(decode);
if (A.w !== B.w || A.h !== B.h) { console.log(`size ${A.w}x${A.h} vs ${B.w}x${B.h}`); process.exit(1); }
let n = 0, t = 0; for (let i = 0; i < A.out.length; i += A.bpp) { const px = i / A.bpp, x = px % A.w, y = (px - x) / A.w; if (x < inset || y < inset || x >= A.w - inset || y >= A.h - inset) continue; t++; if (A.out[i] !== B.out[i] || A.out[i + 1] !== B.out[i + 1] || A.out[i + 2] !== B.out[i + 2]) n++; }
console.log(`${A.w}x${A.h}, ${n} differing pixels (${((n / t) * 100).toFixed(3)}%)`);
