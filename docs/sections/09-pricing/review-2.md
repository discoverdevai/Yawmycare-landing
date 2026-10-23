# 09 Pricing: review 2 (real page, `/en/` and `/ar/`)

**Verdict: PASS with notes.** Measured at 375 / 768 / 1024 / 1280 / 1440 in EN and AR with headless Chrome (CDP): no horizontal scroll, no overflow, wave joins 08 up -> 09 and 09 -> 10 clean. `astro check` 0 errors.

| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | Animated WebPs ignored `prefers-reduced-motion` (WCAG 2.2.2) | Stills of GIF frame 0 (`src/assets/pricing/*-still.webp`, script `docs/sections/09-pricing/make-stills.mjs`, 4-6 KB each) and a new `pricing/Illustration.astro` (`<picture>` with a reduced-motion `<source>`) | Emulated `reduce`: currentSrc switches to `*-still.webp` x3; `no-preference` keeps the animation |
| 2 | should | `outline` button text on the school card (green on `stroke-sec`) was 4.2:1 (18px bold is not "large text") | New additive Button variant `outline-deep` (`primary-cta-hover`, 5.6:1); used for "Talk to us" | contrast calc |
| 3 | should | Bottom cards unequal height (EN +40px, AR +80px; Figma both 503) | `flex flex-col [&>div]:flex-1` on both BlobCards, grid stretch at all widths | 1440 EN/AR, 768 AR screenshots |
| 4 | nit | Card 1 is 466px high vs Figma 424 (+42): list rows 47px pitch vs 40 (line-height policy, not font width) | kept (documented line-height decision) | measured |
| 5 | nit | AR: last sentence of the first-10 body was incomplete ("...ما يجعل الأمر يستحق") | "نحن في البداية، وهذا تحديدًا ما يجعل الانضمام الآن يستحق العناء." (still flagged for native review) | `pricing.ar.json` |
| 6 | nit | 768: school blob (SVG) next to the first-10 rounded fallback (BlobCard thresholds) | left: BlobCard design | 768 screenshot |
| 7 | nit | Card 3 title wraps to 3 lines (EN 1440), heading 40px: stand-in font | resolves with Recoleta | n/a |

Remaining (owner): confirm the first-10 copy; GIF licence (DECISIONS #11).
