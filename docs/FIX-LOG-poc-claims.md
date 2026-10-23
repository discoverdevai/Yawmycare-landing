# Fix log: POC launch, no security/data claims (docs/DECISIONS.md 38, 2026-10-23, not committed)

## Removed
- **Security section unpublished**: `<Security />` and its import removed from `src/pages/[lang]/index.astro`; `{ id: "security" }` removed from `src/config/nav.ts` (header, menu, footer and scroll-spy all read it); `security` labels removed from `header.{en,ar}.json` and `footer.{en,ar}.json`. `Security.astro`, `security/*`, `security.{en,ar}.json`, `i18n/index.ts` wiring and `src/assets/security/*` are kept (the component still imports them), with a one-line "unpublished for the POC" comment. The "parents never pay / one flat fee" promises were already in Pricing and the FAQ, so nothing moved.
- **FAQ** (`faq.{en,ar}.json`): dropped "Who can see our data?", "What happens if we cancel?" (data ownership/export) and "Does it work on older Android?" (unverified device claim). Added "How do we get started?", "How does check-in work?", "What do parents see in the app?" (all from copy backed by app screens). Now 10 questions; FAQPage JSON-LD follows; counter badge unchanged (aria-hidden).
- `roles` owner list: "export your records" removed. `day` daily report: "the report stays searchable" removed.
- `public/llms.txt`: Security line, "security" in the page summary, "Who can see our data?" Q&A removed; two Q&As added.
- Full EN + AR text of every removed claim: `docs/OWNER-CLAIMS.md` section D.

## Page re-balance
Setup ("How it works") is now `tint="light"` with extra bottom padding, so pricing's scalloped top runs over a light band exactly as before (Security used to do this). Order and tints: hero (scallop) / roles plain / day light / features plain / compare sec / setup light / pricing (scallop) / FAQ sec / final CTA + footer (scallop). Nav: Why Yawmy Care, How it works, Pricing, FAQ in the header; menu and footer also list Home and A day at your nursery. Scroll-spy ids (home, day, why, setup, pricing, faq) all exist in both built pages.

## Guard
`scripts/seo-verify.mjs` now fails on encrypt, backup(s)/backed up, retention, "your data stays/is yours/belongs", GDPR, PDPL, compliance, "security", "access by role", AR تشفير / نسخ احتياطي / بياناتك ملك / الأمان / امتثال etc. in page text, JSON-LD and `dist/llms.txt`, and on any `#security` anchor.

## Remaining hits (reviewed)
- "private nurseries" (FAQ, llms.txt, AR «الحضانات الخاصة»): audience description, not a privacy claim.
- Analytics script (`globalPrivacyControl`, doNotTrack) and Cloudflare beacon URL: code, not copy.
- AR «بياناتك» in the demo form confirmation/error ("we received your details", "check your details"): form feedback, not a data promise.
- Legal pages mechanism (Privacy/Terms footer links, demo consent line, `legal.pages.privacy` strings): dormant, appear only when the owner adds `src/content/legal/*.md`; not rendered now.
- `public/og/*.png`: art uses tagline + product screens only, no change needed (no regeneration).
- `src/assets/security/*` and `shapes/security.svg`: not deleted because `Security.astro` (kept per decision 38) and `BlobCard` still reference them; they are not in the built output.

## Restore
See the "Restore" paragraph under OWNER-CLAIMS.md section D.

## Checks
`astro check` 0 errors; `check-i18n-parity` OK; one `astro build`; `seo-verify` all ok. EN + AR at 390/375 and 1440 inspected around How it works -> Pricing: no gap, scallop visible, no horizontal overflow. Full-page height at 375: EN 12,096px (was 14,588), AR 12,212px (was 14,753). 1440: EN 10,620, AR 10,903.
