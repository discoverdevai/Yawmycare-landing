# 02 · Hero — Review

Verdict: **PASS with notes**. Checked at 1440 / 1024 / 768 / 375, EN and AR (`/{en,ar}/preview/hero/`). `astro check`: 0 errors. No console errors.

| Check | Result |
|---|---|
| 1440 EN geometry | h1 at (120, 262) 792 wide; photo at (784, 266), 655×610 (Figma 656×611); hero 756px tall (Figma 757) |
| Photo in Figma crop | cutout cropped to the same 1220px middle as Figma; children stand behind the scallops |
| Wave | up, `surface` fill, 0 0 12px glow at 48% (new `shadow="glow"` on `WaveDivider`, backwards compatible) |
| Headline | highlight words in `text-accent-display`; AR Bold, line-height 1.5 |
| LCP | `<Picture>` AVIF + WebP, srcset 480–1220, `loading="eager"`, `fetchpriority="high"`, width/height set |
| RTL | text right, photo left; photo not flipped |
| 375 | single column, full-width stacked buttons, photo below, no horizontal scroll |
| 1024 | text column narrows next to the smaller photo (clamp 416–656px); buttons clear the wave |

## Deviations from Figma
| What | Why |
|---|---|
| H1 wraps to 4 lines at 1440 (Figma 3) | stand-in font Fraunces is wider than Recoleta; with the licensed font the line count should match |
| Hero 1px shorter, photo 655 vs 656 | photo width is 45.5vw |
| Stacked layout below 1024 | no mobile frames; photo centred, max 480px |
| Coral `#E06950` instead of `#E2725B` | DECISIONS #2 |

## Open items
- Watch button: `href="#watch-demo"`, `TODO(owner)` demo video URL (also `#demo` dialog from another builder).
- The h1 may touch the girl's hair at 1024–1280 with the wide stand-in font; re-check once licensed fonts are in.
- Original full cutout kept in `docs/sections/02-hero/assets-original/` (2.3MB PNG, not shipped).

## Needs lead
- Wire `<Hero locale={locale} />` right after the header; the hero carries its own `mb-8` (32px join to Testimonials, per Figma).
