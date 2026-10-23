# 11 · FAQ — Audit

Figma: file `oSQUBKWEqG5XrY4sHCzjzy`, EN Updated Version frame `1592:43584` ("Frame 2147226011", 1440 wide). No AR frame exists for this section.

## Layout
| Part | Node | Spec |
|---|---|---|
| Wave | `1592:43404` (Group 44, flipped) | scallops point up, sits at the top → `wave="up"` (confirmed by render; with the soft green shadow) |
| Wave → title | | 58 |
| Title | `1592:43407` | "You might be wondering", Recoleta Bold 48 (`text-h2`), `#333` |
| Title → rows | | 40 (`gap="tight"`) |
| Row gap | | 24 |
| Row | `1592:43485` … | 1200 wide, px 24 / py 16, radius 32, fill `sec/strokeColor #F5F5DC` (`stroke-sec`), height 72 |
| Badge | `1592:43483` | 40 wide, p 8, pill, fill `primary/bgColor`, number Recoleta Bold 24 in `primary/textColor #334722` |
| Question | `1592:43474` | Recoleta Bold 24 / lh 1, `#333`, gap 12 from badge |
| Icon | `1592:43478` | akar-icons plus 24, black, end of row |
| Open row | `1592:43563` (#13) | 2px border `primary/CTAprimarycolor`, minus icon, flex-col gap 12, answer Recoleta Regular 24 / lh 1.3 `#333`, full row width |

## Content (13 rows)
Only row 13 has an answer in Figma. Rows 1–12 are question-only. Row 13 answer contains a placeholder: "…then [next country]."

| # | Question (Figma) | Answer in Figma |
|---|---|---|
| 1 | How much does it cost? | none |
| 2 | Do parents pay anything ? (stray space before "?") | none |
| 3 | How long does setup take? | none |
| 4 | Do my teachers need training? | none |
| 5 | Is the app fully in Arabic? | none |
| 6 | How does check-in work? | none |
| 7 | Who can see our data? | none |
| 8 | What if we cancel? | none |
| 9 | Can we move off WhatsApp and Excel? | none |
| 10 | Does it work on older Android? | none |
| 11 | We are a school nursery section. Does this fit? | none |
| 12 | Who is behind Yawmy Care? | none |
| 13 | Do you work outside Egypt? | "Yes. The app works anywhere in the region, in Arabic and English. We are onboarding nurseries in Egypt first, then [next country]." |

## Findings
| Item | Finding | Handling |
|---|---|---|
| Open state | Figma shows only #13 open (state demo). Single vs multi-open not specified | Page ships fully collapsed; rows toggle independently |
| Closed rows have no border, open row has 2px | Border would change row height | All rows carry a 2px transparent border and 2px less padding, so size is 72 in both states |
| Badge number colour | Row 1 span `#334722`, others `primary/textColor` (same value) | Token `primary-text` everywhere |
| Hover / focus | Absent in Figma | Row focus ring uses the foundation focus token (3px `focus`, 2px offset) |
| Contrast | Ink on `#F5F5DC`, and `#334722` on the `#DFEBD1` badge, pass AA | none needed |
| AR | No AR frame. Arabic drafted (see `arabic-review.md`) | RTL via logical properties |
