// Compares the EN and AR dictionaries (14 file pairs): key trees, value types, array lengths.
// Exit 1 on any structural mismatch. Also warns when an AR string equals its EN string
// (untranslated), except ids, the Latin wordmark/brand and strings with no letters.
// Usage: node docs/tools/check-i18n-parity.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../src/i18n");
const pairs = [["en.json", "ar.json"]];
for (const f of fs.readdirSync(path.join(root, "sections")).sort()) {
  if (f.endsWith(".en.json")) pairs.push([`sections/${f}`, `sections/${f.replace(".en.json", ".ar.json")}`]);
}

const errors = [];
const warnings = [];
const LATIN_OK = new Set(["wordmark"]);

function kind(v) {
  return Array.isArray(v) ? "array" : v === null ? "null" : typeof v;
}

function walk(en, ar, p, file) {
  const ke = kind(en);
  const ka = kind(ar);
  if (ke !== ka) {
    errors.push(`${file}: ${p || "(root)"} type EN=${ke} AR=${ka}`);
    return;
  }
  if (ke === "array") {
    if (en.length !== ar.length) errors.push(`${file}: ${p} array length EN=${en.length} AR=${ar.length}`);
    for (let i = 0; i < Math.min(en.length, ar.length); i++) walk(en[i], ar[i], `${p}[${i}]`, file);
  } else if (ke === "object") {
    const a = Object.keys(en);
    const b = Object.keys(ar);
    for (const k of a) if (!b.includes(k)) errors.push(`${file}: ${p ? p + "." : ""}${k} missing in AR`);
    for (const k of b) if (!a.includes(k)) errors.push(`${file}: ${p ? p + "." : ""}${k} extra in AR`);
    for (const k of a) if (b.includes(k)) walk(en[k], ar[k], p ? `${p}.${k}` : k, file);
  } else if (ke === "string") {
    const leaf = p.split(".").pop().replace(/\[\d+\]$/, "");
    if (leaf === "id" || LATIN_OK.has(p)) return;
    if (!/\p{L}/u.test(en)) return; // digits / punctuation only
    if (en === ar) warnings.push(`${file}: ${p} AR equals EN ("${en.slice(0, 50)}")`);
    else if (!/\p{Script=Arabic}/u.test(ar)) warnings.push(`${file}: ${p} AR has no Arabic letters ("${ar.slice(0, 50)}")`);
    // `em`/boolean flags and non-string leaves are compared by type above.
  } else if (ke !== "boolean" && ke !== "number" && en !== ar) {
    errors.push(`${file}: ${p} differs`);
  }
}

for (const [e, a] of pairs) {
  const en = JSON.parse(fs.readFileSync(path.join(root, e), "utf8"));
  const ar = JSON.parse(fs.readFileSync(path.join(root, a), "utf8"));
  walk(en, ar, "", e.replace(".en.json", "").replace("en.json", "common"));
}

console.log(`checked ${pairs.length} file pairs`);
for (const w of warnings) console.log("WARN  " + w);
for (const e of errors) console.log("ERROR " + e);
if (errors.length) {
  console.log(`FAILED: ${errors.length} mismatch(es)`);
  process.exit(1);
}
console.log(`OK: key trees and array lengths match${warnings.length ? ` (${warnings.length} warning(s))` : ""}`);
