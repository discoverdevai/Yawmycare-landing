// Prints the CSP source hashes of every inline <script> and <style> in dist/**/*.html.
// Run after `astro build`: node scripts/csp-hashes.mjs   (paste the output into public/_headers / vercel.json).
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });

const hash = (body) => `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`;
const scripts = new Set();
const styles = new Set();

for (const file of walk("dist")) {
  const html = readFileSync(file, "utf8");
  // Inline scripts only: no src attribute; JSON-LD data blocks are not executed and need no hash.
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/application\/ld\+json/.test(m[1])) continue;
    scripts.add(hash(m[2]));
  }
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styles.add(hash(m[1]));
}

console.log(`script-src 'self' ${[...scripts].join(" ")}`);
console.log(`style-src 'self' ${[...styles].join(" ")}`);
