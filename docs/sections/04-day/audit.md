# 04 · A day at your nursery — Audit

Figma `1532:31922` ("Frame 2147225948", 1440 x 3209), file `oSQUBKWEqG5XrY4sHCzjzy`. No Arabic frame has this section (AR `1434:3715` is the old page).

## Structure (differs from the brief's "vertical timeline")
There is **no central line or zig-zag**. It is a 2 x 4 grid of 588 x 695 dashed cards (gap 24), colours in a checkerboard. Reading order = row-major. The times live inside each card heading.

| # | Card (node) | Tone | Text | Picture layers (x, y, w in card px) |
|---|---|---|---|---|
| 1 | 7:30 AM Drop-off (`1465:5192`) | green | top | dropoff phone 65, 235, 458 |
| 2 | 8:15 AM Room overview (`1465:5244`) | peach | top | phone 94, 204, 400 @85% + attendance panel 24, 252, 540 (shadow) |
| 3 | 10:00 AM Photos (`1465:17888`) | peach | bottom panel 185 high | phone 92, 40, 404 + concentric arcs |
| 4 | 12:30 PM Daily activities (`1465:31604`) | green | top | phone 65, 235, 458 |
| 5 | 2:00 PM Parent check-in (`1530:16601`) | green | top | back phone 305, 286, 259; front phone 24, 225, 342 |
| 6 | 4:30 PM Daily report (`1530:18039`) | peach | bottom | back 273, 129, 275; front 40, 48, 314 |
| 7 | 8:00 PM Stay connected (`1530:18134`) | peach | bottom | hand + iPhone 0, 48, 588 + concentric arcs |
| 8 | The day, all in one place (`1530:18170`) | green | top (2 lines) | phone 114, 336, 361 @77%; notices 19, 170, 251; banner 294, 170, 374; stats 294, 300, 343 (shadow, clipped at card edge) |

## Tokens and type
| Item | Figma | Token used |
|---|---|---|
| Card radius / border | 50 / 4px dashed | `rounded-modal` / `border-4 border-dashed` |
| Green card | fill `#F3F5E8`, stroke `#BAC9A8` (off-token) | `bg-surface-tabs`, `border-stroke-green/80` (closest token) |
| Peach card | fill `#FEF8ED`, stroke `#FFCCC1` | `bg-accent-bg-light`, `border-accent-stroke` |
| Title | Recoleta Bold 32/32, `#334722` (green) / `#B5503C` (peach) | `text-h3 font-bold`, `text-primary-text` / `text-accent-text` |
| Body | Recoleta Regular 24, `#535353` | `text-lead text-ink-muted` |
| Bottom panel | card colour + inset shadow 0 20 12 at 12% `#FFCCC1` | CSS `color-mix` on `accent-stroke` |
| Arcs | 11 quarter-rings `#E2725B` at 5% | one inline SVG, `text-accent` |
| Image shadow | 0 0 20 black 20% | `drop-shadow` on `ink` token |

## Copy issues
- Times "14:00PM", "16:30PM", "20:00PM" are wrong (24h + PM). Built as 12h with a space: 2:00 PM, 4:30 PM, 8:00 PM.
- Card 1 and card 2 bodies repeat their title ("Drop-off. A parent...", "The room, at a glance"): kept verbatim.

## Assets (14 PNG + 11 SVG)
All phone screenshots are 835 x 1699 PNGs with alpha (English UI). Hand photo is 4000 x 3000 PNG (3.3 MB): cropped to the visible area and resized to 1176 x 974. Notices image is a crop of a 750 x 1624 screenshot. Arabic UI screenshots: **none in the Figma file**. The 20:00 chat screenshot contains Lorem ipsum placeholder bubbles.
