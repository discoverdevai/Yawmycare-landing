# 09 Pricing: spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Pricing.astro` (`locale` prop). `Section id="pricing" wave="up" shadow`, `SectionHeader` h2, three `BlobCard`s (`pricing`, `intl-school`, `first10`), `Button` |
| Kit addition | `Button` variant `outline-accent` (2px `accent` border, `accent-text`, no icon, hover `accent/10`) |
| i18n | `sections.pricing`: `title`, `plan.{title,itemsLabel,items[5]}`, `school.{title[4 {text,em}],body,cta}`, `partner.{title[4],body,cta}`. "Book a Demo" reuses `cta.bookDemo` |
| CTAs | all three `<a href="#demo" data-demo-open>` |
| Images | animated WebP in `src/assets/pricing/` as `<img>` (astro:assets would flatten animation), decorative `alt=""`, `loading="lazy"` |
| Layout >= 1024 | pricing card row (text, illustration); below: grid `384fr / 792fr`, illustration of first10 absolute at the inline end |
| 768 | pricing card = rounded fallback, row layout; two equal columns below it |
| 375 | single column, illustration above text |
| RTL | logical props only; grid and flex mirror, blobs and illustrations are not mirrored |

Acceptance: no raw hex in component; no horizontal scroll at 375; all headings h3 under the section h2; focus ring on buttons; `astro check` clean.
