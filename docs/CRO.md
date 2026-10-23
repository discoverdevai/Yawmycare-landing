# CRO: events, analytics, CTA map

Goal of the page: **Book a free demo.** Primary conversion = `demo-submit` with `status: "success"` (step 1). Secondary = `demo-enrich` success, WhatsApp click.

## 1. Analytics is off by default

`src/scripts/analytics.ts` (loaded at the end of `<body>` by `BaseLayout.astro`, as a deferred module) does nothing unless `PUBLIC_ANALYTICS_*` is set (`.env.example`, `docs/ENV.md`). No cookies, no storage, no PII; skipped for Do Not Track and Global Privacy Control. Event props are an allow-list (`status, reason, step, locale, region, source, simulated`, plus `location`, `index`, `section` on the new events): names, phones, nursery names, emails and lead ids are never forwarded.

| Choice | Variable | Gives | Does not give |
|---|---|---|---|
| Cloudflare Web Analytics | `PUBLIC_ANALYTICS_CF_TOKEN` | page views, referrers, Web Vitals; free, cookieless | custom events, funnels |
| Plausible | `PUBLIC_ANALYTICS_PLAUSIBLE_DOMAIN` (+ optional `_SRC`) | page views and all events below (define them as Goals) | needs a paid plan or self-hosting |

Suggestion: Plausible for the conversion funnel; add Cloudflare's beacon too if Web Vitals are wanted. Owner decides.

## 2. Event map

Plausible event names drop the `yawmy:` prefix.

| Source | Fired when | Props | Plausible event |
|---|---|---|---|
| `yawmy:demo-open` (existing, `demo-modal.ts`) | dialog opens | `source` (`data-demo-open` value, `hash` or `link`) | `demo-open` |
| `yawmy:demo-submit` (existing) | step 1 result | `status` (`success`, `error`, `blocked`), `reason`, `step`, `locale`, `region`, `simulated` | `demo-submit` (conversion when `status=success`) |
| `yawmy:demo-enrich` (existing) | step 2 sent | `status`, `reason`, `locale`, `region` | `demo-enrich` |
| `yawmy:demo-skip` (existing) | step 2 skipped | `locale`, `region` | `demo-skip` |
| `yawmy:region-change` (existing, `region-client.ts`) | region switch | `region` | `region-change` |
| click on `[data-demo-open]` (new) | any demo CTA click | `location`, `locale` | `cta-click` |
| click on `[data-wa-link]` or a `wa.me` link (new) | WhatsApp click | `location`, `locale` | `whatsapp-click` |
| click on a closed FAQ question (new) | FAQ row opens | `index` (1-based) | `faq-open` |
| `#pricing`, `#faq`, `#contact` first 25% visible (new) | scroll depth | `section` | `section-view` |

Plausible goals to create: `demo-submit` (filter `status=success`), `demo-open`, `cta-click`, `whatsapp-click`, `section-view` (`section=pricing`), `faq-open`. Funnel: `section-view pricing` -> `demo-open` -> `demo-submit success` -> `demo-enrich`.

Debugging without a vendor: `document.addEventListener("yawmy:demo-open", console.log)` in the console.

## 3. `data-cta` locations

`cta-click` already derives `location` from the nearest `header`, `footer` or `section[id]` (`home`, `setup`, `pricing`, `contact`, ...), so no attribute is needed. For finer names add `data-cta="hero|header|pricing|band|footer"` on the buttons or their wrappers (the script reads the closest ancestor). Not added now because `Header.astro` and `Footer.astro` are being edited by another engineer. To do later:

| File | Add |
|---|---|
| `Header.astro` | `data-cta="header"` on the Book a Demo button (desktop and mobile menu) |
| `Hero.astro` | `data-cta="hero"` on the primary CTA |
| `Setup.astro` (band) | `data-cta="band"` |
| `Pricing.astro` | `data-cta="pricing"` |
| `FinalCta.astro` / `Footer.astro` | `data-cta="footer"` |

## 4. CSP when analytics is on

`public/_headers` is Report-Only. Add `https://static.cloudflareinsights.com` to `script-src` and `connect-src` for the Cloudflare beacon, or `https://plausible.io` (or the proxy host) for Plausible, before making the policy enforcing.

## 5. Experiments once there is traffic

1. Hero CTA copy: "Book a free demo" vs outcome-led.
2. Pricing: the real monthly price per region (once configured) vs "talk to us".
3. WhatsApp prominence in Egypt and Saudi Arabia vs form-first (`whatsapp-click` against `demo-submit`).
4. Demo form: step 1 is already minimal (name, phone, nursery); watch `demo-open` to `demo-submit success` and the `blocked` reasons.
