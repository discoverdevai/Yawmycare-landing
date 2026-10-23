# 08 Commitments: Review

**Verdict: PASS with notes.** `astro check`: 0 errors. Checked in `/en/preview/commitments/` and `/ar/preview/commitments/` at 1440 / 1024 / 768 / 375: no horizontal scroll (scrollWidth = clientWidth in each), icons load, RTL columns swap, title never overlaps the icon.

## Needs owner
- **Confirm the response time.** Figma says "within [X] working hours". Built as "within one working day" / "خلال يوم عمل واحد". Single key to edit: `cards.human.body` in `commitments.en.json` and `.ar.json`.
- **The section lead is the Security lead pasted in** ("built with security at its core…"). It does not introduce "five things we will not do". Kept verbatim (brand casing fixed); suggest new copy.
- Card 3 title colour is `#474700` in Figma, which is not a token. Snapped to `primary-text` (`#334722`).

## Wave direction
Confirmed by render: 07 up, **08 down**, 09 up (top 80px of each frame compared at 2x). Matches spec §8.1. Used `wave="down" shadow`.

## Matches Figma (1440)
Wave + h2 + lead rhythm (58 / 48), 588 × 247 blobs in a 2-up grid with 24 gap, 40 row gap, wide 1200 blob between, peach / green / wide / green / peach order, 32px bold titles in accent-text / primary-text, 24px body (wide: Medium), 110px illustration at the top-end corner of each card.

## Deviations
| Deviation | Why |
|---|---|
| Padding and illustration size are percentages / `cqw` of the card (58 / 588 ≈ 9.86%) | Keeps Figma proportions between the breakpoints where the blob is still shown |
| Below 768 one column; 768-1023 two-up on the rounded fallback card (cards 340px) | BlobCard shows the SVG from 441px (small) / 900px (wide) of card width; scaling the blob down turns the scallops to mush |
| Below 441px of card width the illustration (72px) sits in the flow above the title | Figma's corner placement would poke out of a fallback card |
| Illustrations are `<img src>` of pre-built 220px animated WebP, not `<Image>` | Re-encoding through sharp made the animated files bigger (597 KB vs 539 KB for one) |
| Card heights in a row can differ at 768/1024 (each card keeps the blob aspect ratio and grows with its text) | Same behaviour as the kit's BlobCard; the 1440 layout is equal height |
| Stray `#F1F4E6` fill on the green text frames not reproduced | Same colour as the blob fill, invisible |

## Assets
5 animated GIFs (4.14 MB total, 375 × 375, 50-180 frames, exported by Figma with a `.png` extension) kept in `assets-original/`. `optimise-illustrations.mjs` writes `src/assets/commitments/<name>.webp` (220px, every 3rd frame, about 11 fps, q60) and `<name>-still.webp`: 1.53 MB animated total. Reduced motion: `<picture><source media="(prefers-reduced-motion: reduce)">` shows the still. Licence of the illustrations: see DECISIONS #11 (same family as Section 05).

## Open / notes
- Console showed one `500` resource error with no matching request afterwards (probably a stale entry from an earlier iteration of the page); no failing request found on a fresh load.
- Dev only: the still `srcset` path contains a space ("Mohamed Ali") so reduced-motion stills would not load on this machine in dev; the built asset path is hashed and has no spaces.
- Copy repeats claims made in Pricing (flat fee, no commission). Content, not a build issue.

## Needs lead
None. Page wiring: `<Commitments locale={locale} />` after Security, before Pricing.
