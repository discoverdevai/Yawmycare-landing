# 07 Security: spec

| Part | Detail |
|---|---|
| Component | `src/components/sections/Security.astro` (prop `locale`), helper `security/SecurityColumn.astro` (one `ul` of 2 `BlobCard as="li" shape="security"`) |
| Kit used | `Section` (`id="security"`, `headingId="security-title"`, `wave="up"`, `shadow`), `SectionHeader`, `BlobCard` |
| i18n | `sections.security`: `title`, `lead`, `imageAlt`, `items[4]` (`title`, `body`). Icons by index in the component (secure, cloud, server, copywriting) |
| Assets | `src/assets/security/{secure,cloud,server,copywriting}.png` (375), `center.png` (1176x1480, alpha). Served via `astro:assets` as WebP (icons 85 @1x/2x, centre 588x740 @1x/2x, q85), lazy |
| Layout >= 1024 | grid `282 / 1fr / 282`, gap 24; card gap 48; items centred. Order is DOM order, so in RTL the first column is on the right |
| Layout 768 | image on top (max 440), two columns of cards side by side |
| Layout 375 | one column: image, then the 4 cards |
| RTL | logical layout only; blobs, icons and image are not mirrored |
| A11y | one `h2`; cards are `li` with `h3`; icons decorative `alt=""`; centre image has i18n alt |

Acceptance: matches Figma at 1440 (cards 282 wide, image 588x740 centred, 24px gaps) · no horizontal scroll at 1440/1024/768/375 · AR mirrors columns · 0 console errors · `astro check` 0 errors.
