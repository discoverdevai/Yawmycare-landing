# 08 Commitments: Spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Commitments.astro` (prop `locale`), helper `commitments/CommitmentCard.astro` |
| Section | `<Section id="commitments" headingId="commitments-title" wave="down" shadow>`; `SectionHeader` gives the single h2 |
| Cards | `<ul>` of five `<li>` `BlobCard`s (`commitment-peach`, `-green`, `-wide`); each title is an `h3` |
| i18n | `src/i18n/sections/commitments.{en,ar}.json`: `title`, `lead`, `cards.{charge,dataYours,arabic,human,dataStays}.{title,body}` |
| Response time | one key: `cards.human.body` (EN "…within one working day.", AR "…خلال يوم عمل واحد.") |
| Assets | `src/assets/commitments/{parents,data-yours,arabic,human,data-stays}[-still].webp`, built by `optimise-illustrations.mjs` from `assets-original/*.gif` |
| Illustrations | decorative (`alt=""`, `aria-hidden`); animated WebP, `<picture>` swaps to the still under `prefers-reduced-motion` |

## Layout
| Width | Layout |
|---|---|
| ≥1024 | 2-up grid, gap 24 / row gap 40; wide card spans both. Blob shapes (card ≥441px; wide ≥900px) |
| 768 | one column, cards full width (704px): blob shapes show |
| 375 | one column, 343px cards: BlobCard falls back to the rounded card; illustration (72px) moves into the flow above the title |
| Scaling | padding and illustration use container-query units (`%` / `cqw`) so Figma's 58px / 110px proportions hold between breakpoints |
| RTL | grid follows `dir` (columns swap); illustration offset uses `end-`; shapes not mirrored (kit rule) |

## Acceptance
- 0 `astro check` errors; no console errors; no horizontal scroll at 1440/1024/768/375 in EN and AR.
- Matches Figma at 1440: card positions, 58px padding, 110px icon at the top-end corner, title and body sizes.
- Title never overlaps the icon; longer Arabic text grows the card.
- Reduced motion shows the still frame.
