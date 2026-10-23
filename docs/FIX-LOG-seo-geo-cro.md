# Fix log: SEO / GEO / CRO pass (2026-10-23)

Nothing committed or pushed. Header, Footer nav, global.css, nav.ts, BlobCard, WaveDivider and section spacing were not touched.

## Verified on the built page (`node scripts/seo-verify.mjs`, 2 pages)

All pass for EN and AR: title 57 / 53 chars, description 145 / 130 chars, `lang` + `dir`, canonical, hreflang `en`, `ar`, `x-default` (reciprocal, also in `sitemap-0.xml`), one `<h1>`, OG + Twitter tags, `og-en.png` and `og-ar.png` are 1200x630, favicons / apple-touch / 192 / 512 / manifest present, every JSON-LD block parses, exactly one FAQPage, `inLanguage` set. Internal preview pages are not built (only `/en/`, `/ar/`, `/` redirect). Existing metadata needed no fix.

## Changes

| File | Change |
|---|---|
| `public/llms.txt` (new) | Concise factual summary, page anchors, FAQ highlights. No contacts, no prices. |
| `public/robots.txt` | Explicit Allow for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot; sitemap kept. Owner can restrict (docs/GEO.md). |
| `public/_headers` | HTML revalidate, immutable `/_astro/*`, 1-day icons/OG, short `llms.txt`/`robots.txt`; `Content-Security-Policy-Report-Only` with hashes from this build. Comments moved to column 0 (Cloudflare treats indented `#` lines as headers). |
| `src/components/seo/JsonLd.astro` | `featureList` (Features titles shown on page); `sameAs` now from `site.ts` profiles only (WhatsApp `wa.me` link no longer leaks in); `areaServed` Country list only for regions with configured contact/price; `contactPoint` only if `PUBLIC_CONTACT_EMAIL` set. Currently none of the three optional fields is emitted because nothing is configured. No HowTo (documented why), no offers. |
| `src/layouts/BaseLayout.astro` (head/body end only) | `robots` meta `index, follow, max-image-preview:large, max-snippet:-1` on indexable pages; deferred analytics module at end of body. |
| `src/scripts/analytics.ts` (new) | Opt-in, cookie-free, PII-free dispatcher for Cloudflare Web Analytics and/or Plausible. No-op when `PUBLIC_ANALYTICS_*` unset; honours DNT and GPC. Maps the 5 existing events plus `cta-click`, `whatsapp-click`, `faq-open`, `section-view`. |
| `.env.example`, `docs/ENV.md`, `src/env.d.ts` | `PUBLIC_ANALYTICS_CF_TOKEN`, `PUBLIC_ANALYTICS_PLAUSIBLE_DOMAIN`, `PUBLIC_ANALYTICS_PLAUSIBLE_SRC`. |
| `src/i18n/sections/faq.{en,ar}.json` | Answer-first wording for cost, who can see data, older Android (no new claims). Other FAQ answers and compare rows already lead with the answer. Parity check passes. |
| `scripts/seo-verify.mjs` (new) | Repeatable check of the fundamentals above. |
| `docs/GEO.md`, `docs/CRO.md` (new) | AI-visibility test prompts, hreflang decision, future region plan, Cloudflare notes, event map, `data-cta` to-do list. |

## Decisions

- No regional hreflang (`ar-EG`, `ar-SA`, `en-US`): one URL per language, region is client-side. Rationale and split plan in docs/GEO.md section 4.
- `data-cta` attributes not added (Header/Footer are in the other engineer's files); the script falls back to header/footer/section id. List in docs/CRO.md.
- Link preload headers skipped (hashed font URLs change per build; fonts already preloaded in HTML).
- CSP stays Report-Only. **The inline-script hashes go stale when any inline script changes** (Header, Faq, analytics inlining): rerun `npx astro build && node scripts/csp-hashes.mjs` and replace the `script-src` hashes in `public/_headers` after the other engineer finishes.

## Tests run

`npx astro check` 0 errors; `node docs/tools/check-i18n-parity.mjs` OK; prettier clean on touched files; `npx astro build` 2 pages; JSON-LD parsed for both pages.

## The owner must supply

1. Real OG art (current `public/og/og-{en,ar}.png` are placeholders; 1200x630).
2. Social profile URLs (`PUBLIC_SOCIAL_*`) so `sameAs` is emitted; also helps entity recognition.
3. Analytics choice and token/domain (`PUBLIC_ANALYTICS_*`); allow its host in the CSP.
4. Real contact (email, WhatsApp, phone per region) and, if wanted, a business address for the Organization (`contactPoint`, `address`); region prices before any `offers` markup.
5. Decision on AI training crawlers (robots.txt) and verification of the claims in `docs/OWNER-CLAIMS.md`, which AI engines will quote.
6. Search Console and Bing Webmaster Tools verification, then submit `sitemap-index.xml`.
