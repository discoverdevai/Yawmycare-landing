# 07 Security: review 2 (real page)

**Verdict: PASS with notes.** Measured at 1440 / 1280 / 1024 / 768 / 375, EN + AR: no horizontal scroll, no overflow, 0 console errors, `astro check` 0 errors. Wave join 06 down, 07 up, 08 down verified on the page.

## Fidelity at 1440
Cards 282 wide at x = 112 / 1030 [118 / 1036 in the frame], 24px column gaps, 48px card gap, centre image 588x740, icons 85px, h3 32/Bold, body 24px. Card height 441-448 vs 416: the stand-in font wraps 5-6 lines (font only; resolves with Recoleta).

| # | Severity | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | The two columns did not line up: `items-center` on a grid with different column heights put the AR columns 53px apart at the top (right col top 398, left 345) and the bottoms unequal | grid stretches; each column's cards are `flex-1` so both columns share top and bottom edge; the image is `self-center` | AR 1440: tops 345 / 345; AR 1024 both columns 986px; EN 1440 tops 326 / 326, bottoms 1263 |
| 2 | should | BlobCard stretched security cards to 343x506 at 375 and 332x490 at 768 (very tall for about 330px of content) | New optional `relax` in the kit's shape config: above the native width (283px+) the frame uses 282:312 instead of 282:416. At or below native width nothing changes (1440 / 1024 cards are exactly 282) | 375: 343x380 (was 506); 768: 332x368 (was 490); section 2,320px at 375 EN (was about 2,880) |
| 3 | should | Cards 1 and 2 repeated their title as the first body sentence ("Encrypted, always. Encrypted, always. In transit...") | Removed the repeated sentence from the EN body (AR already did). Deletion only, no new claim; the Figma copy differs, owner can restore it in `security.en.json` | `security.en.json` |
| 4 | nit | At 768: 2x2 cards of 332px with the image above (max 440) | kept | AR 768 screenshot |

Checked and fine: one `h2`, four `h3`, `section[aria-labelledby]`, icons `alt=""`, centre image has a localised alt, images lazy (`<Image>` WebP at 1x/2x), icons, blobs and image not mirrored in AR (columns swap), contrast (h3 `accent-text` on `accent-bg-light` 4.76:1, body 11.95:1), no `left/right` or hex.

Open: **owner** centre-image source PNG is 1.4 MB (only the WebP ships); AR "صفوف" vs "غرف/فصول" for "rooms"; the AR lead names the platform. Re-check card heights with licensed fonts. `relax` is opt-in per shape: `intl-school` (384x503) has the same stretch problem and is for the Pricing reviewer to opt in.
