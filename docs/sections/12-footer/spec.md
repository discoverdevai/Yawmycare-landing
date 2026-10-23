# 12 · Final CTA + Footer — Spec

## Components
| File | Role |
|---|---|
| `src/components/sections/FinalCta.astro` | `<section id="contact" aria-labelledby="final-cta-title">`; `locale` prop only |
| `src/components/sections/Footer.astro` | `<footer>` landmark; `locale` prop only; goes in BaseLayout's `footer` slot after `<main>` |
| `src/assets/footer/final-cta.svg` | Blob normalised to 1200x910 |
| `src/pages/[lang]/preview/footer.astro` | Preview (both) |

Kit used: `Container`, `SectionHeader` (`align=center tone=on-green`, size h2 48), `Button` (`on-green`, `on-green-outline`, `social-footer`), `WaveDivider direction=up` (`bg-primary-bg`, no shadow), `Logo size=footer`.

## Layout rules
| Rule | Value |
|---|---|
| Overlap | Footer has `-mt-(--wave-h)`; CTA bottom padding = `--wave-h + 2rem`. The blob continues under the footer wave (76 / 48 / 32) |
| Blob | Container query on the band: SVG (910 tall, clipped) from 900px, rounded card below |
| CTA padding | 88 top / 58 sides at >=900 band width; 48 / 24-40 below |
| Buttons | Row from 560px band width (386 wide from 900), stacked full width below |
| Footer column | wave -> 8px -> logo -> 12 -> tagline -> 24 (AR 32) -> nav -> 24 -> social -> 52 -> wordmark |
| Nav | `<nav aria-label>` with `<ul>`; wraps and centres; links `min-h-11` (32 at >=1024) |
| Wordmark | `aria-hidden`, `lang=en dir=ltr`, CSS uppercase, `text-wordmark`, `clamp(40px, 11.8vw, 170px)`, `-mb-[0.16em]`, clipped by the footer |

## i18n (`sections.footer`)
`cta.title`, `cta.lead`, `navLabel`, `socialLabel`, `wordmark`, `links.{home,day,why,setup,security,commitments,pricing,founders,faq}`. Shared: `brand.tagline`, `cta.bookDemo`, `cta.watchDemo`, `social.*`, `brand.logoAlt`.

## Hooks into other sections
`#demo` (modal open, via `data-demo-open`), `#watch-demo`, nav anchors `#home #day #why #setup #security #commitments #pricing #founders #faq` (owned by the other sections), `#contact` (this section).

## Acceptance
- [x] 1440 EN matches Figma (logo, nav, social, wordmark clip, wave over blob)
- [x] AR mirrors (buttons, nav, social) with Latin wordmark
- [x] No horizontal scroll at 1440 / 1024 / 768 / 375
- [x] No raw hex, no hard-coded strings, logical properties only
- [x] `astro check` 0 errors
