/**
 * Privacy-first, opt-in analytics dispatcher (docs/CRO.md).
 *
 * Does NOTHING unless a PUBLIC_ANALYTICS_* variable is set at build time: no listener, no network, no third-party
 * script. No cookies, no localStorage, no PII (event props are an allow-list of non-identifying fields; names,
 * phones, emails and the lead id never leave the page through here). Skipped entirely when the browser sends
 * Do Not Track or Global Privacy Control.
 *
 *   PUBLIC_ANALYTICS_CF_TOKEN          Cloudflare Web Analytics beacon token (page views + Web Vitals only).
 *   PUBLIC_ANALYTICS_PLAUSIBLE_DOMAIN  Plausible site domain (page views + custom events).
 *   PUBLIC_ANALYTICS_PLAUSIBLE_SRC     Optional script URL (self-hosted or proxied). Default plausible.io.
 *
 * Custom events need Plausible (Cloudflare's beacon has no event API). Third-party scripts need the CSP in
 * public/_headers to allow their host (docs/CRO.md).
 */
const env = import.meta.env;
const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const cfToken = clean(env.PUBLIC_ANALYTICS_CF_TOKEN);
const plausibleDomain = clean(env.PUBLIC_ANALYTICS_PLAUSIBLE_DOMAIN);
const plausibleSrc = clean(env.PUBLIC_ANALYTICS_PLAUSIBLE_SRC);

type Props = Record<string, string | number | boolean>;
type PlausibleFn = ((name: string, opts?: { props?: Props }) => void) & { q?: unknown[] };

/** Event props that may be forwarded. Anything else in an event's detail is dropped. */
const ALLOWED_PROPS = ["status", "reason", "step", "locale", "region", "source", "simulated"] as const;

function httpsUrl(value: string, fallback: string): string {
  try {
    const u = new URL(value || fallback);
    return u.protocol === "https:" ? u.href : fallback;
  } catch {
    return fallback;
  }
}

function addScript(src: string, attrs: Record<string, string>) {
  const s = document.createElement("script");
  s.defer = true;
  s.src = src;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

function optedOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return navigator.doNotTrack === "1" || nav.globalPrivacyControl === true;
}

function init() {
  if (!cfToken && !plausibleDomain) return;
  if (typeof document === "undefined" || optedOut()) return;

  if (cfToken) {
    addScript("https://static.cloudflareinsights.com/beacon.min.js", {
      "data-cf-beacon": JSON.stringify({ token: cfToken, spa: false }),
    });
  }

  let track: (name: string, props?: Props) => void = () => {};
  if (plausibleDomain) {
    const w = window as unknown as { plausible?: PlausibleFn };
    // Queue stub so events fired before the script loads are not lost.
    w.plausible ??= Object.assign((...args: unknown[]) => {
      (w.plausible!.q ??= []).push(args);
    }, {}) as PlausibleFn;
    addScript(httpsUrl(plausibleSrc, "https://plausible.io/js/script.js"), { "data-domain": plausibleDomain });
    track = (name, props) => w.plausible?.(name, props && Object.keys(props).length ? { props } : undefined);
  }

  const pick = (detail: unknown): Props => {
    const out: Props = {};
    if (detail && typeof detail === "object") {
      for (const key of ALLOWED_PROPS) {
        const v = (detail as Record<string, unknown>)[key];
        if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[key] = v;
      }
    }
    return out;
  };

  // 1. Existing CustomEvents (src/scripts/demo-modal.ts, src/config/region-client.ts).
  for (const name of [
    "yawmy:demo-open",
    "yawmy:demo-submit",
    "yawmy:demo-enrich",
    "yawmy:demo-skip",
    "yawmy:region-change",
  ]) {
    document.addEventListener(name, (e) => track(name.replace("yawmy:", ""), pick((e as CustomEvent).detail)));
  }

  // 2. Delegated clicks. Location comes from `data-cta` when present, else the enclosing header/footer/section id.
  const where = (el: Element) =>
    (el.closest("[data-cta]") as HTMLElement | null)?.dataset.cta ||
    (el.closest("header") ? "header" : el.closest("footer") ? "footer" : el.closest("section[id]")?.id) ||
    "page";
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      const cta = target.closest("[data-demo-open]");
      if (cta) return track("cta-click", { location: where(cta), locale: document.documentElement.lang });
      const wa = target.closest("[data-wa-link], a[href^='https://wa.me/']");
      if (wa) return track("whatsapp-click", { location: where(wa), locale: document.documentElement.lang });
      const q = target.closest("[data-faq-item] > h3 > button");
      if (q && q.getAttribute("aria-expanded") !== "true") {
        // Capture phase: runs before the FAQ script toggles the row, so "not expanded" here means it is about to open.
        const idx = Array.from(document.querySelectorAll("[data-faq-item]")).indexOf(q.closest("[data-faq-item]")!);
        track("faq-open", { index: idx + 1 });
      }
    },
    true,
  );

  // 3. Scroll depth: fire once when pricing / FAQ first reach the viewport.
  if ("IntersectionObserver" in window) {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target.id)) continue;
          seen.add(entry.target.id);
          track("section-view", { section: entry.target.id });
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );
    for (const id of ["pricing", "faq", "contact"]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
  }
}

init();
