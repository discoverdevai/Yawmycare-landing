# 05 · Features: spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Features.astro` (`locale` prop only); preview `src/pages/[lang]/preview/features.astro` |
| Section | `<Section id="why" headingId="features-title" wave="up" shadow>`; `SectionHeader` title only |
| Cards | `ul[role=list]` of `BlobCard as="li" shape="feature"`; `h3` title + `p` body + illustration pinned to the bottom |
| Equal row heights | `li` is a flex column, BlobCard's frame is `flex-1`, so the blob fills the grid row even when one card wraps more |
| Grid | 1 col <768, 2 cols ≥768, 3 cols ≥1024; gaps 24 / 32 (24 / 24 below 1024) |
| Padding | `p-6`, `p-8` from 1280 (at 1024 the 3-col cards are ~300 wide, so 32px padding would crush the copy) |
| Illustrations | `src/assets/features/<id>.webp` (animated, 220×220) + `<id>-still.webp`; `<picture>` swaps in the still for `prefers-reduced-motion: reduce`; `<img width=110 height=110 loading=lazy decoding=async alt="">` |
| Why not `<Image>` | it would re-encode the already lossy animation; files are pre-optimised by `optimise-illustrations.mjs` |
| i18n | `sections.features`: `title`, `arabicBadge`, `items[{id,title,body}]` (6, same order in EN and AR) |
| RTL | logical props only; grid order flips; illustrations and blobs not mirrored; AR card 5 gets a small "عربي" pill (AR locale only) |
| Arabic | drafted, see `arabic-review.md` |

## Acceptance
- No horizontal scroll at 375 / 768 / 1024 / 1440 in both locales.
- Cards 384×312 at 1440 with licensed fonts; 3px `stroke-green` outline via the kit blob.
- One `h2`; six `h3`; section labelled by the h2; focus order = DOM order.
- GIFs lazy loaded; reduced-motion shows a still; no console errors.
