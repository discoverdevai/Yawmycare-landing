# 13 Demo modal: review 2 (real page, scripted with CDP key events)

**Verdict: PASS with notes.** `astro check` 0 errors.

| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | ok | All 7 visible openers (header, hero, setup, pricing x3, final CTA; the mobile-menu one is hidden at 1440) open the dialog, focus lands on Name, `html` overflow hidden; Esc closes, focus returns to the opener, scroll unlocked. EN and AR | none | scripted run |
| 2 | ok | Tab / Shift+Tab stay inside the dialog (native modal), leave to browser UI, then wrap; honeypot never reached | none | tab sequence |
| 3 | should | Honeypot only had `aria-hidden` + `tabindex=-1` | Added `inert` (no focus, no AT, no autofill) | DOM |
| 4 | nit | Dialog had no description | `aria-describedby` -> lead / success body (removed on the error panel, a `role="alert"`), updated in `setState` | DOM |
| 5 | ok | Validation: empty submit shows 5 messages, focus on first invalid, summary in `role="status"`; bad email / past date messages; submit disables + `aria-busy`; success focuses its heading and `aria-labelledby` follows | none | scripted run |
| 6 | should | AR typos from the Figma frame: "إدخل" and "ادخل" (should be "أدخل"), "الالكتروني" | "أدخل اسمك / اسم المؤسسة / بريدك الإلكتروني"; ONE spelling "الإلكتروني" across the site (grep) | `demo.ar.json` |
| 7 | should | AR tooFast message "تم الإرسال بسرعة كبيرة" said the request WAS sent | "كان ذلك سريعًا جدًا. يرجى مراجعة بياناتك والمحاولة مرة أخرى." | `demo.ar.json` |
| 8 | should | `PUBLIC_DEMO_FORM_ENDPOINT` untyped | `src/env.d.ts` (Astro reference line + `ImportMetaEnv`) | `astro check` |
| 9 | ok | Submit code re-read: values only via `textContent` / JSON body, https-only endpoint (http only in dev), no secrets, 10s `AbortController`, `credentials: omit`, `referrerPolicy: no-referrer`, double submit blocked (`state !== "idle"`, button disabled), honeypot + 3s timing, events carry no PII | none | source |
| 10 | note | 375x667: dialog 343x629, inner scroll (635 client / ~800 content), all fields reachable by scrolling, 44px close button. Android Chrome does not shrink the layout viewport for the keyboard: adding `interactive-widget=resizes-content` to the viewport meta in BaseLayout would make `100dvh` follow the keyboard (lead, one attribute; not tested on a device) | none in the modal | 375 screenshot |
| 11 | note | Input border token is already `field-border` (3.5:1): the old queue item is done | none | DECISIONS #14 |
| 12 | open | Not exercised: a real network POST and the timeout branch (no endpoint), Safari/Firefox date pickers; dev simulates success | owner sets the endpoint | n/a |

Remaining (owner): form destination + env var; WhatsApp/email contact for the error text; Arabic review (22 strings).
