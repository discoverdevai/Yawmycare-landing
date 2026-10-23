// Usage: node docs/tools/measure-diff.mjs <dirA> <dirB>: lists keys of measure.json whose rows differ.
import { readFileSync } from "node:fs";
const [a, b] = process.argv.slice(2).map((d) => JSON.parse(readFileSync(`${d}/measure.json`)));
let n = 0;
for (const k of Object.keys(a)) if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) { n++; console.log("DIFF", k, `${a[k]?.length} vs ${b[k]?.length} rows`); }
console.log(n ? `${n} keys differ` : "measure.json identical");
