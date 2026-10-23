# Visual responsive QA (art-director pass)

Scope: `/en/` at 360, 390, 430, 600, 768, 820, 1024, 1180, 1280, 1440, 1920; `/ar/` at 390, 768, 1024, 1440; landscape phone 844x390 (EN + AR full page, EN viewport states). `src/` untouched (read-only).

Method: headless Chrome over CDP, full-page captures cut into 900px slices (`docs/design-shots/review/<lang>-<W>x900-sNN.png`; slice N covers y = (N-1)*900 .. N*900), plus viewport-state shots (`state-<lang>-<WxH>-{top,menu,sec-pricing,sec-faq,sec-contact,dialog}.png`). Helper scripts added: `docs/tools/vq-cap.mjs` (slices) and `docs/tools/vq-state.mjs` (viewport states). Full-page shots use reduced-motion emulation; state shots do not.

Ignored on purpose: dashed red markers (dev only) and the dark pill at the bottom of the first screen (Astro dev toolbar, `astro-dev-toolbar`, not shipped). AR desktop full-page slices look shifted ~117px right with a blank strip on the left: that is a CDP clip artefact in RTL, not a layout bug (DOM check: scrollWidth = 1440, nothing outside the viewport; `state-ar-1440x900-top.png` is correct). No horizontal overflow at any width.

Counts: S1 = 1, S2 = 10, S3 = 15.

## Root causes behind "components look strange in responsive"

1. `BlobCard` chooses outline by the card's own width (container query). The same component flips between hand-drawn scallops and a plain rounded rectangle as the grid reflows, so shape language changes across widths and even within one screen (see #2).
2. Cards keep a Figma aspect ratio / `min-h` that was drawn for a different amount of text, so cards are 40-55% empty at 390-1180 (#3) and cramped at 1280-1440 (#4).
3. There is no `text-wrap: balance` / `pretty` on headings and body copy (only a few spots use `text-balance`), so widows and leading separators appear at every breakpoint (#7, #8).
4. Two fixed floating controls (pause toggle bottom-start, WhatsApp bottom-end) sit inside the 16-32px gutters and over content at every width below ~1280 (#9).

## S1 (broken)

### 1. Day timeline, card 7 "The day, all in one place": UI chips cut off mid-word, all widths (effort S)
- Where: Day section, last card. `en-390x900-s07.png` (bottom), `en-600x900-s09.png`, `en-768x900-s05.png` (right card), `en-1024x900-s05.png`, `en-1440x900-s05.png`, `ar-1440x900-s05.png` equivalent.
- What: the banner reads "New Update from the Classro", the stats card "Not Arriv", the attendance header avatars are sliced. Text ends at the dashed card border like a rendering bug, not a deliberate bleed.
- Why: `src/components/sections/day/cards.ts` lines ~154-155: banner `x:294, w:374` (right edge 668) and stats `x:294, w:343` (right edge 637) in a 588-wide design frame; `DayCard.astro:67` has `overflow-hidden`. 80px and 49px (design px) are clipped.
- Fix: keep right edge <= ~560. Banner `x:270, w:290`, stats `x:270, w:290` (or scale both layers by 0.78 and keep x:294 where the left notices card is narrowed). If the bleed is wanted, mask it with a fade (`mask-image: linear-gradient(to right,#000 85%,transparent)`) so it reads as intentional. Re-check RTL: `x` is start-edge based, so one change covers AR.

## S2 (clearly odd)

### 2. Blob card shape flips between scalloped and plain rounded (effort M)
- Where / widths: Features (scalloped 390-1180, plain rounded at >=1280 4-col: `en-1180x900-s06.png` vs `en-1440x900-s06.png`); CTA band under Setup (rounded <900px container: `en-768x900-s08.png`, `en-820x900-s08.png`; scalloped blob at 1024+: `en-1024x900-s08.png`); Pricing main card (rounded at 768: `state-en-768x1024-sec-pricing.png`; blob at 1024: `en-1024x900-s11.png`); Commitments (rounded cards at 768: `en-768x900-s10.png`; scallops at 1024: `en-1024x900-s10.png`). At 1440 the page shows plain Features cards directly above scalloped Setup cards and a scalloped Security block.
- Why: `src/components/ui/BlobCard.astro` shows the SVG only when the card >= 75% of native width (`@min-[288px]` etc.) and falls back to `rounded` below.
- Fix: pick one language. Cheapest: make the fallback a CSS scalloped edge (same radius/stroke, e.g. `border-radius: 28px` plus the existing stroke) and lower the SVG thresholds so Features stays scalloped at 4-col (feature native 384, 4-col card is ~282px: use a dedicated narrower SVG or `preserveAspectRatio="none"` with `vector-effect: non-scaling-stroke`). Alternatively make every fallback identical (rounded 28px, 3px stroke) and use scallops only for hero-level blobs.

### 3. Features cards: half the card is empty, 390 to 1180 (effort S)
- Where: `en-390x900-s08.png` (cards ~300px tall for 2 lines of copy, icon floating bottom-end), `en-600x900-s09.png`/`s10.png` (568x250, ~60% blank), `en-768x900-s06.png`, `en-1024x900-s06.png`, `en-1180x900-s06.png`.
- Why: `BlobCard` shape "feature" `min-h-[220px]` + aspect lock; content sits at the top and the icon is pushed to the bottom with `flex-1`.
- Fix: below `xl`, lay the card out as a row (icon 56px at start, title + text beside it) and drop `min-h`; or keep the stack but set `min-h:0` and put the icon above the title like Security cards do. Result ~140-170px cards, no void.

### 4. Security (3-col) at 1180-1920: narrow side cards force 4-5 word lines and widows (effort M)
- Where: `en-1180x900-s09.png`, `en-1280x900-s10.png` ("Automatic." / "deleted" / "parent" alone on a line, title "Kept only as / long as / needed" on 3 lines), `en-1440x900-s09.png`, `en-1440x900-s10.png`, `en-1920x900-s09.png`.
- Why: side cards are ~234-290px wide while body and title sizes are the 1440 Figma sizes; the centre photo takes the room.
- Fix: grid `lg:grid-cols-[1fr_minmax(0,0.85fr)_1fr]` (photo narrower), body `text-base`/`text-lg` at lg-xl, card padding `p-6`, title `text-h3` -> one step down; add `text-wrap: pretty`. At 1024 (2-col + photo, `en-1024x900-s09.png`) the photo floats top-aligned with a void under it: put the photo full-width above the 2x2 cards below 1180.

### 5. Hero: widow "one." and a 2+1 CTA wrap, 768 to 1920 (effort S)
- Where: `en-1024x900-s01.png` ("one." alone), `en-1280x900-s01.png`, `en-1920x900-s01.png`; at 1440 the last line is "day one." (`en-1440x900-s01.png`). CTAs: "Book a free demo" + "Chat on WhatsApp" on row 1, "Watch the 2-minute tour" alone on row 2, left-hugging, with an unbalanced right side (all of those shots, also `en-768x900-s01.png`).
- Fix: `.hero-title { text-wrap: balance }` (gives 3 even lines at 1024-1280); `hero-actions`: make the third action a text link with play icon (no 56px pill) or give the text column `max-w` ~620 so three pills fit, else `grid grid-cols-2` with the primary spanning both.

### 6. Hero CTAs stretched at 480-767 (effort S)
- `en-600x900-s01.png`: three 570px-wide pills stacked under a 3-line H1; reads as banner bars. Fix: `sm:max-w-[420px]` or `min-[480px]:grid-cols-2` with primary spanning; keep full width only below 480.

### 7. Headline/sub-copy widows everywhere (effort S, global)
- Measured: last line < 20% of container for 20+ headings/paragraphs. Worst: "Care." alone (Security H2 at 600/768/820, `en-768x900-s08.png`, `en-820x900-s08.png`; Final CTA "Care." at 768/1024, `en-1024x900-s15.png`), "close" alone (Day H2 at 600/768), "minutes" (Setup H2 at 768), "day." (Setup lead at 1024-1440), "next." (first-10 card at 1440, `en-1440x900-s12.png`), FAQ answers.
- Fix (global.css): `h1,h2,h3{text-wrap:balance} p,li{text-wrap:pretty}`. Sentence-case the Security H2 ("Your data is safe. Your focus stays on care.") for consistency; Setup steps and CTA also use Title Case.

### 8. CTA band headline starts line 2 with the separator, 768-820 (effort S)
- `en-768x900-s08.png`, `en-820x900-s08.png`: "No card, no commitment / • In Arabic or English". At 390 the bullet lands mid-line (`en-390x900-s12.png`).
- Fix: render as two spans: `<span class="whitespace-nowrap">No card, no commitment</span> <span aria-hidden>·</span> <span class="whitespace-nowrap">In Arabic or English</span>` and hide the separator when it wraps (`hidden sm:inline` + `block` first span), or just break after "commitment" below 900.

### 9. Floating controls cover content (effort S-M)
- Pause toggle (44px, `start-4 bottom-4`) and WhatsApp FAB (56px, `end-4 bottom-4`): `state-en-390x844-sec-pricing.png` (FAB covers the end of "Not per child, not per parent."; toggle sits over the check icon column), `state-en-768x1024-sec-pricing.png` (toggle covers the first column of the intl-school card icon, FAB the first-10 card icon), `state-en-844x390-top.png` (toggle hides "Stop" at the start of the hero paragraph), `state-en-390x844-dialog.png` (both peek around the dialog). At 1440+ they are in the margin and fine.
- Fix: FAB 48px and toggle 36px below `lg`; offset 12px; hide the FAB while `#home` WhatsApp CTA or `#contact` is in view (IntersectionObserver); move the pause toggle into the footer/header on touch widths. Add `scroll-padding-bottom` (already noted) and `padding-inline-end:72px` on last list items is not needed once the FAB is smaller.

### 10. Commitments cards almost invisible (effort S)
- `en-1440x900-s10.png` (bottom), `en-1440x900-s11.png`, `en-1024x900-s10.png`, `en-1280x900-s10.png`: fills `#f3f5e8` / light peach on `#fffff5` with no stroke give ~1.07:1 edge contrast, so the scallops read as smudges; the wide 5th card (1200x183 shape) has very tight, compressed scallops on the sides unlike the others; icons touch the top edge (`You can talk to a human`, `en-1440x900-s11.png`).
- Fix: add the same 2px outline the Security/Feature cards use (`stroke-green` / `accent`), or darken fills one step (`#eaf0d8`); give the wide card its own lower-frequency path or use the plain rounded fallback; inset icons 12px from the top.

### 11. Landscape phone 844x390 (effort S)
- `state-en-844x390-top.png`, `state-en-844x390-sec-pricing.png`: sticky header is 80px = 21% of the viewport, first screen shows only H1 + paragraph start (no photo, no CTA), toggle covers the paragraph. Section headings sit under the 80px header with ~15px clearance.
- Fix: `@media (max-height:500px){ header{height:56px} }`, hide the toggle or reduce it, and drop the hero top padding to 24px.

## S3 (polish)

12. Hero photo detached from container at 1920 (`en-1920x900-s01.png`): photo runs to the viewport edge while text sits in the 1200 container, leaving a 300px dead gap; header logo/CTA sit 33-40px outside the content column at 1440/1920 (logo x=87 vs H1 x=120). Fix: give header the same `Container` max-width; cap photo `max-w` and align to container end. Effort S.
13. Compare table (`en-1024x900-s06.png` bottom, `en-1440x900-s07.png`): corner header "The job" is ~12px while row labels are ~22px: hierarchy inverted. Make it `sr-only` or same size as row labels. Effort S.
14. Testimonials 3-up at 768-1024 (`en-768x900-s02.png`, `en-1024x900-s02.png`): 218px cards, names wrap to two lines, quote starts at different y because content is vertically centred; at 390 the quote glyph + heading layout is fine. Fix: `align-self:start` text, `min-h` shared via grid `items-stretch` and `justify-start`. Effort S.
15. Day titles wrap on the dash at 2-col widths (`en-768x900-s03.png`: "8:15 AM -" / "Room overview", "2:00 PM -" / "Parent check-in"). Fix: time in a nowrap span, title on its own line (`block`) at all widths. Effort S.
16. Day cards in single column alternate "text top / phone bottom" and "phone top / text bottom" (`en-390x900-s04.png`..`s07.png`), so rhythm jumps; and the "Today's Attendance" overlay chip is wider than its phone (`en-600x900-s04.png`, `en-1440x900-s03.png`) and covers the status bar. Fix: keep one order below `md`; scale the chip with `--u * 0.8`. Effort S-M.
17. Region chips wrap with an orphan "United States" at 390 (`state-en-390x844-sec-pricing.png`, `en-390x900-s16.png`); in the footer the label is start-aligned while chips are centred (`en-390x900-s22.png`). Fix: chips `flex-nowrap overflow-x-auto` or smaller padding to fit 3; centre the label with the chips. Effort S.
18. FAQ rows span 960-1200px with 25-character questions (`en-1024x900-s14.png`, `en-1440x900-s14.png`): long empty middle between question and "+". Fix: `max-w-3xl` or two columns at `xl`; centre the heading column accordingly. Effort S.
19. Security at 768 (`en-768x900-s09.png`/`s10.png`): 2x2 blob cards of unequal heights, ragged bottom; give grid `items-stretch` and `h-full`. Effort S.
20. Founders: at 390 the 256px portrait is offset start/end alternately and leaves ~100px void (`en-390x900-s19.png`, `s20.png`); at 768 card 1 is inset 43px and card 2 32px (`en-768x900-s13.png`). Fix: centre portrait below 640, equal insets above. Effort S.
21. Setup rail (1024+, `en-1024x900-s07.png`, `en-1440x900-s08.png`): dashed bracket starts ~100px under the lead copy and connects only to dots, leaving a blank band; shorten the bracket to 40px or draw it from the badges up. Effort S.
22. Setup + CTA band bottom padding larger than top at 1440 (`en-1440x900-s08.png`, `s09.png`): blob band has ~110px under the buttons vs ~55px above. Fix: vertically centre content in the blob (`flex items-center` with `min-h`). Effort S.
23. Mobile menu pushes the page down with no backdrop or scrim (`state-en-390x844-menu.png`) and no active-section cue other than the underline on Home. Fix: overlay + dim, or keep, but add `border-b` shadow. Effort S.
24. Gap between Setup CTA band and Security band at 390 (`en-390x900-s12.png`/`s13.png`): green band touches a tinted section with 20px; add `mt-8`. Effort S.
25. Type scale leaps: H1 38px at 390 -> 44px at 768 -> 46px at 1024, hero H2 36px at 768 against 48px at 1440; the 600-767 range (single column, 568px-wide cards) looks like a stretched phone layout. Fix: add a `sm` two-column for Features/Security at 560+, tablet gutters of 32px already fine. Effort M.
26. Title-Case mixing (Setup step titles, Security H2, CTA labels "Be The First Partner") vs sentence-case elsewhere: copy consistency. Effort S.

## What looks good
- No horizontal overflow at any width, EN or AR; AR RTL mirrors correctly (header, hero, CTA icons, day cards, blob art is unmirrored by design, rings flip with `rtl:-scale-x-100`).
- Header + mobile menu + dialog: clean at 390 and 844x390; dialog scrolls and keeps the close button reachable; 16px inputs.
- Hero photo, wave dividers and footer wordmark scale cleanly; scallop dividers keep their 72px tile (no stretched scallops) from 360 to 1920.
- Compare cards (mobile stack) and the table (>=768) are legible, with strong A/B contrast.
- FAQ numbered rows, Pricing main card (calendar icon + checklist), founders' green blob portraits (1024+) and the 4-step Setup row at 1024+ feel designed and balanced.
- Typography is consistent; Arabic hero and Day headings read well at 390 and 1440.
