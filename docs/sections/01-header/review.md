# 01 · Header — Review

Verdict: **PASS with notes**. Checked in the built-in browser at 1440 / 1360 / 1024 / 768 / 375, EN and AR (`/{en,ar}/preview/header/`, `/{en,ar}/preview/hero/`). `astro check`: 0 errors. No console errors.

| Check | Result |
|---|---|
| 1440 EN geometry vs Figma | header 180px, nav row y=100 h=80, top bar 76 with scalloped edge: match |
| AR mirror | tagline right, socials left, logo right, actions left: match AR frame |
| 9 links fit | EN and AR fit at 1360 and 1440 with no overflow; below 1360 the menu button is used |
| Menu | aria-expanded toggles, Esc closes and returns focus to the button, panel stacks 9 links; Book a Demo + language inside below 768 |
| Scroll spy | `aria-current="location"` follows `#why`, `#pricing` (tested in preview with stub sections) |
| Language switch | links to the same pathname in the other locale |
| Horizontal scroll | none at any width |

## Deviations from Figma
| What | Why |
|---|---|
| Menu below 1360 | 9 links + 2 actions cannot fit; the licensed Recoleta is narrower, so the breakpoint may be lowered to 1280 once the real fonts land |
| AR desktop links 16px (Figma 20px, 5 links) | 9 links at 20px are ~1000px wide and overflow |
| Link gap 8 (Figma 12), logo gap 32 (40) | stand-in fonts are wider |
| Tagline hidden below 640 | 265px tagline + 196px of socials do not fit at 375 |
| Active link text `primary-cta-strong` | contrast (DECISIONS #1) |
| "Founders" (Figma "Founder") | DECISIONS #7 |
| Not sticky | nothing in Figma implies it. A sticky header with the Book a Demo button would likely help conversion: lead's call |

## Open items
- Social URLs are `#` placeholders (`TODO(owner)` in `Header.astro`).
- Logo is the 285×258 PNG (DECISIONS #10).
- The menu panel is in flow (pushes the page down) rather than an overlay, so it also works without JS.

## Needs lead
- Wire `<Header slot="header" locale={locale} />` into `index.astro`.
- Another builder must create the anchor ids `#day #why #setup #security #commitments #pricing #founders #faq` and the `#demo` dialog (`[data-demo-open]`).
