// Headless-Chrome CDP helper (no dependencies). Usage:
//   node docs/tools/cdp-shot.mjs <url> <width> <out.png> [--sel=#id] [--reduce] [--eval="js"] [--click="css"] [--full]
// Screenshots the element (or the full page), optionally with prefers-reduced-motion emulated, after an optional click/eval.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const [url, width, out, ...flags] = process.argv.slice(2);
const flag = (n) => flags.find((f) => f.startsWith(`--${n}=`))?.slice(n.length + 3);
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [`--remote-debugging-port=${port}`, "--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${process.env.TEMP}/cdp-${port}`, "about:blank"], { stdio: "ignore" });
let tabs;
for (let i = 0; i < 50 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await new Promise((r) => setTimeout(r, 200)); } }
const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); pending.get(d.id)?.(d); };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
await send("Emulation.setDeviceMetricsOverride", { width: Number(width), height: 900, deviceScaleFactor: 1, mobile: Number(width) < 500 });
if (flags.includes("--reduce")) await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Page.enable"); await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 2500));
if (flag("click")) { await ev(`document.querySelector(${JSON.stringify(flag("click"))}).click()`); await new Promise((r) => setTimeout(r, 500)); }
if (flag("eval")) console.log(JSON.stringify(await ev(flag("eval"))));
// Force lazy images to load before the shot.
await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')`);
await new Promise((r) => setTimeout(r, 1500));
const sel = flag("sel");
let params = { format: "png" };
if (sel) {
  await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'})`);
  const r = await ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return {x:0,y:b.top+scrollY,width:innerWidth,height:Math.min(b.height,2600)}})()`);
  params = { ...params, captureBeyondViewport: true, clip: { ...r, scale: 1 } };
} else if (flags.includes("--full")) params.captureBeyondViewport = true;
const shot = await send("Page.captureScreenshot", params);
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
ws.close(); chrome.kill();
