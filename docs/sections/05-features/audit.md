# 05 · Features: audit

Figma: EN Updated Version node `1575:41862` (Frame 2147225953, 1440×886), file `oSQUBKWEqG5XrY4sHCzjzy`. No AR frame has this section (DECISIONS #8), so all AR copy is drafted.

## Layout
| Item | Figma | Token / note |
|---|---|---|
| Wave above | `1580:42018`, Group 43 flipped (`-scale-y-100`) → scallops up, 76px | `Section wave="up"`, shadow on (spec §8.1) |
| Wave → content | 58px | `--wave-gap` |
| Container | 1200 | `Container` |
| h2 | Recoleta Bold 48/48, `text/blackcolor` | `SectionHeader` (`text-h2`, `text-ink`) |
| h2 → grid | 48px | `--header-gap-default` |
| Grid | 2 rows × 3 cards, col gap 24, row gap 32 | `grid-cols-3 gap-x-6 gap-y-8` |
| Card | 384×312 blob `1532:31953`, 3px `#ADC697` stroke, fill `#F3F5E8` | `BlobCard shape="feature"` |
| Card padding | 32 (content 320 wide) | `p-8` (`p-6` below 1280) |
| Card stack | text block (title, 12px gap, body), 24px gap, 110×110 illustration at the bottom | |
| Title | Recoleta **Black 900** 24/24, `primary/textColor` | `text-title font-black text-primary-text` |
| Body | Recoleta Regular 20/1.3, `text/blackcolor` | `text-body text-ink` |

## Copy (EN, verbatim)
| # | Title | Body | GIF (Figma layer) |
|---|---|---|---|
| 1 | One-tap check-in | Parents check in within 100 metres. No PIN, QR code, or tablet at the door. | `illus-feature-one-tap-checkin` (turn-off) |
| 2 | Know who read it | See which parents opened a closure notice or illness alert. Know who has seen it. | `know-who-read` (report) |
| 3 | Every photo, in place | Each child gets a dedicated gallery. Photos stay organised, never buried in a shared feed. | `photo` (image 109) |
| 4 | Evenings back for teachers | Parents see when they are messaging outside nursery hours, before they hit send. | `evenings` (to-do-list) |
| 5 | Arabic from day one | Full right to left, Arabic notifications and support. Each person picks their own language. | `arabic` (translator) |
| 6 | Nursery pays, not parents | One flat monthly fee, with no commission on tuition and no extra parent charges. | `wallet` |

## Assets
| File | Frames | GIF size | Note |
|---|---|---|---|
| 6 × animated GIF 375×375, 30ms/frame, loop forever | 58–181 | 4.36 MB total | shown at 110×110; licence unconfirmed (DECISIONS #11) |

## Issues found
| # | Finding | Handling |
|---|---|---|
| 1 | Lossy animated WebP at the GIF's frame rate is **larger** than the GIF (e.g. 1.12 MB vs 1.14 MB) | Resize to 220 (2× slot), drop every 2nd frame (60ms), q60: 2.0 MB total |
| 2 | Illustrations carry no text, no alt in Figma | decorative `alt=""`; title says it all |
| 3 | Stand-in font is wider than Recoleta, so "Evenings back for teachers" and a few bodies wrap one line more than Figma | card frame grows (SVG stretches ≤12%); resolves when licensed font arrives |
