# 12 · Final CTA + Footer — Review

**Verdict: PASS with notes.** Checked at 1440 / 1024 / 768 / 375 in EN and AR (the Browser pane was only ~600px wide, so wide sizes were rendered in a scaled same-origin iframe). `astro check`: 0 errors. No console errors. No horizontal scroll at 375 / 768.

## Matches Figma
Blob top edge and 88px / 58px content offsets, h2 + lead + two 386px buttons, footer wave drawn over the blob (no shadow), logo, tagline, one-row nav at 1440, 4 coral social buttons, bottom-clipped giant wordmark in `text-wordmark`. AR: buttons, nav and social rows start at the right, wordmark stays Latin.

## Deviations
| Deviation | Why |
|---|---|
| Wordmark floor `clamp(40px, 11.8vw, 170px)` instead of 64px | The text is about 7em wide; 64px = 417px would be cut off at 375 |
| Lead wraps to 2 lines at 1440 | Stand-in font (Fraunces) is wider than Recoleta; should resolve with the licensed font |
| Nav links 44px tall below 1024 (32 above) vs 16px text height in Figma | Tap targets |
| Footer ~37px taller than Figma at 1440 | 4px bigger logo (aspect ratio), nav row 32px high |
| Footer nav drops "Built with nurseries", "Founder" -> "Founders" | DECISIONS #7 |
| AR CTA lead is not the AR frame's text | The frame has older copy; see `arabic-review.md` |
| Below 900px band width the blob is a rounded card | Foundation strategy (no scallops on phones); the footer wave still carries the motif |

## Open items
- Social URLs: all four are `href="#"` with `TODO(owner)`; add `external` once real.
- `#demo` / `#watch-demo` / nav anchors depend on other sections existing.
- Logo is still a raster (Foundation Q8).
- Hover/focus not exercised with a keyboard in the browser; they come from the kit's `Button` and an explicit focus ring on the nav links.

## Needs lead
- Wiring: `<FinalCta locale>` inside `<main>` as the last section; `<Footer locale slot="footer">` right after it. The footer overlaps the band by `--wave-h` via negative margin, so nothing may sit between them. The previous section's `mb-(--section-gap)` is the gap above the band.
- `src/assets/shapes/final-cta.svg` is not normalised (path is in the unrotated 910x1200 space), so `BlobCard shape="final-cta"` renders a wrong shape. I did not touch it; I use `src/assets/footer/final-cta.svg`. Same check recommended for `cta-band.svg` (Section 06).
- `BaseLayout.astro` puts `footer` outside `<main>`, which is correct for the landmark; just keep the CTA section inside `<main>`.
