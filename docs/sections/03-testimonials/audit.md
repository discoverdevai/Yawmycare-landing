# 03 · Testimonials — Audit

Source: Figma `oSQUBKWEqG5XrY4sHCzjzy`, EN Updated Version, node `1465:5191` (inside `1592:43586`, 1200 × 494 at x=120, y=969). No AR frame exists for this section.

## Structure
| Node | What | Size / position |
|---|---|---|
| `1465:3963` | Intro block: h2 + lead, gap 24 | 1200 × 210 |
| `1465:3965` | h2 "We talked to nurseries on three continents before we wrote a line of code." Recoleta Bold 48 / 1.3, `text/blackColor` | 1200 × 124 (2 lines) |
| `1465:3966` | Lead, Recoleta Regular 24 / 1.3 | 1200 × 62 |
| `1465:5190` | Row: label cell + 3 cards, gap 24, vertically centred; header → row gap 48 | 1200 × 236 |
| `1465:5189` | Label cell: `si:quote-line` 67 (rotated 180 in SVG) + h3-style label Recoleta Bold 32 / 1.3, gap 16 | 282 wide |
| `1465:5187/5186/5170` | 3 cards, `testimonial` blob 282 × 236, fill `#FCF1E6` (token `accent-bg-soft`), no stroke | x = 306 / 612 / 918 |
| card content | 234 wide, 24 left, 32 top (card 3: 20 top, 8 gap); quote Recoleta Medium 24 / 1.3 `#333`; footer: 32px circle `AccentColor/main` + `profile` icon 24 white + attribution Recoleta Bold 14 `Accent/textColor` | |
| Hero join | hero frame 937 tall, this block starts at y=969: 32px gap | spec §8.1 |

## Copy (EN)
| Key | Text | Issue |
|---|---|---|
| title | We talked to nurseries on three continents before we wrote a line of code. | none |
| lead | "...in **[N]** nurseries in Egypt, across the wider region, and in the United States..." | **`[N]` is an unfilled placeholder** |
| label | "What Owners. Teachers, Parents Says :" | typo (full stop for comma, "Says", stray colon) |
| quote 1 | "My phone is the nursery's filing system. If I lose it, I lose everything." | Figma has a stray double space before "it" |
| quote 2 | "I write the same daily report twice. Once on paper, once on WhatsApp." | |
| quote 3 | "Parents message me at midnight and I answer, because if I don't they think something is wrong." | |
| attributions | Owner, Maadi, 45 children / Teacher, Heliopolis / Admin, Sheikh Zayed | |

## Tokens / assets
| Item | Value |
|---|---|
| Blob | `BlobCard shape="testimonial"` (already in kit) |
| Quote icon | `Icon name="quote"` size 67 (already in kit; rotation baked into the SVG) |
| Profile icon | `Icon name="profile"` 24, `currentColor`, white on accent circle |
| Attribution contrast | `#B5503C` on `#FCF1E6` = 4.52:1 (passes AA at 14px bold) |
| Quote contrast | `#333333` on `#FCF1E6` = 11.35:1 |

## Observations
- Cards are vertically centred in the row (card 3 has taller text, so its 20/32 top padding differs): content centring reproduces both.
- No images, no animation, no interactivity.
