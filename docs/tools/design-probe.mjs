// node docs/tools/design-probe.mjs <url> <width> "<js expression>"  -> prints the JSON result (reduced motion, after lazy images)
import { spawn } from "node:child_process";
const [url, width, expr] = process.argv.slice(2);
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [`--remote-debugging-port=${port}`, "--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${process.env.TEMP}/cdp-${port}`, "about:blank"], { stdio: "ignore" });
let tabs;
for (let i = 0; i < 50 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await new Promise((r) => setTimeout(r, 200)); } }
const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); pending.get(d.id)?.(d); };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => { const r = (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result; return r?.result?.value ?? r?.exceptionDetails?.exception?.description; };
await send("Emulation.setDeviceMetricsOverride", { width: Number(width), height: Number(process.env.VH || 900), deviceScaleFactor: 1, mobile: Number(width) < 500 });
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Page.enable"); await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 2500));
await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')`);
await new Promise((r) => setTimeout(r, 1000));
console.log(JSON.stringify(await ev(expr)));
ws.close(); chrome.kill();
