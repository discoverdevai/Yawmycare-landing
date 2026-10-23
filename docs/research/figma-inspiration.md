# Figma file inspection: Yawmy Care DD (`oSQUBKWEqG5XrY4sHCzjzy`), 2026-10-23

Read-only pass. No rate limit hit. Whole-page `get_metadata` outputs are 170 KB to 3 MB, so top-level frames were extracted from the saved XML.

## 1. File inventory (8 pages)

| Page (id) | Contents | Use for landing page |
|---|---|---|
| Landing page Design (`1001:3535`) | `1275:5543` original EN 1440x6934; **`1457:3895` Updated EN 1440x14233**; `1434:3715` AR 1440x6984; modals `1326:4089` (EN), `1437:4178` (AR) 1440x1024; `1400:3719` "logo" raster 1024x899. No mobile (375/390) landing frames. | Canonical layout. |
| Nursery Admin Dashboard (`1640:3535`) | ~75 desktop screens, 1440x1024+, **English only**: Dashboard (`1659:29977`, 1440x1144), empty state `1642:20628`, rooms `1697:37780`, enrollment `1724:30380`, profile menu `1663:32086`, notifications, add/edit/archive modals, room schedule `1717:69092`, children and teachers lists. | Owner dashboard visuals (hero, compare). |
| Parent UI App Design (`598:74094`) | 375x812 mobile screens in sections: Sign Up, Home (`598:75365`, `606:38038`), Daily Logs (`598:76336`), chat (`598:76508`), Announcement, Profile (media gallery, events, privacy), Sign In; "Design Notes" `598:131382`. | Day timeline phones. |
| Teacher UI App Design (`598:82112`) | 375-wide screens, two copies of every flow (set 1 at y=3079, set 2 at y=9360): Home and room details, child info (checked in / absent / no check-in), Daily Logs add meal/nap/medication/activity (`876:53138`), Media, Chat and Announcements, Incident report, Profile. | Teacher features. |
| Nursery Admin UI App Design (`598:105594`) | Mobile admin app: setup wizard, Home `598:106917` (375x1286), Rooms (~60 frames), Enrollment (~45), Chat, More, Sign In. | "Owner in your pocket" visual. |
| Wireframe (`56:3940`) | not opened (low value) | n/a |
| UX FLOW (`14:2`) | sections "Parent App-AI", "Parent Portal", "Teacher & Nursery Admin portal" (flow diagrams). | n/a |
| Sketch (`0:1`) | Component library (symbols: nav bar, cards, buttons, toggle, search, child card, logs card, incident report), `colors` `279:19941`, `font` `279:19946`, splash screens `921:70773`, ~50 stock image slots, **"YAWMY Landing Page Moodboard Directions" `1304:41322`** (1920x12828). | Brief and moodboard. |

Not present: Arabic app screens (no Arabic text in any app page; node names are English), mobile landing frames, SVG logo (raster only), brand illustration library, pricing/comparison frames, OG/social art, standalone icon library. Note the Teacher page holds a second copy of the flows (unlabelled) that is likely a revised version; check with the designer.

The moodboard brief (`1304:41329` to `1304:41359`) states: primary audience owners/managers/school admins; goal "showcase all platform applications" (Parent App, Teacher App, Admin Dashboard) and "increase demo requests"; structure Hero, About, Why Choose Us, Core Features, three apps, Benefits, Testimonials, FAQ, CTA, Footer; "landing page strictly adopts the same typography and palette as the mobile app". This backs adding the three-app showcase that the page lacks.

## 2. Product screens (downloaded to `docs/research/figma-assets/`)

All EN. There is no AR app design in the file, so Arabic RTL screens must be produced (mirror the EN frames; ask the designer) or built as HTML mockups.

| File | Node | Size | Lang | Suggested use |
|---|---|---|---|---|
| `admin-dashboard-1659-29977.png` (+`@2x`) | `1659:29977` | 1440x1144 | EN | Hero or "compare" product shot (owner view). Has "Good morning" teacher illustration, 4 coloured stat cards, attendance bar chart, recent activity. Sample data is clean (no lorem). |
| `adminapp-home-598-106917.png` (+`@3x`) | `598:106917` | 375x1286 | EN | Owner on phone beside the desktop dashboard; features section. |
| `parent-home-598-75365.png` | `598:75365` | 375x812 | EN | Hero phone / day timeline 7:30. Already in page. Also has a nice empty-state illustration. |
| `teacher-dailylogs-876-53138.png` | `876:53138` | 375x1060 | EN | 12:30 daily-logs card (cleaner than the cropped one). |
| `ref/lp-*.png`, `ref/moodboard-*.png` | `1457:3898`, `1532:31922`, `1592:43397`, `1589:43302`, `1592:43584`, `1457:4213`, `1304:41438` | | EN | Design reference renders (not for production). |

Logo: no vector exists. `logo-sheet-1400-3719-raw1..4.png` (1024x899 and 512x450) are raster variants of the mark; `logo-lockup-raw-1650-27724.png` (285x258) is the dashboard header lockup (mark + "Yawmy Care" wordmark). Vectorise raw1 (3 flat colours: green, terracotta, tan) with potrace/designer for the SVG. Brand illustrations: the only ones are the dashboard teacher figure (inside `1650:29614`, `1642:20628`) and empty-state illustrations in the Parent app (`598:75365`); both match the page's line style and could replace the AI-looking security image if exported (not done: >20 SVG limit per node, request child nodes).

Gaps for A5/B4: dashboard screenshot exists; bilingual parent app does not.

## 3. Mobile frames

No mobile landing-page design exists, so nothing to copy for header/hero/cards. The mobile *app* UI gives patterns worth echoing in the responsive page: curved header wave over day strip (`598:75365`), bottom nav with raised circular chat button (`598:106917`), pill buttons 48px high, 16px side padding, 20px card radius, soft pastel stat tiles. Stick to our current responsive implementation.

## 4. Fidelity gap (Updated EN `1457:3895` vs http://localhost:4323/en/ at 1440)

Deliberate changes excluded (single-row header, trimmed nav, no top strip, tighter rhythm, fewer scallops, WhatsApp button, price toggle). Remaining deviations:

1. Hero H1: design ~64px / 75px line pitch on 3 lines (Recoleta, 760px wide); ours 58px / 75.4px, wraps to 4 lines in a 737px column. Widen text column or drop to a 3-line break once Recoleta is licensed; the stand-in Fraunces is wider.
2. Hero image: design children crop is ~660px wide, bleeding over the scallop edge and tucked right (`1457:3898`); ours is similar (655x610) but hero total is 780px vs design 937 (incl. 76 strip). Check that the kids' shoulders overlap the scallop as in design.
3. Hero CTAs: design uses one solid primary plus a thin solid-outline tour pill; ours shows three buttons with dashed coral/red outlines, which reads busier and off-spec. Use solid 1px outline.
4. Pricing: design card has no region chips and no underlined "Ask for pricing" link; check list is plain. Ours is richer (acceptable). Heading 48px matches. Check marks in design are lighter green discs.
5. Features/day timeline (`1532:31922`): design cards have dashed pale-coral/green borders, uniform ~420px card width with phone bottom-cropped by the card edge; the page already echoes this. Design headline weight is Bold 600; verify Recoleta weight mapping (ours fw 600).
6. Footer: design is a compact 549px band: large logo mark centred, tagline, one row of 9 links, coral social discs, huge faded wordmark cropped at the bottom (opacity ~15%). Ours is 670px tall with a 170px wordmark and `-mt-(--wave-h)`; the wordmark is fine, but footer height and padding are ~120px taller. Social discs are coral-filled in design.
7. Fonts: Recoleta absent (Fraunces fallback), so optical weight, width and word spacing differ everywhere.
8. Founder section (`1592:43397`): design heading is left-aligned with portraits in wavy-edged green blobs (`radius ~ 60px scalloped mask`); keep this treatment, it is a distinctive brand moment.

## 5. Ten concrete upgrades (with references)

1. Dashboard + phone composite in hero: desktop dashboard (`1659:29977`) with the mobile admin home (`598:106917`) overlapping, replacing the toddlers or beside them. Moodboard brief demands "showcase all platform applications" (`1304:41335`, `1304:41359`).
2. Three-app switcher (Owner / Teacher / Parent) under the hero using `1659:29977`, `876:53138`, `598:75365`; tabs with a crossfade.
3. Curved header wave like the Parent app (`598:75365`) as the section-top shape of the product showcase instead of repeating scallops.
4. Raised circular chat button + pill nav from `598:106917` as the sticky mobile CTA (green disc, 56px, soft ring).
5. Pastel stat tiles (`1659:29977`: cream, mint, peach, grey) as animated count-up proof cards in the compare/benefits section ("20 children checked in").
6. Reuse the "Good morning" teacher illustration (`1650:29614`) and Parent empty-state illustration (`598:75365`) as the on-brand security/support image instead of the AI desk image; consistent line + flat green/coral.
7. Wavy blob masks for photos (`1592:43397`) applied to team/nursery photos and testimonial portraits, with a gentle blob morph on hover.
8. Day timeline progress rail: sticky clock chip that ticks 7:30 to 20:00 as cards scroll in (design cards at `1532:31922` are already time-led).
9. Bar-chart reveal: animate the attendance bars of the dashboard (`1659:29977`) growing in when visible, light-green bars with value labels.
10. Footer wordmark ink-in: huge faded "YAWMY CARE" (`1457:4213`) with a slow gradient sweep; coral social discs scale on hover.

## Blockers

- No Arabic app screens or mobile landing frames in the file.
- No SVG logo; vectorising the raster needs a designer or potrace.
- `download_assets` caps at 20 SVGs per node; illustration/icon export needs child node ids (e.g. icons inside `1650:29614`).
- Headless screenshot of our page was small (800px) so comparison is based on computed styles plus visuals; Recoleta is not installed so type deltas will shift once licensed.
