# Fix log: art direction pass (2026-10-24, not committed)

Source: Figma `lvSYX3lP0DsHX7SsRU2fP1` (Art direction 14:2, Hero 7:2, Role switcher 10:2, Rhythm 11:2). Reference renders: `docs/design-shots/art/figma/`. Before/after captures: `docs/design-shots/art/before/`, `.../after/`, join sheets `.../joins/sheet-{en,ar}-{1440,390}.png` (`docs/design-shots/` is git-ignored). AR was captured with a viewport screenshot per scroll position (no `clip`), so the Arabic 1440 slices are real.

## Done
1. **One icon language.** `ui/Icon.astro` gains `tile` (+ `dot`): 2px rounded line in `primary-cta-strong`, one `primary-bg` circle offset down/end behind the glyph, optional single accent dot; tile size = 2x glyph or `[--tile:...]` override; RTL via logical insets. The 9 stroke icons were moved 1.5 -> 2px; 8 new line icons (`chat camera bell pin-check moon checks health sparkle`). Used in Features (6), Roles (one per role), Compare (4 jobs, table + cards), Setup (4 steps), Pricing (3 tiles). Animated WebP illustrations removed from Features and Pricing; `src/assets/features/` and 6 pricing WebPs deleted (nothing referenced them). `AnimatedImage` + the pause logic stay for the unpublished Security section.
2. **Device frames.** New `ui/DeviceFrame.astro` (CSS only): phone = 4px ink bezel, radius 2.25rem; browser = ink-green frame + top bar (3 dots + empty pill) for the dashboard; soft double shadow; symmetric; screens untouched. Wraps the hero composite and the Roles screenshots.
3. **Blob masks (2 places).** Hero composite backdrop and Roles panel backdrop: large TL/BR corners, small opposite corners (`border-*-radius` logical), tint `primary-bg`, offset. No photos added.
4. **Calm motion.** Devices rise once (400ms ease-out, 16px): hero by CSS with 80ms stagger, Roles frames armed + released by IntersectionObserver (script in DeviceFrame, only when motion allowed and below the fold). Roles tab: 200ms cross-fade, and all panels now share one grid cell so the height no longer jumps between tabs (inactive = `visibility:hidden`). `.lift` (2px, 200ms) on buttons, feature/setup/compare cards, pointer devices only. Everything inside `prefers-reduced-motion: no-preference` and switched off by `html:has([data-motion-toggle][aria-pressed=true])`. No text motion.
5. **Hero.** H1 stays `clamp(2.375rem, .5rem + 4.1vw, 3.75rem)`, EN leading 1.15 (AR keeps 1.5), one solid primary + one outline, language note kept. Checked EN/AR at 390, 768, 1024, 1440; AR composite mirrors; no overflow.
6. **Rhythm.** Joins inspected EN + AR at 1440 and 390 (join sheets) and hero at 768/1024: scallops only hero bottom, pricing top, footer top; other joins flat; nothing to fix. Deliberate differences from Figma 11:2: hero stays cream (the coral highlight words fail 3:1 on `primary-bg`), Security unpublished, final CTA is a green card on cream (DECISIONS 37-38).
7. **Type.** `letter-spacing:0` on h1-h4, `lining-nums` on `:lang(ar)` (source has no Arabic-Indic digits: verified), balance/pretty already global.

## Checks
`astro check` 0 errors; parity script OK (1 pre-existing warning: email placeholder); one `astro build`; `seo-verify` clean. Weight (dpr1): EN above-fold 0.48 MB, total 1.17 MB; AR 0.49 / 1.18 MB. Hero images are the same AVIFs (dashboard ~15-24 KB, phones ~29-30 KB); the DeviceFrame adds CSS only. Page weight dropped (14 animated WebPs gone from the Features/Pricing path).

## Remains
- Hero stays cream, not Figma's green band (see 6).
- Day timeline keeps its existing phone art (no blob added, keeps blob count at 2).
- Security/Testimonials/Founders still contain the old animated art (unpublished).
- Not run: screen-reader pass of the Roles stacked panels; Lighthouse.
