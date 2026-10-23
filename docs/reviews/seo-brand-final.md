# SEO + brand final review (built `dist/`, 2026-10-23)

Method: one `npx astro build` (3 pages, ok), `node scripts/seo-verify.mjs` (all ok: hreflang, one h1, OG/Twitter, 1200x630 OG, exactly one FAQPage), inspected dist/en, dist/ar, robots, sitemap-0, llms.txt, 404, manifest, _headers, and viewed both OG PNGs.

## Findings
| # | area | sev | finding | evidence | exact fix |
|---|---|---|---|---|---|
| 1 | AR meta | med | AR title lacks "متابعة الطفل"; AR description has no CTA (EN has "Book a free demo"). Title 53 chars (~480-520px, fits 580px); description 130 chars. | ar.json meta.title / meta.description | description: `يومي كير: برنامج لإدارة الحضانات بالعربية والإنجليزية. حضور وتقارير يومية ومحادثات أولياء الأمور في تطبيق واحد. احجز عرضًا تجريبيًا مجانيًا.` (~137 chars). Keep title; work "متابعة الطفل" into one h3 or intro line. |
| 2 | EN keywords | med | "daycare app" appears nowhere in visible copy (US region is shipped); "parent app" only in the title. H1/H2 carry "nursery management software" only. | grep dist/en (daycare hits are image names only) | Add once in a feature/FAQ answer, e.g. "a daycare and nursery app parents actually use". Do not stuff the title. |
| 3 | headings | med | FAQ h3 accessible text includes the counter: "1How much does it cost?", "10We are…" (EN and AR). | dist/en, dist/ar h3 dump | Wrap the number in `<span aria-hidden="true">` outside the heading text, or use a CSS counter. |
| 4 | headings/voice | med | Founders h2 "Why we built this?" is ungrammatical and mismatches AR "لماذا بنينا يومي كير؟". | src/i18n/sections/founders.en.json:2 | `"Why we built Yawmy Care"` |
| 5 | headings | low | First h2 is the social-proof block, product h2 second; "No card, no commitment · In Arabic or English" is an h3 (strapline, not a heading); "7:30 AM - Drop-off" uses a hyphen as dash. | heading dump | Make the strapline a `<p>`; use "7:30 AM: Drop-off". |
| 6 | OG art | med | Honest judgement: clean, on palette (cream, #76945C band, terracotta dot, #334722 text), logo mark correct, AR properly mirrored RTL. But: mark only, no wordmark; generic tagline; no product screen; EN subtitle sits about 10px above the green band (cramped); text-only gives weak pull in WhatsApp previews. Fonts are the Fraunces stand-in, not Recoleta. | dist/og/og-en.png, og-ar.png | Regenerate: add wordmark beside mark, 12-16px more air above the band, put a dashboard + phone crop in the empty circle area, headline = the H1 promise (see #8). |
| 7 | OG alt | low | og:image:alt is "Yawmy Care: Manage Smarter with Yawmy Care." (brand twice); AR same pattern. | src/layouts/BaseLayout.astro:34 | EN `Yawmy Care: nursery management software in Arabic and English`; AR `يومي كير: برنامج إدارة الحضانات بالعربية والإنجليزية`. |
| 8 | tagline | med | "Manage Smarter with Yawmy Care." is generic SaaS and repeats the brand; AR "أدر بذكاء مع يومي كير" is a literal calque (cold imperative). Neither matches the warm owner-first voice or the H1 ("In Arabic from day one"). | en.json / ar.json brand.tagline; OG art | EN "Nursery management, in Arabic from day one." AR "إدارة الحضانة، بالعربية منذ اليوم الأول." then regenerate OG. Owner call. |
| 9 | brand | low | Short form "Yawmy" in EN: nav "Why Yawmy", body "Today, Yawmy brings…". CLAUDE.md says write "Yawmy Care". No "YAWMY CARE", "Yomi", "Yawmi", "يومى" anywhere (0 hits in dist, src, public). AR "يومي" alone hits are the word "daily" (يومي), not the brand. | dist/en nav + founders copy | Nav "Why Yawmy Care"; body "Today, Yawmy Care brings…". |
| 10 | CTA labels | low | EN: "Book a Demo" (x4), "Book a free demo", "Book My Free Demo" (demo.en.json:52), "Be The First Partner" (pricing.en.json:56). AR consistent ("احجز عرضًا تجريبيًا" / "…مجانيًا"). `cta.watchDemo` key unused (no dead #watch-demo in output). | dist/en | `submit: "Book my free demo"`, `cta: "Be the first partner"`; remove unused watchDemo / "شاهد العرض". |
| 11 | voice | low | Title-Case headings in Setup/Security ("See Yawmy Care in Action", "Get Your Daily Care Ready", "Bring Everyone Together", "Your Data Is Safe. Your Focus Stays on Care.") vs sentence case elsewhere; Figma template leftovers, "Get Your Daily Care Ready" is vague. | dist/en h2/h3 dump | Sentence case, e.g. "See Yawmy Care in action", "Set up your daily routine", "Bring everyone in", "Your data is safe. Your focus stays on care." |
| 12 | CWV fonts | med | No `rel=preload` emitted: `fontPreloads()` only handles licensed Recoleta/Expo files (none present), so stand-in Fraunces/Readex woff2 (`font-display:swap`, in Button.*.css) load late: FOUT/CLS risk on the H1. | dist head has 0 preloads; src/styles/fonts.ts | Until licensed files land, preload `fraunces-latin-wght-normal.*.woff2` (EN) and `readex-pro-arabic-wght-normal.*.woff2` (AR) and add a metric-matched fallback (`size-adjust`). |
| 13 | CWV LCP | low | Hero has 3 `loading=eager` images, only the dashboard has `fetchpriority=high`; the two phone shots compete on mobile; no `<link rel=preload as=image imagesrcset>`. Width/height present, so no CLS. | dist/en hero imgs | Set phone images to `loading="lazy"` (or fetchpriority=low) and preload the hero AVIF with imagesrcset/imagesizes. |
| 14 | image alt | low | Hero/logo/layered mockups `alt=""` while hero wrapper has role=img + translated aria-label (acceptable). Informative alts translated in AR and note "app UI is in English" (good). | dist img dump | None required. |
| 15 | 404 | low | 404 head is English-only (`lang=en`), noindex ok, but carries og/twitter tags and og:url `/404/`, pointless on noindex. Bilingual body is good. | dist/404.html | Skip og:* when `noindex` in BaseLayout. |
| 16 | root/sitemap | low | `/` always 301/meta-refreshes to /en/ (Arabic visitors at the bare domain land on EN; x-default=/en/ is correct). Sitemap lastmod = build timestamp. | dist/index.html, _redirects, sitemap-0.xml | Optional Accept-Language redirect to /ar/ in Cloudflare; use fixed lastmod. |
| 17 | JSON-LD | low | Valid: Organization/WebSite/WebPage/SoftwareApplication in one @graph + exactly one FAQPage (10 Q matching visible FAQ), `inLanguage` set, name/alternateName swap per locale, no `sameAs` (none configured: correct), no invented offers/ratings. `operatingSystem: "Web, iOS, Android"` is an unverified claim. | dist ld+json | Confirm vs docs/OWNER-CLAIMS.md; add `sameAs` once `PUBLIC_SOCIAL_*` set. |
| 18 | manifest | low | theme_color #5e7748 = `--color-primary-cta-strong`, background #fffff5 = surface: on token. No `lang`; start_url always /en/. | dist/site.webmanifest | Optional `"lang":"en"`. |
| 19 | llms.txt | low | Consistent with the two pages; all linked ids exist (#why #compare #setup #security #pricing #faq #demo). English only. | dist/llms.txt | Optional Arabic block or `/ar/llms.txt`. |
| 20 | AR digits | info | Western digits used throughout AR (7:30 ص, 20, 10, 45), 0 Arabic-Indic digits: consistent. | dist/ar | None. |

## Already good
- Titles: EN 57 chars "Nursery Management Software & Parent App | Yawmy Care"; AR "يومي كير | برنامج إدارة الحضانات وتطبيق أولياء الأمور" natural, not stuffed; descriptions 145 / 130 chars.
- Canonical, hreflang en/ar/x-default reciprocal on both pages and mirrored in sitemap; `<html lang dir>` correct (rtl on AR); language switch is a real `<a href="/ar/" hreflang>` (crawlable).
- One h1 per page containing the target phrase; no dead in-page anchors (every `href="#…"` checked against ids; no #watch-demo).
- OG/Twitter complete; 1200x630 PNG per locale, absolute URLs, og:locale + alternate.
- robots.txt allows all incl. AI bots plus Sitemap line; sitemap lists exactly the 2 pages; `_headers` revalidates HTML and caches hashed assets immutably.
- Brand spelling clean; AR always "يومي كير"; icons/OG/manifest on token colours; footer wordmark uppercase is CSS only.
- Images: explicit width/height, AVIF/WebP, below-fold lazy, translated informative alts.
- 404 noindex and bilingual with home links.

## Scores
- SEO fundamentals: 8.5/10 (metadata and technical clean; keyword coverage and font/LCP polish left)
- AI-search readiness: 8/10 (llms.txt, FAQPage, SoftwareApplication, open bots, answer-style FAQ; no AR llms.txt, no "daycare" vocabulary)
- Brand consistency: 7.5/10 (spelling and tokens solid; generic tagline, Title-Case headings, "Yawmy" short form, EN CTA variants, plain OG art)
