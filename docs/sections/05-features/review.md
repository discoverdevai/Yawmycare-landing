# 05 · Features: review

**Verdict: PASS with notes.** Checked in `/en/preview/features/` and `/ar/preview/features/` at 1440 / 1024 / 768 / 375 (card sizes and `scrollWidth` measured in the page, screenshots compared with the Figma render). `astro check` 0 errors, one `astro build` OK, no console errors.

| Width | Layout | Card size | Horizontal scroll |
|---|---|---|---|
| 1440 | 3 × 2 | 384 × 312–350 | none |
| 1024 | 3 × 2 | 299 × 360 | none |
| 768 | 2 × 3 | ~360 wide | none |
| 375 | 1 × 6 | 343 × 280 (SVG blob, ≥ 288 container threshold) | none |

## Illustration optimisation (sizes in bytes)
| Illustration | GIF | Animated WebP | Still (reduced motion) |
|---|---|---|---|
| one-tap-checkin | 420,551 | 127,990 | 9,432 |
| know-who-read | 1,142,242 | 566,370 | 8,126 |
| photo | 562,879 | 232,954 | 7,500 |
| evenings | 951,819 | 286,942 | 7,196 |
| arabic | 666,716 | 382,798 | 5,678 |
| wallet | 612,344 | 405,978 | 5,234 |
| **Total** | **4,356,551** | **2,003,032 (-54%)** | 43,166 |

- Straight lossy WebP at the GIF's size and 30ms frame rate was not smaller (know-who-read 1.12 MB vs 1.14 MB). The saving comes from 375 → 220px (2× of the 110px slot), every second frame (30 → 60ms, ~16 fps) and quality 60. Visually the motion is slightly less smooth than the GIF; set `FRAME_STEP=1` in `optimise-illustrations.mjs` to restore it (about +2 MB).
- Going further (WebM/MP4 video, or lower quality) would be the next step; ffmpeg is not installed here. q40/200px only reached 1.67 MB.
- Originals: `assets-original/`. Regenerate with `node docs/sections/05-features/optimise-illustrations.mjs`.
- Reduced motion: `<picture><source media="(prefers-reduced-motion: reduce)">` swaps in the first-frame still, no JS. Not exercised in a browser (emulation not available); markup confirmed in built HTML.
- Plain `<img>` instead of `<Image>`: Astro would re-encode the lossy animation. Dimensions, `loading="lazy"`, `decoding="async"` set.

## Deviations from Figma
| # | Deviation | Why |
|---|---|---|
| 1 | Text wraps one line longer in places (e.g. "Evenings back for teachers"), so the second row is ~350px tall instead of 312 at 1440 | Fraunces stand-in is wider than Recoleta. Card grows, SVG stretches ≤12%. Re-check when licensed fonts are installed |
| 2 | Card padding 24 below 1280, 32 from 1280 | 3-col cards are ~300px wide at 1024 |
| 3 | At 1024 cards are 299×360 (blob stretched ~14% taller than native) | Content-driven height; scallops still read fine |
| 4 | AR card 5 has a small "عربي" pill | Brief asked for AR emphasis; no UI screenshots invented |
| 5 | Wave shadow on | spec §8.1 cream dividers |

## Open items
- Native review of 14 Arabic strings (`arabic-review.md`).
- Illustration licence (DECISIONS #11).
- Card-4 AR title "مساؤهم لهم" is idiomatic but terse; reviewer to confirm.

## Needs lead
- Nothing blocking. `index.astro` should render `<Features locale={locale} />` after section 04, with the 04 section's wave direction `down` (this one is `up`).
