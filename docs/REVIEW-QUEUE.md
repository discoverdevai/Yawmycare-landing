# Review / fix queue (lead)

Collected from builder reports. Tick when fixed. Sections 03, 06, 07, 11 reported so far.

## Wiring (index.astro)
- [ ] Hero → Testimonials join: Testimonials has its own `pt-8` (32px); make sure Hero has no `mb-(--section-gap)` stacking on top (set `mb-0` on hero).
- [ ] Setup buttons use `href="#book-demo"`: change to the site contract `href="#demo"` + `data-demo-open`.
- [ ] Keep exactly one FAQPage JSON-LD block on the page (Faq.astro emits it).
- [ ] Footer FAQ link targets `#faq`. All nav/footer anchors: `#home #day #why #setup #security #commitments #pricing #founders #faq`.
- [ ] Check every wave join (06 down → 07 up → 08 down → 09 up → 10 down → 11 up) once all sections are in one page.

## Kit fixes
- [ ] `src/assets/shapes/final-cta.svg` is still the unrotated export (the footer builder shipped a corrected copy at `src/assets/footer/final-cta.svg`): fix the shared shape the same way Setup fixed `cta-band.svg`, then point FinalCta at `BlobCard shape="final-cta"` and delete the copy. Check the other shapes for the same lost rotate(-90).
- [ ] `Button` `on-green-outline` hover (`ink-inverse/15`) drops white text to 3.46:1 on the strong green (2.90:1 pressed): use `bg-primary-cta-hover`.
- [ ] Re-check Fraunces stand-in widths: cards grow taller than Figma (testimonial card 3, security cards 416–448px). Resolves with licensed Recoleta.
- [ ] BlobCard at 375 stretches to 343px wide and ~506px tall for tall shapes (security): consider a max-height/aspect relaxation in fallback mode.

## Responsive pass (after wiring)
- [ ] Setup at 768: single column leaves the right half empty: use 2×2 grid.
- [ ] Testimonials at 768: 3 cards ~218px wide with unequal heights.
- [ ] Full page at 375 / 768 / 1024 / 1440, EN + AR: no horizontal scroll, tap targets, line lengths.

## Owner items collected
- FAQ answers 1, 3, 4, 6, 8, 9, 10, 12, 13 are drafted: confirm facts (cancellation + data export, WhatsApp/Excel migration help, minimum Android version, next country).
- Testimonials lead had an unfilled `[N]` ("in [N] nurseries"): removed; restore with the real count.
- Security cards 1 and 2 repeat their title as the first body sentence in Figma: fix copy at source.
- Setup band uses `primary-cta-strong` (darker than Figma) for AA; revert = `fill="primary-cta-strong"` removal in Setup.astro.
- Arabic drafted strings: see each `docs/sections/*/arabic-review.md` (testimonials 9, security 8, setup 5, faq 27 so far).

## Added after Founders (section 10)
- [ ] Wire `<Founders locale={locale} />` (id `founders`, wave down) after Pricing, before FAQ.
- [ ] Owner: consent to publish the founders' photos and names (real people); confirm the Arabic wording of their first-person stories and the "never charge parents" line (11 strings, `docs/sections/10-founders/arabic-review.md`).
- [ ] Founder portraits are ~600 KB PNGs: shipped as WebP via astro:assets; check final weights in the enhance pass.
- [ ] `BlobCard` now has optional `fill` (Setup) and `flip` (Founders) props: verify both still work together after all merges.

## Added after Final CTA + Footer (section 12)
- [ ] Wire `<FinalCta locale>` as the LAST section in `<main>` and `<Footer locale slot="footer">` straight after it (nothing in between: the footer overlaps the band by --wave-h).
- [ ] Wordmark clamp floor is 40px (64px overflowed at 375): fine, keep.
- [ ] Footer nav labels must match the header's nav labels (header builder may word them differently): align the two i18n files.
- [ ] Footer is ~37px taller than Figma at 1440 (44px nav tap targets below 1024, wider stand-in font): acceptable, re-check with licensed fonts.
- [ ] Owner: social URLs (LinkedIn, Instagram, WhatsApp, Facebook), then set `external` on each.
- [ ] Arabic drafted: footer 10 strings.

## Added after Pricing (section 09)
- [ ] Wire `<Pricing locale>` (id `pricing`, wave up) after Commitments, before Founders.
- [ ] Animated WebP illustrations (pricing 3x, features 6x) loop forever and ignore `prefers-reduced-motion` (WCAG 2.2.2 pause/stop/hide): give reduced-motion users a still frame (first frame as static image via `<picture>` + `(prefers-reduced-motion: reduce)` source, or a pause control).
- [ ] Owner: confirm the rewritten "first 10" body copy ("The first 10 nurseries keep whatever launch price we set, permanently, and decide what we build next. We are new. That is exactly why this is worth it.") and the fixed bullet 1 ("Not per child, not per parent."). Arabic: 14 drafted strings.
- [ ] `Button` has new variant `outline-accent` (Pricing): verify the variant map after all edits.

## Added after Header + Hero (sections 01, 02)
- [ ] Wire `<Header slot="header" locale>` and `<Hero locale>` first. JOIN CONFLICT: Hero has its own `mb-8` and Testimonials has `pt-8` (both 32px): keep only one, so the join is 32px as in Figma.
- [ ] Nav collapses to the menu below 1360px (9 links do not fit with the Fraunces stand-in): re-test at 1280 with the licensed fonts; consider trimming the desktop nav to 6 links + "More" if still tight (PLAN §5 "nice").
- [ ] Desktop AR nav is 16px (AR frame says 20px): would overflow 1440 by ~90px; fine, note to owner.
- [ ] H1 wraps to 4 lines at 1440 (Figma 3) and may touch the photo at 1024-1280: re-check with Recoleta or reduce hero font by one step at 1024-1279.
- [ ] Header is static (Figma shows nothing sticky): owner decision.
- [ ] Hero image asset: 2.3 MB original is in docs; shipped AVIF/WebP: check final weight.
- [ ] Verify "مبني على الثقة" (verbatim from the old AR frame) is the right Arabic label for the security nav item.
- [ ] Arabic drafted: header + hero 15 strings. Social URLs `#` in Header.astro (TODO owner).

## Added after Demo modal (section 13)
- [ ] Mount `<DemoModal locale>` ONCE in index.astro (inside BaseLayout, after main); all CTAs use `data-demo-open` / `href="#demo"` (verify Setup's `#book-demo`, Footer, Pricing, Header, Hero).
- [ ] Input border `#D8D8D8` on `#FFFFF5` is 1.4:1 (WCAG 1.4.11 needs 3:1 for form-field boundaries): darken (e.g. a gray around #8A8A8A, verify >= 3:1) like the other accessibility colour fixes; log in DECISIONS.
- [ ] Add `PUBLIC_DEMO_FORM_ENDPOINT` typing to `src/env.d.ts`.
- [ ] Error text mentions WhatsApp/email without links (no contact URLs in the dictionary yet): owner supplies contact details.
- [ ] Not yet tested: a real network POST, the 10s timeout path, Firefox/Safari date pickers.
- [ ] Arabic: 22 drafted strings; pick one spelling: "الإلكتروني" (drafts) vs Figma's "الالكتروني".
- [ ] Owner: choose the form destination (https, CORS-enabled for JSON, write-only), set the env var at deploy.

## Added after Features (section 05)
- [ ] Wire `<Features locale>` (id `why`, wave up) after Day (04, wave down).
- [ ] Features already swaps to still frames under `prefers-reduced-motion` via `<picture>` (markup verified in built HTML, NOT yet browser-tested): test it with emulated reduced motion. Apply the SAME pattern to the 3 Pricing animated WebPs (they have no still yet).
- [ ] Illustrations: 4.36 MB GIF -> 2.00 MB animated WebP (220px, every 2nd frame, q60). `FRAME_STEP=1` in `docs/sections/05-features/optimise-illustrations.mjs` restores smoothness for ~2 MB more: decide in the enhance pass.
- [ ] Arabic: 14 drafted; look first at "المنطقة" for MENA and "مساؤهم لهم" (terse idiom for "Evenings back for teachers").
- [ ] Second feature row ~350px vs 312px in Figma (wider stand-in font): re-check with Recoleta.

## Added after Day timeline (section 04)
- [ ] Wire `<DayTimeline locale>` (id `day`, wave down) after Testimonials, before Features.
- [ ] Figma is a 2x4 checkerboard grid of dashed cards (NOT a vertical timeline); built as in Figma. Single column on mobile.
- [ ] Owner: the 8:00 PM chat screenshot contains "Lorem ipsum" placeholder bubbles: replace the screenshot or text in Figma.
- [ ] Owner: no Arabic UI screenshots exist; AR pages reuse the English-UI images (alt text is localised). Supply Arabic UI screens when available.
- [ ] Green card stroke uses `stroke-green/80` (Figma #BAC9A8 has no token): fine.
- [ ] Source PNGs in `src/assets/day` are 3.0 MB (build input only); shipped WebP are 5-76 KB each (~350 KB desktop at DPR1).
- [ ] Arabic: 32 values drafted (17 copy, 8 alt, 7 time labels).

## Added after Commitments (section 08) — ALL 12 BUILDERS DONE, page wired in index.astro
- [x] Wired all sections in `src/pages/[lang]/index.astro`; fixed the hero/testimonials double 32px (removed Testimonials `pt-8`).
- [ ] Owner: Commitments lead paragraph in Figma is the Security section's text pasted in ("built with security at its core…"); kept verbatim, flagged: supply the right lead.
- [ ] Owner: confirm "A human answers, in Arabic, within one working day" (Figma had [X]).
- [ ] Commitments card 3 title `#474700` snapped to `primary-text`; 5 animated icons (4.1 MB GIF -> 1.5 MB WebP + stills; reduced-motion handled via `<picture>`). In dev, the still path with a space ("Mohamed Ali") does not load; built paths are hashed: verify in the built output.
- [ ] Arabic: commitments 12 strings.

## Review round: sections 05-08 DONE (reviewer a9ae…): PASS with notes
- Fixed: reduced-motion stills URL-encoding (dev path has a space), Arabic wording in features/setup/commitments, Setup 2x2 at 768, equal step heights, Security column alignment, new BlobCard `relax` option (security only), removed duplicated title sentence in Security EN cards 1-2 (owner may restore Figma wording).
- `--color-primary-cta-strong` is now #5e7748 (was #637c4d: 4.48:1 on surface-sec). theme-color meta matches.
- [ ] Pricing `intl-school` could opt into BlobCard `relax` (same tall-card stretch): left to the 09-13 reviewer.
- [ ] Owner: Commitments lead paragraph duplicates the Security lead (EN + AR): supply the correct one.
- [ ] Reduced-motion still selection tested by forcing the media query only; real emulation not available via tools.

## Review round: sections 01-04 DONE (reviewer a281…): PASS with notes
- Fixed: header menu links 44px tall, AR desktop nav spacing, AR nav labels aligned with the footer, skip-link styling + focus ring; hero H1 collided with the photo at 1024-1440 (now fluid clamp 44-58 EN / 46-62 AR, text column inset by `--hero-overlap`), hero/testimonials join verified 32px; day row gap 48px (section 3219 vs Figma 3209); several Arabic rewordings.
- [ ] After licensed fonts land: re-tune `--hero-overlap`, the fluid hero font floor, the 1360 nav breakpoint, testimonial card 3 height.
- [ ] Owner: sticky header? visible "Book a Demo" button on mobile (it is inside the menu)? real `[N]` nursery count, confirm testimonial quotes are real, replace the Lorem ipsum 8:00 PM screenshot, Arabic UI screens, social URLs, demo video URL.

## Review round: sections 09-13 DONE (reviewer a9cf…): PASS with notes
- Fixed: Pricing stills (reduced motion) + `outline-deep` variant for "Talk to us" (5.6:1), equal-height bottom cards, FAQ region roles removed, CTA band uses `primary-cta-strong`, footer tap targets 44px, `text-balance` on centred leads, demo honeypot `inert`, `aria-describedby` tracks the visible panel, `src/env.d.ts` typing, "الإلكتروني" site-wide spelling, AR strings. Viewport meta now has `interactive-widget=resizes-content`.
- [ ] Not tested: real network POST, timeout branch, Safari/Firefox date pickers.
- [ ] Founders at 768 leaves a ~420x290 empty area beside each photo (left as is): revisit in the responsive pass.
- [ ] Owner: form endpoint, WhatsApp/email contact for the error message, native Arabic review of modal (22), founders consent + Arabic approval, FAQ answers, social URLs, watch-demo URL.
