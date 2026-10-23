// Page weight report for the built site: node scripts/measure-weight.mjs [dpr=1]
// Models what a browser downloads per <img>: one srcset candidate (avif source preferred), plus CSS/JS/fonts actually used.
import fs from "node:fs";
import sharp from "sharp";
const dpr = Number(process.argv[2] ?? 1);
const root = "dist";
const sz = (u) => {
  try {
    return fs.statSync(root + u.split("?")[0]).size;
  } catch {
    return 0;
  }
};
const mb = (n) => (n / 1048576).toFixed(2);

function pick(srcset = "", need) {
  const c = srcset
    .split(",")
    .map((s) => s.trim().split(/\s+/))
    .filter((x) => x[0])
    .map(([u, d]) => ({
      u,
      w: d?.endsWith("w") ? parseInt(d) : d?.endsWith("x") ? parseFloat(d) : 1,
      x: d?.endsWith("x"),
    }));
  if (!c.length) return null;
  if (c[0].x) return (c.find((k) => k.w >= dpr) ?? c.at(-1)).u;
  return (c.find((k) => k.w >= need) ?? c.at(-1)).u;
}

for (const loc of ["en", "ar"]) {
  const html = fs.readFileSync(`${root}/${loc}/index.html`, "utf8");
  const files = new Map(); // url -> {eager, used}
  const add = (u, eager, tag) => {
    if (!u) return;
    const p = files.get(u) ?? { eager: false, uses: [] };
    p.eager ||= eager;
    p.uses.push(tag);
    files.set(u, p);
  };
  for (const pic of html.matchAll(/<picture\b[\s\S]*?<\/picture>|<img\b[^>]*>/g)) {
    const s = pic[0];
    const img = s.match(/<img\b[^>]*>/)?.[0];
    if (!img) continue;
    const g = (t, a) => t.match(new RegExp("(?:^|[\\s<])" + a + '="([^"]*)"'))?.[1];
    const w = Number(g(img, "width") ?? 400);
    const need = w * dpr;
    const eager = g(img, "loading") !== "lazy";
    const reduce = /media="\(prefers-reduced-motion/.test(s);
    const avif = s.match(/<source[^>]*type="image\/avif"[^>]*>/)?.[0];
    let url;
    if (avif) url = pick(g(avif, "srcset"), need);
    else url = pick(g(img, "srcset") ?? "", need) ?? g(img, "src");
    add(url, eager, `${w}x${g(img, "height")}${reduce ? " anim" : ""}`);
  }
  const assets = [...html.matchAll(/(?:href|src)="(\/_astro\/[^"]+\.(?:css|js))"/g)].map((m) => m[1]);
  for (const a of assets) add(a, true, "css/js");
  const fonts = fs
    .readdirSync(`${root}/_astro`)
    .filter(
      (f) =>
        f.endsWith(".woff2") &&
        (loc === "ar" ? /arabic|latin-wght|fraunces-latin-wght/.test(f) : /-latin-wght/.test(f)),
    );
  for (const f of fonts) add("/_astro/" + f, true, "font");
  let eager = 0,
    total = 0;
  for (const [u, p] of files) {
    total += sz(u);
    if (p.eager) eager += sz(u);
  }
  const htmlSize = fs.statSync(`${root}/${loc}/index.html`).size;
  console.log(
    `\n== /${loc}/ @dpr${dpr}: html ${mb(htmlSize)} MB | above-fold(eager) ${mb(eager + htmlSize)} MB | total ${mb(total + htmlSize)} MB | ${files.size} files`,
  );
  if (loc === "en") {
    const rows = [...files]
      .map(([u, p]) => [u, sz(u), p])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25);
    for (const [u, s, p] of rows) {
      let intr = "";
      try {
        const m = await sharp(root + u, { animated: true }).metadata();
        intr = `${m.width}x${m.pageHeight ?? m.height}${m.pages > 1 ? ` ${m.pages}fr` : ""}`;
      } catch {}
      console.log(
        `${(s / 1024).toFixed(0).padStart(5)} KB  ${u.slice(8)}  intrinsic ${intr}  shown ${[...new Set(p.uses)].join(",")} x${p.uses.length}`,
      );
    }
  }
}
