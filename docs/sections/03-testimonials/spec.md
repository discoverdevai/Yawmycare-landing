# 03 · Testimonials — Spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Testimonials.astro` (`locale` prop only), `<Section id="testimonials" headingId="testimonials-title">` |
| Kit used | `Section`, `SectionHeader` (h2 + lead), `BlobCard as="li" shape="testimonial"`, `Icon` (`quote`, `profile`) |
| Markup | `ul > li(BlobCard) > blockquote > p + footer > cite`; label is an `h3` |
| i18n | `sections.testimonials`: `title`, `lead`, `label`, `items[3]` each `{quote, attribution}` |
| Wave | none; section has `pt-8` (32px) to match the one-off hero → testimonials join |

## Layout
| Width | Layout |
|---|---|
| >= 1280 | 4-col grid (282 + 24 gap at 1440): label cell, then 3 cards; cards vertically centred |
| 1024-1279 | label row (icon + h3 side by side) above 3 cards (3 cols); quote 24px |
| 768-1023 | same, 3 cols (about 218px each), quote 18px |
| < 768 | label row, then cards stacked 1 col (BlobCard keeps its 282:236 ratio, so cards are tall) |

RTL: grid/flex order follows `dir` (label cell on the right); icons and blobs are not mirrored; attribution wrapped in `<bdi>`.

## Acceptance
- h2 / lead / label / quotes / attributions match Figma EN (with the copy fixes in `review.md`).
- Cards 282 x 236 at 1440 at x = 426 / 732 / 1038 (Figma 306 / 612 / 918 + 120).
- No horizontal scroll at 375 / 768 / 1024 / 1440, EN and AR.
- `astro check` 0 errors; no console errors.
