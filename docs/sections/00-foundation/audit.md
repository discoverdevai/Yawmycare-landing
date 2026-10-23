# 00 · Foundation — Audit

Scope: the shared design system reused by every section (tokens, type, buttons, section header, wave divider, blob shapes, logo, icons, grid). Source: Figma `oSQUBKWEqG5XrY4sHCzjzy`, canonical EN frame `1457:3895` (Updated Version), AR reference `1434:3715`. Assets are in `docs/sections/00-foundation/assets/`.

## Summary

- **One font family per locale.** EN uses Recoleta for everything, headings and body alike, in 5 weights (Regular 400, Medium 500, SemiBold 600, Bold 700, Black 900). There is **no separate EN body font**. AR uses Expo Arabic (Book 400, Medium 500, Bold 700).
- **Tokens:** 16 colour variables exist and are mostly respected. There are 7 off-token colours: card strokes `#ADC697`, security stroke `#F5A292`, testimonial fill `#FCF1E6`, green card fill `#F1F4E6`, peach fill `#FDF8ED` (the token is `#FEF8ED`), footer wordmark `#C7D8B6`, and the unlisted variable `stroke/grayColor #D8D8D8`.
- **Buttons** are plain frames, not components. **No hover, focus, active or disabled states exist in Figma.**
- **Section header (Updated Version):** a left-aligned h2 (Bold 48), an optional 24px lead, and **no eyebrow**. The old "eyebrow" (`1326:4152`) is a 2px left-bar label and appears only in the old frame.
- **Wave divider:** one 20-scallop shape (≈72px pitch) used in 4 orientation/colour variants. The fill equals the page background, so only a soft green shadow makes it visible.
- **Blob cards** are hand-drawn wavy SVG paths in ~12 sizes. They cannot be faked with `border-radius` and need SVG (see Assets).
- **Grid:** 1440 canvas, 1200 container (120 side margins), implicit **12 columns × 78px with 24px gutters**. The nav breaks this with a 1280 container (80 margins).
- **A11y headline risks:** white-on-green CTA text is 3.38:1 and green outline text on cream is 3.29:1. Both fail AA for 18px bold. Social icon buttons are 40px (below 44px). There are no focus styles.

## Structure

Page rhythm, measured from `1575:41862`, `1575:41867`, `1575:41874`, `1580:41973`, `1589:43302`, `1592:43397` and `1592:43584`:

| Element | Value |
|---|---|
| Canvas / container | 1440 / 1200, x=120 (side margin 120) |
| Section frame | `flex-col`, items-center, children: wave (76) → gap **58** → content (1200) |
| Gap between section frames | **48** (bottom padding of a section = 0) |
| Last content → next h2 | 48 + 76 + 58 = **182px** |
| Hero → first section (testimonials) | hero 937 tall (incl. its bottom wave), testimonials start at y=969 (**32** gap) |
| Page bg | `bg/whiteColor #FFFFF5`; hero bg `bg/secColor #FCFCEC`; footer bg `primary/bgColor #DFEBD1` |
| Nav bar | y=100 below the 76px top bar; inner 1280 at x=80, h64, logo→links gap 40, links gap 12, links→actions gap 57, actions gap 12 |

### Column grids in use (all fit a 12 × 78 + 24 gutter grid)

| Pattern | Widths | Cols of 12 | Where |
|---|---|---|---|
| 3-up | 384 ×3, gap 24 | 4 | Differentiators `1575:41851`, intl-school card |
| 4-up | 282 ×4, gap 24 | 3 | Setup steps `1575:41863`, security cards, testimonials (label + 3 cards) |
| 2-up | 588 ×2, gap 24 | 6 | Commitments `1580:41936` |
| 1/3 + 2/3 | 384 + 792, gap 24 | 4 + 8 | Pricing `1589:43299` |
| Full | 1200 | 12 | Commitments wide card, pricing main card, CTA band, FAQ rows |
| Hero | text 792 (h1), lead 565, image 656 bleeding to right edge | — | `1457:3898` |

### Section header pattern

| Part | Spec | Node |
|---|---|---|
| Eyebrow | **Not used in Updated Version.** Old: 2px left border `#B5503C`, padding 8/4, Recoleta SemiBold 14/1 `#B5503C` (`h5/semi`) | `1326:4152` |
| h2 | Recoleta Bold 48, line-height **48px** (`web/h2`) for one line. Testimonials 2-line h2 uses **1.3** (inconsistent). Colour `text/blackColor #333333`, left-aligned, width 1200 | `1457:3979`, `1465:3965` |
| Lead | Recoleta **Regular** 24 / 1.3, `#333333`, width 1200 (no max-width; runs ~110 chars/line) | `1457:4098`, `1465:3966` |
| h2 → lead gap | **24** | `1457:4096` |
| Header → content gap | **48** (differentiators, testimonials, pricing, commitments), **58** (setup, security, founders), **40** (FAQ). Inconsistent | — |
| Centered variant | CTA band / final CTA: title Bold 40/40 (band) or 48/48 (final), lead Regular 24/1.3 `#F8FAEE`, text-center, gap 24, then 30 to buttons | `1457:4145`, `1457:4201` |

## Copy (shared UI strings, EN / AR)

| Key | EN (Updated) | AR (from `1434:3715`) |
|---|---|---|
| Top bar / footer tagline | Manage Smarter with YAWMY CARE. | TODO(copy). Check AR top bar `1434:3719` |
| Nav: Home | Home | الرئيسية |
| Nav: A day at your nursery | A day at your nursery | TODO(copy) |
| Nav: Why Yawmy | Why Yawmy | لماذا يومي كير |
| Nav: Set up in 20 minutes | Set up in 20 minutes | TODO(copy) |
| Nav: Security | Security | مبني على الثقة (old "Built on trust". Confirm it maps) |
| Nav: Our commitments | Our commitments | TODO(copy) |
| Nav: Pricing | Pricing | TODO(copy) |
| Nav: Founder | Founder | TODO(copy) |
| Nav: FAQ | FAQ | TODO(copy) |
| Footer-only nav | Built with nurseries | TODO(copy) |
| (AR-only, dropped) | — | عن يومي كير (About), الميزات الاساسية (Core features) |
| Primary CTA (nav, bands) | Book a Demo | احجز عرضًا تجريبيًا |
| Primary CTA (hero) | Book a free demo | TODO(copy) |
| Primary CTA (modal submit) | Book My Free Demo | TODO(copy). See section 13 |
| Secondary CTA (bands) | Watch Demo | شاهد العرض |
| Secondary CTA (hero) | Watch the 2 minute tour | TODO(copy) |
| Footer wordmark | YAWMY CARE | TODO(copy). Same Latin wordmark, or Arabic "يومي كير"? |

Copy issues: "YAWMY CARE" (caps) vs "Yawmy Care" vs "Yawmy" are used interchangeably. "Watch the 2 minute tour" needs a hyphen: "2-minute". There are three different primary CTA labels. The nav says "Founder" (singular), but the section shows two founders. AR "الاساسية" is missing the hamza (should be "الأساسية"). The tagline uses Title Case ("Manage Smarter") while the rest of the page uses sentence case.

## Assets

All files are in `docs/sections/00-foundation/assets/`. SVG waves and blobs have been normalised to their rendered orientation (Figma stores several of them rotated or flipped).

### Wave dividers (inline SVG, `preserveAspectRatio="none"`, stretch to 100vw)

| File | Figma node(s) | Shape | Fill | Shadow |
|---|---|---|---|---|
| `wave-topbar.svg` | `1457:3900` (in "Group 42") | 1440×76, flat top, 20 scallops pointing **down** | `primary/bgColor #DFEBD1` | none |
| `wave-hero-bottom.svg` | `1457:3920` ("Group 43" in hero) | 1534×100 viewBox (1510×76 shape + 12px bleed), scallops **up**, flat bottom; placed at x=−46 so it overflows both edges | `#FFFFF5` | `0 0 12px rgba(118,148,92,.48)` |
| `wave-scallop-up.svg` | `1580:42018` (05), `1580:42072` (07), `1580:42081` (09), `1592:43404` (11) | 1440×100 viewBox, scallops **up**, flat bottom | `#FFFFF5` | `0 -5px 12px rgba(118,148,92,.2)` |
| `wave-scallop-down.svg` | `1457:4011` (04), `1580:42069` (06), `1580:42075` (08), `1580:43131` (10) | 1440×100 viewBox, flat top, scallops **down** | `#FFFFF5` | `0 5px 12px rgba(118,148,92,.2)` |
| `wave-footer.svg` | `1457:4244` | 1440×76, scallops **up**, flat bottom | `#DFEBD1` | none |

Usage: the hero bottom uses the hero variant (up). From section 04 onwards the dividers **alternate down/up**: 04 down, 05 up, 06 down, 07 up, 08 down, 09 up, 10 down, 11 up. 04, 05, 06 and 07 were confirmed by render; 08–11 were inferred from the vector transform (the Figma layer names "Group 43/44" are not reliable). The footer top uses the footer variant, which overlaps the final CTA blob. Scallop pitch ≈ 72px (hero ≈ 75.5px). Because the fill equals the page bg, the divider reads only through its shadow.

### Blob / organic shapes (need SVG; `border-radius` cannot reproduce the wavy edges)

| File | Node | Size | Fill | Stroke |
|---|---|---|---|---|
| `blob-card-feature-384x312.svg` | `1532:31953` (×6 in section 05) | 384×312 (+3 bleed) | `bg/tapsColor #F3F5E8` | 3px inside, `#ADC697` (off-token) |
| `blob-card-step-282x201.svg` | `1457:4123` (×4 in 06) | 282×201 | `#F3F5E8` | 3px inside, `#ADC697` |
| `blob-step-number-48.svg` | `1457:4110` (×4) | 48×48 | `#F3F5E8` | 3px inside, `#ADC697` |
| `setup-steps-connector-lines.svg` | `1457:4102` | 930×116 | `#ADC697` (dashed lines as fills) | — |
| `blob-cta-band-1200x348.svg` | `1457:4143` | 1200×348 | `primary/CTAprimarycolor #76945C` | none |
| `blob-final-cta-1200x910.svg` | `1457:4199` | 1200×910 (lower part hidden under footer) | `#76945C` | none |
| `blob-card-testimonial-282x236.svg` | `1465:5116` (×3) | 282×236 | `#FCF1E6` (off-token) | none |
| `blob-card-security-282x416.svg` | `1457:4168` (×4) | 282×416 (+3 bleed) | `#FDF8ED` | 3px, `#F5A292` (off-token) |
| `blob-card-commitment-588x247-peach.svg` | `1580:41918`, `1580:41939` | 588×247 | `#FDF8ED` | none |
| `blob-card-commitment-588x247-green.svg` | `1580:41924`, `1580:41945` | 588×247 | `#F1F4E6` (off-token) | none |
| `blob-card-commitment-1200x183-wide.svg` | `1580:41931` | 1200×183 | `sec/strokeColor #F5F5DC` | none |
| `blob-card-pricing-1200x424.svg` | `1580:42085` | 1200×424 | `#DFEBD1` | none |
| `blob-card-intl-school-384x503.svg` | `1587:43172` | 384×503 | `#F5F5DC` | none |
| `blob-card-first10-792x503.svg` | `1587:43216` | 792×503 (+2 bleed) | `#FDF8ED` | 2px, `Accent/textColor #B5503C` |
| `blob-founder-text-1181x423.svg` | `1592:43307`, `1592:43380` | 1181×423 | `#DFEBD1` | none |
| (not exported) | `1457:4181` security centre image, `1592:43351`/`1592:43381` founder photos | — | image clipped to a blob mask | export with the section (07, 10) |

Implementation note: every blob is a fixed-aspect drawing with `preserveAspectRatio="none"`. Stretching it horizontally on smaller screens distorts the scallops. For responsive cards, use the SVG as a `background` / `mask` with `preserveAspectRatio="none"` only within ±20% of the design ratio, or build a CSS `mask` with a repeating scallop edge (radial-gradient) for the wavy-edge cards (features, steps, security, testimonials all have a regular ~25px scallop). The large irregular blobs (CTA band, pricing, founders, commitments) need the SVG.

### Logo and wordmark

| Item | Detail |
|---|---|
| `logo.png` | `image 10` (nav `1599:43650` 71×64, footer `1457:4218` 158×139, AR nav `1434:3743` 84×74). **Raster only: 285×258 RGBA PNG.** That is less than 2× for the footer (needs 316×278). No vector exists in the file |
| Footer wordmark | `1457:4215` is **live text**, not an image: "YAWMY CARE", Recoleta Medium 170 / 170, `#C7D8B6` (off-token), centred, bottom-clipped by the footer (`overflow:hidden`). Decorative, so use `aria-hidden` |

### Icons (all 24px boxes unless noted; stroke 1.5, round caps; vuesax "linear" set + iconify)

| File | Figma name | Colour as exported | Used in |
|---|---|---|---|
| `icon-calendar.svg` / `-dark` / `-gray` | vuesax/linear/calendar | `#FEFEFE` / `#334722` / `#535353` | primary CTA (white), inverse CTA (dark), modal date |
| `icon-video-circle.svg` / `-white` | vuesax/linear/video-circle | `#76945C` / `#FEFEFE` | secondary CTA, on-dark secondary |
| `icon-language.svg` | iconoir:language | `#333333`, **32px** box | language switch |
| `icon-linkedin.svg` / `-white` | basil:linkedin-outline (fill) | `#333333` / `#FEFEFE` | top bar / footer |
| `icon-instagram.svg` / `-white` | hugeicons:instagram | `#333333` / `#FEFEFE` | top bar / footer |
| `icon-whatsapp.svg` / `-white` | ic:round-whatsapp (fill) | `#333333` / `#FEFEFE` | top bar / footer |
| `icon-facebook.svg` / `-white` | mynaui:facebook | `#333333` / `#FEFEFE` | top bar / footer |
| `icon-profile.svg` / `-white` | vuesax/linear/profile | `#535353` / `#FEFEFE` | modal name field / testimonial & founder badges |
| `icon-sms.svg` | vuesax/linear/sms | `#535353` | modal email |
| `icon-clock.svg` | vuesax/linear/clock | `#535353` | modal time |
| `icon-school.svg` | streamline-flex:school | `#535353` | modal nursery name |
| `icon-quote.svg` | si:quote-line (rotated 180°) | `#333333`, stroke 5, **67px** | testimonials |
| `icon-plus.svg` / `icon-minus.svg` | akar-icons:plus/minus | `black`, stroke 2 | FAQ |

Recommendation: ship the icons as one inline SVG sprite with `stroke="currentColor"` / `fill="currentColor"` so a single file serves every colour variant.

### Illustrations (section-owned, downloaded here because they arrived with the section 05 query)

`illus-feature-{one-tap-checkin,know-who-read,photo,evenings,arabic,wallet}.gif`: **animated GIFs** (Figma reported them as PNG). Each is 375×375, 58–181 frames at 30ms, looping, 0.4–1.1 MB (4.3 MB total). Shown at 110×110. They look like stock animated icons (Flaticon-style), so the **licence must be confirmed**. Convert to animated WebP or `<video>` (MP4/WebM) at 220×220 with `prefers-reduced-motion` fallback to a static frame.

## Tokens

### Colour variables (Figma, confirmed via `get_variable_defs` on `1457:3895` and `1434:3715`)

| Token | Hex | Main use |
|---|---|---|
| primary/bgColor | `#DFEBD1` | top bar, footer, pricing & founder blobs, FAQ number badge |
| primary/CTAprimarycolor | `#76945C` | primary button bg, outline border/text, active nav, CTA blobs, FAQ open border |
| primary/textColor | `#334722` | card titles, step numbers, inverse button text |
| primary/bglightColor | `#F8FAEE` | inverse button bg, lead on green |
| bg/whiteColor | `#FFFFF5` | page bg, wave fill, social button bg (top bar), modal bg |
| bg/secColor | `#FCFCEC` | hero bg |
| bg/tapsColor | `#F3F5E8` | language button bg, feature/step card fill |
| sec/strokeColor | `#F5F5DC` | FAQ row bg, intl-school + wide commitment blob |
| text/blackColor | `#333333` | body, headings |
| text/grayColor | `#535353` | hero lead, modal lead, placeholders, form icons |
| text/whitecolor | `#FEFEFE` | text/icons on green and coral |
| AccentColor/main | `#E2725B` | hero h1 highlight words, social buttons (footer), profile badge |
| Accent/textColor | `#B5503C` | testimonial attribution, first-10 stroke, eyebrow (old) |
| AccentColor/bglightcolor | `#FEF8ED` | (defined; the blobs actually use `#FDF8ED`) |
| stroke/accentColor | `#FFCCC1` | defined, not seen in the audited nodes |
| stroke/grayColor | `#D8D8D8` | modal input border. **Not in CLAUDE.md token list** |

### Off-token values (flag; decide whether to promote to tokens)

| Value | Where | Suggestion |
|---|---|---|
| `#ADC697` | 3px stroke of feature/step/number blobs; setup connector lines | new token `stroke/greenColor` |
| `#F5A292` | 3px stroke of security cards | new token, or reuse `stroke/accentColor #FFCCC1` |
| `#FDF8ED` | security, commitments (peach), first-10 fills | snap to `AccentColor/bglightcolor #FEF8ED` (1-unit diff) |
| `#FCF1E6` | testimonial blob fill | new token `accent/bgSoft` or snap to `#FEF8ED` |
| `#F1F4E6` | commitments green blob fill | snap to `bg/tapsColor #F3F5E8` |
| `#C7D8B6` | footer wordmark | new token |
| `#E2725B`, `#334722` as raw hex | hero h1 spans `1457:3943`, FAQ number `1592:43481` | same values as tokens; use the tokens |
| `rgba(118,148,92,.2)` / `.48` | wave shadows (= `#76945C` at 20% / 48%) | `--shadow-wave` |
| `rgba(0,0,0,.6)` | modal overlay `1326:4515` | `--overlay` |

### Typography — EN (Recoleta; no separate body font)

| Role | Weight | Size / line-height | Colour | Figma style / node |
|---|---|---|---|---|
| Hero h1 | SemiBold 600 | 58 / 1.3 | `#333` + `#E2725B` highlight words | none (off-style) `1457:3943` |
| h2 section | Bold 700 | 48 / 48px (1.3 when 2 lines) | `#333` | `web/h2` |
| CTA band title | Bold 700 | 40 / 40px | `#FEFEFE` | none `1457:4146` |
| h3 | Bold 700 | 32 / 32px (testimonial label uses 1.3) | `#333` / `#334722` | `web/h3-bold` |
| Card title (features) | **Black 900** | 24 / 24px | `#334722` | none `1532:31956` |
| Card title (steps) | Bold 700 | 24 / 1.3 | `#334722` | `1457:4125` |
| FAQ question / modal title | Bold 700 | 24 / 1 | `#333` | `H1/bold` |
| Lead | Regular 400 | 24 / 1.3 | `#333` (`#F8FAEE` on green) | none |
| Hero lead | Medium 500 | 24 / 1.3 | `#535353` | none `1457:3944` |
| Quote | Medium 500 | 24 / 1.3 | `#333` | `1465:5118` |
| Body (cards) | Regular 400 | 20 / 1.3 | `#333` | none `1532:31957` |
| Body small | Regular 400 | 16 / 1.3 (modal 16 / 1.5) | `#333` / `#535353` | none |
| Button | Bold 700 | 18 / 1 | per variant | `H3/bold` |
| Nav / label / tagline | Medium 500 | 16 / 1 | `#333`; active `#76945C` | `H4/med` |
| Caption (attribution) | Bold 700 | 14 / 14px | `#B5503C` | none |
| Placeholder | Regular 400 | 14 / 1 | `#535353` | `H5/placeholder` |
| Eyebrow (old only) | SemiBold 600 | 14 / 1 | `#B5503C` | `h5/semi` |
| Footer wordmark | Medium 500 | 170 / 170px | `#C7D8B6` | none |

Letter-spacing is 0 everywhere. Weights to license: Regular, Medium, SemiBold, Bold, Black.

### Typography — AR (Expo Arabic)

| Role | Weight | Size / line-height | Figma style |
|---|---|---|---|
| h1 | Bold | 62 / 1.5 | `AR-h1-bold` |
| h2 | Bold | 48 / 48px | `AR/h2-bold` |
| h3 | Bold | 32 / 32px | `AR/h3-bold` |
| Button | Bold | 18 / 1 | `AR/h6` |
| Body large | Book 400 | 24 / 1.5 | `AR/textbodylarge` |
| Nav | Medium | **20** / 1 (EN is 16) | none `1434:3744` |

The AR nav gap is 24 (EN 12) and the AR logo is 84×74 (EN 71×64). Line-height 1 for Arabic headings risks clipping diacritics (e.g. "عرضًا"), so use ≥1.4 in code.

### Spacing, radii, borders, shadows

| Kind | Values seen |
|---|---|
| Spacing scale | 4, 8, 12, 16, 24, 30, 32, 40, 48, 57/58, 76 (wave), 80, 88 |
| Radii | `100` pill (buttons, number badge), `10000` circle (icon buttons), `20` (inputs, 32px avatar badge), `32` (FAQ rows), `50` (modal) |
| Borders | outline button 1px `#76945C`; on-dark outline 1px `#FEFEFE`; active nav underline 1.5px `#76945C` + 4px py; FAQ open 2px `#76945C`; input 1px `#D8D8D8`; blob strokes 3px `#ADC697` / `#F5A292`, 2px `#B5503C` |
| Shadows | Waves only: `0 ±5px 12px rgba(118,148,92,.2)`, hero `0 0 12px rgba(118,148,92,.48)`. No card or button shadows |

## Buttons

None of these are Figma components. There are no variants, so **hover, focus, pressed and disabled do not exist in Figma.**

| Variant | Node(s) | Height | Padding | Radius | Bg | Border | Text | Icon | Gap | Width |
|---|---|---|---|---|---|---|---|---|---|---|
| Primary | `1457:3946`, `1599:43668`, `1326:4634` | 56 | 8 / 16 | 100 | `#76945C` | none | Recoleta Bold 18/1 `#FEFEFE` | calendar 24, `#FEFEFE` | 12 | hero 282 fixed; nav hug (179); modal full |
| Secondary (outline) | `1457:3950` | 56 | 8 / 16 | 100 | transparent | 1px `#76945C` | Bold 18/1 `#76945C` | video-circle 24, `#76945C` | 12 | hug (274) |
| Primary on green (inverse) | `1457:4149`, `1457:4205` | 56 | 8 / 16 | 100 | `#F8FAEE` | none | Bold 18/1 `#334722` | calendar 24, `#334722` | 12 | 386 fixed |
| Secondary on green | `1457:4153`, `1457:4209` | 56 | 8 / 16 | 100 | transparent | 1px `#FEFEFE` | Bold 18/1 `#FEFEFE` | video-circle 24, `#FEFEFE` | 12 | 386 fixed |
| Icon button: language | `1599:43663` | 56×56 | icon centred | circle | `#F3F5E8` | none | — | language 32, `#333` | — | — |
| Icon button: social (top bar) | `1457:3904`… | 40×40 | 8 | circle | `#FFFFF5` | none | — | 24, `#333` | gap 12 between | — |
| Icon button: social (footer) | `1457:4230`… | 40×40 | 8 | circle | `#E2725B` | none | — | 24, `#FEFEFE` | gap 12 | — |
| Nav link (active) | `1599:43652` | 24 | py 4 | — | — | bottom 1.5px `#76945C` | Medium 16/1 `#76945C` | — | — | — |
| AR primary/secondary | `1434:3765` | same | same | same | same | same | Expo Arabic Bold 18/1; icon after text (RTL mirror of order) | — | 12 | 282 / 237 |

The pricing section also has outline buttons ("Talk to us" in green, "Be The First Partner" in coral `#B5503C`). Audit them in section 09.

## Gaps & Risks

| Sev | Item |
|---|---|
| blocker | **Logo is raster only** (285×258 PNG). The footer shows it at 158×139, which needs ≥316px for 2×. An SVG logo is needed |
| blocker | **Fonts:** Recoleta (5 weights incl. Black 900) and Expo Arabic (Book, Medium, Bold) need licensed WOFF2 files |
| blocker | **Feature illustrations are animated GIFs** of unknown licence (4.3 MB). Need the licence, plus the source files or permission to convert |
| should | Contrast: `#FEFEFE` on `#76945C` = **3.38:1** and `#76945C` on `#FCFCEC` = **3.29:1**. Both are below AA 4.5:1 for 18px bold button text (18px bold is just under the 18.66px "large" threshold). Options: darken the CTA green, or use 19px+ bold text |
| should | Contrast: hero highlight `#E2725B` on `#FCFCEC` = **2.99:1**. This fails even the 3:1 large-text minimum (58px). Darken slightly or use `#B5503C` |
| should | Contrast: `#76945C` text on `#DFEBD1` = 2.75:1 (if used on the pricing card). Input border `#D8D8D8` on `#FFFFF5` = 1.42:1 (fails 3:1 for non-text UI) |
| should | No hover, focus-visible, active or disabled states. Developer must define them, e.g. darken 8% on hover, 2px `#334722` focus ring offset 2px |
| should | Social icon buttons are 40×40. Raise to 44×44 (keep the 24 icon) |
| should | Inconsistent h2 line-height (48px vs 1.3) and header→content gap (40 / 48 / 58). Standardise on 1.2 and 48 |
| should | Off-token colours (7). Promote or snap them (see table) |
| should | Nav container is 1280/80 margins while everything else is 1200/120 |
| should | 9 nav links plus 2 actions don't fit below ~1280px. Needs a hamburger/drawer at ≤1024 |
| should | Brand casing: "YAWMY CARE" / "Yawmy Care" / "Yawmy" |
| nice | Wave divider is visible only through a 20% shadow. On low-contrast screens it nearly disappears, which is acceptable as decoration (`aria-hidden`) |
| nice | Icons have hard-coded colours per variant. Ship them as a `currentColor` sprite |

### Proposed responsive behaviour (no mobile frame exists)

| Primitive | 768 | 375 |
|---|---|---|
| Container | 100% − 2×32 | 100% − 2×16 |
| Grid | 12→8 cols: 4-up → 2-up, 3-up → 2-up, 2-up → 1-up | everything 1-up |
| Type | h1 58→44, h2 48→36, lead 24→20, body 20→18 | h1 36, h2 28, lead 18, body 16 (line-height 1.3) |
| Section rhythm | 58→40 under wave, 48→32 between | 32 / 24 |
| Wave | scale height 76→48, keep scallop pitch ~48px (use a repeating pattern rather than stretching 20 scallops) | height 32, pitch ~32px |
| Buttons | height 56, full width when stacked | 52 high, full width, stacked, gap 12 |
| Blob cards | SVG background, `preserveAspectRatio="none"`, or CSS scallop mask | CSS scallop mask (avoids distorted SVGs at tall aspect ratios) |
| Nav | drawer below 1024; language and CTA stay visible | logo + language + menu button; CTA in drawer and sticky bottom bar |

## Open questions for the owner

1. Can you provide the **logo as SVG** (and a monochrome version)?
2. Do you hold **web licences** for Recoleta (Regular, Medium, SemiBold, Bold, Black) and Expo Arabic (Book, Medium, Bold)? Please send the WOFF2 files.
3. What is the **licence/source of the animated feature icons** (GIFs)? Can we convert them to WebP or video?
4. Is it OK to **darken the CTA green** (or enlarge button text) to meet WCAG AA? Same question for the hero coral highlight.
5. Should the off-token colours (`#ADC697`, `#F5A292`, `#FCF1E6`, `#F1F4E6`, `#FDF8ED`, `#C7D8B6`) become tokens, or should we snap them to existing ones?
6. Which **primary CTA label** is canonical: "Book a Demo", "Book a free demo" or "Book My Free Demo"? And "Watch Demo" or "Watch the 2-minute tour"?
7. Brand name casing: is it "Yawmy Care" or "YAWMY CARE"? Should the footer wordmark be Latin in AR too?
8. Arabic copy for the new nav items (A day at your nursery, Set up in 20 minutes, Our commitments, Pricing, Founder(s), FAQ, Built with nurseries) and the tagline.
9. Should the footer nav include "Built with nurseries" (it is not in the header), and is "Founder" meant to be "Founders"?
10. Are hover/focus styles up to us, or will design supply them?
