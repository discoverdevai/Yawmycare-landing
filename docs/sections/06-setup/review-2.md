# 06 Setup + CTA band: review 2 (real page)

**Verdict: PASS with notes.** Measured at 1440 / 1280 / 1024 / 768 / 375, EN + AR: no horizontal scroll, no overflow, buttons 56px tall, 0 console errors, `astro check` 0 errors. Joins 05 to 06 (wave down) and 06 to 07 (wave up) look like the Figma frames; section gap 48 + wave 76 + 58 as specified.

## Fidelity at 1440 (EN; section top = 0, Figma frame values in brackets)
h2 at 134 [~134], lead 24px, step circles 48x48 at y 434 [428], step cards 282x201 at y 506 [500], columns at x 112 / 418 / 724 / 1030 [118 / 424 / 730 / 1036: same 6px frame offset], band title 40px, buttons 386x56, band top ~764 [752]. Everything is within 6 to 12px (frame offset plus the wider stand-in font). Band fill and lead colour are the documented AA deviation.

| # | Severity | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | 768-1023: single column with the right half of the screen empty (four stacked 288px cards; section 1,531px tall in AR) | 2x2 grid from `md`: circle centred above each card (as on desktop), no rail, no vertical line; the row's cards share one height. Vertical-line layout kept below 768 | 768: four cards 332x309 EN and AR, section 1,291px (was 1,531); screenshot AR 768 |
| 2 | should | AR 1024-1440: step cards had different heights (step 1 is 318px, step 4 about 280px), bottoms did not line up (EN step 2 was 210 vs 201) | cards stretch to the row height (`md:flex-1`, frame `flex-1`) | AR 1024: all four li 352px; 1440: 282x318 (EN 282x282) |
| 3 | nit | AR step 2 body ended mid-phrase ("بسهولة وتنظيم", no full stop) | "حتى تبدأ العمل بسهولة وتنظيم." | `setup.ar.json` |
| 4 | nit | AR band "بلا بطاقة" is ambiguous | "بلا بطاقة ائتمان" | `setup.ar.json` |
| 5 | nit | Title min-height (2 lines) is only needed when four columns align (lg); it left a gap in the 2x2 layout | kept at `lg:` only | AR 768 screenshot |
| 6 | info | Queue item "`on-green-outline` hover contrast": already `bg-primary-cta-hover` in the kit, white on `#526840` is 6.10:1 | none | `Button.astro` |

Checked and fine: `ol` with `aria-hidden` numbers, one `h2`, band title is an `h3`, `href="#demo" data-demo-open` on the primary button, no `left/right`, no raw hex (only comments mention hex), dashed rail symmetric (not mirrored), RTL step order and button sides mirror, contrast (white on `primary-cta-strong` 4.61:1, button text 9.64:1; dashed connectors are decorative at 1.85:1).

Open: **owner** `#watch-demo` has no target (video URL; same placeholder in Hero and FinalCta). Native review of the AR strings (`arabic-review.md`).
