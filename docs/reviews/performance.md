# Performance review (measured, then fixed)

Measured on `npx astro build` output with `node scripts/measure-weight.mjs [dpr]` (models one srcset candidate per `<img>`, avif preferred, plus CSS, JS and the latin / arabic font files that are actually fetched). "Above the fold" = HTML + everything not `loading="lazy"` (logo, hero photo, CSS, JS, fonts). Lazy images are fetched on scroll.

## Before

| Page | HTML | Above the fold | Total @1x DPR | Total @2x DPR |
|---|---|---|---|---|
| `/en/` | 0.32 MB | 0.51 MB | **6.23 MB** | 6.77 MB |
| `/ar/` | 0.33 MB | 0.55 MB | **6.26 MB** | 6.81 MB |

25 heaviest files (EN, @1x). 14 of the top 17 are looping animated WebP; the 18 animations were 4.4 MB of the 6.2 MB (70 %).

| KB | File | Used in | Intrinsic | Displayed |
|---|---|---|---|---|
| 553 | know-who-read.webp | Features card 2 | 220x220, 86 fr | 110 px |
| 526 | parents.webp | Commitments "charge" | 220x220, 59 fr | 72-110 px |
| 422 | human.webp | Commitments | 220x220, 60 fr | 72-110 px |
| 396 | wallet.webp | Features card 6 | 220x220, 54 fr | 110 px |
| 378 (+622 at 2x) | secure.webp | Security icon | 85x85 / 170x170, 150 fr | 85 px |
| 374 | arabic.webp | Features card 5 | 220x220, 57 fr | 110 px |
| 308 | diplomacy.webp | Pricing "first 10" | 375x375, 71 fr | ~170 px |
| 280 | evenings.webp | Features card 4 | 220x220, 86 fr | 110 px |
| 267 | daycare.webp | Pricing school card | 375x375, 121 fr | 125 px |
| 260 (+401 at 2x) | server.webp | Security icon | 85x85, 150 fr | 85 px |
| 252 | arabic.webp | Commitments | 220x220, 39 fr | 72-110 px |
| 246 | data-yours.webp | Commitments | 220x220, 40 fr | 72-110 px |
| 227 | photo.webp | Features card 3 | 220x220, 51 fr | 110 px |
| 194 | recurring.webp | Pricing plan | 375x375, 100 fr | 160-319 px |
| 141 (+243) | cloud.webp | Security icon | 85x85, 71 fr | 85 px |
| 125 | one-tap-checkin.webp | Features card 1 | 220x220, 16 fr | 110 px |
| 101 (+117) | copywriting.webp | Security icon | 85x85, 50 fr | 85 px |
| 81 | hero-children.avif (1220w) | Hero (LCP, eager, fetchpriority high) | 1220x1136 | up to 656 px |
| 76 each | day mock-ups (photos, checkin-back, ...) .webp | Day timeline | 835x1699 | 400 px max, `sizes` set |
| 75 | connected-hand.webp | Day timeline | 1176x974 | ok |
| 53 | center.webp | Security centre image | 588x740 | 588 px |
| 48 | Logo.*.css (all CSS) | page | | |

Findings: (1) the animations are the whole story; (2) Security icons were 375 px GIFs re-encoded by `<Image format="webp">` at 85 px with every frame at 100 alpha quality; (3) lossy animated WebP spends most bytes on the alpha plane (alphaQuality default 100), these are flat icons on transparent; (4) Pricing animations shipped at 375 px for 125-170 px slots; (5) everything else (hero avif, day mock-ups, logo) is already right-sized with srcset/`sizes` and correct priorities: hero `fetchpriority=high` + eager, logo eager, 36 other images lazy.

## After

| Page | HTML | Above the fold | Total @1x DPR | Total @2x DPR |
|---|---|---|---|---|
| `/en/` | 0.32 MB | 0.52 MB | **3.53 MB** (-2.70) | 3.59 MB (-3.18) |
| `/ar/` | 0.33 MB | 0.55 MB | **3.56 MB** (-2.70) | 3.62 MB (-3.19) |

Animated group: Security 4 icons 2.3 MB at 1x+2x (1.1 MB at 1x) -> 0.10 MB (cloud 18, copywriting 10, server 28, secure 44 KB). Features 6: 1.96 MB -> 1.05 MB. Commitments 5: 1.50 MB -> 0.81 MB. Pricing 3: 0.77 MB -> 0.38 MB (daycare 250 px, diplomacy 340 px, recurring 375 px).

Above-the-fold weight did not change (it was already only the hero photo, logo, CSS, JS, two font files). What is left: the 10 largest files are still the Features / Commitments illustrations (127-286 KB each); they are lazy and below the fold. Going further means dropping their frame rate again or replacing them with video; not done.

## What changed

- `src/components/ui/AnimatedImage.astro`: the one place for "animated WebP + reduced-motion still `<picture>`". Props `src, still, width, height, alt, loading, class, pictureClass`. The dev-path-with-space `%20` fix for the `<source srcset>` lives here only. Replaces the three copies (Features, `commitments/CommitmentCard`, `pricing/Illustration`, deleted) and is now used by the Security icons.
- Security icons: `docs/sections/07-security/optimise-icons.mjs` (originals kept in `assets-original/*.gif`; the files in `src/assets/security/*.png` were GIFs). 170 px (2x of 85), every 5th frame (about 7 fps), quality 20, alphaQuality 15, plus a first-frame still. 10 to 44 KB each (secure is 44, slightly over the 40 KB target; it is the most detailed one). Static WebP was not needed. `densities`/`<Image>` dropped for these.
- Features / Commitments scripts: `ALPHA_QUALITY` (default 30) added and re-run. New `docs/sections/09-pricing/optimise-illustrations.mjs` (replaces `make-stills.mjs`): right-size per slot, every 3rd frame, alphaQuality 30.
- Source `src/assets/security/*.png` (4 GIFs, 1.9 MB repo weight) removed; no unreferenced assets remain (checked every file in `src/assets`; `icons/` and `shapes/` are loaded by glob). Empty `src/assets/footer/` removed.
- Pricing plan list `<span>` got `min-w-0` (left for me by the components engineer: page grew to 370 px at 320 px + 200 % text).
- `.prettierrc` `printWidth: 120`; `.prettierignore` now has dist, .astro, node_modules, package-lock, docs, .claude, public. `prettier --write` run on `src/`, `scripts/`, `astro.config.mjs`, `tsconfig.json`, `package.json` after `docs/FIX-LOG-components.md` existed.

## WCAG 2.2.2 (pause, stop, hide): chosen approach

**A page-level pause toggle** (`ui/MotionToggle.astro`, mounted in `BaseLayout` after the header; `a11y.pauseAnimations` in EN and AR), not loop capping.

Why: 2.2.2 applies to any auto-playing motion that lasts more than 5 s alongside other content. The animations run 1.5 to 5.4 s per cycle, so "play 3 times then stop" is up to 16 s of motion and still needs a control (the 5 s exemption only covers motion that stops itself within 5 s). Loop counts in animated WebP are also honoured inconsistently between browsers and image pipelines, and would force a re-encode of all 18 files with no way back. The toggle swaps every `img[data-anim]` to its `data-still` and back, works in every browser (plain `src` swap, no CSS/animation API), keeps nothing in storage, is a real `<button aria-pressed>` with a visible-on-focus ring, is hidden without JS (it could do nothing) and when `prefers-reduced-motion: reduce` is already on (every animation is a still then, via `<picture>`). Fixed bottom `start-4` (flips in RTL), 44 px, token colours.

Known cosmetic trade-off: at 375 px it floats over content at the bottom start corner (it can sit over a card icon while scrolling); it is 44 px and has a solid fill so it stays legible.

## Verified

`astro check` 0 errors / 0 warnings / 0 hints; final `astro build` ok. Headless Chrome over CDP (`docs/tools/cdp-shot.mjs`, against `astro preview`): 18 `AnimatedImage` per page (EN + AR); click on the toggle -> 18/18 stills, `aria-pressed=true`; `Emulation.setEmulatedMedia prefers-reduced-motion: reduce` -> 18/18 stills and toggle hidden; default -> 0 stills, toggle visible with label "Pause animations". Screenshots of Features / Commitments / Pricing / Security at 1440 and 375, EN and AR: layout identical to before (icon size, position, RTL inline-end placement), no overflow. The button is a native `<button>`, so Enter/Space toggle it and Tab reaches it right after the header links.

## Not done, and why

- **Font subsets**: `global.css` (owned by the other engineer) imports `@fontsource-variable/*/wght.css`, which declares latin, latin-ext and vietnamese (and arabic for Readex) with `unicode-range`. The unused subsets are in `dist/_astro` (~110 KB of files) but browsers only download the ranges the page uses, so no bytes are saved on the wire (EN fetches 2 latin files, 67 KB; AR 3 files). A subset-only import (`.../wght.css` -> `latin-wght.css`) would cut the dist folder but risks missing glyphs (curly quotes, accents in names), so left. When the licensed Recoleta / Expo Arabic files arrive these go away anyway.
- **`content-visibility: auto`**: sections overlap their neighbours with wave dividers and blob shadows that extend outside the section box; `content-visibility` applies paint containment and would clip them, and the intrinsic-size guess would shift the layout under `#anchor` jumps. Rendering cost, not bytes; skipped.
- **HTML is 0.32 MB** (inline blob SVGs repeated per card); gzip/brotli on the host cuts it to roughly 40 KB. Not changed.
- `CtaBand`, `DemoModal` split: owned by the other engineer, skipped. `npm run assets:animated` (move the four optimise scripts to `scripts/`): not done.
