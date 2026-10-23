# 08 Commitments: Audit

Figma: EN Updated Version `1457:3895` → node `1580:41973` (1440 × 1073, y 8097). Neighbours: 07 Security `1575:41874`, 09 Pricing `1589:43302`. AR frame has no equivalent (Arabic is drafted).

## Structure (top to bottom)
| Node | What | Size / position |
|---|---|---|
| `1580:42075` Group 44 | Wave edge, scallops pointing DOWN, soft green shadow | 1440 × 76; 58px gap to content |
| `1580:41879` | h2 "Five things we will not do to you" (Recoleta Bold 48/48) + lead (Regular 24, lh 1.3) | 1200 wide, gap 24; 48px to cards |
| `1580:41936` row 1 | peach card + green card | 588 × 247 each, gap 24 |
| `1580:41930` row 2 | wide card | 1200 × 183, 40px above and below |
| `1580:41937` row 3 | green card + peach card | 588 × 247 each, gap 24 |

## Cards
| # | Node | Shape (kit) | Title (colour) | Body | Icon (110px) |
|---|---|---|---|---|---|
| 1 | `1580:41917` | `commitment-peach` | We never charge parents (accent-text) | We will never charge your parents. One flat fee, paid by the nursery. No commission on tuition. | wallet (animated GIF) |
| 2 | `1580:41923` | `commitment-green` | Your data is yours (primary-text) | Your data is yours. Export your records whenever you want, without asking us. | download |
| 3 | `1580:41930` | `commitment-wide` | Arabic is not a translation (`#474700`, off-token) | Arabic is not a translation layer. Full RTL, Arabic notifications, Arabic support. (Medium weight) | translator |
| 4 | `1580:41944` | `commitment-green` | You can talk to a human (primary-text) | A human answers, in Arabic, within **[X]** working hours. | democracy |
| 5 | `1580:41938` | `commitment-peach` | Your data stays with you (accent-text) | If you leave, you leave with everything. 90 days to export, then permanent deletion. | copywriting |

Card geometry: small cards: text frame at (58, 58), 472 wide; wide card: text frame at (118, 48), 963 wide. Titles 32/32 Bold; body 24 lh 1.3, gap 24. Icon 110 × 110 at the card's top-end corner (small: 24px from the end edge, top 0; wide: 85px from the end, top 3px).

## Wave direction (confirmed by render)
Rendered the top 80px of 07, 08 and 09 at 2x. 07: scallops point up (flat bottom). 08: scallops point down (flat top). 09: scallops point up. So **08 = `down`**, matching spec §8.1 (07 up, 08 down, 09 up).

## Findings / open
| # | Finding | Handling |
|---|---|---|
| 1 | `[X]` placeholder in card 4 body | Written as "within one working day" / "خلال يوم عمل واحد", single i18n key `cards.human.body`. Owner to confirm (review.md) |
| 2 | Lead is the Security section's lead pasted in ("built with security at its core…"), not about the five commitments | Kept verbatim (Figma is source of truth), brand casing fixed. Flagged for owner |
| 3 | Card 3 title colour `#474700` has no token | Snapped to `primary-text` (`#334722`). Flagged |
| 4 | Green text frames carry a stray `#F1F4E6` fill (same as the blob) | Not reproduced; identical to `surface-tabs` blob fill, invisible |
| 5 | Illustrations are animated GIFs (375 × 375) named `.png` in the export | Originals in `assets-original/`; shipped as 220px animated WebP + still WebP (reduced motion) |
| 6 | Card 1 and 5 copy repeats pricing claims ("We never charge parents" is also the pricing h2) | Content, not a build issue |
