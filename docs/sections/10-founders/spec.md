# Section 10 · Founders — spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Founders.astro` (`locale` prop). `<Section id="founders" headingId="founders-title" wave="down" shadow gap="loose">` |
| Markup | `ul > li > div.grid` (photo `<Image>` + `BlobCard` containing `blockquote` (3 `p`) and `footer` with `cite` = name) |
| i18n | `sections.founders`: `title`, `founders[]` = `{ name, photoAlt, paragraphs[3] }` (EN and AR same lengths) |
| Images | `src/assets/founders/{rana-mustafa,mohammed}.png`, `<Image width=439 height=491 densities=[1,2] format=webp loading=lazy>`, alt from `photoAlt` |
| Kit change | `BlobCard` gets optional `flip` (mirrors the SVG outline; fallback card unaffected) |

## Responsive
| Width | Layout |
|---|---|
| >= 1024 | One grid cell: photo 36.58% wide (439/1200) on the start (row 1) / end (row 2) side, card behind it with 1.58% / 2.08% inset; content padding 39% photo side, 5% other side (= Figma offsets). Text 20px (24px from 1280), `max-w-prose` |
| 768 | Photo (72%, max 280px) above the card, aligned start / end alternately, overlapping the card by 24px; card falls back to the rounded shape (<886px wide) |
| 375 | Same stack, full-width card, photo 247px |

## RTL
- Row 1 photo moves to the right, row 2 to the left (grid `justify-self-start/end` follows `dir`); outline flips accordingly; photos and icon are not mirrored.

## Acceptance
- No horizontal scroll at 1440/1024/768/375 in EN and AR; card grows with longer Arabic text.
- One `h2`; section labelled by it; alt text from i18n; Arabic approved by the founders (see `arabic-review.md`).
