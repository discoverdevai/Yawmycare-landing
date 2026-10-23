// Reference capture for the CtaBand / BlobCard stretch / DemoModal refactor (docs/FIX-LOG-refactor.md).
// Usage: node docs/tools/refactor-capture.mjs <baseUrl> <outDir>
// For en/ar x 375/1440: element screenshots (Setup band, Final CTA + footer, demo dialog idle / errors / success)
// plus measurements (rects + computed styles) into <outDir>/measure.json. Compare two dirs with
// node docs/tools/refactor-capture.mjs --compare <dirA> <dirB>
import { spawn } from "node:child_process";
import { writeFileSync, readFileSync, readdirSync, mkdirSync } from "node:fs";

if (process.argv[2] === "--compare") {
  const [a, b] = process.argv.slice(3);
  let bad = 0;
  for (const f of readdirSync(a).filter((x) => x.endsWith(".png") || x.endsWith(".json"))) {
    const same = Buffer.compare(readFileSync(`${a}/${f}`), readFileSync(`${b}/${f}`)) === 0;
    if (!same) bad++;
    console.log(same ? "same     " : "DIFFERENT", f);
  }
  console.log(bad ? `${bad} differ` : "ALL IDENTICAL");
  process.exit(bad ? 1 : 0);
}

const [base, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const measure = {};

async function run(locale, width) {
  const port = 9300 + Math.floor(Math.random() * 600);
  const chrome = spawn(
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    [`--remote-debugging-port=${port}`, "--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${process.env.TEMP}/cdp-${port}`, "about:blank"],
    { stdio: "ignore" },
  );
  let tabs;
  for (let i = 0; i < 50 && !tabs; i++) {
    try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await new Promise((r) => setTimeout(r, 200)); }
  }
  const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); pending.get(d.id)?.(d); };
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.enable");
  await send("Page.navigate", { url: `${base}/${locale}/` });
  await wait(4000);
  await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')`);
  await wait(1500);
  const tag = `${locale}-${width}`;
  const shot = async (name, sel, full = false) => {
    let params = { format: "png" };
    if (sel === "#demo") {
      // The dialog is in the top layer (fixed): clip to its viewport rect, no scrolling or beyond-viewport capture.
      const r = await ev(`(()=>{const b=document.querySelector("#demo").getBoundingClientRect();return {x:b.left+scrollX,y:b.top+scrollY,width:b.width,height:Math.min(b.height,innerHeight)}})()`);
      params = { ...params, clip: { ...r, scale: 1 } };
    } else if (sel) {
      await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'})`);
      await wait(200);
      const r = await ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return {x:Math.max(0,b.left),y:b.top+scrollY,width:b.width,height:Math.min(b.height,2600)}})()`);
      params = { ...params, captureBeyondViewport: true, clip: { ...r, scale: 1 } };
    }
    const s = await send("Page.captureScreenshot", params);
    if (!s.result) console.error("shot failed", name, tag, JSON.stringify(s.error), JSON.stringify(params.clip));
    else writeFileSync(`${out}/${name}-${tag}.png`, Buffer.from(s.result.data, "base64"));
  };
  // Measurements: every element inside the bands and dialog -> rect + a few computed props.
  const measureJs = (rootSel) => `(()=>{const root=document.querySelector(${JSON.stringify(rootSel)});const rows=[];
    for(const el of [root,...root.querySelectorAll('*')]){const b=el.getBoundingClientRect();if(!b.width&&!b.height)continue;const c=getComputedStyle(el);
    rows.push([el.tagName.toLowerCase(),Math.round(b.x*10)/10,Math.round((b.y+scrollY-root.getBoundingClientRect().y-scrollY)*10)/10,Math.round(b.width*10)/10,Math.round(b.height*10)/10,c.fontSize,c.fontWeight,c.color,c.backgroundColor,c.padding,c.display]);}
    return rows})()`;
  measure[`setup-${tag}`] = await ev(measureJs("#setup > :last-child, #setup"));
  await shot("setup-band", "#setup .flex.flex-col.gap-8 > :last-child");
  measure[`setupband-${tag}`] = await ev(measureJs("#setup .flex.flex-col.gap-8 > :last-child"));
  measure[`contact-${tag}`] = await ev(measureJs("#contact"));
  await shot("final-cta", "#contact");
  await shot("footer", "footer");
  measure[`footer-${tag}`] = await ev(measureJs("footer"));
  measure[`page-${tag}`] = await ev(`[document.documentElement.scrollWidth, document.documentElement.scrollHeight]`);
  // Every section: screenshot + rect dump of all elements (guards the BlobCard stretch change everywhere).
  const ids = await ev("[...document.querySelectorAll('main section[id], footer')].map(s=>s.id||'footer')");
  for (const sid of ids) {
    const sel = sid === "footer" ? "footer" : "#" + sid;
    await shot("sec-" + sid, sel);
    measure["all-" + sid + "-" + tag] = await ev(`(()=>{const root=document.querySelector(${JSON.stringify(sel)});const o=root.getBoundingClientRect();return [...root.querySelectorAll('*')].map(e=>{const b=e.getBoundingClientRect();return [e.tagName,Math.round(b.x),Math.round(b.y-o.y),Math.round(b.width),Math.round(b.height)]})})()`);
  }
  // Dialog: open, empty submit (errors), valid fill (success, dev simulates).
  await ev(`document.querySelector('[data-demo-open]').click()`);
  await wait(800);
  await shot("demo-idle", "#demo");
  measure[`demo-idle-${tag}`] = await ev(measureJs("#demo"));
  measure[`demo-focus-${tag}`] = await ev(`document.activeElement.id`);
  await ev(`document.querySelector('[data-demo-submit]').click()`);
  await wait(500);
  await shot("demo-errors", "#demo");
  measure[`demo-errors-${tag}`] = await ev(measureJs("#demo"));
  measure[`demo-status-${tag}`] = await ev(`[document.querySelector('[data-demo-status]').textContent, document.activeElement.id, [...document.querySelectorAll('#demo [aria-invalid=true]')].map(i=>i.id)]`);
  const d = new Date(Date.now() + 2 * 86400000);
  const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const events = await ev(`(()=>{window.__ev=[];for(const n of ['yawmy:demo-open','yawmy:demo-submit'])document.addEventListener(n,e=>window.__ev.push([n,e.detail]));
    const f=document.querySelector('[data-demo-form]');const set=(n,v)=>{const i=f.elements[n];i.value=v;i.dispatchEvent(new Event('input',{bubbles:true}))};
    set('name','Test User');set('nursery','Sunshine');set('email','a@b.co');set('date','${ds}');set('time','10:00');return 1})()`);
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Shift", code: "ShiftLeft" }); // trusted interaction
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Shift", code: "ShiftLeft" });
  await wait(2300);
  await ev(`document.querySelector('[data-demo-submit]').click()`);
  await wait(1500);
  await shot("demo-success", "#demo");
  measure[`demo-success-${tag}`] = await ev(measureJs("#demo"));
  measure[`demo-events-${tag}`] = await ev(`[window.__ev, document.activeElement.id, document.querySelector('#demo').getAttribute('aria-labelledby')]`);
  // Close and check focus return.
  await ev(`document.querySelector('#demo [data-panel=success] [data-demo-close]').click()`);
  await wait(400);
  measure[`demo-closed-${tag}`] = await ev(`[document.querySelector('#demo').open, document.activeElement.tagName + ':' + (document.activeElement.textContent||'').trim().slice(0,20)]`);
  ws.close(); chrome.kill();
}

for (const locale of ["en", "ar"]) for (const width of [375, 1440]) await run(locale, width);
writeFileSync(`${out}/measure.json`, JSON.stringify(measure));
console.log("done", out);
