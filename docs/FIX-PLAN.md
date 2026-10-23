# Fix plan (consolidated from the whole-project review)

Sources: `docs/reviews/{code-quality,accessibility,security,seo,arabic-copy}.md` (+ `performance.md` when it lands), `docs/RESPONSIVE-{SMALL,LARGE}.md`, per-section `review-2.md`, `docs/REVIEW-QUEUE.md`.
Status of the build today: `astro check` 0 errors; 13 sections wired in EN + AR; responsive passes done (320 → 2560); no critical security findings; axe clean apart from one exempt decorative element.

Legend: **S** < 1 h, **M** 1-3 h, **L** > 3 h. Owner = only the owner can supply it.

## Wave 1 — launch blockers I can fix now (dev)

| # | Fix | Source | Effort |
|---|---|---|---|
| 1 | Make `/preview/*` and `/foundation` dev-only (delete the 13 builder previews; guard `foundation.astro` with `import.meta.env.PROD ? [] : …`) so 28 extra pages stop shipping | SEO, code, security | S |
| 2 | FAQ JSON-LD escape is a no-op (`"<"` -> `"\\u003c"`) | security, code, SEO | S |
| 3 | One `src/config/site.ts`: social URLs, contact (WhatsApp/email), demo video URL, form endpoint status. Buttons/links whose URL is unset are **not rendered in production** (visible in dev with a marker) so no dead `#` / `#watch-demo` links ship. Form error text uses the contact config | a11y, SEO, code | M |
| 4 | Arabic: restore "never" in the parent-fee promise (`pricing.title`, `commitments.cards.charge.title`, `faq.items[1].answer`) and apply the review's 74 paste-ready replacements + glossary (فصل, تجريبي, اشتراك شهري pending owner) | Arabic review | M |
| 5 | Soften absolute security claims to what can be true by default ("including us" lines in `security.en.json:8`, `faq.en.json:30`; AR too); owner must confirm real practices | security | S |
| 6 | Footer social focus ring invisible (1.17:1): use the dark ring on the green footer | a11y | S |
| 7 | Demo dialog opened from the mobile menu loses focus on close: return focus to the menu toggle when the opener is hidden | a11y | S |

## Wave 2 — high value (dev)

| # | Fix | Source | Effort |
|---|---|---|---|
| 8 | `ui/AnimatedImage.astro` (animated WebP + reduced-motion still `<picture>`, optional pause control or loop cap) replacing the 3 copies (Features, CommitmentCard, Pricing/Illustration); give the 4 Security icons stills and trim their 2.3 MB of animated WebP; WCAG 2.2.2 pause/stop for the 14 looping animations | code, a11y, perf | M-L |
| 9 | SEO head: per-locale title/description (EN <= 160, AR shorter, include "برنامج إدارة الحضانات"), Open Graph + Twitter tags, favicon set + manifest (from logo), `robots.txt`, `@astrojs/sitemap` with i18n alternates, JSON-LD Organization / WebSite / SoftwareApplication (no price invented) | SEO | M |
| 10 | Host config files: `public/_headers` + `_redirects` (`/ -> /en/ 301`) for Netlify/Cloudflare; CSP + Vercel variant documented in `docs/security-headers.md` until the host is chosen | security, SEO | S |
| 11 | A11y small fixes: outline / outline-accent hover contrast (>= 4.5:1), "required" cue + status region announcement + autofill-safe too-fast check in the demo form, footer logo focus ring, AR footer labels = header labels, Esc focus in menu, hero h1 sized in rem-based clamp (not vw) | a11y | M |
| 12 | `overflow-wrap: anywhere` on `html` -> `break-word` (anywhere shrinks min-content and can split Arabic words) | code | S |
| 13 | `.prettierrc` printWidth + `.prettierignore` (docs, .claude), then format everything once at the end | code | S |

## Wave 3 — refactors (dev, after wave 2 to avoid conflicts)

| # | Fix | Source | Effort |
|---|---|---|---|
| 14 | `CtaBand` component shared by Setup and FinalCta; BlobCard `stretch` prop replaces the `[&>div]:flex-1` hacks (8 places); use the `final-cta` shape through BlobCard | code | M |
| 15 | Split `DemoModal.astro` (674 lines): script -> `src/scripts/demo-modal.ts`, `DemoField` component | code | M |
| 16 | Single source for nav item ids/labels (Header, Footer, scroll-spy, anchors) | code | S |
| 17 | Remove unused assets/props/i18n keys found by the review; stale `arabic-review.md` files regenerated from JSON | code, Arabic | S |
| 18 | Performance items from `docs/reviews/performance.md` (images, fonts, preloads, `content-visibility`) | perf | M |

## Wave 4 — verification

Rebuild, `astro check`, prettier check, axe in EN + AR, Lighthouse mobile, re-run the 4 widths x 2 locales smoke, update `docs/REVIEW-QUEUE.md` and this file.

## Owner-only items (cannot be fixed in code)

| # | Need | Why it blocks |
|---|---|---|
| O1 | **Form destination** (https endpoint: email service / CRM / Sheet) + the 12 server-side requirements in `docs/reviews/security.md` | without it every production submit shows "not connected yet" |
| O2 | **Privacy notice** (+ terms, contact page) and the consent line near the form | the form collects name + email; legal requirement |
| O3 | **Verify business claims**: encryption/access ("including us"), daily backups, 90-day export + deletion, retention, role access, "never charge parents", FAQ answers 1/3/4/6/8/9/10/12/13 | public claims must be true |
| O4 | Social URLs, WhatsApp/email, demo **video URL** | links/buttons are hidden until supplied |
| O5 | Licensed fonts (Recoleta 400/500/600/700/900, Expo Arabic 400/500/700), logo SVG | typography fidelity; then re-tune hero overlap, nav breakpoint, card heights |
| O6 | Founders' consent for photos/names + approval of their Arabic words; testimonial quotes confirmed real; `[N]` nursery count | real people |
| O7 | Native Arabic review (glossary choices: اشتراك شهري vs رسم; الأستاذ vs السيد; فصول) | final wording |
| O8 | Feature/pricing/commitment GIF licence; replace Lorem ipsum screenshot; Arabic UI screenshots; OG images 1200x630 (EN/AR) | assets |
| O9 | Decisions: sticky header? visible Book a Demo on mobile? hero photo on > 1920 screens? pricing school card shape at 768-1023? | design choices |
| O10 | Commitments section lead (Figma pasted the Security lead) | duplicate copy |
