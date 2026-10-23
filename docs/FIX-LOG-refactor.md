# Fix log: refactors (FIX-PLAN #14, #15) + MotionToggle

No behaviour or look changes intended. Verified with headless Chrome over CDP (`docs/tools/refactor-capture.mjs`), `astro check` (0 errors, 0 warnings, 0 hints), `node docs/tools/check-i18n-parity.mjs` (OK), `npx astro build` (OK, 2 pages), prettier on every touched file.

## Line counts

| File | Before | After |
|---|---|---|
| `sections/DemoModal.astro` | 674 | 235 (markup + 3 panels + CSS + 4-line `<script>`) |
| `scripts/demo-modal.ts` | - | 357 (typed module, `initDemoModal()`) |
| `sections/demo/DemoField.astro` | - | 71 (replaces ~70 duplicated lines) |
| `sections/Setup.astro` | ~100 | 81 |
| `sections/FinalCta.astro` | ~72 | 27 |
| `ui/CtaBand.astro` | - | 111 |
| `ui/BlobCard.astro` | 189 | 234 (docs for the 3 new props + the logic) |
| `ui/MotionToggle.astro` | 57 | 66 |

## What moved where

**#14a `ui/CtaBand.astro`** (props: `locale`, `title`, `lead`, `size="band"|"final"`, `headingLevel`, `id`, `fill`, `class`). Shared by Setup (`size="band"`, h3, `cta-band`) and FinalCta (`size="final"`, h2, `final-cta`). It owns the two buttons too (Book a Demo with `data-demo-open`, Watch demo from `resolveLink(demoVideoUrl)`), so there is no buttons slot: both bands render the identical pair. The two intentional differences stay as per-size literals (Setup: lead in `ink-inverse` outside the header, container breakpoint 640, `grow basis-0` buttons; Final: lead inside `SectionHeader`, breakpoint 560, `flex-1` / 386px buttons). Unifying those would change the look (lead colour `ink-inverse` vs `primary-bg-light`, 62ch cap), so it is left as a design decision.

**#14b FinalCta uses `BlobCard shape="final-cta"`** instead of its hand-made blob. The 910px blob cannot sit in BlobCard's aspect-locked frame (the section would be 910px tall), so BlobCard got `bleed`: frame is as tall as its content, the SVG keeps its native height pinned to the top and is clipped by `overflow-y-clip` on the card; the rounded fallback fills the frame. FinalCta is now a `<section>` + `Container` + `CtaBand`.

**#14c `BlobCard stretch`** (`true | "sm" | "lg"`, plus `fillContent`). `stretch` = card is a flex column and the frame is `flex-1`; `fillContent` additionally makes the frame a flex column so a `flex-1` / `mt-auto` content layer fills it (only Features needs that; making it the default would move `first10`'s percent-positioned image where the frame is taller than the content). All 8 `[&>div]:flex-1` hacks removed (`grep "\[&>div\]" src` = 0): CommitmentCard, Features (`stretch fillContent`), Pricing x2, SecurityColumn (`stretch="lg"`), Setup step (`stretch="sm"`), Testimonials. The container-width thresholds (`@min-[441px]` ...) were not moved to `@theme` (review row 8, second half): not asked, still open.

**#15 DemoModal split.** Script moved verbatim to `src/scripts/demo-modal.ts`, imported from a 4-line `<script>`; Astro bundles it (`dist/_astro/DemoModal.astro_astro_type_script_index_0_lang.*.js`). Contract kept: `[data-demo-open]` / `a[href="#demo"]` / `#demo` hash, events `yawmy:demo-open` / `yawmy:demo-submit`, honeypot `company_website`, 2 s since-open timer + trusted-event check, endpoint handling (https only, dev simulates, prod "not connected"), focus return to `[data-nav-toggle]` when the opener is not rendered, persistent `role="status"` region. Small review items done on the way (row 20): stale eslint comment deleted, `inputs[1]!` replaced by a destructured `nurseryInput`, `Messages` now derived from `Dictionary["sections"]["demo"]`. `DemoField.astro` holds the label + required cue + 48px input + icon(s) + error line; text fields and the date/time pickers (`picker`) are one component. The `.demo-input` CSS stays in DemoModal (scoped to `#demo`).

**MotionToggle.** Keyboard verified (below). Below 640px the button was a 44px circle at 16px from the corner, floating over the start of full-width FAQ rows and buttons (9 interactive elements overlapped along the page at 375). Now `max-sm:` 36px (WCAG 2.5.8 min 24px), 8px from the corner, 80% opacity until hover/focus; `html { scroll-padding-bottom: 4.5rem }` keeps a keyboard-focused element out from under it (and the WhatsApp FAB). Overlap with FAQ rows at 375 is reduced, not eliminated (any fixed control overlaps something). 1440 unchanged (44px, no overlaps).

## Verification evidence

- **MotionToggle keyboard (CDP, real key events, 375 and 1440, EN):** Tab reaches it (5 presses), outline 2px solid `primary-text`; Enter -> `aria-pressed=true`, 16/16 `img[data-anim]` switched to the still; Space -> false, 0/16 stills (animations restored); Space again -> true, 16/16.
- **Before/after captures** (`docs/refactor-ref/before` taken before any edit; `after1` after the BlobCard + CtaBand work; `after4` final). Reduced-motion emulated for deterministic pixels; capture is stable (two runs of the baseline: all identical).
  - `before` vs `after1` (BlobCard `stretch`, `CtaBand`, FinalCta): **all 72 screenshots (Setup band, Final CTA, footer, dialog, 12 sections; EN + AR, 375 + 1440) byte-identical**. `measure.json` differs only in the 4 `#contact` entries, which have 2 extra rows (BlobCard's frame and fallback divs, no visual effect), and in content-layer heights inside stretched cards (the frame/content div, invisible).
  - `before` vs `after4` (DemoModal split): all dialog measurement rows identical in all 4 locale/width combos (every element rect + font size/weight/colour/background/padding/display, for the idle, validation-errors and success states); events `yawmy:demo-submit` `{status:"blocked",reason:"too-fast"}` then `{status:"success",simulated:true}`; status text, first focus `#demo-name`, `aria-invalid` ids and `aria-labelledby` identical. Dialog interiors at 1440 were pixel-identical (0 differing px, 50 px border ignored) in the run before the capture tool's dialog-clip change.
  - Production build served by `astro preview`: submit shows the "not connected" error panel and emits `{status:"error",reason:"not-configured"}`, EN 375 and AR 1440.
- **Focus return to the menu toggle:** the code is unchanged. In the current Header, Book a Demo is a visible button in the bar (another change made while this task ran), so the panel no longer has its own opener and focus returns to that button after Esc (correct: it is rendered). The fallback was tested by opening the dialog from a `display:none` `[data-demo-open]` at 375, EN + AR: after Esc `document.activeElement` is the `[data-nav-toggle]` button, menu `aria-expanded=false`.

## Caveats / hand-off

- **The tree changed under me while working** (new Proof, Compare, region switch, WhatsApp FAB, shortened Setup/Footer copy, a repo-wide prettier pass at 16:58). After that the full-page baseline no longer matches page-wide (e.g. the Setup band title now fits on one line: 356 px -> 348 px), so the final comparison rests on `after1` (captured before those edits, identical) plus the dialog rows. No git here, so no true control for the final state.
- The 375 dialog screenshots in `before` are not usable (the capture scrolled the wrong region for a top-layer element); the 375 dialog comparison is the measurement rows. `refactor-capture.mjs` is fixed for future runs.
- The WhatsApp FAB (other change) sits bottom inline-end, 56px, so the compact MotionToggle and it do not touch at 375.
- Tools added: `docs/tools/refactor-capture.mjs` (capture and `--compare`), `docs/tools/measure-diff.mjs`, `docs/tools/png-diff.mjs`. `docs/refactor-ref/` (38 MB of PNGs) can be deleted once reviewed.
- Dev servers for this project were already running (4323 dev, 4391 preview of `dist/`); `dist/` was rebuilt by my `astro build`.
