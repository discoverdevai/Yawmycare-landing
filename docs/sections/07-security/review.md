# 07 Security: review

Verdict: **PASS with notes**. `astro check` 0 errors; no console errors; `/en/` and `/ar/preview/security/` checked at 1440, 1024, 768, 375.

| Width | Result |
|---|---|
| 1440 | Cards 282 wide at x=112 / 1030, image 588x740 centred, 24px gaps; matches Figma. No horizontal scroll (scrollWidth = viewport minus scrollbar) |
| 1024 | Columns 282 / 333 / 282, image scales to 333x419 |
| 768 | Image on top (440 max), cards 2 columns, no overflow |
| 375 | Single column: image first, then 4 cards (343 wide) |
| AR | `dir=rtl`: column 1 (encrypted, backed up) on the right, column 2 on the left, as in the old AR frame; blobs/icons/image unmirrored |

## Deviations from Figma
| Deviation | Why |
|---|---|
| Card height 416-448 instead of exactly 416 | BlobCard frame grows with text; the Fraunces stand-in is wider than Recoleta, so some bodies wrap to 6 lines. Re-check with licensed fonts |
| Lead says "Yawmy Care" not "YAWMY CARE" | Brand casing decision |
| At 375 cards stretch to 343 wide, so about 506 tall (extra whitespace) | BlobCard keeps native aspect ratio; kit behaviour |
| Wave drawn with `shadow` | Figma shows the soft shadow under the top wave |
| Image/icons shipped as WebP (centre 588x740 @2x) | optimisation |

## Open items
- Copy: bodies of cards 1 and 2 repeat the title ("Encrypted, always. Encrypted, always. ..."); kept verbatim from Figma. Ask design/copy.
- Arabic: 8 drafted strings, see `arabic-review.md`.
- Wave direction `up` and join with sections 06/08 not verified in this isolated preview.

## Needs lead
- Nothing blocking. `src/assets/security/center.png` is 1.4 MB source (only the optimised WebP ships).
