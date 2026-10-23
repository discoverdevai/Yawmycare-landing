# Fix log: design pass (A1, A2, B1, C1, C2, C4)

Spec: `docs/DESIGN-FIXES.md` A-C. Decisions: `docs/DECISIONS.md` #21-#26. Tools: `docs/tools/design-capture.mjs` (full-page shots + height + overflow), `docs/tools/design-probe.mjs` (evaluate JS at a width). Shots (git-ignored) in `docs/design-shots/`.

## What changed
- **A1** `Header.astro`: tagline strip, its `WaveDivider`, `--topbar-h`, `--nav-mt` and the negative sticky `top` are gone; one row, `position: sticky; top: 0`, 16px sentinel for `data-compact`, 1px bottom hairline (`stroke-sec`). `scroll-padding-top` = 64 + 12 (unchanged number, compact row). The tagline key `brand.tagline` is still used by the footer, so no i18n key was orphaned. Skip link, menu (Esc returns focus to the button, link click closes, outside click closes) re-verified EN + AR at 375 and 800.
- **A2** `nav.ts` `header: boolean`; desktop row = 5 links, menu panel and footer = all 9; breakpoint `lg` (1024) in markup and script. Spy: targets sorted by document order (the row no longer lists all 9, so link order != document order; this was a bug found and fixed). Header gaps `gap-4 xl:gap-7`.
- **B1** `Section.astro`: flat bands (`py-(--band-py)`, optional `tint`), wave only on hero, pricing, footer. Hero glow and pricing wave shadows are clipped below the flat edge (`WaveDivider.astro`). Final CTA gets `pt-(--band-py)`; testimonials `pt-(--wave-gap)` right after the hero.
- **C1** tokens in `global.css` (see DECISIONS #24).
- **C2** `BlobCard.astro` grow rule at all widths above native; floors lowered; security `relax` removed. Remaining slack: equal-height rows (pricing school card next to the "first 10" card at 768) and sub-native-width scaled SVG cards (about 45-80px), by design.
- **C4** paddings (see #26); header Book a Demo, language switch, menu toggle 44px (was 56 at md+); header/footer links `min-h-11`. Measured: hero/CTA buttons 56px, header 44px; the only targets under 44 are the 4 footer social buttons (40px visual, 44px hit area by existing decision #12).

## Measurements (full page height, px; reduced motion, lazy images loaded)
"Before" = same source with the old spacing tokens/waves plus the old two-row header (old header 180px at 1440, 164px at 375; new 81px).
| | 1440 EN | 375 EN | 1440 AR | 375 AR |
|---|---|---|---|---|
| before | 15064 | 20844 | ~15669 | ~21305 |
| after | 14556 | 20256 | 15156 | 20873 |
| change | -508 (-3.4%) | -588 (-2.8%) | ~-513 | ~-432 |

The page is mostly content, so the 25% cut in the gaps shows as ~3%: section-to-section distance at 1440 is 136px (was 182, -25%); at 375 it is 64 (was 88). Header 180 -> 81 at 1440, 164 -> 81 at 375. Further savings need content trims (C3), not spacing. Overflow: `scrollWidth == clientWidth` at 320/375/768/1024/1280/1440, EN + AR. Header at 1440 shows 5 links with ~40% free width; at 1024 the row fits (EN nav 413px, AR 428px).

Header behaviour (EN 1440 and AR 1280/800): compact after scroll, `homeTop` stays 81 (no jump), sticky top 0, spy marks the right link for home, day, why, setup, security, commitments, pricing, founders, faq, none past the FAQ (End key: none), compact clears back at the top.

## Screenshots (`docs/design-shots/`)
`before-{en,ar}-{1440,375}.png` (old page, 0.5/0.6 scale), `final-{en,ar}-{1440,375}.png` (after), `after2-*-768.png`, `join-*.png` (hero bottom, testimonials->day, day->why, commitments->pricing, FAQ->CTA), `after-security-en-375.png`, `after-pricing-ar-768.png`.

## Open / notes
- New Arabic label "كيف يعمل" (needs native review). EN "How it works" replaces "Set up in 20 minutes" in nav labels only; the Setup section title is unchanged.
- A faint 1px line under the hero scallops (sub-pixel boundary at fractional wave height) existed before and remains.
- Tint contrast between `surface` and `primary-bg-light` is subtle by design; if it reads too faint in review, switch `light` bands to `tabs`.
- The Astro dev toolbar shows in dev screenshots only.
