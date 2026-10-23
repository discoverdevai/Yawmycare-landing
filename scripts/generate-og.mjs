// Regenerates public/og/og-en.png and og-ar.png (1200x630) with headless Chrome.
// Run: node scripts/generate-og.mjs   (needs Chrome at the path below or CHROME_PATH)
// Art: brand palette (cream surface, #76945C band, #334722 text, #DFEBD1 blob), logo mark + wordmark, the tagline from
// src/i18n/{en,ar}.json (brand.tagline) and a real product crop (owner dashboard + parent home) from src/assets/product.
// Fonts are the same open-licence stand-ins the site uses (Fraunces / Readex Pro) until the licensed files arrive.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const chrome = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const url = (p) => pathToFileURL(join(root, p)).href;
const en = JSON.parse(readFileSync(join(root, "src/i18n/en.json"), "utf8"));
const ar = JSON.parse(readFileSync(join(root, "src/i18n/ar.json"), "utf8"));

const locales = {
  en: {
    dir: "ltr",
    font: "F",
    wordmark: "Yawmy Care",
    tagline: en.brand.tagline,
    sub: "Nursery management software",
    taglineSize: 58,
  },
  ar: {
    dir: "rtl",
    font: "R",
    wordmark: ar.brand.name,
    tagline: ar.brand.tagline,
    sub: "برنامج إدارة الحضانات",
    taglineSize: 54,
  },
};

const html = (l) => `<!doctype html><html lang="${l}" dir="${locales[l].dir}"><meta charset="utf-8"><style>
@font-face{font-family:F;src:url("${url("node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2")}");font-weight:100 900}
@font-face{font-family:R;src:url("${url("node_modules/@fontsource-variable/readex-pro/files/readex-pro-arabic-wght-normal.woff2")}");font-weight:100 900}
@font-face{font-family:R;src:url("${url("node_modules/@fontsource-variable/readex-pro/files/readex-pro-latin-wght-normal.woff2")}");font-weight:100 900;unicode-range:U+0000-00FF}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:#fffff5;color:#334722;font-family:${locales[l].font},"Segoe UI",sans-serif;position:relative}
.blob{position:absolute;width:600px;height:600px;border-radius:50%;background:#dfebd1;inset-inline-end:-120px;top:-150px}
.band{position:absolute;inset-inline:0;bottom:0;height:96px;background:#76945c}
.url{position:absolute;inset-inline-start:84px;bottom:30px;font:700 30px F,sans-serif;color:#fefefe;direction:ltr}
.brand{position:absolute;inset-inline-start:84px;top:62px;display:flex;align-items:center;gap:18px}
.brand img{width:76px;height:auto}
.brand span{font-size:40px;font-weight:700}
.copy{position:absolute;inset-inline-start:84px;top:188px;width:470px}
h1{font-size:${locales[l].taglineSize}px;line-height:1.22;font-weight:700}
p{margin-top:28px;font-size:26px;line-height:1.45;color:#535353;font-weight:400}
.shot{position:absolute;border-radius:18px;box-shadow:0 18px 48px rgba(51,71,34,.22);background:#fff;border:1px solid #f5f5dc}
.dash{width:560px;height:320px;top:92px;inset-inline-end:30px}
.phone{width:170px;height:368px;top:176px;inset-inline-end:480px;border-radius:26px}
.shot img{width:100%;height:100%;display:block;border-radius:inherit;object-fit:cover;object-position:top}
</style><body>
<div class="blob"></div><div class="band"></div>
<div class="brand"><img src="${url("src/assets/logo.png")}" alt=""><span>${locales[l].wordmark}</span></div>
<div class="copy"><h1>${locales[l].tagline}</h1><p>${locales[l].sub}</p></div>
<div class="shot dash"><img src="${url("src/assets/product/owner-dashboard-1659-29977.webp")}" alt=""></div>
<div class="shot phone"><img src="${url("src/assets/product/parent-home-606-38038.webp")}" alt=""></div>
<div class="url">yawmycare.com</div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), "yawmy-og-"));
for (const l of Object.keys(locales)) {
  const page = join(dir, `og-${l}.html`);
  const raw = join(dir, `og-${l}.raw.png`);
  const out = join(root, `public/og/og-${l}.png`);
  writeFileSync(page, html(l));
  const r = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--force-device-scale-factor=1",
      "--window-size=1200,720",
      "--virtual-time-budget=4000",
      `--user-data-dir=${join(dir, "profile-" + l)}`,
      `--screenshot=${raw}`,
      pathToFileURL(page).href,
    ],
    { stdio: "ignore" },
  );
  if (r.status !== 0) throw new Error(`chrome failed for ${l} (${r.status})`);
  // The window is taller than the art so Chrome's own chrome never shortens the capture; crop to exactly 1200x630.
  await sharp(raw).extract({ left: 0, top: 0, width: 1200, height: 630 }).png({ compressionLevel: 9 }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(`og-${l}.png ${m.width}x${m.height}`);
}
