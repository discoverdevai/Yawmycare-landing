# 09 Pricing: audit

Figma EN `1589:43302` (1440x1205). Wave above (flipped Group 44 = scallops up). Content column 1200, gaps 58 (wave to h2), 48.

| Node | Element | Spec |
|---|---|---|
| 1580:42030 | h2 "Simple pricing. We never charge parents." | Recoleta Bold 48, `text/blackcolor` |
| 1580:43127 | Pricing card, `BlobCard pricing` 1200x424, `primary-bg` | content at x80 / y48, 1040 wide, row: text col 634 + illustration 319 |
| 1580:42087 | Card title "One flat monthly fee, paid by the nursery" | Bold 32, `primary/textColor` (h3) |
| 1580:43086 | 5 bullets, check-circle icon 24 (`#76945C`), gap 8, row gap 16 | Medium 24, black |
| 1580:43106 | "Book a Demo" | primary button, calendar icon, 610x56 |
| 1580:43125 | `recurring 1` 319x319 | animated GIF (375 native) |
| 1587:43243 | `intl-school` 384x503, `stroke-sec` fill, padding 32 | `daycare 1` 125 GIF; title Bold 32 (green on "nursery", "international school?"); body Medium 24 `text/grayColor`; "Talk to us" outline button, no icon |
| 1589:43298 | `first10` 792x503, accent stroke 2 | `diplomacy 1` 168 GIF at x600/y40; title Bold 40 (accent-text on "first 10", "comes next."); body Medium 24; "Be The First Partner" 2px `AccentColor/main` border, `Accent/textColor` text, no icon |

## Findings

| # | Finding | Resolution |
|---|---|---|
| 1 | Bullet 1 reads "paid by the nursery , Not per child, not per parent." (title repeated) | Dropped the repeated phrase: "Not per child, not per parent." (as briefed) |
| 2 | first10 body starts "first 10 nurseries. They keep..." (broken sentence, repeats heading) | "The first 10 nurseries keep whatever launch price we set, permanently, and decide what we build next. We are new. That is exactly why this is worth it." Owner to confirm |
| 3 | No price anywhere | Intentional; none invented |
| 4 | The three "PNG" illustrations are animated GIFs (375x375, 1.0 / 1.4 / 0.7 MB) | Originals in `assets-original/`; shipped as animated WebP (0.2 / 0.27 / 0.32 MB) |
| 5 | Green text `#76945C` (3.4:1) in the school title and "Talk to us" | `primary-cta-strong` per DECISIONS #1 |
| 6 | Check icon fill hard-coded | Re-coloured to `currentColor`, `primary-cta-strong` |
| 7 | No AR frame for this section | Drafted (see `arabic-review.md`) |
| 8 | Wave direction | `up` + shadow, confirmed by the render (scallops point up) and consistent with Security/FAQ |
