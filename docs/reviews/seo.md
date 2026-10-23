# SEO / AEO audit: Yawmy Care landing page

Scope: `src/layouts/BaseLayout.astro`, all sections, i18n JSON, and one `npx astro build` (2026-10-23, 30 pages) inspected at view-source level (`dist/en/index.html`, `dist/ar/index.html`, `dist/index.html`). No file under `src/` was edited. Production domain assumed `https://yawmycare.com`, not live yet, so everything below is pre-launch.

Build facts: 1 `<h1>` per locale, 1 FAQPage JSON-LD per locale, HTML 347 KB raw / 58 KB gzip (211 KB is inline SVG), 0 `<link rel=preload>`, no `public/` folder at all.

## Findings

Severity: high = blocks launch or visibly hurts discovery/sharing; medium = measurable impact; low = polish.

| # | Sev | Area | Finding | Fix | Effort |
|---|---|---|---|---|---|
| 1 | high | Indexation | **28 internal pages ship to production**: `foundation` and 13 `preview/*` pages, each in `/en/` and `/ar/` (`dist/{en,ar}/foundation/`, `dist/{en,ar}/preview/{commitments,day,demo,faq,features,footer,founders,header,hero,pricing,security,setup,testimonials}/`). They carry `noindex, nofollow`, but are publicly reachable, crawlable, duplicate real content, and expose internal titles ("Foundation showcase", "Preview"). | Do not build them for production. In each of the 14 files (`src/pages/[lang]/foundation.astro`, `src/pages/[lang]/preview/*.astro`): `export function getStaticPaths() { return import.meta.env.PROD ? [] : locales.map((lang) => ({ params: { lang } })); }`. Result: only `/en/`, `/ar/` and the `/` redirect remain. Do NOT rely on `Disallow: /preview/` in robots.txt (a blocked URL cannot show its noindex, and the path list is advertised). Keep `noindex` as a second layer. | S |
| 2 | high | Root redirect | `/` is `dist/index.html`: a `<meta http-equiv="refresh" content="0;url=/en/">` page with `noindex` and canonical `/en/`. The bare domain is the URL people paste into WhatsApp, LinkedIn and ads. Link-preview scrapers do not reliably follow meta refresh, so previews of `yawmycare.com` will show "Redirecting to: /en/" with no image. `noindex` on `/` plus canonical to `/en/` is also a mixed signal, and slower than a 301. | Make it a real server redirect on the host. Netlify / Cloudflare Pages: `public/_redirects` with `/ /en/ 301`. Vercel: `vercel.json` `"redirects":[{"source":"/","destination":"/en/","permanent":true}]`. nginx: `location = / { return 301 /en/; }`. Also enforce one host (apex vs `www`), `/en` -> `/en/` 301, HTTPS + HSTS. Alternative: a tiny bilingual chooser at `/` (two plain `<a>` links, `x-default` pointing to `/`), which serves Arabic searchers better than silently sending everyone to English. Drop `redirects` from `astro.config.mjs` once the host handles it. | S |
| 3 | high | Social sharing | No Open Graph or Twitter Card tags (verified in both `<head>`s). WhatsApp, LinkedIn, Facebook, X and iMessage previews will be a bare title with no image; WhatsApp is the main sharing channel in the target market. | Add the tags in section 2 below to `BaseLayout.astro`. Needs two images: `public/og/og-en.png` and `public/og/og-ar.png`, **1200x630 PNG/JPG** (not WebP/AVIF; some scrapers reject them), under 300 KB, key content inside the central 1000x500, AR version fully RTL. Absolute https URLs, stable un-hashed paths. | M |
| 4 | high | Sitemap / robots | No `robots.txt` and no `sitemap.xml`; `@astrojs/sitemap` is not installed and `public/` does not exist. Both URLs 404. | Install `@astrojs/sitemap` and add `public/robots.txt` (config in section 1 below). Sitemap lists exactly `/en/` and `/ar/` with hreflang alternates; excludes `/`, previews, foundation. Submit in Google Search Console and Bing Webmaster Tools. | S |
| 5 | high | Trust / legal | No Privacy Policy, Terms or contact details anywhere (no `mailto:`, `tel:`, address, legal entity or copyright line; verified in built HTML). The page collects name, work email and preferred date/time via the demo form, so a privacy notice is needed legally (Egypt PDPL Law 151/2020; GDPR if EU visitors) and by ad platforms, and it is a basic trust/E-E-A-T gap for a product that handles children's data. | Add `/en/privacy/`, `/ar/privacy/`, `/en/terms/`, `/ar/terms/` (indexable, hreflang pair, in sitemap), link from the footer and from a one-line consent note under the form submit. Add a footer contact row (email, WhatsApp number, city/country), legal entity name and `(c) 2026 Yawmy Care`. Legal text needs counsel. | M |
| 6 | high | Dead links / form | All 8 social buttons are `href="#"` (4 in `Header.astro`, 4 in `Footer.astro`, both marked `TODO(owner)`), and the demo form endpoint is unset (`.env.example` `PUBLIC_DEMO_FORM_ENDPOINT=`), so a production build shows "This form is not connected yet". `#` links jump to top and are dead to users and crawlers; they are also the future `sameAs` source. | Fill real profile URLs (then `external`), or hide the buttons until they exist. Set the form endpoint before launch. | S |
| 7 | high | Pricing intent | Pricing section and FAQ #1 ("How much does it cost?") never give a number or range ("one flat monthly fee ... book a demo"). Assistants and Google will answer "Yawmy Care price" with "not disclosed". | Owner decision. Best: publish "from X per month" or a range by room count, EN and AR, in the Pricing card and FAQ #1. If not possible, make the answer explicit and quotable: "Yawmy Care costs one flat monthly fee per nursery, priced by the number of rooms. We give you the exact figure on a 15-minute demo call. Parents pay nothing." Do not invent a price or mark up an `Offer` without one. | S (copy) |
| 8 | medium | Title (EN) | `Yawmy Care — Nursery management software, built for the region`: 62 chars (about 520 px, fits). Has the head term, but brand-first and "built for the region" is vague. | Optional: `Nursery Management Software & Parent App | Yawmy Care` (53 chars). | S |
| 9 | medium | Meta description (EN) | 216 chars; Google cuts at about 155-160, so the differentiator and CTA are lost. Generic wording ("all-in-one", "intuitive dashboard"), no Arabic angle, no CTA. | `Nursery management software with Arabic and English apps: attendance, daily reports and parent chat in one place. Book a free demo of Yawmy Care.` (145 chars). | S |
| 10 | medium | Title (AR) | `يومي كير — منصة متكاملة لإدارة الحضانات الخاصة والمدارس الدولية`: 63 chars. At SERP title size Arabic runs roughly 9-11 px per character, so about 600-680 px against a ~580-600 px desktop limit: likely truncates mid-phrase. Also uses generic "منصة متكاملة" instead of the terms people type (برنامج / نظام / تطبيق) and has no Latin brand for people who search "Yawmy". | `يومي كير | برنامج إدارة الحضانات وتطبيق أولياء الأمور` (53 chars). Alternative: `يومي كير | نظام إدارة الحضانات وأولياء الأمور` (44). Check pixel width in a SERP-preview tool. | S |
| 11 | medium | Meta description (AR) | 186 chars; aim 120-150 for Arabic (pixel-limited). It is a literal translation of the EN one, with filler ("لوحة تحكم واحدة سهلة وواضحة"). | `برنامج يومي كير لإدارة الحضانات والمدارس الدولية: حضور وتقارير يومية ومحادثات مع أولياء الأمور في تطبيق واحد بالعربية والإنجليزية. احجز عرضًا مجانيًا.` (150). Native review needed (`docs/DECISIONS.md` #8: AR copy for most sections is an unreviewed draft). | S |
| 12 | medium | AR keyword coverage | Occurrences in all AR copy: `برنامج` 1 (only the h1), `نظام` about 3 (never as "نظام إدارة"), `تطبيق` 9, `منصة` 9, `حضانة/الحضانات` 32. The page leans on "منصة", which is not the dominant query word. "تطبيق أولياء الأمور" never appears as a phrase. `روضة / رياض الأطفال` (Gulf term) is absent; `حضانة` is right for Egypt-first, add `روضة` only when Gulf launch is real. | Use the natural terms once each in visible copy, no stuffing: "برنامج إدارة حضانة" in hero lead, "نظام إدارة الحضانات وأولياء الأمور" in the features or setup lead, "تطبيق أولياء الأمور" in a feature body, and a new FAQ "ما هو يومي كير؟" that says "برنامج لإدارة الحضانات وتطبيق لأولياء الأمور". | M |
| 13 | medium | AR h1 | `برنامج إدارة الحضانات، مصمَّم للمنطقة. بالعربية من اليوم الأول.` (`hero.ar.json`) contains the exact target phrase: good. Minor: tashkeel on `مصمَّم` adds noise for exact-match tools and snippets; "للمنطقة" is vague without a country. | Drop the diacritics: `مصمم للمنطقة`. Optionally name Egypt/the Arab region once that is public. | S |
| 14 | medium | EN h1 / definition | h1 `Nursery management software, built for the region. In Arabic from day one.` has the head term: good. No visible one-sentence definition ("Yawmy Care is ... for ...") exists on the page; that is the sentence snippets and assistants quote (the meta description is the only place). | Make the hero lead start with it: "Yawmy Care is nursery management software for private nurseries and international schools in Egypt and the region: attendance, daily reports and parent messaging in Arabic and English." Mirror in AR. "daycare/preschool" never appear; fine for MENA English, optionally one mention in an FAQ for expats. | S |
| 15 | medium | Structured data | Only FAQPage exists. Missing Organization, WebSite, WebPage (`inLanguage`), SoftwareApplication; Person only with consent. | Blocks in section 3 below, emitted from `BaseLayout.astro` on indexable pages only. Note: Google limits FAQ rich results to government/health sites since 2023, so FAQPage gives no SERP accordion; it still helps machine-readable Q&A. | M |
| 16 | medium | FAQPage JSON-LD | Validated in built output: `@context`, `@type: FAQPage`, 13 `Question`, each with one `acceptedAnswer` `Answer.text` identical to visible text; one block per page; `inLanguage` valid. Latent bug: `Faq.astro` line ~34 `.replace(/</g, "<")` is a **no-op**, because `"<"` in JS source is already `<`. Safe today (no `<` in answers), but the comment promises protection it does not give. | `.replace(/</g, "\u003c")`. Optionally add `url` and `isPartOf` linking to the WebPage node. | S |
| 17 | medium | AEO answers | FAQ is mostly quotable: natural-language questions, answers 19-38 words, direct opening ("No. Parents never pay anything", "Yes. Yawmy Care was built in Arabic...", "Most nurseries are set up in under 20 minutes"). Weak: #1 (no figure), #7 (38 words, three claims), #8 (deflects: "we share the cancellation terms up front"). Missing questions people ask assistants: "What is Yawmy Care?", "What features does it include?", "Is there an iOS / Android app?", "Does it support several branches?", "Where is our data stored?" | Add 3-5 FAQs in `faq.{en,ar}.json` (the JSON-LD regenerates automatically). Lead each answer with a one-sentence direct answer. Make #8 concrete once the owner decides notice period and export format. | M |
| 18 | medium | Claims / E-E-A-T | Unsubstantiated absolutes that assistants will quote verbatim: features h2 "What no other nursery app in MENA has" (`features.en.json`); FAQ #7 "nobody outside your nursery can read it, including us" (hard to square with you operating encrypted backups; legal and trust risk); "nurseries on three continents". Testimonials are anonymous research quotes ("Owner, Maadi, 45 children"), not customer reviews. | Soften or evidence the claims (e.g. "Built for nurseries, in Arabic and English"; describe the real access model). Keep testimonials as quotes; **do not add Review / AggregateRating markup** for them. | S |
| 19 | medium | E-E-A-T / founders | "Dr. Rana Mustafa" (field of doctorate not stated) and "Mr. Mohammed" (no surname, role or profile link). Weak authorship signal for a product holding children's data. | With each founder's consent: full name, role, one-line credential, LinkedIn link, then optional Person markup (section 3). Without consent: no Person schema. | S |
| 20 | medium | Dead anchor | `#watch-demo` is used 3 times (`Hero.astro` L41, `FinalCta.astro` L39, `Setup.astro` L89, EN and AR) and no element has that id: the button does nothing. The 9 nav anchors (`#home #day #why #setup #security #commitments #pricing #founders #faq`), `#demo` and `#main` all resolve (verified). | Hide "Watch the 2-minute tour / Watch Demo" until a video exists, or link to the real video. When live, add VideoObject JSON-LD (name, description, thumbnailUrl, uploadDate, contentUrl or embedUrl). | S |
| 21 | medium | Internal linking | One URL per locale; every "internal link" is a fragment (ignored by search engines, UX only). Logo links to `#home` (`Header.astro`) rather than `/en/`. No deeper pages for long-tail queries ("nursery attendance app", "تقارير يومية للحضانة"). | Now: logo `href` = `/${locale}/`. Next: plan 3-5 indexable pages per locale (Features, Pricing, Security, Privacy/Terms, Contact) so the nav becomes crawlable links. | L |
| 22 | medium | Favicon / manifest | No `<link rel="icon">`, apple-touch-icon or manifest in the build; `/favicon.ico` will 404 and Google shows a globe. Only a 285x258 PNG logo exists, no square SVG (`DECISIONS` #10). | Create in `public/`: `favicon.ico` (32), `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180, opaque). Google needs a square favicon in a multiple of 48 px. Tags and manifest in section 2. Manifest is optional for a landing page. | S |
| 23 | low | theme-color | Present: `#5e7748`, documented as the one raw hex. Fine. | Optionally add `<meta name="color-scheme" content="light">`. | S |
| 24 | low | html lang / dir | Verified: EN `<html lang="en" dir="ltr">`, AR `<html lang="ar" dir="rtl">`. Correct. Plain `ar` is the safer default (use `ar-EG` only if you deliberately target Egypt). | None. | - |
| 25 | low | hreflang / canonical | Verified: self-referencing canonical; `hreflang` en, ar and `x-default` (-> `/en/`) all absolute with trailing slash and reciprocal on both pages. Language switch is a real `<a href="/ar/" hreflang="ar">` (crawlable) and there is no IP or Accept-Language redirect anywhere in source. Residual risks: the host must 301 `/en` -> `/en/`; if a chooser is added at `/`, repoint `x-default` there. Every future page (privacy, terms) needs the same trio. | None now. | - |
| 26 | low | Headings | Single h1, no skipped levels. Issues: (a) the FAQ number badge is inside each `<h3>` so extracted heading text reads "1How much does it cost?" (`Faq.astro` ~L56-L63); (b) two stray `<h2>`s from the demo dialog states ("Thank you!", "Something went wrong") sit in the DOM outline; (c) "See Yawmy Care in Action" is both an h3 (setup) and the modal h2. | (a) move the badge out of the heading or use a CSS counter; (b) use `<p role="status">` or h3 inside the dialog. | S |
| 27 | low | Image alt | EN/AR alts exist, are localised and descriptive (AR spot-checked). Decorative art uses `alt=""` correctly (feature stills, commitment and pricing art, the footer logo beside a labelled link). The security image alt is about 130 chars (trim to under 125). Hashed filenames keep the original stem (`dropoff.*`, `hero-children.*`): fine. | Trim the long alt. | S |
| 28 | low | Image dimensions | Every `<img>` has `width`/`height` and `srcset`; below-the-fold images are lazy; hero is `loading="eager" fetchpriority="high"` with AVIF first and correct `sizes`. | None. | - |
| 29 | low | CWV: fonts | Stand-in fonts via `@fontsource-variable/fraunces` and `readex-pro` (`global.css` L8-L9): `font-display: swap`, but **no preload** for the critical subsets (`fraunces-latin-wght-normal` 36 KB; `readex-pro-arabic-wght-normal` 23 KB). The h1 is probably the mobile LCP element (text sits above the image) so the swap shows in LCP/CLS. `fonts.ts` preloads only licensed files, which are not supplied (`DECISIONS` #9). Licensed Recoleta / Expo Arabic will change metrics: re-measure CLS then and add `size-adjust` fallbacks. | Import the two woff2 files with `?url` and emit `<link rel="preload" as="font" type="font/woff2" crossorigin>` per locale in `BaseLayout.astro`. | S |
| 30 | low | CWV: HTML weight | 347 KB raw HTML (58 KB gzip): wave dividers and blob shapes are inlined repeatedly (211 KB of `<svg>`, 33 very long `<path>`s, 11 data URIs). Not a ranking factor, but slows first parse on low-end Android. | Define each shape once as `<symbol>` + `<use>`, or use CSS `mask-image` with a cached `.svg`. Serve brotli. | M |
| 31 | low | CWV: JS / CSS | JS is minimal (inline scripts + one module for the modal); 46 KB stylesheet is render-blocking but acceptable; no third-party scripts. | Run Lighthouse mobile on the deployed URL. | - |
| 32 | low | Build hygiene | The page-order comment in `src/pages/[lang]/index.astro` is an HTML comment, emitted before `<html>` in both built pages ("spec §8.1"), visible in view-source. | Move it into the `---` frontmatter as a `//` comment. | S |
| 33 | low | Digits / RTL | AR copy uses Western digits consistently (`20 دقيقة`, `7:30 ص`); no Arabic-Indic digits in the AR JSON. That matches how Egyptians type and search: keep. RTL is signalled by `dir="rtl"` on `<html>`; no extra RTL meta exists or is needed. Brand appears as `يومي كير` in copy and `Yawmy Care` in the footer wordmark: good for both spellings, so add `alternateName`. | None. | - |
| 34 | low | llms.txt | Optional, no major engine documents using it; cheap to add. | Sample in section 4. | S |
| 35 | low | AI crawlers | No robots.txt means all allowed. If you want to appear in AI answers, keep GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended allowed. | Owner decision; the robots.txt below allows all. | S |

### What is already fine
- One `<h1>` per locale with the head term early, in both languages; no skipped heading levels.
- `lang`/`dir`, viewport, `theme-color`, skip link, labelled landmarks (`header`, two `nav`, `main`, `footer`).
- Canonical and hreflang (en, ar, x-default): absolute, reciprocal, self-referencing. Language switch is a crawlable link; no automatic language redirect.
- FAQPage JSON-LD valid, one per page, localised, matches visible text; FAQ copy mostly direct-answer style.
- Preview and foundation pages are `noindex, nofollow` (but must still not ship, #1).
- Images: dimensions, srcset, AVIF/WebP, lazy loading, hero priority, localised alt.
- All 9 nav anchors and `#demo` have targets; with JS off, the menu and FAQ answers stay readable.

## Ready-to-paste blocks

### 1. Sitemap + robots

`astro.config.mjs` (after `npm i @astrojs/sitemap`):

```js
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yawmycare.com",
  output: "static",
  // remove this line if the host does the 301 (finding #2)
  // redirects: { "/": "/en/" },
  integrations: [
    sitemap({
      // emits <xhtml:link rel="alternate" hreflang> pairs
      i18n: { defaultLocale: "en", locales: { en: "en", ar: "ar" } },
      filter: (page) => !/\/(preview|foundation)(\/|$)/.test(page) && new URL(page).pathname !== "/",
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
  i18n: { defaultLocale: "en", locales: ["en", "ar"], routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false } },
  vite: { plugins: [tailwindcss()] },
});
```

Expected output: `https://yawmycare.com/en/` and `https://yawmycare.com/ar/`, each with both alternates. The integration does not write `x-default` into the sitemap; the on-page `x-default` is enough. Privacy/terms pages join automatically once they exist.

`public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yawmycare.com/sitemap-index.xml
```

Do not add `Disallow: /preview/` as the fix; remove those pages from the build (#1). Add `Disallow` lines only for real private paths later.

### 2. Head additions for `BaseLayout.astro`

Facebook uses the locale code `ar_AR` for Arabic.

```astro
---
const ogImage = new URL(`/og/og-${locale}.png`, Astro.site).href;
const ogLocale = locale === "ar" ? "ar_AR" : "en_US";
const altLocale = locale === "ar" ? "en_US" : "ar_AR";
const ogAlt = locale === "ar"
  ? "يومي كير: برنامج إدارة الحضانات بالعربية والإنجليزية"
  : "Yawmy Care: nursery management software in Arabic and English";
---
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Yawmy Care" />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={pageDescription} />
<meta property="og:url" content={canonical.href} />
<meta property="og:locale" content={ogLocale} />
<meta property="og:locale:alternate" content={altLocale} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={ogAlt} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={pageTitle} />
<meta name="twitter:description" content={pageDescription} />
<meta name="twitter:image" content={ogImage} />
<meta name="twitter:image:alt" content={ogAlt} />
{/* add twitter:site (@handle) once the X account exists */}

<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Per-locale values (use as `meta.title` / `meta.description` in `src/i18n/{en,ar}.json`, which feed title, description and OG):

| | EN | AR |
|---|---|---|
| title | `Nursery Management Software & Parent App | Yawmy Care` | `يومي كير | برنامج إدارة الحضانات وتطبيق أولياء الأمور` |
| description | `Nursery management software with Arabic and English apps: attendance, daily reports and parent chat in one place. Book a free demo of Yawmy Care.` | `برنامج يومي كير لإدارة الحضانات والمدارس الدولية: حضور وتقارير يومية ومحادثات مع أولياء الأمور في تطبيق واحد بالعربية والإنجليزية. احجز عرضًا مجانيًا.` |
| image | `public/og/og-en.png`, 1200x630 | `public/og/og-ar.png`, 1200x630, RTL layout |

Image brief: logo in the top start corner (mirrored in AR), the locale h1 as the headline in the brand display face, one phone screenshot (`checkin-front` or `report-front`) plus the hero children on brand green `#DFEBD1`; no small text (WhatsApp shrinks it). Also needed: the favicon set from #22.

`public/site.webmanifest` (optional):

```json
{
  "name": "Yawmy Care",
  "short_name": "Yawmy",
  "start_url": "/en/",
  "display": "browser",
  "background_color": "#FFFFF5",
  "theme_color": "#5e7748",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### 3. JSON-LD (emit from `BaseLayout.astro`, indexable pages only)

Rules: strip every `TODO_...` value (or omit the key) before launch; never ship placeholder strings. Do not add `offers` with a price, `aggregateRating`, `review`, `Person` or `sameAs` entries until the real values exist (Person: until the founders consent). "Free for parents" must not be modelled as `price: 0` on the product, because the nursery pays. Keep the existing FAQPage block as its own `<script>`.

**EN (`/en/`)**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yawmycare.com/#organization",
      "name": "Yawmy Care",
      "alternateName": ["يومي كير", "Yawmy"],
      "url": "https://yawmycare.com/",
      "logo": { "@type": "ImageObject", "url": "https://yawmycare.com/logo-512.png", "width": 512, "height": 512 },
      "description": "Nursery management software for private nurseries and international schools in Egypt and the region, in Arabic and English.",
      "sameAs": ["TODO_LINKEDIN_URL", "TODO_INSTAGRAM_URL", "TODO_FACEBOOK_URL"],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "TODO_EMAIL",
          "telephone": "TODO_+20_NUMBER",
          "availableLanguage": ["en", "ar"],
          "areaServed": "TODO_EG"
        }
      ],
      "address": { "@type": "PostalAddress", "addressLocality": "TODO_CITY", "addressCountry": "TODO_EG" }
    },
    {
      "@type": "WebSite",
      "@id": "https://yawmycare.com/#website",
      "url": "https://yawmycare.com/",
      "name": "Yawmy Care",
      "publisher": { "@id": "https://yawmycare.com/#organization" },
      "inLanguage": ["en", "ar"]
    },
    {
      "@type": "WebPage",
      "@id": "https://yawmycare.com/en/#webpage",
      "url": "https://yawmycare.com/en/",
      "name": "Nursery Management Software & Parent App | Yawmy Care",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://yawmycare.com/#website" },
      "about": { "@id": "https://yawmycare.com/#software" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": "https://yawmycare.com/og/og-en.png" },
      "dateModified": "TODO_ISO_DATE_AT_DEPLOY"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://yawmycare.com/#software",
      "name": "Yawmy Care",
      "url": "https://yawmycare.com/en/",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Nursery and school management",
      "operatingSystem": "TODO_VERIFY: Web, Android, iOS",
      "inLanguage": ["en", "ar"],
      "description": "Attendance, daily reports, photos and parent messaging for private nurseries and international schools, in Arabic and English.",
      "audience": { "@type": "Audience", "audienceType": "Nursery owners, teachers and parents" },
      "publisher": { "@id": "https://yawmycare.com/#organization" },
      "image": "https://yawmycare.com/og/og-en.png"
    }
  ]
}
```

`offers` is intentionally absent. Add `{ "@type": "Offer", "priceCurrency": "TODO", "price": "TODO", "url": "https://yawmycare.com/en/#pricing" }` only once a real price is published.

**AR (`/ar/`)**: same graph, Arabic strings, `@id`s shared with the EN page so Google merges the entities.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://yawmycare.com/#organization",
      "name": "يومي كير",
      "alternateName": ["Yawmy Care", "Yawmy"],
      "url": "https://yawmycare.com/",
      "logo": { "@type": "ImageObject", "url": "https://yawmycare.com/logo-512.png", "width": 512, "height": 512 },
      "description": "برنامج لإدارة الحضانات الخاصة والمدارس الدولية في مصر والمنطقة، بالعربية والإنجليزية.",
      "sameAs": ["TODO_LINKEDIN_URL", "TODO_INSTAGRAM_URL", "TODO_FACEBOOK_URL"],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "TODO_EMAIL",
          "telephone": "TODO_+20_NUMBER",
          "availableLanguage": ["ar", "en"],
          "areaServed": "TODO_EG"
        }
      ],
      "address": { "@type": "PostalAddress", "addressLocality": "TODO_CITY", "addressCountry": "TODO_EG" }
    },
    {
      "@type": "WebSite",
      "@id": "https://yawmycare.com/#website",
      "url": "https://yawmycare.com/",
      "name": "يومي كير",
      "publisher": { "@id": "https://yawmycare.com/#organization" },
      "inLanguage": ["ar", "en"]
    },
    {
      "@type": "WebPage",
      "@id": "https://yawmycare.com/ar/#webpage",
      "url": "https://yawmycare.com/ar/",
      "name": "يومي كير | برنامج إدارة الحضانات وتطبيق أولياء الأمور",
      "inLanguage": "ar",
      "isPartOf": { "@id": "https://yawmycare.com/#website" },
      "about": { "@id": "https://yawmycare.com/#software" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": "https://yawmycare.com/og/og-ar.png" },
      "dateModified": "TODO_ISO_DATE_AT_DEPLOY"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://yawmycare.com/#software",
      "name": "يومي كير",
      "url": "https://yawmycare.com/ar/",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "إدارة الحضانات والمدارس",
      "operatingSystem": "TODO_VERIFY: Web, Android, iOS",
      "inLanguage": ["ar", "en"],
      "description": "الحضور والتقارير اليومية والصور ومحادثات أولياء الأمور للحضانات الخاصة والمدارس الدولية، بالعربية والإنجليزية.",
      "audience": { "@type": "Audience", "audienceType": "أصحاب الحضانات والمعلمات وأولياء الأمور" },
      "publisher": { "@id": "https://yawmycare.com/#organization" },
      "image": "https://yawmycare.com/og/og-ar.png"
    }
  ]
}
```

Optional founders, ONLY with written consent from each person (role and URL unknown); then add `"founder": [{ "@id": "https://yawmycare.com/#founder-rana" }]` to the Organization:

```json
{
  "@type": "Person",
  "@id": "https://yawmycare.com/#founder-rana",
  "name": "Dr. Rana Mustafa",
  "jobTitle": "TODO_ROLE",
  "worksFor": { "@id": "https://yawmycare.com/#organization" },
  "sameAs": ["TODO_LINKEDIN_URL"]
}
```

Emission sketch for `BaseLayout.astro`. Build the object in a small `src/lib/seo.ts` from the dictionary plus an `org` config (omit any key whose value is empty or starts with `TODO`):

```astro
{!noindex && <script type="application/ld+json" set:html={JSON.stringify(graph).replace(/</g, "\u003c")} />}
```

### 4. Optional `public/llms.txt`

```
# Yawmy Care

> Yawmy Care is nursery management software for private nurseries and international schools in Egypt and the region. It covers attendance, daily reports, photos, announcements and parent messaging in one app, in Arabic and English. Parents never pay; the nursery pays one flat monthly fee.

## Pages
- [English site](https://yawmycare.com/en/): product overview, pricing model, security, FAQ
- [Arabic site](https://yawmycare.com/ar/): same content in Arabic
- [Privacy policy](TODO_URL)
- [Contact](TODO_URL)
```

## Suggested order of work
1. #1, #2, #4 (build config, host redirect, sitemap and robots): about half a day, no design input.
2. #3 and #22 (OG images, favicon set): needs the logo SVG and design time.
3. #5, #6, #7 (legal pages, real links and contact, a price statement): needs owner input.
4. #8-#14, #17, #18 (titles, descriptions, AR keyword pass, claims): needs native Arabic review (`DECISIONS.md` #8).
5. #15, #16 (structured data) once organization facts (sameAs, contact, OS list) are known.
