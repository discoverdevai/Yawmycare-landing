# 00 · Foundation — Spec

Inputs: `CLAUDE.md`, `PLAN.md`, `audit.md` (same folder), current `src/`. Scope: shared design system used by Sections 01–13. No section content is built here.

## 0. Status and blockers

**Nothing blocks the Section 00 build.** Every open item has a stand-in or a swappable token (see section 9). Three items need an owner decision at Section 00 sign-off: Q1 (contrast), Q3 (off-token colours), Q13 (mobile blob fallback).

| Already built (reference only, do not re-plan) | Where |
|---|---|
| Astro 7 + Tailwind 4 scaffold, prettier, `astro check` | root |
| i18n (typed dictionary, `en.json` / `ar.json`, `localeMeta`) | `src/i18n` |
| 13 of 16 colour tokens as `@theme` variables | `src/styles/global.css` |
| `BaseLayout.astro` (lang, dir, hreflang, skip link, `header`/`footer` slots) | `src/layouts` |
| `ui/Icon.astro` (14 `currentColor` icons) | `src/components/ui`, `src/assets/icons` |
| `ui/WaveDivider.astro` (tiled mask, up/down, optional shadow; fixed 76px height) | `src/components/ui` |
| Showcase page | `src/pages/[lang]/foundation.astro` |

Known facts that shape the plan:
- Tailwind 4 `@theme` only emits variables that a utility uses. Tokens read only through `var()` (wave shadow, SVG blobs) can be dropped. Use `@theme static` (task F1).
- `BaseLayout` has one raw hex: `<meta name="theme-color" content="#76945c">`. It is the only allowed exception to the no-hex rule (a meta tag cannot read a CSS variable). It must be updated if the CTA token changes (Q1).

## 1. Goal

Give every later section a small, accessible, bilingual kit (tokens, type, layout rhythm, buttons, section header, blob cards, logo) so the page reads as one brand and every CTA is large, legible and tappable in EN and AR. CRO lens: the primary CTA is the conversion action, so its size, contrast, focus and hover states are specified once here, not per section.

## 2. Component breakdown

| Component | Status | Props (summary) | Task |
|---|---|---|---|
| `src/styles/global.css` | extend | tokens, type scale, rhythm vars, radii, fonts | F1, F2 |
| `ui/Container.astro` | new | `size?: "content" \| "wide"`, `as?` | F3 |
| `ui/Section.astro` | new | `id?`, `headingId?`, `wave?: "up" \| "down" \| "none"`, `shadow?`, `waveClass?` (default `bg-surface`), `gap?: "tight" \| "default" \| "loose"`, slots `header` + default | F3 |
| `ui/WaveDivider.astro` | amend | height and tile driven by `--wave-h` (76 / 48 / 32) | F3 |
| `ui/SectionHeader.astro` | new | `title`, `lead?`, `headingLevel?: 2 \| 3 \| 4` (default 2), `align?: "start" \| "center"`, `tone?: "default" \| "on-green"`, `size?: "h2" \| "band"`, `eyebrow?` (legacy), `id?` | F3 |
| `ui/Button.astro` | new | `variant`, `href?`, `type?`, `icon?`, `iconPosition?: "start" \| "end"`, `label?` (required for icon-only), `block?`, `external?`, `disabled?` | F4 |
| `assets/shapes/*.svg` | new (moved) | 14 blob shapes, colours as CSS variables | F5 |
| `ui/BlobCard.astro` | new | `shape`, `as?`, `class?`, default slot | F6 |
| `ui/Logo.astro` | new | `size: "nav" \| "footer"`, `locale`, `href?` | F7 |
| `pages/[lang]/foundation.astro` | extend | review matrix | F8 |

## 3. i18n keys

No new keys. Primitives take their text through props or slots; the sections pass dictionary values.

| Used by | Existing key |
|---|---|
| Button: primary / on-green label | `cta.bookDemo` (label canonical pending Q4) |
| Button: outline / on-green outline label | `cta.watchDemo` |
| Language button aria-label | `a11y.switchLanguage` |
| Social buttons aria-label | `social.linkedin` / `instagram` / `whatsapp` / `facebook` |
| External link hint | `a11y.opensInNewTab` |
| Logo alt / link name | `brand.logoAlt` |

The showcase's own labels ("Wave dividers", swatch names) are dev chrome. They are exempt from the no-strings rule because the page is `noindex` and removed in Section 14. All sample text on the showcase that demonstrates a component comes from the dictionary.

## 4. Tokens (task F1)

### 4.1 Colour

| Token | Value | Status |
|---|---|---|
| `--color-stroke-gray` | `#D8D8D8` (stroke/grayColor, modal input border) | add, confirmed |
| `--color-prov-stroke-green` | `#ADC697` | **provisional**, 3px stroke of feature/step/number blobs |
| `--color-prov-stroke-coral` | `#F5A292` | **provisional**, security card stroke |
| `--color-prov-fill-peach` | `#FDF8ED` | **provisional**, security, commitments, first-10 fills (token is `#FEF8ED`) |
| `--color-prov-fill-blush` | `#FCF1E6` | **provisional**, testimonial fill |
| `--color-prov-fill-sage` | `#F1F4E6` | **provisional**, commitments green fill |
| `--color-prov-wordmark` | `#C7D8B6` | **provisional**, footer wordmark |

Rules for provisional tokens:
- Each has a `/* TODO(owner Q3): promote / snap to … */` comment with the snap candidate (`#ADC697` promote as `stroke/greenColor`; `#F5A292` promote or snap to `#FFCCC1`; `#FDF8ED` snap to `#FEF8ED`; `#FCF1E6` promote or snap to `#FEF8ED`; `#F1F4E6` snap to `#F3F5E8`; `#C7D8B6` promote).
- Components never reference `--color-prov-*` directly. They go through semantic aliases (`--blob-fill`, `--blob-stroke`, `--color-wordmark`). Resolving Q3 is then a one-line change per colour.
- The design keeps Figma's exact values until the owner decides. Nothing is silently snapped.

Also: `@theme` becomes `@theme static`. Keep the existing names (they map to the Figma variables in comments). Add semantic aliases `--color-on-cta: var(--color-ink-inverse)` and `--color-focus: var(--color-primary-text)`.

### 4.2 Type scale (Tailwind utilities `text-*`)

Values are desktop 1440 / tablet 768 / mobile 375. Rows marked `*` use the audit's proposed tablet/mobile steps, or planner proposals where no frame exists. Responsive steps are done by overriding the `--text-*` custom properties in `:root` media queries (≥1024 desktop, 768–1023, <768), so a single utility class scales.

| Utility | Size 1440 / 768 / 375 | EN line-height | AR line-height | Default weight | Figma source |
|---|---|---|---|---|---|
| `text-hero` | EN 58 / 44 / 36*; AR 62 / 46 / 38* | 1.3 | 1.5 | 600 (AR 700) | hero h1 / `AR-h1-bold` |
| `text-h2` | 48 / 36 / 28 | 1.2 | 1.4 | 700 | `web/h2`, `AR/h2-bold` |
| `text-band` | 40 / 32 / 26* | 1.2 | 1.4 | 700 | CTA band title |
| `text-h3` | 32 / 28 / 24* | 1.2 | 1.4 | 700 | `web/h3-bold` |
| `text-title` | 24 / 22 / 20* | 1.3 | 1.5 | 700 (features: `font-black`) | card title, FAQ question |
| `text-lead` | 24 / 20 / 18 | 1.3 | 1.5 | 400 | lead, quote |
| `text-body` | 20 / 18 / 16 | 1.3 | 1.5 | 400 | card body |
| `text-body-sm` | 16 / 16 / 16 | 1.3 | 1.5 | 400 | small body |
| `text-button` | 18 / 18 / 18 | 1 | 1.4 | 700 | `H3/bold`, `AR/h6` |
| `text-nav` | **EN 16, AR 20** / same / same | 1 | 1.4 | 500 | `H4/med`, AR nav `1434:3744` |
| `text-caption` | 14 / 14 / 14 | 1.3 | 1.5 | 700 | attribution |

Notes:
- Line-heights are deliberately larger than Figma's `1` / `48px` for headings (audit: Figma is inconsistent, and Arabic diacritics clip at 1.0). Section vertical positions can therefore drift up to about 12px per heading from Figma at 1440. Reviewer tolerance for vertical position: ±12px per section.
- AR overrides live under `:root:lang(ar)` (and apply to any `:lang(ar)` descendant). `text-nav` is the only size that differs by locale.
- Letter-spacing is 0 everywhere. No `tracking-*` classes.
- Weights: EN licenses 400/500/600/700/900. AR has 400/500/700 only, so 600 renders as 700 and 900 as 700. This is accepted.
- Footer wordmark (170px) is not a utility. It is defined in Section 12 as a fluid `clamp()` (see section 8, Logo).
- If `--text-*--font-weight` is not honoured by the installed Tailwind, pair utilities with `font-*` classes instead. Verify in F1.

### 4.3 Spacing and section rhythm (custom properties, consumed as `gap-(--x)` / `mt-(--x)`)

| Variable | ≥1024 | 768–1023 | <768 | Figma |
|---|---|---|---|---|
| `--wave-h` | 76 | 48* | 32* | wave height 76 |
| `--wave-gap` (wave → content) | 58 | 40 | 32 | 58 |
| `--section-gap` (between section frames) | 48 | 32 | 24 | 48 |
| `--header-gap-tight` / `-default` / `-loose` (header → content) | 40 / 48 / 58 | 32 / 40 / 48* | 24 / 32 / 40* | 40 (FAQ) / 48 / 58 (setup, security, founders) |
| `--gutter` | 32 (the 120 margin emerges from the 1200 max at 1440) | 32 | 16 | 120 |
| `--container-content` | 1200 (exists) | | | 1200 |
| `--container-wide` | 1280 (add) | | | nav 1280 / 80 margins |
| h2 → lead | 24 | 16* | 16* | 24 |

The audit asked to standardise header → content on 48. Plan keeps Figma's three values as named options so pixel diffs stay clean, and defaults to 48. Standardising is a later, optional cleanup.

### 4.4 Radii (Tailwind `rounded-*`)

| Token | Value | Use |
|---|---|---|
| `--radius-pill` | 100px | buttons, number badge |
| `--radius-input` | 20px | inputs, 32px avatar badge |
| `--radius-faq` | 32px | FAQ rows |
| `--radius-card` | 32px | simplified blob fallback (same value as FAQ, separate token) |
| `--radius-modal` | 50px | modal |
| circle | `rounded-full` | icon buttons |

Deferred: `--color-overlay` (modal overlay `rgba(0,0,0,.6)`) goes to Section 13.

## 5. Fonts (task F2)

Goal: dropping licensed WOFF2 files into `src/assets/fonts/` switches both locales over with no code change. Until then, open-licence stand-ins render.

| Item | Decision |
|---|---|
| File convention | `src/assets/fonts/recoleta-{400,500,600,700,900}.woff2`, `expo-arabic-{400,500,700}.woff2`. A short `README.md` in that folder documents names and the subset command |
| Detection | One module (`src/styles/fonts.ts`) uses `import.meta.glob("@/assets/fonts/*.woff2", { eager: true, query: "?url" })`. It generates `@font-face` only for files that exist, so there are no 404s and no empty faces. `BaseLayout` renders the `<style>` and `<link rel="preload">` from it |
| Stack (EN) | `--font-en: "Recoleta", "Recoleta Stand-in", Georgia, serif` |
| Stack (AR) | `--font-ar: "Expo Arabic", "Expo Arabic Stand-in", "Segoe UI", Tahoma, sans-serif` |
| Stand-in EN | Fraunces variable (`@fontsource-variable/fraunces`, OFL), soft serif, weights 400–900 cover Black. Exposed as the family "Recoleta Stand-in" with `size-adjust` / `ascent-override` tuned by eye against Figma at 1440. Retune with measured metrics once real files arrive |
| Stand-in AR | IBM Plex Sans Arabic (`@fontsource/ibm-plex-sans-arabic`, OFL), weights 400/500/700, Arabic subset. Alternative if it looks too formal next to Figma: Cairo. Decide by side-by-side in the showcase; either is a fontsource swap, no code change |
| Switching per locale | `body { font-family: var(--font-en) }` and `:lang(ar) { font-family: var(--font-ar) }`. `:lang()` (not `dir`) so a Latin span with `lang="en"` inside an AR page gets the EN stack |
| `font-display` | `swap` on all faces, including stand-ins |
| Subsetting | Stand-ins: fontsource ships per-subset files with `unicode-range`; keep `latin` (EN) and `arabic` + `latin` (AR). Licensed files: subset with `pyftsubset` to Basic Latin + Latin-1 + punctuation (EN) and Arabic + Arabic Presentation Forms-B + Basic Latin + digits (AR), `--flavor=woff2 --layout-features='*'`. Do not strip `kern`, `liga`, `calt`, `mark`, `mkmk`, `locl` (Arabic shaping) |
| Preload | Only licensed files, at most 2 per locale, set in a `critical` list (EN: 600, 400; AR: 700, 400), `crossorigin`. Stand-ins are not preloaded |
| Misc | `font-synthesis: none` (no faux bold/italic). Arabic text must not get letter-spacing |

## 6. Responsive behaviour

Tailwind breakpoints already match the review widths (`md` 768, `lg` 1024, `xl` 1280).

| Primitive | 1440 | 1024 | 768 | 375 |
|---|---|---|---|---|
| Container | 1200 centred (120 margins); wide 1280 | 1200 cap, 32 gutters | 32 gutters | 16 gutters |
| Wave | 76px, 72px pitch | 76 | 48, pitch about 46 | 32, pitch about 30 (tile repeats, never stretches) |
| Section rhythm | 58 / 48 | 58 / 48 | 40 / 32 | 32 / 24 |
| Type | desktop column | desktop | tablet column | mobile column |
| Button | 56 high, hug width | same | same | 56 high, `block` when stacked (the 52px in the audit is not adopted; one height) |
| SectionHeader | h2 left aligned, lead below | same | same | same, centred variant stays centred |
| BlobCard | native SVG | SVG scaled to 75–125% of native | SVG while width ≥ 75% of native, else simplified | simplified rounded card |
| Social buttons | 40 visual, 44 hit | same | same | same |

## 7. RTL behaviour

| Mirrors (logical properties) | Does NOT mirror |
|---|---|
| Container, text alignment, `SectionHeader` `align="start"` | Wave divider (symmetric tile, centred) |
| Button icon slot: icon sits at the `start` side by default, so it flips with direction. `iconPosition="end"` is available. **F4 step 1:** compare `1457:3946` and `1434:3765` in Figma to confirm which side the icon is on in AR (the audit says "after text"), then set the default per locale if needed | Icons themselves: none of the 14 is directional. Quote icon is not mirrored. If a chevron or arrow is added, use `rtl:-scale-x-100` |
| Social button row order, language button position | Logo (raster, never flipped) |
| Blob shapes: hand-drawn and asymmetric. **Do not mirror** (keeps Figma's AR frame consistent, since the AR frame uses the same shapes unmirrored) | Numbers, Latin brand name `YAWMY CARE`, phone/URL strings: `dir="ltr"` / `unicode-bidi: isolate` when inlined in AR copy |
| Focus ring offset, hit-area pseudo-elements (use `inset-*`, never `left/right`) | |

## 8. Component details

### 8.1 Container + Section (F3)
- `Container`: `width: min(100% - 2 * var(--gutter), var(--container-content|wide)); margin-inline: auto`.
- `Section` renders `<section aria-labelledby={headingId}>`: optional `WaveDivider` (76 / 48 / 32) → `--wave-gap` → `header` slot → `--header-gap-*` → content in a `Container`. `margin-block-end: var(--section-gap)`. Last content → next h2 = 48 + 76 + 58 = 182px at 1440.
- Wave direction is explicit per section (no auto-alternation, because 08–11 are inferred in the audit and the Hero → Testimonials 32px join is a one-off):

| Section | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|
| Wave direction | n/a (hero wave) | down | up | down | up | down* | up* | down* | up* |

`*` inferred from the vector transform; the Section 08–11 auditors must confirm by render.

### 8.2 SectionHeader (F3)
- Default: `h2` (`text-h2`, `text-ink`), `lead` (`text-lead`, weight 400), start aligned, gap 24 (16 below 1024). No eyebrow.
- `align="center" tone="on-green"`: text centred, title `text-band` (or `text-h2` for the final CTA via `size="h2"`), title `text-ink-inverse`, lead `text-primary-bg-light`.
- `headingLevel` changes only the tag (`h2` / `h3` / `h4`), never the look.
- `eyebrow` (legacy, optional, unused in the Updated Version): 2px `border-s` in `accent-text`, 14px semibold. Renders nothing when absent.
- Lead has no max-width (matches Figma, about 110 characters per line). The enhancer may cap measure later.

### 8.3 Button (F4)

All variants: `min-height: 56px`, padding 8/16, `rounded-pill`, `text-button`, icon 24 and `gap-3` (12), `inline-flex items-center justify-center`. Renders `<a>` when `href` is set, else `<button type="button">`.

| Variant | Rest | Hover | Active | Focus-visible | Disabled (`<button>` only) |
|---|---|---|---|---|---|
| `primary` | bg `primary-cta`, text `on-cta`, icon `calendar` | bg = `color-mix(primary-cta, black 16%)` | 22% | 2px `focus` outline, 2px offset | bg `surface-tabs`, text `ink-muted`, `cursor-not-allowed`, no hover |
| `outline` | transparent, 1px `primary-cta` border, text `primary-cta`, icon `video-circle` | bg `primary-cta` at 10%, text `primary-text` | 18% | same ring | border and text `ink-muted` |
| `on-green` | bg `primary-bg-light`, text `primary-text`, icon `calendar` | bg `primary-bg` | `primary-bg` + 8% black | ring `primary-bg-light`, 2px offset | as primary |
| `on-green-outline` | transparent, 1px `ink-inverse`, text `ink-inverse`, icon `video-circle` | bg `ink-inverse` at 12% | 20% | ring `primary-bg-light` | as outline |
| `icon` (language) | 56 circle, bg `surface-tabs`, icon `language` 32, `ink` | bg `primary-bg` | + 8% black | ring `focus` | n/a |
| `social-bar` | 40 circle visual, bg `surface`, icon 24 `ink` | bg `primary-bg` | + 8% black | ring `focus` | n/a |
| `social-footer` | 40 circle visual, bg `accent`, icon `ink-inverse` | bg `accent-text` | darker 8% | ring `primary-text` on the green footer is 2.98:1, so use `primary-bg-light` ring | n/a |

Rules:
- Only tokens. Hover and active shades derive from the base token with `color-mix`, so changing `--color-primary-cta` (Q1) updates every state. No raw hex.
- Transitions: `background-color, color, border-color` 150ms ease-out under `motion-safe`. No transforms.
- Focus ring colour is chosen per surface to keep at least 3:1 against it (`focus` ring on cream; `primary-bg-light` on `primary-cta` green, about 3.3:1).
- Icon-only variants require `label` (aria-label from the dictionary). TypeScript makes it a required prop for `icon`, `social-bar` and `social-footer`.
- Social buttons: 40px visual, 44px hit area via an `::after` pseudo-element with `inset: -2px`. Neighbour pitch is 52px, so hit areas do not overlap. `external` adds `target="_blank" rel="noopener noreferrer"` and appends the `a11y.opensInNewTab` text as visually hidden.
- Label wraps to two lines at 375 instead of overflowing. The 56px is a `min-height`.
- Contrast facts (measured): white on `#76945C` 3.38:1 (fails AA 4.5 at 18px bold); `#76945C` on `#FCFCEC` 3.29:1; hover darkening 16% reaches about 4.6:1. Colours are not changed in this section (Q1). A candidate for the owner: roughly `#637C4D` (to be verified with a contrast tool).
- White icon on `#E2725B` is 3.06:1, which passes the 3:1 non-text minimum but only just.

### 8.4 Blob shapes and BlobCard (F5, F6)

Shapes to move from `docs/sections/00-foundation/assets` to `src/assets/shapes/` (colours become CSS variables; `setup-steps-connector-lines.svg` stays with Section 06):

| Shape (`shape` prop) | Native W×H | Fill → stroke | Used by |
|---|---|---|---|
| `feature` | 384×312 | `surface-tabs` → prov stroke green 3px | 05 (×6) |
| `step` | 282×201 | `surface-tabs` → prov stroke green 3px | 06 (×4) |
| `step-number` | 48×48 | `surface-tabs` → prov stroke green 3px | 06 (×4) |
| `cta-band` | 1200×348 | `primary-cta`, no stroke | 06 |
| `final-cta` | 1200×910 | `primary-cta`, no stroke | 12 (lower part under footer) |
| `testimonial` | 282×236 | prov fill blush | 03 (×3) |
| `security` | 282×416 | prov fill peach → prov stroke coral 3px | 07 (×4) |
| `commitment-peach` | 588×247 | prov fill peach | 08 (×2) |
| `commitment-green` | 588×247 | prov fill sage | 08 (×2) |
| `commitment-wide` | 1200×183 | `stroke-sec` | 08 |
| `pricing` | 1200×424 | `primary-bg` | 09 |
| `intl-school` | 384×503 | `stroke-sec` | 09 |
| `first10` | 792×503 | prov fill peach → `accent-text` 2px | 09 |
| `founder-text` | 1181×423 | `primary-bg` | 10 (×2) |

Not BlobCard (section-owned): security centre image mask (07), founder photo masks (10), setup connector lines (06).

SVG normalisation (F5):
- One `<path>` per file, `preserveAspectRatio="none"`, `style="fill:var(--blob-fill);stroke:var(--blob-stroke)"`, `stroke-width` from `--blob-stroke-w`, `vector-effect: non-scaling-stroke` so the 3px stroke does not stretch.
- Rebuild `feature`, `step` and `step-number` (they use Figma mask-based inside strokes, about 9KB each) as a single path with a centred stroke, from the existing path data. No new Figma export is needed.
- Remove the Figma bleed or keep the bleed in the viewBox. Pick one and document it in the component.

BlobCard approach (F6): the shape is chosen by its own width, not the viewport.
- Wrapper has `container-type: inline-size`. Inside it, a frame element carries `aspect-ratio: W / H` (so height equals the Figma height at the native width and grows if the copy is longer, e.g. Arabic).
- Two background layers behind the content:
  - the inline SVG, shown when the container is at least 75% of native width (`@min-[…px]:block`);
  - a simplified card (`rounded-card`, border in `--blob-stroke` at `--blob-stroke-w`, fill `--blob-fill`), shown below that.
- Thresholds are literal Tailwind classes in a lookup map in the component (Tailwind needs static class strings).
- Native sizes at 1440 (SVG at 100%). At 1024 and 768 widths in the grid fall within 75–125% for all 3-up, 4-up and 2-up cards; the 1200-wide blobs switch to the simplified card below 900px.

Mobile strategy: **recommendation is the simplified card** (rounded 32px, same fill and stroke tokens, no scallops) below 75% of native width.

| Option | Pros | Cons |
|---|---|---|
| A. Simplified rounded card (recommended) | Zero distortion, any content height, no extra assets, quick | Loses the organic edge on phones (the wave dividers still carry the motif) |
| B. CSS-mask scallop top edge (tiled radial-gradient, like the wave) | Keeps the brand edge on mobile | A double-layer mask is needed for the 3px stroke; extra task of about 1h; the big irregular blobs still need A |
| C. Scale SVG on mobile | Closest to Figma | Rejected: 1200→343 wide is 29%, the scallops and 3px strokes turn to mush |

Approve A at Section 00 sign-off (Q13). If rejected, add follow-up task F6b for B on the regular-scallop cards (feature, step, security, testimonial).

### 8.5 Logo and footer wordmark (F7)
- `Logo.astro` uses `astro:assets` `<Image>` with the imported PNG at `src/assets/logo.png` (285×258, aspect 1.105), `format="webp"`, explicit `width`/`height`, `densities={[1, 2]}` (capped at the 285 source).
- Sizes: `nav` 71×64 EN, 84×74 AR (taken from the `locale` prop); `footer` 158 wide (height from the aspect ratio, 143; Figma shows 139, a 3% stretch that is not copied).
- `loading="eager"` for nav, `lazy` for footer. Wrapped in `<a href>` when `href` is given, with `alt` from `brand.logoAlt`; decorative `alt=""` otherwise.
- The footer logo at 2× needs 316px and the source is 285px, so it is about 1.8×. Accepted until Q8 delivers an SVG; swapping to SVG is an import-only change (same props).
- Footer wordmark recommendation: **live text, not an image.** It already is text in Figma (Recoleta Medium 170/170, `color-wordmark`), `aria-hidden="true"`, fluid `clamp(64px, 11.8vw, 170px)`, bottom-clipped by the footer. Smaller, crisp, no raster. Built in Section 12. Open: Latin or Arabic text in AR (Q5).

## 9. Open questions for the owner

Blocking column: **Build** = blocks Section 00 coding; **00 sign-off** = needs an answer before Section 00 sign-off; otherwise the first section or step that needs it.

| # | Question | Default used meanwhile | Blocks |
|---|---|---|---|
| Q1 | Darken the CTA green (or enlarge button text) to pass WCAG AA? White on `#76945C` is 3.38:1. Also affects `theme-color` meta | Keep `#76945C`. All states derive from the one token | 00 sign-off (recorded as a known a11y issue); fix before 14 |
| Q2 | Hero coral highlight `#E2725B` on `#FCFCEC` is 2.99:1: darken or use `#B5503C`? | Figma value | Section 02 |
| Q3 | Off-token colours: promote to tokens or snap (`#ADC697`, `#F5A292`, `#FCF1E6`, `#F1F4E6`, `#FDF8ED`, `#C7D8B6`)? Candidates in section 4.1 | Provisional tokens with Figma's exact values | 00 sign-off |
| Q4 | Canonical CTA labels: "Book a Demo" / "Book a free demo" / "Book My Free Demo"; "Watch Demo" / "Watch the 2-minute tour" | `cta.bookDemo`, `cta.watchDemo` | Section 02, 13 |
| Q5 | Brand casing "YAWMY CARE" vs "Yawmy Care" vs "Yawmy"; footer wordmark Latin or Arabic in AR | `YAWMY CARE` as in `en.json` | Section 01, 12 |
| Q6 | Footer nav items: include "Built with nurseries"? "Founder" or "Founders"? | none | Section 01, 12 |
| Q7 | FAQ count: PLAN.md says 10, the Figma design has 13 (per audit hand-off). Update the plan or drop three? | none | Section 11 |
| Q8 | Logo as SVG (and a monochrome version) | PNG 285×258, about 1.8× in the footer | none for 00; before 14 |
| Q9 | Web licences and WOFF2 files for Recoleta (400/500/600/700/900) and Expo Arabic (400/500/700) | Fraunces and IBM Plex Sans Arabic stand-ins | none for 00. Typography pixel sign-off in every section is "shapes approximate" until supplied; before 14 |
| Q10 | Licence and source of the animated feature GIFs; may we convert to WebP/video? | none | Section 05 |
| Q11 | Arabic copy for new nav items and the tagline (audit copy table) | `TODO(copy)` | Section 01, 12 |
| Q12 | Hover, active, focus and disabled states: confirm we own them (planned in 8.3) or design will supply | Our states per 8.3 | none (review during 00 sign-off) |
| Q13 | Approve the mobile fallback for blobs: simplified rounded cards (8.4 option A) | Option A | 00 sign-off |

## 10. Interaction and motion

| Item | Behaviour |
|---|---|
| Button hover / active / focus / disabled | Section 8.3. 150ms colour transitions only |
| Focus order | Skip link → header → main. Focus ring visible on every interactive primitive |
| Motion | No animation in foundation. Waves and blobs are static. Transitions wrapped in `motion-safe:` and `@media (prefers-reduced-motion: reduce) { transition: none }` |
| Touch | Social hit area 44; every other target at least 56 high |

## 11. Tasks

Nine tasks (above the usual 3–8) because Section 00 bundles eight primitives. Each is ≤ about 1 hour. Every task also adds its block to the showcase page so the reviewer sees progress incrementally.

### F1 · Design tokens
- [ ] `global.css` uses `@theme static`; `stroke-gray` and the 6 `prov-*` tokens exist, each with a TODO(owner Q3) comment and snap candidate.
- [ ] Type utilities `text-hero|h2|band|h3|title|lead|body|body-sm|button|nav|caption` exist. Resolved font-size at 1440, 768 and 375 matches the table in 4.2 (checked with `getComputedStyle` on the showcase).
- [ ] Under `<html lang="ar">`, `text-nav` computes to 20px and EN to 16px; AR line-heights match 4.2.
- [ ] Spacing variables from 4.3 and radii from 4.4 exist; `rounded-pill|input|faq|card|modal` utilities apply.
- [ ] No raw hex outside `global.css`, `src/assets/**` and the `theme-color` meta.
- [ ] `astro check` is clean.

### F2 · Fonts
- [ ] With no files in `src/assets/fonts`, EN renders Fraunces and AR renders IBM Plex Sans Arabic; the Network tab shows no 404 and no Google Fonts request.
- [ ] Adding dummy-named test WOFF2 files (`recoleta-400.woff2`, `expo-arabic-400.woff2`, copied from the stand-ins) makes the generated CSS include `@font-face` for them and the preload links appear, **with no code edit**. Remove the test files afterwards.
- [ ] All faces have `font-display: swap`. Preload is limited to licensed files, 2 per locale. `font-synthesis: none` is set.
- [ ] `<html lang="ar">` uses `--font-ar`; an inline `lang="en"` span inside AR uses `--font-en`.
- [ ] `src/assets/fonts/README.md` documents filenames, weights, subset command and the `critical` list.
- [ ] Both stand-ins rendered next to the Figma screenshot at 1440; the pick (Plex Arabic or Cairo) is noted in a comment.

### F3 · Layout primitives (Container, Section, responsive wave, SectionHeader)
- [ ] `WaveDivider` height is 76 / 48 / 32 at ≥1024 / 768–1023 / <768; the scallop tile scales with it and never stretches. At 1440 it looks identical to today.
- [ ] `Section` + `Container` put the wave, content and next wave 76 + 58 + 48 = 182px apart at 1440 (measured with `getBoundingClientRect`), and 120 (32 + 48 + 40) / 88 (24 + 32 + 32) at 768 / 375 per the table.
- [ ] `Container` content width is 1200 at 1440 and 1024 and `100% − 2 × gutter` at 768 and 375; `size="wide"` is 1280 at 1440. No horizontal scroll at 375.
- [ ] `Section` accepts `wave="up|down|none"` and `gap="tight|default|loose"`, and sets `aria-labelledby` from `headingId`.
- [ ] `SectionHeader` default renders `h2` + lead with 24px between them, start aligned, no eyebrow in the DOM; `align="center" tone="on-green"` is centred on a green background; `headingLevel={3}` renders an `h3` with identical styling; `eyebrow` renders only when passed.
- [ ] In AR the header and the lead are right aligned (`text-start`), with no `left/right` in the source.

### F4 · Button
- [ ] Step 1 recorded in a comment: which side the icon sits on in EN vs AR Figma frames.
- [ ] All 7 variants in 8.3 render; every button is at least 56 high (social 40 visual); labels wrap rather than overflow at 375 (`block` prop works).
- [ ] Rest, hover, active, focus-visible and disabled states exist and use only tokens (grep finds no hex or `rgb(`). Keyboard Tab shows a visible ring on every variant, including on green.
- [ ] Icon order flips correctly in AR (icon on the `start` side unless Step 1 says otherwise). The icon uses `currentColor` so one file serves all colours.
- [ ] Social buttons have a 44×44 hit box (`getBoundingClientRect` on the `::after` or a hit-test at the edge) and a 40×40 visual circle.
- [ ] Icon-only buttons fail type-checking without `label`; `external` adds `rel="noopener noreferrer"` and the hidden "opens in new tab" text.
- [ ] Changing `--color-primary-cta` in devtools updates the primary, outline and hover colours with no other edit.
- [ ] Known contrast failures are listed in a code comment pointing to Q1.

### F5 · Blob shapes
- [ ] The 14 SVGs in 8.4 are in `src/assets/shapes/`; each is one path and under 6KB.
- [ ] No hex or `rgb()` inside the SVGs. Fill, stroke and stroke width come from `--blob-fill`, `--blob-stroke`, `--blob-stroke-w`.
- [ ] Each renders at its native size with the Figma colours in the showcase and matches the Figma crop; strokes stay 3px (2px for `first10`) when the shape is stretched to 75% and 125% width.
- [ ] Originals in `docs/…/assets` are left untouched.

### F6 · BlobCard
- [ ] `<BlobCard shape="feature">` at 384px wide renders the SVG at 384×312; it keeps the ratio at 300–480px; below 288px it shows the simplified rounded card (3px stroke, same tokens).
- [ ] The same behaviour holds for every `shape` against its own 75% threshold (`commitment-wide` and the other 1200 blobs switch at 900px).
- [ ] Card grows with long copy (test with the AR sample), never clips content, and the SVG always fills the card.
- [ ] Content is always above the background, which is `aria-hidden` and `pointer-events: none`.
- [ ] `as="li"` works inside a `ul`. No `left/right` in styles.
- [ ] Option A is shown at 375 and 768 for Q13.

### F7 · Logo
- [ ] `src/assets/logo.png` is in place; the rendered `<img>` has explicit `width` and `height` and a `srcset` (1× and 2×); no layout shift when the image loads.
- [ ] `size="nav"` is 71×64 in EN and 84×74 in AR; `size="footer"` is 158 wide.
- [ ] With `href`, the link has an accessible name from `brand.logoAlt`; without it the image is decorative.
- [ ] Swapping to SVG would need only the import line to change (note in a comment). Footer wordmark recommendation recorded in the component comment.

### F8 · Showcase and responsive/RTL review
- [ ] `/en/foundation` and `/ar/foundation` show: colour swatches (provisional ones labelled), the type scale (sample text from the dictionary), rhythm ruler, every button variant and state (forced states via a data attribute), SectionHeader variants, all 14 BlobCards at native size plus a narrow-container row, logo sizes, waves up and down.
- [ ] Screenshots at 1440, 1024, 768 and 375 in EN and AR (8 shots) saved to `docs/sections/00-foundation/shots/`.
- [ ] At every size `document.documentElement.scrollWidth <= innerWidth`.
- [ ] AR shows `dir="rtl"`, mirrored button icon order, right-aligned headers, unmirrored blobs and waves.
- [ ] 1440 EN compared with the Figma crops for the waves, buttons and blobs: no visible difference beyond the declared stand-in fonts and line-height tolerance (±12px).

### F9 · Quality gates
See section 12. All must pass; the report goes in the reviewer's `review.md`.

## 12. Quality gates (task F9)

| Gate | Command / method | Pass |
|---|---|---|
| Types | `npm run check` | 0 errors, 0 warnings |
| Build | `npm run build` | succeeds; both `/en/foundation/` and `/ar/foundation/` are emitted |
| Format | `npm run format:check` | clean |
| No hard-coded colours | `rg -n "#[0-9a-fA-F]{3,8}\b\|rgba?\(" src --glob "!src/styles/**" --glob "!src/assets/**"` | no hits except the `theme-color` meta |
| No hard-coded strings | `rg -n "(aria-label\|alt\|title)=\"[A-Za-z]" src/components src/layouts`, plus review of component text nodes | no hits. Only `foundation.astro` dev chrome is exempt |
| No physical direction | `rg -n "\b(ml\|mr\|pl\|pr)-\|\b(left\|right)-\|text-(left\|right)\|rounded-(l\|r\|tl\|tr\|bl\|br)\b\|border-(l\|r)\b\|\b(left\|right)\s*:" src --glob "*.{astro,css}"` | no hits. `translate-x` has an `rtl:` counterpart |
| Provisional tokens | `rg -n "prov-" src` | used only in `global.css` and the BlobCard/shape alias map |
| A11y (showcase) | axe-core in the built-in browser, both locales, plus keyboard pass | 0 serious/critical violations except documented contrast (Q1), each referenced to its Q. One `h1`, heading order valid, `main` landmark, skip link works, focus visible on all variants, targets ≥ 44, `lang`/`dir` correct |
| Motion | emulate `prefers-reduced-motion: reduce` | no transitions |
| Zoom | 200% at 1440 and 400% reflow at 320 | no horizontal scroll, no clipped text |
| Weight | `npm run build` output | showcase ships 0 KB of JS; no render-blocking font CSS; fonts requested only from own origin |

## 13. Out of scope / deferred

| Item | Goes to |
|---|---|
| Header, mobile menu, top bar, nav gap token (AR 24 vs EN 12) | Section 01 |
| Footer, final CTA, wordmark build, `--color-overlay` | Sections 12, 13 |
| Modal, form inputs and their states | Section 13 |
| Feature GIF conversion, connector lines, section images | Sections 05, 06, 07, 10 |
| Lead measure cap, header-gap standardisation, button 52px on phones | Enhancer, optional |
| Option B scallop-mask cards | F6b, only if Q13 is rejected |
| Removing the showcase page | Section 14 |
| Real fonts, SVG logo, final colour decisions | when the owner delivers (Q1, Q3, Q8, Q9) |
