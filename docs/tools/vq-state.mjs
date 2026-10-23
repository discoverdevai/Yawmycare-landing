// Viewport-state captures (no reduced-motion): node docs/tools/vq-state.mjs <base> <lang> <WxH> <outdir>
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
const [base, lang, spec, outdir] = process.argv.slice(2);
const [width, height] = spec.split("x").map(Number);
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [`--remote-debugging-port=${port}`, "--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${process.env.TEMP}/cdp-${port}`, "about:blank"], { stdio: "ignore" });
let tabs;
for (let i = 0; i < 50 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await new Promise((r) => setTimeout(r, 200)); } }
const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); pending.get(d.id)?.(d); };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(outdir, { recursive: true });
await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500 });
await send("Page.enable"); await send("Page.navigate", { url: `${base}/${lang}/` });
await wait(2500);
const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(`${outdir}/state-${lang}-${spec}-${name}.png`, Buffer.from(s.result.data, "base64")); };
await shot("top");
// header menu / region
const menu = await ev(`(()=>{const b=document.querySelector('[aria-controls*=menu],[data-menu-toggle],button[aria-label*=enu]');if(b){b.click();return b.outerHTML.slice(0,120)}return null})()`);
await wait(600); await shot("menu");
await ev(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`); await wait(300);
// sections at viewport
for (const id of ["pricing", "faq", "contact"]) {
  await ev(`document.getElementById('${id}')?.scrollIntoView({block:'start',behavior:'instant'})`); await wait(900); await shot("sec-" + id);
}
// open dialog
await ev(`scrollTo(0,0)`); await wait(300);
await ev(`(document.querySelector('[data-demo-open],[data-open-demo],a[href*="#demo"],button[aria-haspopup=dialog]')||{}).click?.()`);
await wait(900); await shot("dialog");
console.log("menu:", menu);
console.log(JSON.stringify(await ev(`({dlg:!!document.querySelector('dialog[open]'),toggle:!!document.querySelector('[data-motion-toggle]:not([hidden])')})`)));
ws.close(); chrome.kill();
