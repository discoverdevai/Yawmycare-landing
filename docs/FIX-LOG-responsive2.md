# Fix log: responsive pass 2 (R1-R12)

Spec: `docs/NEXT-PLAN.md` Wave 1, `docs/reviews/visual-responsive.md`. Shots: `docs/design-shots/r2b/` (slices `<lang>-<W>x900-sNN.png`, `states.png`, `d1440-sec.png`). Before shots: `docs/design-shots/review/`.

| # | Change | Evidence (before -> after) | Files |
|---|---|---|---|
| R1 | Summary card: banner and stats layers moved to x 276, w 280 (right edge 556 of 588) | "Classro"/"Not Arriv" cut -> full text, `en-1440x900-s05.png` | `day/cards.ts` |
| R2 | One shape rule (comment at top of BlobCard): scallops from 55% of native width, fallback = same fill + same stroke + `rounded-card`, no aspect lock, no min-heights (frames follow content, `stretch` for equal rows, Pricing rows still equal) | Features/Setup/Commitments/Pricing now scalloped at 390-1440; banners (cta-band, pricing, first10, founder-text, wide) plain only below ~660px | `ui/BlobCard.astro`, `CommitmentCard.astro`, `Pricing.astro` (first10 padding) |
| R4 | Security: grid 1 : 0.8 : 1 from 1180 (new `wide` breakpoint = 73.75rem in `global.css`), photo on top below 1180, cards `text-title` + `text-body(-sm)`, columns dissolve into a 2x2 grid (equal row heights) below 1180 | `d1440-sec.png`: 3-4 line cards, no void | `Security.astro`, `security/SecurityColumn.astro`, `global.css` |
| R6 | `h1-h3 {text-wrap: balance}`, `p, li {text-wrap: pretty}` in base layer | "Care." / "close" widows gone in headings | `global.css` |
| R7 | CtaBand title split on " · ": two stacked lines below 1000px card width (no leading bullet), one line with the dot above; sr-only separator keeps the name readable | 768-820 clean | `ui/CtaBand.astro` |
| R8 | FAB 48px (56 from 1280), toggle 36px (44px hit area) stacked above the FAB below 1280, start-margin from 1280; FAB hidden (`visibility`) while the hero WhatsApp CTA is in view (IntersectionObserver, `html[data-fab-away]`), toggle drops to the corner then | `states.png` | `ui/WhatsAppFab.astro`, `ui/MotionToggle.astro` |
| R9 | Commitment cards get a 2px outline (CSS stroke on the SVG path, same as the fallback border; green `stroke-green` / peach `stroke-accent-strong`), icons inset 12px, wide card no longer stretched | `d1440-sec.png` | `BlobCard.astro`, `CommitmentCard.astro` |
| R10 | `max-height: 500px`: 52px header, 40px logo | `states.png` (844x390) | `Header.astro` |
| R11 | New `ui/ShowMore.astro` disclosure (button, aria-expanded/controls; only under 768 with JS; no JS = everything visible). Day: 4 of 7 + summary card behind "Show the full day". FAQ: first 6 + "Show all questions" (arrow keys skip hidden rows; JSON-LD unchanged). Compare cards denser, testimonials tighter. i18n keys `showMore`/`showLess` EN+AR in day/faq. | Full-page height at 375 EN 20256 -> 18299, AR 20873 -> 18938 (these include other engineers' concurrent edits) | `ShowMore.astro`, `DayTimeline.astro`, `day/DayCard.astro`, `Faq.astro`, `Compare.astro`, `Testimonials.astro`, `i18n/sections/{day,faq}.*.json` |
| R12 | Done: #13 compare corner header sr-only, #14 testimonials top-aligned, #18 FAQ max-w 4xl at xl, #19 security rows equal, #22 CTA band symmetric padding. Not done (other owners / copy): #12, #15-17, #20, #21, #23-26. | | |

Notes: new Arabic strings (`عرض اليوم كاملًا`, `عرض كل الأسئلة`) need native review. Checked at 390/768/1024/1440 EN (+ AR 390/768/1440 captured; 1180 captured partially because the dev server dropped runs) and 844x390.
