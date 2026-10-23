# 02 · Hero: Review 2 (real page)

Verdict: **PASS with notes** (after fixes). Figma ref: `shots/figma-hero-top.png` (node 1457:3898, 1440 x 937). `astro check` 0 errors.

## Fidelity at 1440 (viewport 1425 + 15px scrollbar, so x is 7.5px less than Figma)
| Item | Figma | Built | Note |
|---|---|---|---|
| h1 origin | (120, 262) | (119.5, 262) | match |
| h1 size | 58px, 3 lines (225px) | 58px, **4 lines (302px)** | stand-in Fraunces is wider; sole cause of lead and buttons sitting 77px lower |
| lead width, buttons | 565, 282x56 + 274x56 | 565, 282x56 + 291x56 | font width |
| photo | (784, 266) 656x611 | (777.5, 266) 655x610 | match |
| hero height | 757 | 756 | match |
| join to testimonials | 32px | 32px (936 to 968) | verified, no double margin |
| coral | `#E2725B` | `#E06950` | DECISIONS #2 (3.22:1, large text) |

## Findings
| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | blocker | H1 collided with the girl's hair at 1024-1440 (4 lines, "from day" over the curls); at 1024 the outline button also sat on her sweater | Fluid headline `clamp(44px, 4.03vw, 58px)` (EN) / `clamp(46px, 4.3vw, 62px)` (AR) through the `--fs-hero` token (>= 1024 only). Text column capped 72px inside the photo box (`--hero-overlap`, was 128). Buttons capped 56px narrower so they wrap rather than touch the sweater. Result: 1280 = 3 lines, 1024 = 4 lines with clear space | screenshots 1024 / 1280 / 1440 EN, 1024 / 1440 AR |
| 2 | should | h1 4 lines vs 3 in Figma | font width only. With licensed Recoleta try `--hero-overlap: 128px` to get the 3-line layout back | TODO in `Hero.astro` |
| 3 | verified | Exactly one `h1` on the whole page; `section#home[aria-labelledby=hero-title]`; LCP image eager + `fetchpriority=high`, explicit size, AVIF + WebP; alt localised; no motion | none | DOM check |
| 4 | verified | 768: 3-line h1, photo below, no empty area. 375: stacked, buttons full width. No horizontal scroll at 375 / 768 / 1024 / 1280 / 1440 EN and AR; buttons 56px tall | none | `scrollWidth == clientWidth` |
| 5 | verified | RTL: text right, photo left and not flipped, h1 clears the hair at 1024 and 1440 | none | AR screenshots |
| 6 | should | AR lead opened "كفى إدارةً لحضانتك عبر واتساب" (blunt, awkward tanween) | "توقّف عن إدارة حضانتك عبر واتساب." (still flagged for native review) | `hero.ar.json` |

## Remaining
| Item | Who |
|---|---|
| Watch-tour button `href="#watch-demo"`: needs the video URL | owner |
| Re-tune `--hero-overlap` and the fluid font floor with licensed fonts | lead (after fonts) |
