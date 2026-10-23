# 04 · A day at your nursery: Review 2 (real page)

Verdict: **PASS with notes** (after fixes). Figma ref: `shots/figma-day.png` (node 1532:31922, 1440 x 3220). `astro check` 0 errors.

## Fidelity at 1440 (viewport 1425)
| Item | Figma | Built |
|---|---|---|
| Cards | 8 x 588 x 695, column pitch 612 | same |
| **Row pitch** | **743 (48px gap)** | was 719 (24px), **fixed** to 743 |
| Section height | 3209 | 3219 (+10: h2 line-height 1.2 vs 1.0) |
| h3 / body | 32px / 24px | same |
| Stroke / radius | 4px dashed / 50px | same; green at 80% (no token for `#BAC9A8`) |
| Time labels | "14:00PM", "16:30PM" (Figma typos) | "2:00 PM", "4:30 PM" |
| Picture compositions | | match (cut-off phones, hand photo, notices stack) |

## Findings
| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | Row gap was 24px, Figma 48px (columns 24px) | `lg:gap-y-12` on the grid (below 1024 stays 24) | row tops 295 / 1038 / 1781 / 2524 |
| 2 | verified | Mobile 375: one column, cards 343 wide x 463-509 tall, compositions scale with the card (`--u`), text 18px, no overflow; lazy images load on scroll | none | screenshots |
| 3 | verified | 768: two columns of 332px cards (534-545 tall); titles wrap to 2 lines ("8:15 AM - / Room overview"); no empty area | accepted | screenshot |
| 4 | verified | Semantics: `section[aria-labelledby=day-heading]`, h2, 7 `h3` in `ol[aria-label]`, `<time datetime>` + `<bdi>`, one alt per card, decorative layers `alt=""`, lazy + explicit size | none | DOM |
| 5 | verified | RTL: columns swap (first card on the right), compositions mirror, screens never flipped, "7:30 ص - وصول الطفل" reads correctly | none | AR screenshot 1440 |
| 6 | verified | No animation in the section (reduced motion not applicable) | none | grep |
| 7 | should | AR "Photos" body said "صورة ابنها" (masculine child); "Daily report" said "يصل كل ولي أمر إشعار" (missing "إلى") | "صورة طفلها"; "يصل إلى كل ولي أمر إشعار بلغته" | `day.ar.json` |
| 8 | owner | The 8:00 PM screenshot contains "Lorem ipsum" bubbles (confirmed in `connected-hand.webp`); no Arabic UI screens; mock date "March 2026" | none | image |

## Remaining
| Item | Who |
|---|---|
| Replace the Lorem ipsum chat screenshot; supply Arabic app screens | owner |
| Native review of the 32 AR values (2 reworded, see `arabic-review.md`) | native reviewer |
