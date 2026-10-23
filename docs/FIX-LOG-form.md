# Fix log: booking dialog v2, scroll-spy, sideways scroll at 200% text

Spec: `docs/FORM-SPEC.md` (now "implemented"). Decision: `docs/DECISIONS.md` #20. Payload: `docs/ENV.md` ("Booking dialog payload").

## 1. Booking dialog v2

- `DemoModal.astro`: panels `form` (step 1: name, mobile/WhatsApp `type=tel`, nursery), `enrich` (step 2: work email, children chips, current tool chips, native date + time, country select, Send details, Skip), `done` (thank-you, next steps, region-aware WhatsApp link, Close), `error`. One persistent `role="status"` below the panels. `DemoField.astro`: `tel` type, optional `required`, optional `dir`.
- `demo-modal.ts` rewritten around states `idle -> submitting -> enrich -> enriching -> done` (+ `error` with Retry back to the step that failed). Kept: `[data-demo-open]` / `#demo` contract, honeypot, 2 s minimum + trusted-event check (step 1 only), double-submit lock per step, 10 s timeout, https-only endpoint, dev simulated success + `console.warn`, production "not connected" error, focus management and restore (menu-toggle fallback). New: `leadId`, `pageUrl` without query/hash, `tz`, `region`, `phoneE164` (only with an explicit `+` or `00`), events `yawmy:demo-enrich` / `yawmy:demo-skip` (no PII in any detail). Phone: 8-15 digits, `+ space - . ( )` allowed, input is `dir="ltr"` in both languages. Fixed on the way: the `source` field sent the literal `"true"` (bare `data-demo-open`).
- i18n `sections.demo`: new `fields.phone/region/children/tool`, `step2.*`, `done.*` (old `success.*` replaced; email/date/time messages kept, now used by step 2). Copy never promises a reply time: "We will contact you to confirm your demo" / "سنتواصل معك لتأكيد موعد العرض التجريبي" (glossary: عرض تجريبي). Parity OK.
- CSS: logical properties only; `html[dir=rtl] .demo-input[dir=ltr]` padding swap and placeholder `text-align: end`; no raw hex. Chips are native radios (`peer`), 44px high, `[overflow-wrap:anywhere]` so a long label never overflows at 200% text.

## 2. Scroll-spy (Header script)

Cause: an IntersectionObserver only fires on crossings of a thin band, so a jump (End key, anchor, back/forward, reload mid-page) left the previous mark (Home stayed lit at the bottom, where no nav section crosses the band). Replaced by a position-based update on scroll/resize/load (rAF-throttled): the current link is the last nav section whose top passed a line 20% of the viewport below the header's bottom edge (so the sticky header offset is respected and a nav click, which lands the section top at the header's bottom edge, marks that section). Below the last nav section (final CTA band, footer) nothing is marked. Verified at 375/768/1440, EN + AR: every nav hash, the End key, and slow scroll.

## 3. Sideways scroll at 200% text (320 / 375, plus 305 / 360 = same widths with a 15px scrollbar)

Measured with `html{font-size:200%}`. The decorative blob SVGs are not the cause (the Day section's oversized SVGs are clipped by their `overflow:hidden` card, the others sit inside their card boxes). Real offenders, fixed at the source (no `overflow-x:hidden` on `html`/`body`, sticky untouched):

- Header "Book a Demo" button (AR, <= 320px): `shrink-0` + nowrap label wider than the row. Added `max-w-full` so the label wraps.
- Features: the "عربي" badge row (`flex` without wrap) pushed past the card. Added `flex-wrap`.
- Founders: the `cite` name (non-breaking space inside "Mr. Mohammed") could not wrap. Added `min-w-0 [overflow-wrap:anywhere]`.

Result: `scrollWidth == clientWidth` at 305/320/360/375, EN + AR, whole page; the dialog (form and step 2) is also clean at 200%.

## Verified (headless Chrome over CDP against the dev server; temporary scripts, not committed)

EN + AR at 375x667 and 1440x900: open from the header button; empty submit (3 messages, summary, focus on first error); bad phone; instant spam-fill blocked ("too fast", values kept on Retry); fill after 2 s succeeds (simulated, `console.warn`); step 2 email error, chips, date/time, country pre-filled from `data-region`; Skip; done panel (WhatsApp link dashed in dev); close button, Esc, backdrop; focus restored to the opener; reopen starts clean; keyboard-only run (Tab to opener, Enter, type, Tab, Enter submits, arrows on chips, Skip, Close); Shift+Tab trap; no horizontal scroll in any state. 3 fields + submit visible without scrolling at 375x667 (EN and AR). Events observed with no PII. Payloads checked (`pageUrl` drops `?utm` and `#hash`).

Production build (`astro build`, no env): the submit shows the "not connected" error in EN and AR, focus on its heading; `dist/*/index.html` has 0 `href="#"`, 0 `wa.me`, 0 `region-data`. `astro check` 0 errors, parity OK, prettier run.

## Open

- The endpoint must upsert on `leadId` and meet the 12 requirements (docs/reviews/security.md); two POSTs per lead.
- Native Arabic review of the new strings (`demo.ar.json`: phone label, step 2, done).
- Field-level drop-off instrumentation and a privacy link are still later work.
