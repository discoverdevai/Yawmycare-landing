# 06 · Setup + CTA band: audit

Figma file `oSQUBKWEqG5XrY4sHCzjzy`. EN node `1575:41867` (Updated Version, 1440x1093). AR node `1434:3912` (old "Getting started", used for RTL layout and Arabic copy).

## Structure (EN)
| Block | Node | Size / spec |
|---|---|---|
| Wave (down, with shadow) | `1580:42069` | 1440x76 |
| Header | `1457:4096` | h2 Recoleta Bold 48 + lead Regular 24, gap 24; header to content gap 58 |
| Connector lines | `1457:4102` | 925x113 (flipped on Y), rail + 4 drops, `#ADC697` dashed, dot at the foot of each drop |
| Number circles | `1457:4108` | 48x48 blob, digit Recoleta Bold 32 `primary/textColor`, centred over each card, 16px below the lines |
| Step cards | `1575:41863` | 4 x 282x201 blob (`surface-tabs`, 3px `#ADC697`), gap 24, text inset 16 / 32, width 250 |
| Card title / body | `1457:4125` | Bold 24 `primary/textColor` (2 lines reserved, 62px) / Regular 16 `text/blackColor`, gap 12 |
| CTA band | `1457:4142` | 1200x348 blob `primary/CTAprimarycolor`, content inset 58 / 48, gap 30 |
| Band title | `1457:4146` | Bold 40 white, centred (wraps to 2 lines in 1084px) |
| Band lead | `1457:4147` | Regular 24 `primary/bglightColor` |
| Buttons | `1457:4149`, `1457:4153` | 386x56 pills: fill `bglight` + calendar / 1px white outline + video-circle, Bold 18, gap 16 |

## Copy (EN, Updated Version; brand set to "Yawmy Care")
| Key | EN |
|---|---|
| title | Set up your nursery in under 20 minutes |
| lead | We do it with you on a call. Adding children and inviting your team happens the same day. |
| steps[0..3] | See Yawmy Care in Action / Get Your Daily Care Ready / Bring Everyone Together / Everything in One Place (bodies in `setup.en.json`) |
| band.title | 20 minutes · No card, no commitment · In Arabic or English |
| band.lead | Simplify daily operations, keep your team connected, and give parents a better experience—all in one place. |
| buttons | `cta.bookDemo` / `cta.watchDemo` (shared) |

## AR frame (`1434:3912`)
- Same structure. Reading order mirrors: step 1 on the right, circle 1 on the right, lines symmetric. Band buttons: "Book" on the right (start), "Watch" on the left.
- Has copy for the 4 step titles and bodies and the band lead (used verbatim). Its section title ("البدء أسهل مما تتوقع") and band title ("إدارة أسهل لمؤسستك التعليمية") belong to the OLD EN copy, which the Updated Version replaced, so both are re-drafted (see `arabic-review.md`).
- Step 2 title/body in AR ("كل شيء جاهز للبدء") is looser than the EN "Get Your Daily Care Ready"; kept verbatim.

## Findings
| # | Sev | Finding |
|---|---|---|
| 1 | Should | White 18px bold button label and the 18-20px lead on `#76945C` fail 4.5:1 (3.38 / 3.23). Only the 40px title passes as large text. See review.md for the decision |
| 2 | Should | `src/assets/shapes/cta-band.svg` lost the `rotate(-90)` transform of the Figma export (viewBox 1200x348 but path is 348x1200), so it rendered as a vertical strip. Fixed in this section; `final-cta.svg` has the same defect |
| 3 | Info | Connector lines are drawn as outlined fills (7 dash paths + dots) in the Figma export; rebuilt as one stroked path |
| 4 | Info | Figma `Line 1..5` x-positions (0, 313, 619, 925) are the card centres (spacing 306 = 282 + 24) |
| 5 | Info | Figma gives the number circle no accessible meaning; digits are decorative once the `<ol>` provides numbering |
