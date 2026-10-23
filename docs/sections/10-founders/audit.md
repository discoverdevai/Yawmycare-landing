# Section 10 · Founders — audit

Figma: EN Updated `1592:43397` ("Frame 2147225991", 1440 wide). No AR frame has this section.

| Item | Figma | Notes |
|---|---|---|
| Wave | `1580:43131` Group 44, 76px, scallops point down, flat top | = `wave="down"` with shadow (shadow is baked into the export). Matches spec §8.1 (10 = down) |
| Heading | "Why we built this?" Recoleta Bold 48/48, `text/blackColor` | `SectionHeader`, no lead; heading → content gap 58 = `gap="loose"` |
| Row 1 (Dr. Rana Mustafa) | Photo 439×491 at x0; text card 1181×423 at x19, y36; text 663 wide at x479, y82 | Photo on the start side |
| Row 2 (Mr. Mohammed) | Card 1175×423 at x0, y34 (mirror of the row-1 outline); photo 439×491 at x761; text 663 wide at x58 | Photo on the end side; row gap 40 |
| Photo | PNG 878×982 (2×), organic green frame + portrait baked in (transparent outside the mask) | Exported as is, no extra mask needed |
| Text | Recoleta Medium 24/1.3, `text/blackColor`, 3 paragraphs, no gap, no quote marks | Paragraphs 8px apart in code (readability) |
| Name chip | 32px circle `primary/CTAprimarycolor` + 24 profile icon, name Recoleta Bold 14 `primary/textColor`, gap 8 | No role/title text exists in Figma |
| Card fill | `primary/bgColor` | `BlobCard shape="founder-text"` |

## Copy (verbatim, EN)
| Who | P1 | P2 | P3 |
|---|---|---|---|
| Dr. Rana Mustafa | After years of living outside Egypt, we came back and enrolled our children in local nurseries. That is when we started seeing the gaps for ourselves. | Parents had little visibility into their child’s day, while nursery teams were managing updates, photos, attendance, and communication across WhatsApp groups and manual processes. | We realised the problem was not the care. It was the way everything was connected. |
| Mr. Mohammed | We started sitting down with nursery owners and listening to what was happening behind the scenes. We heard the same challenges again and again, and began building Yawmy Care around them. | Today, Yawmy brings the nursery, teachers, and parents into one organised space, making it easier to manage the day and stay connected. | And one thing we will never do: charge parents to stay connected to their children. |

## Findings
| # | Finding | Handling |
|---|---|---|
| 1 | The two cards are the same outline, mirrored (1181 vs 1175 wide) | Added optional `flip` prop to `BlobCard`; flip = (second story) XOR (RTL) so the scallops stay opposite the photo |
| 2 | Brief mentions "roles"; Figma has names only | None invented. Add a `role` key if the owners supply titles |
| 3 | "Yawmy" (short form) appears in row 2 P2 | Kept verbatim; AR uses "يومي" |
| 4 | Photos are real people | Must be approved for publication (PLAN §5) |
