# 01 · Header — Spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Header.astro` (`locale` prop). Slot it in `BaseLayout`'s `header` slot |
| Kit used | `Container` (content + `wide`), `WaveDivider` (down, `bg-primary-bg`, no shadow), `Button` (`social-bar`, `icon`, `primary`, `outline`), `Logo` |
| i18n | `sections.header`: `topbar.socialLabel`, `nav.label`, `nav.menu`, `nav.items[{id,label}]` (9). Shared: `brand.tagline`, `social.*`, `cta.bookDemo`, `a11y.switchLanguage` |
| Anchors | `#home #day #why #setup #security #commitments #pricing #founders #faq` (ids built by other sections) |
| CTA contract | Book a Demo: `href="#demo" data-demo-open` |
| Language switch | `<a href>` = same pathname with `/en` ↔ `/ar` (`otherLocale()`), `hreflang`, aria-label `a11y.switchLanguage`; JS appends the current `#hash` on click |

## Responsive
| Width | Layout |
|---|---|
| >= 1360 | Full row: logo, 9 links, language icon, Book a Demo (1280 container). Links gap 8, AR links 16px |
| 768–1359 | Logo; language icon + Book a Demo + menu button. Menu panel (in flow, under the row) stacks the 9 links |
| < 768 | Logo + menu button. Panel adds Book a Demo + language (outline button showing the other language's name) |
| Top bar | Tagline hidden below 640 (socials centred); wave height 68 (<768) / 76 |

## RTL
Flex order follows `dir`; icons, logo and waves are not mirrored; the wave is symmetric.

## Behaviour (vanilla JS, progressive)
- Without JS: panel visible/stacked (class `js` is added by a tiny inline script).
- Toggle button: `aria-expanded`, `aria-controls="nav-panel"`; Esc closes and returns focus to the button; link click, outside click and growing past 1360 close it.
- Scroll spy: IntersectionObserver band at 35–40% of the viewport sets `aria-current="location"` on the matching link(s); styled as the active underline.

## Acceptance
- [x] 1440 EN matches Figma geometry (header 180px, nav row y=100, h=80)
- [x] 9 links reachable by keyboard at every width; visible focus rings
- [x] No horizontal scroll at 375/768/1024/1440 in EN and AR
- [x] `astro check` 0 errors; no console errors
