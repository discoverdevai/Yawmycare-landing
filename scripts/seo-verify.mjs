// Verifies SEO fundamentals on dist/{en,ar}/index.html. Run after `astro build`: node scripts/seo-verify.mjs
import { readFileSync, statSync } from "node:fs";
let fail = 0;
const ok = (c, m) => {
  if (!c) fail++;
  console.log(`${c ? "ok  " : "FAIL"} ${m}`);
};
const pngSize = (f) => {
  const b = readFileSync(f);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
};
for (const l of ["en", "ar"]) {
  const h = readFileSync(`dist/${l}/index.html`, "utf8");
  const get = (re) => re.exec(h)?.[1];
  const title = get(/<title>([^<]*)<\/title>/),
    desc = get(/<meta name="description" content="([^"]*)"/);
  console.log(`\n== ${l}`);
  ok(title && title.length <= 60, `title ${title?.length} chars: ${title}`);
  ok(desc && desc.length >= 70 && desc.length <= 160, `description ${desc?.length} chars`);
  ok(new RegExp(`<html lang="${l}" dir="${l === "ar" ? "rtl" : "ltr"}"`).test(h), "html lang/dir");
  ok(get(/rel="canonical" href="([^"]*)"/) === `https://yawmycare.com/${l}/`, "canonical");
  const alts = [...h.matchAll(/rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)].map((m) => m[1] + "=" + m[2]);
  ok(
    ["en", "ar", "x-default"].every((k) => alts.some((a) => a.startsWith(k + "="))),
    `hreflang ${alts.join(" ")}`,
  );
  ok((h.match(/<h1[\s>]/g) || []).length === 1, "one h1");
  for (const p of ["og:title", "og:description", "og:image", "og:url", "og:locale"])
    ok(h.includes(`property="${p}"`), p);
  for (const p of ["twitter:card", "twitter:image"]) ok(h.includes(`name="${p}"`), p);
  const [w, hh] = pngSize(`dist/og/og-${l}.png`);
  ok(w === 1200 && hh === 630, `og-${l}.png ${w}x${hh}`);
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const b of blocks) {
    try {
      const j = JSON.parse(b[1]);
      (j["@graph"] || [j]).forEach((n) => types.push(n["@type"]));
    } catch (e) {
      ok(false, "JSON-LD parse " + e.message);
    }
  }
  console.log("   types:", types.join(", "));
  ok(types.filter((t) => t === "FAQPage").length === 1, "exactly one FAQPage");
  ok(!/\bTODO\b/.test(h), "no TODO in output");
}
for (const f of [
  "favicon.ico",
  "favicon-32.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "site.webmanifest",
  "llms.txt",
  "robots.txt",
])
  ok(statSync(`dist/${f}`, { throwIfNoEntry: false })?.size > 0, f);
process.exit(fail ? 1 : 0);
