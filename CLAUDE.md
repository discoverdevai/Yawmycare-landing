# Yawmy Care — Landing Page

Bilingual (English + Arabic/RTL) marketing landing page for **Yawmy Care**, a nursery & international-school management platform for the MENA region. Built **section by section** from Figma, with a fixed agent pipeline per section (see `PLAN.md`, tracker in `TASKS.md`).

## Source of truth — Figma

File key: `oSQUBKWEqG5XrY4sHCzjzy` (Yawmy Care DD)

| Frame | Node | Notes |
|---|---|---|
| Landing page — **Updated Version** (EN) | `1457:3895` | **Canonical** layout & content. 1440 × 14233. |
| Landing page — AR | `1434:3715` | Older structure. Use it for Arabic typography/RTL patterns and existing AR copy only. |
| Book a Demo modal (EN) | `1326:4515` (inside `1326:4089`) | Form: Name, Nursery Name, Work Email, Preferred Date, Preferred Time. |
| Book a Demo modal (AR) | `1437:4595` (inside `1437:4178`) | RTL version of the same form. |

Figma MCP rules: call `create_session` once per task with the file key and reuse the `sessionId`. Load the `figma:figma-design-to-code` skill **before** any `get_design_context` call. Prefer `get_design_context` per section node, not the whole page (the full page exceeds output limits).

## Design tokens (from Figma variables)

```
primary/bgColor        #DFEBD1   primary/CTAprimarycolor #76945C   primary/textColor  #334722
primary/bglightColor   #F8FAEE   bg/whiteColor           #FFFFF5   bg/secColor        #FCFCEC
bg/tapsColor           #F3F5E8   sec/strokeColor         #F5F5DC   text/blackColor    #333333
text/grayColor         #535353   text/whitecolor         #FEFEFE   AccentColor/main   #E2725B
Accent/textColor       #B5503C   AccentColor/bglight     #FEF8ED   stroke/accentColor #FFCCC1
```

Type: EN headings **Recoleta** (h2 48/Bold, h3 32/Bold, H1 24/Bold, H3 18/Bold, H4 16/Medium). AR **Expo Arabic** (h1 62/Bold lh 1.5, h2 48/Bold, h3 32/Bold, h6 18/Bold, body-large 24/Book lh 1.5). Both are commercial fonts. Self-host licensed WOFF2 files only.

Layout: 1440 desktop canvas, 1200 content width (120 gutters), sections separated by a 76px wave divider vector ("Group 43/44"), and organic "blob" card shapes (vector backgrounds).

## Brand

Write the brand as **Yawmy Care** in all copy (owner decision). The Figma copy says "YAWMY CARE"; do not copy that casing into strings. The footer's giant wordmark is a visual treatment and may be styled uppercase with CSS only.

## Engineering conventions

- One component per section in `src/components/sections/`, shared primitives in `src/components/ui/`.
- All copy lives in `src/i18n/{en,ar}.json`. Never hard-code strings in components.
- RTL: use CSS logical properties only (`ms-/me-/ps-/pe-/start/end`), never `left/right`. `<html lang dir>` is set per locale.
- Tokens are defined once (Tailwind theme / CSS variables) using the Figma names. No raw hex values in components.
- Images: export from Figma, then serve as optimized AVIF/WebP with explicit width and height. Decorative vectors become inline SVG.
- Every section must pass at 1440, 1024, 768 and 375 widths in both locales before sign-off.

## Per-section working files

`docs/sections/NN-<slug>/` → `audit.md` (auditor) → `spec.md` (planner) → code (developer) → `review.md` (reviewer) → `enhance.md` (enhancer).
