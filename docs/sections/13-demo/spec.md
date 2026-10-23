# 13 · Book a Demo modal — Spec

## Components
| File | Purpose |
|---|---|
| `src/components/sections/DemoModal.astro` | `<dialog id="demo">` + form + bundled behaviour script. Prop: `locale`. Mount **once per page** (the lead wires it in `index.astro`) |
| `src/i18n/sections/demo.{en,ar}.json` | all copy, incl. validation, success, error |
| `src/pages/[lang]/preview/demo.astro` | private preview with three kinds of opener |

## Site contract
| Trigger | Behaviour |
|---|---|
| any `[data-demo-open]` (optional value = source name for analytics) | opens the dialog via `showModal()` |
| any `<a href="#demo">` | same (default navigation prevented) |
| URL hash `#demo` on load or `hashchange` | opens; closing clears the hash |
| Esc / backdrop press+click / close button / success "Close" | closes; focus returns to the opener; scroll unlocked |

Native modal dialog gives the focus trap and inert background. `aria-labelledby` follows the visible panel heading (form title, success title, error title). Name field has `autofocus`.

## Form
| Field | `name` | type | autocomplete | rules |
|---|---|---|---|---|
| Name | `name` | text | `name` | required, max 100 |
| Nursery Name | `nursery` | text | `organization` | required, max 150 |
| Work Email | `email` | email | `email` | required, native check + `x@y.zz` regex, max 254. Gets `dir="ltr"` once it has a value (padding swapped so the icon clears the text in RTL) |
| Preferred Date | `date` | date | off | required, `min` = today (visitor's local date, refreshed on every open) |
| Preferred Time | `time` | time | off | required; if the date is today, must not be in the past |
| (honeypot) | `company_website` | text | off | hidden from people and AT; filled means fake success, nothing sent |

Validation: `novalidate` form with our own messages, on blur (once touched), on input after a first error, and on submit (focus goes to the first invalid field; summary in the `role="status"` region). Each field has an `aria-live="polite"` message element wired with `aria-describedby`, plus `aria-invalid`.

## States
`idle` → `submitting` (button disabled, `aria-busy`, label "Sending…") → `success` (thank-you panel, focus on its heading, Close button, form reset) or `error` (message + "Try again", values kept).
Blocked cases: honeypot filled (silent fake success), submitted under 3 s after open (error panel, "too quick").

## Submission and endpoint (OWNER DECISION STILL OPEN)
`POST` JSON to `import.meta.env.PUBLIC_DEMO_FORM_ENDPOINT` (documented in `/.env.example`).
Payload: `name, nursery, email, date, time, locale, page, source, submittedAt`.

| Endpoint | Dev (`astro dev`) | Production build |
|---|---|---|
| unset / not `https:` | simulated success + `console.warn` | error panel "This form is not connected yet. Please contact us on WhatsApp or by email." (no fake success) |
| set | real POST | real POST |

**The owner still must choose the destination**: email service / CRM form endpoint / Google Sheet (Apps Script web app). Requirements for whichever is chosen: HTTPS, CORS allowing the site origin and the `Content-Type: application/json` header, write-only (the URL is public in the bundle; no secrets), server-side spam/rate limiting, server-side re-validation. Google Apps Script web apps do not answer CORS preflights for JSON; use a small proxy (e.g. a Cloudflare Worker) or send `text/plain`.

Security notes: no secret in client code; `fetch` has a 10 s `AbortController` timeout, `credentials: "omit"`, `referrerPolicy: "no-referrer"`, `cache: "no-store"`; non-2xx counts as an error; user input is never inserted as HTML (only `textContent` / form values); `method="post"` so a no-JS submit could never put data in the URL; analytics events carry no PII.

## Analytics hooks (`document` CustomEvents, no third-party scripts)
| Event | `detail` |
|---|---|
| `yawmy:demo-open` | `{ source }` (value of `data-demo-open`, else `"hash"` / `"link"`) |
| `yawmy:demo-submit` | `{ status: "success" or "error" or "blocked", reason?, locale, simulated? }` |

## Responsive / RTL
| Width | Layout |
|---|---|
| ≥ 640 | 767 max width; date and time side by side |
| < 640 | `100vw − 2rem` wide, date/time stacked, panel scrolls inside (`100dvh − 2rem`) |

RTL: logical properties only; icons on the start side (not mirrored); title 32 in AR (`text-h3`), 24 in EN (`text-title`).

## Acceptance
- [x] Opens from `[data-demo-open]`, `href="#demo"`, `#demo` on load; closes on Esc / backdrop / close; focus restored; page scroll locked.
- [x] All 5 fields have real labels, autocomplete, required, native types; min date today.
- [x] Idle / submitting / success / error implemented and exercised (dev simulated success; too-fast error).
- [x] No horizontal scroll at 375; AR mirrors; `astro check` 0 errors.
