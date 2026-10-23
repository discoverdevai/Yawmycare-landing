# GEO: AI-search visibility, geo-targeting, Cloudflare

## 1. What is in place

| Item | Where |
|---|---|
| `llms.txt` (factual summary, page anchors, FAQ highlights; no contacts, no prices) | `public/llms.txt` |
| AI crawlers allowed (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot) | `public/robots.txt` |
| JSON-LD: Organization, WebSite, WebPage, SoftwareApplication (+ `featureList` from the Features titles), FAQPage | `src/components/seo/JsonLd.astro`, `Faq.astro` |
| Answer-first FAQ (first sentence is the quotable answer) | `src/i18n/sections/faq.{en,ar}.json` |
| `robots` meta `index, follow, max-image-preview:large, max-snippet:-1` | `BaseLayout.astro` |

**Crawler decision.** Default is allow-all: a new product with no brand recognition gains from being cited by ChatGPT, Perplexity, Gemini and Claude, and the page holds no private data. The owner can restrict: in `public/robots.txt` change `Allow: /` to `Disallow: /` under a bot. Typical split: keep search/citation bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Googlebot) and block training-only ones (GPTBot, Google-Extended, CCBot, Applebot-Extended). Blocking training bots does not affect Google Search ranking. robots.txt is advisory; real enforcement needs Cloudflare WAF / AI Crawl Control.

**Not added, on purpose.**
- `HowTo` JSON-LD for the 4 setup steps: the steps are a sales flow ("see it in action", "bring everyone together"), not instructions a reader can follow, and Google no longer shows HowTo rich results. Marking them up would claim more than the page says.
- `offers` / `priceRange`: no price is public. Add `offers` only when `PUBLIC_REGION_*_PRICE_AMOUNT` is set and the price is visible on the page.
- `aggregateRating`, `review`, address, phone: nothing real to state.

`areaServed` (Country: Egypt, Saudi Arabia, United States) is emitted on Organization and SoftwareApplication **only for regions that have a configured WhatsApp, phone or price** (`src/config/site.ts`, `regions`). With nothing configured it is absent, so the markup never promises service the page does not show. `sameAs` lists only configured LinkedIn/Instagram/Facebook profile URLs (WhatsApp is excluded: it is a chat link, not a profile). `contactPoint` appears only when `PUBLIC_CONTACT_EMAIL` is set.

## 2. Writing for answer engines

- Each FAQ answer opens with the direct answer (Yes/No, or the fact), then the nuance. Keep it that way when editing: an engine often quotes only the first sentence.
- Keep definition-style leads under section titles (`lead` keys). One claim per sentence, numbers as digits ("20 minutes", "100 metres").
- Keep EN and AR answers equivalent; the Arabic FAQPage is a separate citation source for Arabic queries.
- Claims not yet verified are tracked in `docs/OWNER-CLAIMS.md`; do not strengthen them for the sake of quotability.

## 3. How to test visibility

Run monthly, logged out, in a fresh session; record whether Yawmy Care is named, which URL is cited, and the exact wording.

English prompts (ChatGPT with search, Perplexity, Gemini, Claude with web, Copilot):
1. "Best nursery management software with a parent app"
2. "Nursery app in Arabic for parents and teachers"
3. "Software to replace WhatsApp groups and Excel for a nursery in Egypt" (also Saudi Arabia, USA)
4. "What is Yawmy Care?", "Is Yawmy Care free for parents?", "How long does Yawmy Care take to set up?"
5. "Daycare check-in app that works on older Android phones"
6. "Yawmy Care vs <competitor from docs/research/*.md>": check the answer is not wrong.

Arabic prompts: "أفضل برنامج لإدارة الحضانات", "تطبيق حضانة لأولياء الأمور بالعربية", "يومي كير", "بديل واتساب وإكسل لإدارة الحضانة".

What to monitor:
- Citations: does the answer link `yawmycare.com/en/` or `/ar/`? Which section anchor?
- Accuracy: price (must say "flat monthly fee", never a number we did not publish), "parents pay nothing", "under 20 minutes". Wrong answer: fix the page wording first, then re-test.
- Crawl evidence in Cloudflare Analytics / logs: user agents `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`. (`Google-Extended` is a robots token only, with no separate user agent.)
- Search Console: indexed pages (expect `/en/`, `/ar/`), hreflang report (no errors), Core Web Vitals, rich-results test on FAQPage.
- Bing Webmaster Tools: submit `sitemap-index.xml` (feeds ChatGPT search and Copilot).

Offsite signals matter more than markup: listings and reviews on software directories, an Arabic LinkedIn presence, mentions by nursery associations. Needs owner action (see FIX-LOG-seo-geo-cro.md).

## 4. Region targeting: `hreflang` recommendation

Current structure: one URL per language (`/en/`, `/ar/`); region (Egypt, Saudi Arabia, US) is chosen client-side and only contact numbers and prices change.

**Recommendation: do not add `ar-EG`, `ar-SA`, `en-US` hreflang variants now.**
- Regional hreflang requires a separate URL per variant. Pointing `ar-EG` and `ar-SA` at the same URL is invalid, and cloning pages to host them would create near-duplicates with no unique content.
- The region switch runs in the browser after load, so crawlers see one version; the visible differences (a phone, a price) are not enough for Google to treat pages as distinct.
- `en` / `ar` + `x-default` already declares the language alternates correctly (reciprocal, verified in `dist`).
- Geo signals that help without new URLs: `areaServed` (once regions are configured), Arabic copy that names the region where the content really applies, local directory listings, and no country target in Search Console.

**Future plan (when to split).** Create regional URLs (for example `/eg/ar/`, `/sa/ar/`, `/us/en/`) only when the pages differ in substance: prices in different currencies visible without JavaScript, region-specific contact details and legal entity, region-specific testimonials or compliance text. Then: server-render the regional price and contact (no client switch for crawled content), give each URL a self-referencing canonical, publish a full reciprocal hreflang set including `x-default`, list them in the sitemap, keep the language-only pages as the `x-default` fallback, and add per-region `Offer` / `areaServed` JSON-LD with the real values. Do not do this before real prices and contacts exist.

## 5. Cloudflare notes

- `_redirects`: one rule, `/  /en/  301`. Astro also emits `dist/index.html` as a meta-refresh fallback; the Workers redirect answers first. No other rules.
- `_headers`: security headers on `/*`; HTML (`/en/`, `/ar/`) `max-age=0, must-revalidate` (a deploy shows at once; revalidation is a cheap 304); `/_astro/*` immutable for a year (content-hashed); logos, icons and OG images one day; `llms.txt` and `robots.txt` one hour. Comments in `_headers` must start at column 0.
- `Link: rel=preload` headers were not added: the fonts are already `<link rel=preload>` in the head, and hashed font URLs change every build, so a static `_headers` entry would go stale.
- CSP: `Content-Security-Policy-Report-Only` is in `_headers` with sha256 hashes for the inline scripts of the current build (`node scripts/csp-hashes.mjs`). **Regenerate the hashes whenever an inline `<script>` changes** (Header, Faq, analytics inlining), check the browser console for violations on both pages, then rename the header to `Content-Security-Policy`. `style-src` keeps `'unsafe-inline'` for a few `style=""` attributes. With analytics enabled add `https://static.cloudflareinsights.com` or the Plausible host (docs/CRO.md).
- Dashboard: "Always use HTTPS", HSTS only once the domain is final, Web Analytics, and AI Crawl Control to see which AI bots visit.
- Verification script: `node scripts/seo-verify.mjs` after `npx astro build` (titles, canonical, hreflang, OG sizes, JSON-LD parse, h1 count, icons, llms.txt).
