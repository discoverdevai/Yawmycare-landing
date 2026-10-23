import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
const [base, w, l, outdir, slice="900"] = process.argv.slice(2);
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
mkdirSync(outdir, { recursive: true });
await send("Page.enable");
const S = Number(slice);
for (const lang of l.split(",")) for (const spec of w.split(",")) {
  const [width, height = 900] = spec.split("x").map(Number);
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500 });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.navigate", { url: `${base}/${lang}/` });
  await new Promise((r) => setTimeout(r, 2500));
  await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')`);
  await ev(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}scrollTo(0,0);})()`);
  await new Promise((r) => setTimeout(r, 1200));
  const m = await ev(`({h:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,secs:[...document.querySelectorAll('main > section, header, footer, main > div')].map(s=>({id:s.id||s.className.toString().slice(0,30)||s.tagName,t:Math.round(s.getBoundingClientRect().top+scrollY),h:Math.round(s.getBoundingClientRect().height)}))})`);
  const n = Math.ceil(m.h / S);
  for (let i = 0; i < n; i++) {
    const y = i * S, hh = Math.min(S, m.h - y);
    const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width, height: hh, scale: 1 } });
    writeFileSync(`${outdir}/${lang}-${width}x${height}-s${String(i + 1).padStart(2, "0")}.png`, Buffer.from(shot.result.data, "base64"));
  }
  console.log(lang, width, "h=", m.h, "slices=", n, "overflow=", m.sw > m.cw, JSON.stringify(m.secs.map(s=>`${s.id}@${s.t}+${s.h}`)));
}
ws.close(); chrome.kill();
