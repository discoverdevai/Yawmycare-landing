// Design-pass capture: node docs/tools/design-capture.mjs <tag> <base-url> [widths=1440,375] [langs=en,ar]
// For each lang x width: page height, horizontal overflow, and a scaled full-page screenshot in docs/design-shots/<tag>-<lang>-<width>.png
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
const [tag, base, w = "1440,375", l = "en,ar"] = process.argv.slice(2);
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
mkdirSync("docs/design-shots", { recursive: true });
await send("Page.enable");
const out = [];
for (const lang of l.split(",")) for (const width of w.split(",").map(Number)) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.navigate", { url: `${base}/${lang}/` });
  await new Promise((r) => setTimeout(r, 2500));
  await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')`);
  await ev(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);})()`);
  await new Promise((r) => setTimeout(r, 1200));
  const m = await ev(`({h:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
  const scale = Math.min(1, 15000 / m.h, width > 600 ? 0.5 : 0.6);
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: m.h, scale } });
  writeFileSync(`docs/design-shots/${tag}-${lang}-${width}.png`, Buffer.from(shot.result.data, "base64"));
  out.push({ lang, width, height: m.h, hOverflow: m.sw > m.cw, scale });
}
console.log(JSON.stringify(out));
ws.close(); chrome.kill();
