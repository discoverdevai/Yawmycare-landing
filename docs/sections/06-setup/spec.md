# 06 · Setup + CTA band: spec

## Components
| File | Role |
|---|---|
| `src/components/sections/Setup.astro` | the section, prop `locale` |
| `src/components/sections/setup/ConnectorLines.astro` | desktop dashed rail, one `<path>`, stroke = `--color-stroke-green` |
| Kit used | `Section` (`id="setup"`, `wave="down"`, `shadow`, `gap="loose"`), `SectionHeader` (h2, then h3 band: `align="center" tone="on-green" size="band"`), `BlobCard` (`step`, `step-number`, `cta-band`), `Button` (`on-green`, `on-green-outline`) |
| Kit additions | `BlobCard`: optional `fill` (token name) to override a shape's fill. `shapes/cta-band.svg`: restored the `rotate(-90)` group |

## i18n (`setup.{en,ar}.json`, same keys and array length)
`title`, `lead`, `steps[4].{title,body}`, `band.{title,lead}`. Button labels come from the shared `cta.bookDemo` / `cta.watchDemo`.

## Markup
`section#setup[aria-labelledby=setup-title]` > h2 + lead > `ol[role=list]` > 4 `li` (number circle `aria-hidden`, h3 title, body) > band (h3 title, lead, two links `#book-demo`, `#watch-demo`; the lead wires the real targets).

## Responsive
| Width | Layout |
|---|---|
| >= 1024 | 4 columns (grid-cols-4, gap 24), circle centred above each card, rail from first to last column centre (`calc` from the grid), drops stretch with the columns, dot (6px CSS circle) at each drop's foot. Title reserves 2 lines |
| 768 | 1 column: 48px circle column + card (max 288px) on the start side, dashed vertical line through the circles (`li::after`, token colour). Band = simplified rounded card (container < 900px), buttons side by side from 640px |
| 375 | same as 768; buttons stacked full width |

## RTL
Grid/flex order follows `dir`: step 1 on the right, vertical line on the right, buttons swap sides. Rail is symmetric. Digits stay Western. Blobs are not mirrored.

## Acceptance
- [x] Matches Figma 1575:41867 at 1440 (EN) and 1434:3912 layout (AR)
- [x] One h2; `<ol>`; band title is an h3
- [x] No raw hex, no left/right
- [x] No horizontal scroll at 1440/1024/768/375
- [x] Text on the band >= 4.5:1 (review.md)
