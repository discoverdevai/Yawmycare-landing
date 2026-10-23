# 11 · FAQ — Spec

| Item | Decision |
|---|---|
| Component | `src/components/sections/Faq.astro`, props `{ locale, initialOpen?: number[] }` (1-based, for previews only; default none open) |
| Section | `<Section id="faq" headingId="faq-title" wave="up" shadow gap="tight">` + `SectionHeader` (h2 "You might be wondering") |
| Row markup | `div[data-faq-item]` > `h3 > button[aria-expanded][aria-controls]` + `div[role=region][aria-labelledby]` |
| Behaviour | Inline vanilla script: click / Enter / Space (native button) toggles; rows independent (multi-open); ArrowUp/Down/Home/End move focus between questions |
| Animation | `grid-template-rows` 0fr → 1fr, 0.3s, only under `prefers-reduced-motion: no-preference`; closed inner has `visibility:hidden` after the collapse so it leaves tab order and the accessibility tree |
| No JS | `[data-faq]:not([data-js])` keeps every answer visible |
| Structured data | `FAQPage` JSON-LD built from the same i18n items, per locale (`inLanguage`), `<` escaped |
| i18n | `sections.faq.title`, `sections.faq.items[].{question, answer}` (13 items, same in EN/AR) |
| Responsive | Same layout at all widths; question text wraps; badge and icon `shrink-0`; type from `text-title` / `text-lead` |
| RTL | Logical utilities only (`text-start`, symmetric `px-*`); badge at the start, icon at the end; icons not mirrored |

## Acceptance
- 13 rows, numbered, 72px closed at 1440, 2px `primary-cta` border and minus icon when open.
- Keyboard: Tab to each button, Enter/Space toggles, `aria-expanded` follows state, closed panels not focusable or readable.
- JSON-LD has 13 Questions in each locale.
- No horizontal scroll at 1440 / 1024 / 768 / 375; no console errors.
