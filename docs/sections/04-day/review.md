# 04 · A day at your nursery — Review

**Verdict: PASS with notes.** Checked `/en/preview/day/` and `/ar/preview/day/` at 1440, 1024, 768, 375 (AR visually at 1440 and 375, EN at all four). No horizontal scroll, no console errors, `astro check` 0 errors, one `astro build` run OK.

## Matches Figma
- 8 cards at 588 x 695 (1440), 24 gap, green/peach checkerboard, 4px dashed borders, 50px radius, picture compositions positioned from the Figma coordinates and clipped at the card edge like the design.
- Section header, lead, 48px header gap, wave `down` with shadow.
- Time labels fixed: 7:30 AM, 8:15 AM, 10:00 AM, 12:30 PM, 2:00 PM, 4:30 PM, 8:00 PM.

## Deviations
| Item | Why |
|---|---|
| Brief said vertical timeline / zig-zag with a line; Figma is a 2 x 4 card grid | Followed Figma. No line; single column on mobile |
| Heading line-height 1.2 (Figma 1.0, 32px) | Foundation token; Arabic needs it. Cards stay 695 px tall at 1440 |
| Green stroke `border-stroke-green/80` instead of `#BAC9A8` | No raw hex; within a few RGB units of the Figma value |
| Dashed border drawn as an overlay above the pictures | Keeps Figma coordinates exact (a real border would shift children) |
| Image shadow uses `drop-shadow` (follows rounded alpha) instead of a box shadow | Same look, no square glow |
| 11 arc vectors merged into one inline SVG, colour via `currentColor` | Fewer requests, token colour |
| Hand photo pre-cropped to the visible area (1176 x 974); notices image pre-cropped | Avoids shipping a 3.3 MB / hidden 1624 px screenshot |
| Stage min-height x0.7 at >= 1280 | Fallback font (Fraunces) wraps longer than Recoleta; keeps 695 px cards |
| Fonts are stand-ins (Fraunces, Readex Pro) | Project-wide decision #9 |

## Weight (webp via `astro:assets`, srcset per image)
Desktop 1440, DPR 1: about 350 KB for all 14 images; DPR 2: about 650 KB. Each image is 5 to 76 KB at its displayed size. Source PNGs in `src/assets/day/` total 3.0 MB (build input only). All `loading="lazy"`, `decoding="async"`, explicit width/height.

## Open items (owner)
1. **No Arabic UI screenshots exist** in the Figma file; both locales use the same English-UI images. Not fabricated. Request Arabic/RTL app screens or accept English UI in the mockups. Alt texts are localised.
2. The 8:00 PM chat screenshot shows "Lorem ipsum" placeholder bubbles. Card 8 has a cut-off "New Update from the Classro..." panel (cropped in Figma by design). Owner to confirm both.
3. Arabic copy is drafted: see `arabic-review.md` (32 values).
4. The mock UI date is "March 2026" (Th 21) in all screens.

## Needs lead
Nothing. `index.astro` should render `<DayTimeline locale={locale} />` after Testimonials; the section brings its own `down` wave and `mb-(--section-gap)`.
