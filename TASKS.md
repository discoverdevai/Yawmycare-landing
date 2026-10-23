# Yawmy Care Landing Page — Task Tracker

Each content section (01–13) runs the same pipeline:
`[ ] Audit → [ ] Spec → [ ] Build EN → [ ] Build AR/RTL → [ ] Responsive → [ ] Review PASS → [ ] Enhance → [ ] Owner sign-off`

The planner appends section-specific build tasks under each heading when it writes `spec.md`.

---

## Decisions needed before / during Section 00
- [ ] Confirm stack: Astro 5 + Tailwind v4 (static) — or Next.js if your team prefers React
- [ ] Provide licensed web fonts: Recoleta (EN), Expo Arabic (AR)
- [ ] Arabic copy for new sections (03, 04, 05, 08, 09, 10, 11): you supply it, or we draft and you approve
- [ ] Demo-form destination (email / CRM / Google Sheet / other) + demo video URL
- [ ] Keep or drop old "About Yawmy" + "Core Features" sections
- [ ] Hosting target (Vercel / Netlify / Cloudflare Pages)

## 00 · Foundation
Spec: `docs/sections/00-foundation/spec.md` (audit done, spec done). Nothing blocks the build. Owner decisions needed at sign-off: Q1 contrast, Q3 off-token colours, Q13 mobile blob fallback.

Already built:
- [x] Scaffold project (Astro 7 + Tailwind 4 + TypeScript, prettier)
- [x] i18n: `/en` + `/ar` routes, `lang`/`dir`, `en.json` / `ar.json`, hreflang
- [x] `BaseLayout`, `ui/Icon` (14 currentColor icons), `ui/WaveDivider` (fixed 76px), showcase page

Build tasks (each ≤ ~1h, each adds its block to `/[lang]/foundation`):
- [ ] F1 · Design tokens: `@theme static`, `stroke-gray`, 6 provisional `prov-*` colours, type scale (EN Recoleta / AR Expo Arabic, AR nav 20 vs EN 16), section rhythm, radii
- [ ] F2 · Fonts: drop-in licensed WOFF2 detection, open-licence stand-ins (Fraunces, IBM Plex Sans Arabic), `font-display: swap`, subsetting, preload, per-locale `:lang(ar)` stack
- [ ] F3 · Layout primitives: `Container` (1200 / wide 1280), `Section` (wave, 58, content rhythm), responsive `WaveDivider` (76/48/32), `SectionHeader` (h2 + lead, centred variant, `headingLevel`)
- [ ] F4 · `ui/Button`: primary, outline, on-green, on-green outline, language icon button, social bar + footer (40px visual, 44px hit), own hover/active/focus/disabled states
- [ ] F5 · Blob shapes: move 14 SVGs to `src/assets/shapes`, single path, colours as CSS variables
- [ ] F6 · `ui/BlobCard`: native SVG by container width, simplified rounded-card fallback below 75% of native
- [ ] F7 · `ui/Logo` (PNG with explicit size + srcset; SVG pending) and footer wordmark decision
- [ ] F8 · Showcase and review matrix: EN + AR at 1440 / 1024 / 768 / 375
- [ ] F9 · Quality gates: `astro check`, `astro build`, no hard-coded colours or strings, no `left/right`, showcase a11y
- [ ] Review PASS · [ ] Sign-off

## 01 · Top bar + Header/Nav
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive (mobile menu) · [ ] Review · [ ] Enhance · [ ] Sign-off

## 02 · Hero
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance (LCP image) · [ ] Sign-off

## 03 · Testimonials
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 04 · A day at your nursery (timeline)
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 05 · What no other nursery app in MENA has
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 06 · Set up in under 20 minutes (+ CTA band)
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 07 · Security
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 08 · Five commitments
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 09 · Pricing + First-10 partner
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 10 · Founders ("Why we built this?")
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 11 · FAQ
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance (FAQPage schema) · [ ] Sign-off

## 12 · Final CTA + Footer
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Responsive · [ ] Review · [ ] Enhance · [ ] Sign-off

## 13 · Book a Demo modal + form
- [ ] Audit · [ ] Spec · [ ] Build EN · [ ] Build AR · [ ] Validation + success/error states · [ ] Endpoint + spam protection · [ ] Security review · [ ] Review · [ ] Enhance (form CRO) · [ ] Sign-off

## 14 · Launch hardening
- [ ] Full-page a11y audit (accessibility-specialist)
- [ ] Core Web Vitals pass (performance-engineer): LCP < 2.5s, CLS < 0.1 on mobile
- [ ] SEO: meta, OG images (EN/AR), sitemap, robots, JSON-LD
- [ ] Analytics events on all CTAs + form submit
- [ ] Final `/code-review`
- [ ] Deploy + smoke test both locales
