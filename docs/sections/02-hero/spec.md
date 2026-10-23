# 02 · Hero — Spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Hero.astro` (`locale` prop), `<section id="home" aria-labelledby="hero-title">`, single `h1` |
| Kit | `Container`, `Button` (primary / outline), `WaveDivider` (up, `shadow="glow"`, a new optional value) |
| i18n | `sections.hero`: `title` (`*word*` marks highlight words), `lead`, `ctaPrimary`, `ctaWatch`, `imageAlt` |
| Asset | `src/assets/hero/hero-children.webp` (1220×1136 alpha, Figma crop of the 1385×1136 original kept in `docs/sections/02-hero/assets-original/`) → `<Picture>` avif + webp, widths 480/656/960/1220 |
| CTA contract | primary `href="#demo" data-demo-open`; watch `href="#watch-demo"` + TODO |

## Layout
| Width | Behaviour |
|---|---|
| >= 1024 | Photo absolute, inline-end edge, width `clamp(416px, 45.5vw, 656px)`, bottom = wave-h − 16. Text max-width `min(792px, …)` stops 128px inside the photo box. Min-height = photo + 86 + wave. Text column keeps wave-h + 32 clearance |
| < 1024 | Stacked: text, photo (max 480px, centred) behind the wave. Buttons full width below 640 |
| RTL | Logical layout (`inset-inline-end`) mirrors; the photo is not flipped |

## Acceptance
- [x] 1440 EN: h1 at (120, 262), photo at (784, 266) 655×610, hero 756px
- [x] LCP image: eager, fetchpriority high, explicit size, AVIF/WebP
- [x] h1 highlight words use `text-accent-display`
- [x] No horizontal scroll 375–1440, EN + AR
