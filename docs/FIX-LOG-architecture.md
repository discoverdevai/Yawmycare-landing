# Fix log: site architecture (2026-10-23)

Built per docs/SITEMAP-PLAN.md "Phase now".

- New: `src/config/pages.ts`, `src/lib/markdown.ts` (escape-first renderer, link scheme allow-list), `src/layouts/PageLayout.astro`, `src/components/seo/PageJsonLd.astro`, routes `[lang]/{privacy,terms,contact}.astro`, `404.astro`, `src/content/legal/README.md`. i18n keys `legal`, `contactPage`, `notFound` (en + ar, parity OK; Arabic wording needs native review).
- Edited: `Header.astro` (optional `anchorBase`, `switchTo` props; landing output unchanged), `Footer.astro` (`anchorBase`, legal nav), `DemoModal.astro` (consent line when privacy exists), `BaseLayout.astro` (`alternateLocales`; no canonical/hreflang when noindex), `astro.config.mjs` (sitemap filter + lastmod), `wrangler.jsonc` (`not_found_handling`).
- Tested state A (no content): build emits /en/, /ar/, / and 404.html only; no footer links, no consent line; sitemap has the 2 landing URLs. State B (temporary privacy en+ar, terms en, fake env contacts): privacy en/ar, terms en, contact en/ar built; footer + consent line appear; sitemap lists them with alternates only where both locales exist; terms-en had only an `en` hreflang + x-default; HTML in markdown escaped, `javascript:` links dropped. All temporary files removed and state A re-verified.
- Notes: 404 has two h1 (one per language block); the 404 script is a bundled module (CSP-safe, no new inline hash). `astro preview` does not serve 404.html on unknown paths; Workers assets will. `lastmod` is the build date for every URL.
