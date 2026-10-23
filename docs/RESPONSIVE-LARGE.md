# Responsive QA, tablet and large screens (>= 768px)

Scope: the whole page `/en/` and `/ar/` at 768, 820, 900, 1024, 1180, 1280, 1366, 1440, 1536, 1920, 2560 plus iPad 1180x820 and 820x1180 (the 1180 and 820 columns; the page is width-driven, there is no height-dependent CSS). Method: headless Chrome over CDP (DPR 1, scripted probes + section screenshots), scripts kept outside the repo. `npx astro check`: 0 errors, 0 warnings.

## Result (after fixes)

PASS in every cell for both locales (EN / AR). Probes per cell: `scrollWidth == innerWidth`, no visible element past either viewport edge, no clipped text, nav state, sections full width (left 0, width = viewport), images not upscaled, longest line length.

| Area | 768 | 820 | 900 | 1024 | 1180 | 1280 | 1366 | 1440 | 1536 | 1920 | 2560 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| No horizontal scroll / nothing past edge | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Header (menu < 1360, 9 links >= 1360) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Hero headline vs photo (fluid clamp) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS (note 1) |
| Content cap 1200, backgrounds / waves / footer edge to edge, no seams | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Blob SVG / fallback switching, equal heights in rows | PASS (note 2) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Day 2-col, Features 2/3-col, Setup 2x2 / 4-up + connector | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Security 3-col vs stacked, Commitments, Pricing | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Founders | PASS (fixed) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| FAQ width + line length (<= ~64ch) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Final CTA, footer (wordmark scales, nav wraps, no clip) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Demo dialog (checked at 768, 1024, 1440, 2560) | PASS | n/a | n/a | PASS | n/a | n/a | n/a | PASS | n/a | n/a | PASS |
| Type / rhythm continuity at 768, 1024, 1280 | PASS (note 3) | | | PASS | | PASS | | | | | |
| Images crisp (no image rendered > 1.05x its natural width at DPR 1) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

Notes: (1) at 2560 the hero photo stays pinned to the viewport edge as in Figma (it bleeds off the edge, the boy's shoulder is cut by the image), so a ~500px empty gap opens between the headline column and the photo; accepted, see "Left". (2) At 768-1023 the Pricing school card shows its SVG while the "first 10" card shows the rounded fallback (equal 2-col, 340px each, the first10 SVG needs 594px). Both are equal height; left as a BlobCard design property. (3) 767 -> 768 is still a step (mobile 28px h2 -> tablet 36px): that is the other QA engineer's boundary.

## Issues found and fixes

| # | Area | Issue | Fix (file:line) |
|---|---|---|---|
| 1 | Type scale + rhythm | Tokens stepped at 1024 (h2 36 -> 48, lead 20 -> 24, body 18 -> 20, wave 48 -> 76, section gap 32 -> 48, ...): a jump in one pixel of width, and 1024-1279 got desktop sizes in a 960px column | `src/styles/global.css:141-168`: from 768 to 1280 every size and rhythm token (`--fs-h2/band/h3/title/lead/body`, `--wave-h`, `--wave-gap`, `--section-gap`, `--header-gap-*`, `--lead-gap`) now interpolates linearly with `clamp(tablet, c + slope*vw, desktop)`; 1280 and up equals the Figma 1440 values exactly. Verified 767/768/900/1023/1024/1180/1279/1280/1440/2560: monotonic, no steps (e.g. h2 36, 39.1, 42, 45.7, 48) |
| 2 | Founders at 768-963 | Photo stacked above the card, a ~420x290 empty area beside it | `src/components/sections/Founders.astro:39,54,62` and the content class: the side-by-side desktop layout now starts at `md` (photo 36.58% overlapping the card start, card is the rounded fallback until 886px), photo and card centre-aligned on the row. Mirrors correctly in AR. Checked 768 / 900 / 970 / 1024, EN + AR |
| 3 | Line length | Section leads were 1200px wide (104 chars/line at 24px) and FAQ answers 1196px (95 chars/line) | `src/components/ui/SectionHeader.astro:48` lead `max-w-[62ch]`; `src/components/sections/Faq.astro:75` answer `max-w-[64ch]`. Longest measured line is now 81 EN / 78 AR (was 104 / 110); body text in cards is below that |
| 4 | Header menu 768-1359 | Panel was one tall single column (~396px, left-aligned in a 1280px screen) pushing the page down | `src/components/sections/Header.astro:140`: from `md` the 9 links form a 3 x 3 grid (column-major, so the order reads down each column), panel height 430 -> 166px. RTL flows from the right. Hamburger, Book a Demo and language button unchanged |
| 5 | Testimonials 768-1439 | Three cards in a row had different heights (EN 768: 186/209/233; 1280: 236/236/275) | `src/components/sections/Testimonials.astro:30,33`: grid stretches, `li` is a flex column and the blob frame `flex-1` (same pattern as Commitments). All three equal at 768 / 1024 / 1280 / 1440, EN + AR |
| 6 | Hero image weight | `sizes` said 45.5vw, so 2560 downloaded the 1220px file for a 656px box | `src/components/sections/Hero.astro:54`: `sizes="(min-width: 1024px) clamp(26rem, 45.5vw, 41rem), ..."` (matches `--hero-img-w`) |

## Verified, no change needed

- Header: 9 links fit at 1360 with 34px (EN) / 89px (AR) slack to the actions; menu below 1360 works with Esc, toggle and 44px links; 1359 vs 1360 look right in EN and AR.
- Hero: headline clears the photo at every width (EN 3-4 lines, AR 3 lines); no collision 1024-1536.
- Waves: scallop tile keeps its proportion, aligned from the centre; left and right edge columns are pixel-identical at 2560 (no gutter or seam); footer wave overlap with the CTA band clean at 768 / 1024 / 1440 / 2560.
- Blob thresholds: Commitments / Pricing wide / Founders / CTA flip to SVG between 964 and 970px viewport (cards then >= 75% of native). Features, Setup, Security, Testimonials are SVG at every tablet and desktop width. No row mixes states except note 2.
- Dialog: 736px wide at 768 (16px margins), 767px at >= 1024, centred, no inner scroll at 1440 / 2560, EN and AR.
- Footer wordmark `clamp(40px, 11.8vw, 170px)`: 91px at 768, 121px at 1024, capped at 170px from 1440; nothing clipped; nav wraps to 2 lines at 768-900 (92px).

## Left / for the lead

1. Hero photo at >= 1920: pinned to the viewport edge (Figma behaviour). At 2560 the headline column starts at x=680 and the photo at x=1904. Options: leave, or cap the hero composition (would show the photo's cut edge, so it needs a new crop or a fade mask): owner/design call.
2. Pricing 768-1023: school card SVG next to the first10 rounded fallback (see note 2); could force the school card to the fallback below ~352px if the owner prefers matching shapes.
3. 767 -> 768 type step (mobile to tablet) was not touched; the same fluid approach (375 -> 768) can be applied by the mobile QA engineer if wanted.
4. Re-tune `--hero-overlap`, nav breakpoint and card heights when the licensed Recoleta / Expo Arabic land (already in the review queue).
