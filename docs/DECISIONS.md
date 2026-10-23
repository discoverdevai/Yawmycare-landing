# Decisions log

Decisions taken on the owner's behalf on 2026-10-23 ("answer them by yourself"). Each one is reversible; the "Undo" column says where.

| # | Question (from the Section 00 audit) | Decision | Why | Undo |
|---|---|---|---|---|
| 1 | Button/text contrast (white on `#76945C` = 3.38:1, fails AA) | Buttons and green text use `--color-primary-cta-strong #5E7748` (>= 4.5:1 on every surface incl. the hero cream; first value #637C4D measured 4.48:1 on `surface-sec` and was darkened by the review). Hover `#526840` (6.1:1). Figma's `#76945C` stays for decorative fills (CTA bands, active underline) | Smallest darkening that passes WCAG AA for 18px bold text; hue unchanged so it still reads as the Figma green | `global.css` token values |
| 2 | Hero coral highlight words (`#E2725B` = 2.99:1) | `--color-accent-display #E06950` (3.2:1) for large display text | Large-text AA needs 3:1; barely visible change | `global.css` |
| 3 | Off-token colors | Snapped: `#FDF8ED`→`#FEF8ED`, `#F1F4E6`→`#F3F5E8` (1–2 units apart, invisible). Promoted to tokens: `#ADC697` stroke-green, `#F5A292` stroke-accent-strong, `#FCF1E6` accent-bg-soft, `#C7D8B6` wordmark (visibly different, so snapping would change the design) | Keeps the design faithful without raw hex in components | `global.css` + shape SVGs |
| 4 | CTA labels | Keep Figma's per-location wording from the Updated Version: nav and CTA bands "Book a Demo"; hero primary "Book a free demo"; hero secondary "Watch the 2-minute tour"; bands "Watch Demo"; modal submit "Book My Free Demo". All say "demo" | Figma is the source of truth; wording differences are deliberate by context | i18n JSON |
| 5 | Brand casing | **Yawmy Care** (owner stated). Footer giant wordmark stays Latin in both locales, styled uppercase by CSS only | Owner instruction; brand mark is not translated | `CLAUDE.md` |
| 6 | FAQ count (13 in Figma, 10 in PLAN.md) | Build all 13. Figma is the source of truth; PLAN.md was wrong | Design already approved | Section 11 spec |
| 7 | Footer nav items | Footer = header links + FAQ. "Founder" → "Founders" (section has two people) | Consistency | i18n JSON |
| 8 | Arabic copy for sections the AR Figma lacks (03, 04, 05, 08, 09, 10, 11) | I draft Modern Standard Arabic from the EN copy, every string flagged `"_review": true` in a separate tracking list. Needs native review before launch | Unblocks RTL layout work; not final copy | `docs/arabic-review.md` (created when first drafted) |
| 9 | Fonts (Recoleta, Expo Arabic: commercial, files not supplied) | Open-licence self-hosted stand-ins now; `@font-face` set up so dropping licensed WOFF2 files into `src/assets/fonts` switches over with no code change. **Licences are still the owner's to buy**: this is a placeholder, not an answer | Cannot license fonts on the owner's behalf | `src/styles/fonts.css` |
| 10 | Logo (285×258 PNG only) | Use the PNG at 2× with explicit dimensions for now; SVG still requested from design | Not resolvable by me | `ui/Logo.astro` |
| 11 | Feature illustrations (6 animated GIFs, 4.3 MB, licence unknown) | Treated as the owner's own Figma assets. Convert to animated WebP/MP4 in the enhance step; originals kept in `docs/` | They come from the owner's design file; if they are third-party stock, the owner must confirm the licence | Section 05 |
| 12 | Social buttons 40px (touch target) | Keep 40px visual, 44px hit area via padding/pseudo-element | Design-neutral a11y fix | `ui/Button.astro` |
| 13 | Hover/focus/pressed/disabled states (absent in Figma) | Defined in code with tokens: hover = `primary-cta-hover`; focus-visible = 3px ring in `primary-text`, 2px offset; disabled = 50% opacity, no pointer | Required for keyboard users | `ui/Button.astro` |
| 14 | Form-field border `#D8D8D8` (1.4:1, fails WCAG 1.4.11 non-text 3:1) | New token `--color-field-border #898989` (3.5:1) for input borders; `stroke-gray` kept for decorative hairlines | Fields must be perceivable; same minimal-change rule as #1/#2 | `global.css`, `DemoModal.astro` |
| 15 | Owner waived per-section sign-off; build all sections in parallel (2026-10-23) | 12 builder agents, then lead review/fix + full-page responsive pass | Owner asked to finish everything incl. Arabic | `docs/REVIEW-QUEUE.md` |

## Still genuinely open (cannot be answered by me)
- Buy/supply Recoleta (Regular, Medium, SemiBold, Bold, Black) and Expo Arabic (Book, Medium, Bold) web licences.
- Confirm the six GIF illustrations are owned/licensed.
- Provide the logo as SVG.
- Native Arabic review of drafted copy.
- Demo-form destination and demo video URL.
