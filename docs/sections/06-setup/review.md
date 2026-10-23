# 06 · Setup + CTA band: review

**Verdict: PASS with notes.** `astro check`: 0 errors. Checked at 1440 / 1024 / 768 / 375 in `/en/preview/setup/` and `/ar/preview/setup/` (1440 EN+AR, 1024 EN, 768 EN, 375 AR visually; scrollWidth equals viewport at every width tested; no console errors).

## Matches Figma
- Wave down + header (48/24, gap 58), rail with four drops and dots, circles centred over cards, four 282px step blobs, green band with title, lead and two 386px pill buttons.
- AR: step order, circles, vertical/horizontal lines and button sides mirror like frame `1434:3912`.

## Contrast decision (measured)
| Pair | Ratio | Verdict |
|---|---|---|
| white on `primary-cta` #76945C | 3.38 | 40px title passes (large); 18px bold button label fails 4.5 |
| `primary-bg-light` on `primary-cta` | 3.23 | lead fails at < 24px |
| white on `primary-cta-strong` #637C4D | 4.61 | passes |
| `primary-bg-light` on `primary-cta-strong` | 4.40 | fails by 0.1, so the lead uses `ink-inverse` (white) |
| `primary-text` on `primary-bg-light` (Book a Demo) | 9.64 | passes |
| focus ring `primary-bg-light` on strong band | 4.40 | passes 3:1 non-text |

**Decision:** the band fill is `primary-cta-strong` (new `BlobCard fill` prop), the lead is white (own `<p>`, not the SectionHeader lead which is fixed to `primary-bg-light`). Title and buttons stay as in Figma. The band is visibly darker than Figma's `#76945C`; to revert, drop `fill="primary-cta-strong"` and accept that the 18px labels and lead fail AA.

## Deviations from Figma
| Deviation | Why |
|---|---|
| Band fill darker, lead white (above) | AA contrast |
| Fonts are the stand-ins (Fraunces/Readex), so a body line wraps once more in some cards | decision #9 |
| Title balanced (`text-balance`) and "·" glued to the preceding word (NBSP) | no separator at a line end |
| Below 1024: single column with vertical dashed line; band becomes a rounded card below 900px | no mobile frames; spec §8.4 option A |
| Dashes 1.5px non-scaling stroke, dots drawn in CSS (circles must not stretch) | single-path SVG that stretches to the grid |
| Step 1 bodies in AR are the longer frame copy; cards grow in height with content | BlobCard behaviour |
| Cards at 1024 are 222px wide (blob shown at 79%) | grid maths |

## Open items / Needs lead
- `src/assets/shapes/final-cta.svg` has the same missing `rotate(-90)` as cta-band had (Section 12 will hit it): wrap the path in `<g transform="translate(0 910) rotate(-90)">`.
- Button kit: `on-green-outline` hover (`ink-inverse/15` overlay) drops white label contrast on the strong band to 3.46:1 (2.90 when pressed). Hover-only, but consider a darker hover (e.g. `bg-primary-cta-hover`).
- CTA hrefs are placeholders `#book-demo` (open the modal, Section 13) and `#watch-demo` (needs the video URL).
- Native review of 5 drafted Arabic strings (`arabic-review.md`).
- Connector dashes (`stroke-green` on cream = 1.85:1) are decorative; the numbering is carried by the `<ol>` and digits.
- Tablet (768) leaves the right half of the screen empty in the single-column layout; a 2x2 grid would need a different line design.
- The `preview/setup.astro` route is for review only (lead deletes it).
