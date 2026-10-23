# Booking dialog v2 (spec, from form-strategy + multi-step-form-design)

Goal: more qualified demo requests with less friction, WhatsApp-first for MENA. Applies to `DemoModal` / `src/scripts/demo-modal.ts`.

**Status: implemented** (see `docs/FIX-LOG-form.md`, `docs/DECISIONS.md` #20).

## Decision: capture first, enrich after (not a long multi-step form)
Skill rule: forms of 4-6 fields stay single-page; ask the minimum for the next step, everything else later. So:

| Stage | What | Required |
|---|---|---|
| **Step 1 (the form)** | Name · Mobile / WhatsApp number (with country code, `type="tel"`, `autocomplete="tel"`, region default dial code) · Nursery name | all 3 |
| **After submit (success panel = step 2, optional)** | "Help us prepare your demo" (skip anytime): work email · country/region (pre-filled from the page region) · number of children (range chips) · preferred day/time (native date + time) · what you use today (WhatsApp / Excel / paper / other) | none |
| **Success** | Reply-time promise (only once the owner supplies it; until then no time is promised), what happens next, WhatsApp link when the region has a number, close button |

Step 1 is submitted to the endpoint immediately (lead is never lost); step 2 is a second POST that updates the same lead (idempotent `leadId` returned by the endpoint or a client-generated id), so abandoning step 2 costs nothing.

## Rules
- Labels above inputs, single column, native input types, `autocomplete` (`name`, `tel`, `organization`, `email`); required fields marked (existing legend); validate on blur + on submit; specific messages; first error focused; data kept on error.
- Phone validation liberal (digits, `+`, spaces, dashes; 8-15 digits): never reject valid regional formats (Egypt 01x, Saudi 05x, US). Normalise to E.164 only if a country is known.
- Spam: keep honeypot (inert) + activity-based timer; rate limiting/Turnstile are server-side (see `docs/reviews/security.md` 12 requirements). Server must re-validate.
- A11y: dialog focus rules already built (focus trap, restore, status region); step 2 inside the same dialog with a heading and `aria-live` success; Esc/close available; AR RTL with `dir="ltr"` on phone/email while typing.
- Region: default from the page region switch (`yawmy:region-change`); show the region's WhatsApp link only when configured (otherwise hidden in production).
- Events (no PII): `yawmy:demo-open`, `yawmy:demo-submit` (step 1), new `yawmy:demo-enrich` (step 2 submitted) and `yawmy:demo-skip`.
- Instrumentation to add later (Phase 4): field-level drop-off (focus without submit), step 2 skip rate.
- Copy: EN + AR via `sections.demo` keys (parity). Title stays "See Yawmy Care in Action"; submit label "Book My Free Demo"; no new legal text; privacy link added once a privacy page exists.

## Acceptance
3 fields visible without scrolling at 375x667; completes with keyboard only; instant spam-fill blocked; step 1 succeeds without step 2; step 2 optional and skippable; EN/AR parity; all existing focus/status behaviours still pass.

## Implementation notes and deviations (as built)
- **Payload** (JSON POST to `PUBLIC_DEMO_FORM_ENDPOINT`, https only, 10 s timeout, `credentials: omit`). Both steps carry `step`, `leadId` (`crypto.randomUUID()`, reused on retry, dropped when the flow ends), `locale`, `pageUrl` (origin + path, no query or hash), `tz`, `submittedAt`. Step 1 adds `name`, `phone` (as typed), `phoneE164` (only when the visitor typed `+` or `00`; never guessed from the region), `nursery`, `region` (page region), `source`. Step 2 adds only the fields the visitor filled: `email`, `children` (`1-30` / `31-80` / `81-150` / `150+`), `currentTool` (`whatsapp` / `excel` / `paper` / `other`), `date`, `time`, `region` (the country picked, default the page region). The server upserts on `leadId`.
- Deviations from the plan above: the "country" field is a native `<select>` of the three regions (Egypt, Saudi Arabia, United States) so it matches the regions model; the phone field has no separate dial-code picker (placeholder `+20 100 000 0000`; the visitor types their own code); the success panel's "reply-time promise" is replaced by "We will contact you to confirm your demo" (no time promised, the owner has not supplied one); email, date and time moved from step 1 to step 2 (date/time still validated: not in the past).
- **Events** (on `document`, no personal data): `yawmy:demo-open {source}`, `yawmy:demo-submit {status, step: 1, reason?, simulated?, locale, region}`, `yawmy:demo-enrich {status, locale, region}`, `yawmy:demo-skip {locale, region}`.
- **Focus**: first field on open; step 2 heading after step 1 succeeds; done heading after step 2 or Skip; error heading on errors; restored to the opener on close (menu toggle fallback kept). One persistent `role="status"` region for the whole dialog.
- A failed step 2 shows the generic error with Retry back to step 2 (the lead is already captured). Closing the dialog during step 2 ends the flow; a re-open starts a new lead.
- The WhatsApp link in the done panel is the same `[data-wa-link]` mechanism as the floating button: hidden while the current region has no number, not rendered in production when no region has one.
- Not built (planned for later): field-level drop-off instrumentation, privacy link (no privacy page yet).
