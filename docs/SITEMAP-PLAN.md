# Site architecture and sitemap plan

Today: two real URLs (`/en/`, `/ar/`) + `/` redirect, one long page with 9 anchors. That is right for a landing page; what is missing is the trust/legal/utility layer and a plan for growth.

## Phase now (this build)
| URL | Purpose | Status | Indexed | In sitemap |
|---|---|---|---|---|
| `/` | 301 -> `/en/` (Cloudflare `_redirects`), meta-refresh fallback | done | no | no |
| `/en/`, `/ar/` | the landing page (hreflang pair + x-default) | done | yes | yes |
| `/en/privacy/`, `/ar/privacy/` | privacy notice (the demo form collects name/phone) | **built, data-driven, dormant**: route exists only when the owner supplies `src/content/legal/privacy.{en,ar}.md` (see that folder's README); until then no route, no link | yes when published | yes when published |
| `/en/terms/`, `/ar/terms/` | terms of use | built, same mechanism, dormant | yes when published | yes when published |
| `/en/contact/`, `/ar/contact/` | contact (WhatsApp/phone/email per region, address) | built, dormant: route only when at least one region WhatsApp/phone or the general WhatsApp/email is configured | yes when published | yes when published |
| `/404.html` | bilingual not-found page with links to /en/ and /ar/ + language detection by path | **done** (`dist/404.html`, `not_found_handling: "404-page"` in `wrangler.jsonc`) | no (`noindex`) | no |
| `/thank-you/` | NOT needed (dialog shows success inline; avoids a conversion page we do not need) | skip | - | - |

Rules: legal/contact text is NEVER invented by us. No page is generated, linked or put in the sitemap until its content exists; footer and form show the links automatically when it does. All pages share the same header/footer, `hreflang` pairs, canonical, OG tags, JSON-LD (`WebPage`, `BreadcrumbList` on sub-pages).

## Phase next (when content exists)
| URL | Why | Trigger |
|---|---|---|
| `/en/customers/`, `/ar/customers/` | case studies from named nurseries | first 3 consented customers |
| `/en/pricing/`, `/ar/pricing/` | dedicated pricing page per region once prices are real | prices decided |
| `/en/eg/`, `/en/sa/`, `/en/us/` (+ar) | region pages ONLY if price/contact/legal content really differs (avoid duplicate content; then add region hreflang `ar-EG`, `ar-SA`, `en-US`) | regional content differs |
| `/en/blog/`, `/ar/blog/` | SEO + AI-search guides (nursery management, parent communication) | content plan |
| `/en/demo/`, `/ar/demo/` | full-page booking (for ads/QR/WhatsApp links) reusing the dialog form | paid traffic starts |
| `/en/security/`, `/ar/security/` | trust page: data location, retention, roles (verified facts only) | owner confirms facts |

## Sitemap and crawl
- `@astrojs/sitemap` (done): `sitemap-index.xml` + `sitemap-0.xml` with `xhtml:link` alternates; excludes `/` and `404`; legal/contact pages included automatically when they exist; `lastmod` = the build date (all URLs); `/` and `/404` excluded. A page that exists in one locale only gets a sitemap entry without an alternate (and `hreflang` only for that locale).
- `robots.txt` (done): allow all + AI crawlers, sitemap URL. `llms.txt` (static, hand-maintained): when privacy/terms/contact go live, add their `https://yawmycare.com/<lang>/<slug>/` URLs to its link list by hand (it is not generated). Pages are generated from `src/config/pages.ts`; every consumer (routes, footer, demo consent line, sitemap) reads that one module.
- Search Console + Bing Webmaster: submit `https://yawmycare.com/sitemap-index.xml` after launch (owner task).
- Internal links: footer (legal, contact), form (privacy), FAQ answers link to `#pricing`/`#security`.
- Canonical host: `https://yawmycare.com` (apex); redirect `www` -> apex at Cloudflare; HTTP -> HTTPS automatic.

## How the optional pages are wired (done)
- `src/config/pages.ts`: globs `src/content/legal/*.md` (`?raw`), exposes `pageLocales/hasPage/pageLinks/pagePaths`. Routes `src/pages/[lang]/{privacy,terms,contact}.astro` use `pagePaths()` so no file = no route.
- `PageLayout.astro` = BaseLayout + Header/Footer (anchors become `/<lang>/#section`, language switch goes to the same page or the other landing page) + breadcrumb; `PageJsonLd.astro` = WebPage/ContactPage + BreadcrumbList.
- Footer shows Privacy / Terms / Contact only for existing pages; the demo dialog shows the consent line only when the privacy page exists in that locale.
- To add a new utility page: add the slug to `PageSlug`, a route with `pagePaths(slug)`, a footer label under `legal` in en/ar.json.
