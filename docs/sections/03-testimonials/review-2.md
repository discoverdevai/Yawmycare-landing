# 03 · Testimonials: Review 2 (real page)

Verdict: **PASS with notes**. No code changes needed. Figma ref: `shots/figma-testimonials.png` (node 1465:5191, 1200 x 494). `astro check` 0 errors.

## Fidelity at 1440 (viewport 1425)
| Item | Figma | Built |
|---|---|---|
| Join to hero | 32px | 32px (936 to 968), single margin (hero `mb-8`, section has no top padding) |
| h2 | 48px, 2 lines | 48px, 2 lines (line-height 1.2 token vs 1.0) |
| Cards 1-2 | 282 x 236, pitch 306 | 282 x 236, pitch 306 |
| Card 3 | 282 x 236 | 282 x 275 (6 lines vs 5, stand-in font; centred like the row) |
| Header to cards | 48px | 49px |
| Gap to next section | 48px | 48px |
| Quote / attribution | 24px / 14px bold coral | same; contrast 11.35:1 and 4.52:1 (AA) |

## Findings
| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | verified | Semantics: `section[aria-labelledby]` to h2, label is an `h3`, `ul > li > blockquote > p + footer > cite`, avatar decorative | none | DOM |
| 2 | nit | 375: label row + 3 stacked cards (343 x 287). Cards are airy (3-line quote in a 287px blob) | accepted; a `relax` aspect on the `testimonial` shape would save about 30px per card but distorts the scallops | screenshot 375 |
| 3 | nit | 768: three cards 214px wide, heights 186 / 209 / 256 (staggered, centred), 16px quotes. No empty area, readable | accepted (mirrors the centred row in Figma); revisit with the licensed font | `[[32,214,186],[270,214,209],[507,214,256]]` |
| 4 | verified | 1024-1279: label above, 3 cards, 24px quotes, no overflow; no horizontal scroll at any width EN and AR | none | measured |
| 5 | verified | RTL: label cell right, cards run right to left, attribution in `<bdi>` ("45 طفلًا" keeps the number), quote marks not mirrored | none | AR screenshot 1440 |
| 6 | owner | `[N]` count removed from the lead; quotes treated as real | restore the count when supplied | queue |

## Remaining
| Item | Who |
|---|---|
| Real nursery count `[N]`; confirm the three quotes and attributions | owner |
| AR: "المعلمات" is feminine-only (consider "المعلمين والمعلمات"); speaker genders in the attributions (9 strings, `arabic-review.md`) | native reviewer |
| Card 3 height with Recoleta | lead (after fonts) |
