# 03 · Testimonials — Review

**Verdict: PASS with notes.** Checked at 1440 / 1024 / 768 / 375 in `/en/preview/testimonials/` and `/ar/preview/testimonials/`: no horizontal scroll, no console errors, `astro check` 0 errors.

## Matches Figma
- h2, lead, label, three quotes and attributions; card positions at 1440 (426 / 732 / 1038, 282 x 236); header to cards 48px; quote icon 67px; accent profile badges; blob shape from the kit.
- Semantics: `section#testimonials` labelled by its h2, `ul > li > blockquote > p + footer > cite`, label as `h3`.

## Copy decisions (DECISIONS-style)
| # | Figma | Built | Why | Undo |
|---|---|---|---|---|
| 1 | "What Owners. Teachers, Parents Says :" | "What owners, teachers and parents say" | Typo; owner brief | `testimonials.en.json` `label` |
| 2 | Lead contains `[N]` ("in [N] nurseries") | Number removed: "in nurseries in Egypt, ..." | Unfilled placeholder; I will not invent a count | Restore when the owner supplies N (both JSONs) |
| 3 | Stray double space in quote 1 | Single space | Typo | JSON |
| 4 | Straight quotes | Typographic quotes “ ” in the strings | Typographic polish, visible quotes kept as in Figma | JSON |
| 5 | Quotes/people | Used as given in Figma; no invented testimonials | Brief | n/a |

## Deviations
| Item | Reason |
|---|---|
| Below 1280 the label moves to its own row above the cards | 4-up grid at 1024 gives 222px cards with 174px text: too narrow for 24px quotes |
| Card 3 renders 6 lines (275px tall) vs 5 in Figma | Stand-in font (Fraunces) is wider than Recoleta; cards grow with content and are centred in the row. Re-check once licensed fonts are in |
| At 768 the 3 cards are about 218px wide with 18px quotes | No tablet design; kept 3 columns, cards stagger in height |
| At 375 each card is full width (343 x 287) | `BlobCard` keeps the 282:236 ratio and shows the SVG at >= 212px, so single cards are tall; acceptable, but a compact fallback could be added to the kit |
| Attribution contrast | 4.52:1, passes AA; no change |

## Open items / Needs lead
- Hero → testimonials join: this section has `pt-8` (32px, Figma). The hero's own `mb-(--section-gap)` (48 at lg) would add to it; the hero should end with `mb-0` or the lead should check the join in `index.astro`.
- Owner: supply the real number for `[N]` if wanted (decision #2).
- Native review of 9 Arabic strings (`arabic-review.md`), including speaker genders.
- Verify the three quotes are real and attributable before launch (brief: treated as real).
- Preview route `src/pages/[lang]/preview/testimonials.astro` to be deleted before launch.
