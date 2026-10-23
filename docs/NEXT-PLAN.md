# Next plan: responsive fixes + design + app coverage

Sources: `docs/reviews/visual-responsive.md` (S1=1, S2=10, S3=15), `docs/research/app-coverage.md`, `docs/research/figma-inspiration.md`, `docs/DESIGN-FIXES.md`.

## Root cause of "strange components"
`BlobCard` switches between scalloped SVG and a plain rounded card by its own width, and cards keep a Figma aspect ratio / min-height drawn for different text. The same component changes shape across widths, and cards end up half empty or cramped. Fix the pattern once, not per section.

## Wave 1: responsive fixes (no owner input)
| # | Fix | Where | Severity |
|---|---|---|---|
| R1 | Day timeline card "The day, all in one place": notice/stats chips cut off ("Classro", "Not Arriv"); shrink layers so right edge <= 560 of the 588 frame, or fade the bleed | `day/cards.ts`, `DayCard.astro` | S1 |
| R2 | One shape language: standardise the fallback (plain rounded card with the same fill/stroke) and move SVG thresholds so one screen never mixes both; drop min-heights and aspect locks that leave empty areas | `BlobCard`, Features, CtaBand, Pricing, Commitments | S2 |
| R3 | Features cards 40-60% empty at 390-1180: icon beside the title below `xl`, remove `min-h-[220px]` | `Features.astro` | S2 |
| R4 | Security 3-col at 1180-1920: narrower photo column, smaller type, photo on top below 1180 (kills 4-5 word lines and the void under the photo) | `Security.astro` | S2 |
| R5 | Hero: H1 lone-word last line, third CTA wrapping alone, three pills stretching to ~570px at 480-767: `text-wrap: balance`, tour button as text link, cap CTA width / 2-col grid | `Hero.astro` | S2 |
| R6 | Global widows: `h1,h2,h3 {text-wrap: balance}`, `p,li {text-wrap: pretty}` | `global.css` | S2 |
| R7 | Setup CTA band 768-820: second headline line starts with "• In Arabic or English": nowrap spans, hide bullet on wrap | `CtaBand` / Setup copy | S2 |
| R8 | Floating buttons cover content: smaller FAB/toggle, hide the FAB while the hero WhatsApp CTA is in view, move the pause toggle (e.g. into the footer on small screens) | `WhatsAppFab`, `MotionToggle` | S2 |
| R9 | Commitments cards 1024+: fill is ~1.07:1 vs page, no stroke, scallops look like smudges; add outline or darken fill; fix compressed scallops on the wide 5th card | `Commitments.astro`, shapes | S2 |
| R10 | Landscape phone (844x390): sticky header 80px eats 21% of the viewport: compact header on short viewports, toggle clear of text | `Header.astro` | S2 |
| R11 | Page length (20k px at 375): merge/trim sections on mobile (e.g. collapse day timeline to 4 cards, show 6 FAQ + "more", shorter compare cards) | sections | S2 |
| R12 | The 15 S3 polish items in the report | various | S3 |

## Wave 2: app coverage (needs the owner's confirmation on claims)
| # | Change | Figma nodes |
|---|---|---|
| A1 | Hero product composite: owner dashboard + parent home + admin mobile app instead of the toddlers photo | `1659:29977`, `606:38038`, `598:106917` |
| A2 | Owner / Teacher / Parent switcher (4 capabilities per role, from real screens) | `1659:29977`, `876:53138`, `606:38038` |
| A3 | New feature cards: announcements and events; safety (incident log, allergies, authorised pickups) | `3030:52047`, `3034:55570`, `598:77462`, `3023:48843`, `598:77267`, `598:85336` |
| A4 | Reword unsupported claims: "Know who read it" -> "parents acknowledge incident reports"; "Respects your hours" -> "parent quiet hours + nursery opening hours"; narrow "export everything" to child records, attendance, incident log (`3047:12181`); verify "admin cannot read parent chats" against the admin chat design | copy |
| A5 | Replace the AI-looking security image with brand art or a dashboard crop | Figma `figma-inspiration.md` |
| A6 | Clean placeholders: use the cleaner teacher screen (`876:53138`) instead of the Lorem-ipsum crops | assets |
| A7 | Arabic: Figma has NO Arabic app screens; either get them from the designer or soften the Arabic claims (hero, features, commitments, FAQ, meta) | **owner decision** |

## Wave 3: design lift (from the Figma review)
Curved header wave from the parent app instead of repeating scallops; raised round chat button as the mobile CTA; pastel stat tiles with count-up (real numbers only); wavy blob masks on photos; animated attendance bar chart; hero H1 ~64px on 3 lines + one solid primary + a thin outline (match Figma).

## Needs from the owner
1. Confirm which product capabilities really exist (page claims not backed by screens: read receipts, quiet-hours notice, per-language daily report, admin can't read chats, full export).
2. Arabic app screens or a decision to soften the Arabic claims.
3. Everything already listed: WhatsApp/phone per region, prices, form endpoint, named customers, licensed fonts + SVG logo, legal text.
