# 08 Commitments: review 2 (real page)

**Verdict: PASS with notes.** Measured at 1440 / 1280 / 1024 / 768 / 375, EN + AR: no horizontal scroll, no overflow, 0 console errors, `astro check` 0 errors. Wave join 07 up, 08 down, 09 up verified on the page.

## Fidelity at 1440 (EN)
h2 at 134, cards 588 wide at x = 112 / 724, wide card 1200, column gap 24, row gap 40 [~41], titles 32/Bold in accent-text (peach) / primary-text (green), body 24px (wide: Medium), 110px illustration at the top-end corner. Heights 272 / 190 / 247 vs Figma 247 / 183 / 245: row 1 is taller because the stand-in font wraps the first card's body to 3 lines inside 58px padding (font width).

| # | Severity | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | Reduced-motion stills: the srcset URL has a space in dev (project path), so the source is discarded and the animation stays. The builder's "dev-only problem" is real, and it made the still untestable in this checkout | `iconStill.src.replace(/ /g, "%20")` in `CommitmentCard` | Forced-media clone test: 5/5 stills selected and loaded (220px) after the fix, 0/5 before |
| 2 | should | 768-1023: cards in a row had different heights (EN 323 vs about 280; AR 350 vs 290) | `li` is a flex column and the blob frame `flex-1`: a row's cards share a height | 768 EN: 332x323 + 332x323, 332x297 + 332x297 |
| 3 | nit | AR 375: card heights 294 / 240 / 267 differ because the copy lengths differ | none (content-driven, no wasted space) | measured |
| 4 | info | Card 3 title colour snapped to `primary-text` (Figma `#474700`), 9.2:1; peach title 4.76:1 on peach (large text, AA needs 3:1) | none | computed |

Checked and fine: one `h2`, five `h3` (`ul > li`), illustrations `aria-hidden` with `alt=""`, section labelled by its h2, RTL: columns swap, illustration at the end (left) side, shapes not mirrored; no `left/right`, no hex.

Open (**owner**): (1) the lead is the Security lead pasted into the Figma frame ("built with security at its core..."): left verbatim in EN and AR, please supply the right sentence (the same Arabic lead now appears twice on the page, sections 07 and 08); (2) confirm "within one working day" (`[X]` in Figma; AR "خلال يوم عمل واحد"); (3) native review of the 12 AR strings.
