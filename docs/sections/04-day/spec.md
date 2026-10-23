# 04 · A day at your nursery — Spec

| Piece | File |
|---|---|
| Section (`<section id="day">`, `Section wave="down" shadow`, `SectionHeader` h2) | `src/components/sections/DayTimeline.astro` (prop `locale`) |
| Card (text + picture stack) | `src/components/sections/day/DayCard.astro` |
| Layout data (tone, text position, layer coordinates, `datetime`) | `src/components/sections/day/cards.ts` |
| Concentric arcs (inline SVG) | `src/components/sections/day/Rings.astro` |
| Copy | `src/i18n/sections/day.{en,ar}.json` (`title`, `lead`, `timelineLabel`, `items[7]{time,title,body,alt}`, `summary{title,body,alt}`) |
| Images | `src/assets/day/*` (original hand photo + arc SVGs in `assets-original/`) |

## Semantics
- `<ol role="list" class="contents">` of 7 `<li>`. The closing card is not a time slot, so it is a `<div>` outside the list, in the same grid. Each card `h3` = `<time datetime="07:30"><bdi>7:30 AM</bdi></time> - Drop-off`.
- Section `aria-labelledby="day-heading"`; list `aria-label` from `timelineLabel`.
- One image per card carries the alt text (the main screen); secondary layers `alt=""`.
- DOM order is always text then pictures ("bottom" cards only reorder visually with `order-2`).

## Layout
| Width | Behaviour |
|---|---|
| >= 768 | 2 columns, gap 24 (cards 588 at >= 1248). The zig-zag is the checkerboard of tones. |
| < 768 | 1 column, card max 588 centred, radius 32. |
| Picture stage | Positioned in design px via `--u = 100cqw / 588` (the card is a size container); text keeps token sizes. Stage min-height = design height (x0.7 from 1280 up so a longer fallback font does not grow the card). |
| RTL | Grid columns swap; picture compositions mirror via `inset-inline-start`; arcs flip with `rtl:-scale-x-100`; images are never flipped. |

## Time format
EN 12-hour with a non-breaking space ("2:00 PM"). AR Western digits + ص / م inside `<bdi>` (matches the other sections' Western digits).

## Acceptance
- Matches Figma at 1440 (cards 588 x 695, 8 cards, 3195 px section height) in EN and AR.
- No horizontal scroll at 1440 / 1024 / 768 / 375. No console errors. `astro check` 0 errors.
- All images via `astro:assets`, `loading="lazy"`, explicit width/height, webp, srcset widths.
