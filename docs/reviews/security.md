# Security review: Yawmy Care landing page

Scope: Astro 7.4.2 static site, no backend, one demo-booking form (`DemoModal.astro`) that POSTs JSON to `PUBLIC_DEMO_FORM_ENDPOINT`. Review date 2026-10-23. Read-only review: nothing under `src/` was changed. A fresh production build was made into a scratch directory (not `dist/`) and inspected, with `PUBLIC_DEMO_FORM_ENDPOINT` unset.

**Overall:** the code is in good shape. There is no XSS sink, no secret in the bundle, no third-party request, no `npm audit` finding. The real risks sit around the code: (a) the form endpoint, which is undecided and where all the real controls must live; (b) the missing privacy notice on a page that collects name and email; (c) security claims in the copy that the owner must be able to prove; (d) no security headers/CSP yet because the host is not chosen.

Counts: **critical 0 · high 2 · medium 6 · low 11 · info 4** (23 findings).

## 1. Findings

Severity: critical / high / medium / low / info. Owner: dev = code change in this repo, owner = business/legal/decision, host = hosting config. Effort: XS under 15 min, S under 2 h, M half a day, L more.

| # | Sev | Area | Finding | Evidence | Fix | Owner | Effort |
|---|---|---|---|---|---|---|---|
| 1 | high | Privacy / legal | The page collects name, nursery name, work email and a preferred time, and has **no privacy notice link, no consent or purpose line, no controller identity, no retention statement, no contact for data requests**. Footer has no legal links at all. Applies at least to Egypt (PDPL, Law 151/2020) and to any visitor from KSA/UAE/EU (GDPR/PDPL regimes). | `DemoModal.astro:106-223` (no notice near submit); `footer.en.json` (no legal links); `Footer.astro` | Publish a privacy notice (EN + AR) and link it from the footer and from the modal, directly under the submit button ("By sending this you agree we may contact you about your demo. Privacy notice"). Notice must name who runs the form destination (the processor), what is stored, how long, and how to ask for deletion. Add the strings to `demo.{en,ar}.json`. Lawyer to confirm the legal basis (consent vs legitimate interest) and whether PDPL registration/licensing applies. | owner (text) + dev (link) | M (owner), XS (dev) |
| 2 | high | Content claims | Security and data claims are absolute and some are probably not literally true. The worst: **"Nobody outside your nursery can read it, including us."** Encryption at rest with provider-managed keys does not stop the operator, support staff or a DB admin from reading data, and a person who can restore backups or open the dashboard can. It is repeated in the FAQ. If untrue it is a misleading-advertising and breach-of-promise risk, and it can be quoted back after any incident. See section 4 for the full claims list. | `security.en.json:8`; `faq.en.json:30` ("Who can see our data?") | Either make it true and evidence it (customer-held keys or true E2E for chat) or reword to what is provable: "Encrypted in transit and at rest. Only authorised Yawmy staff can access data, only for support, and every access is logged." Have the owner sign off each claim in section 4 before launch. AR strings must change in step. | owner | S |
| 3 | medium | Form endpoint | **All real controls must be server-side and none exist yet** (destination undecided). Client validation, honeypot and the 3 s timer are bypassed by one `curl` to the public URL. See the requirements list in section 2. | `DemoModal.astro:345-347,515-545`; `.env.example`; `spec.md` "Submission and endpoint" | Choose the destination and implement section 2 requirements. Do not launch with the form pointing at an unprotected endpoint. | owner + host | M |
| 4 | medium | Form endpoint | If the destination is a **Google Sheet / CSV / Excel export**, cell values starting with `=`, `+`, `-`, `@` become formulas (CSV/formula injection; `IMPORTXML`/`HYPERLINK` can exfiltrate data when staff open the sheet). The spec also suggests sending `text/plain` to dodge the CORS preflight, which removes the only cheap cross-site protection (see #5). | `spec.md` "Google Apps Script web apps do not answer CORS preflights" | Server prefixes a `'` to any string field that starts with `= + - @ \t \r` before writing to a sheet/CSV. Prefer a small Worker/Function in front of Apps Script (it can do the CORS, origin check, Turnstile and rate limit) over `text/plain`. | owner + dev | S |
| 5 | medium | CORS / CSRF | There is no session, cookie or credential (`credentials: "omit"`), so classic CSRF has no target. The relevant risks are **spam/abuse from any origin and the endpoint being used as a mail relay**. `Content-Type: application/json` forces a preflight, which is a free guard if the server rejects `text/plain` and unknown `Origin`. **Gotcha:** `referrerPolicy: "no-referrer"` makes browsers send `Origin: null` on a *same-origin* POST (Fetch spec). If the owner picks a same-origin function (`/api/demo` on the same host), an Origin check will see `null` and wrongly reject, or wrongly accept. Cross-origin endpoints are unaffected. | `DemoModal.astro:576-587` | Server: `Access-Control-Allow-Origin` = the exact site origin(s) (not `*`, never with credentials), `Vary: Origin`, `Allow-Headers: Content-Type`, `Max-Age` small; reject non-JSON content types. If the endpoint is same-origin, drop `referrerPolicy` (it adds nothing there) or do not rely on Origin. | host | S |
| 6 | medium | Abuse / mail relay | If the endpoint sends a confirmation to the submitted address, the form becomes a way to **email-bomb third parties and burn the sending domain's reputation** (anyone can submit `victim@x.com` thousands of times). Needs server-side rate limiting; the browser cannot do it. | `DemoModal.astro:535-545` (email taken from user input) | Rate limit per IP and per email (for example 5 per hour per IP, 1 per day per email, global cap), reject disposable domains if wanted, add Cloudflare Turnstile (or hCaptcha) verified server-side, and either do not auto-reply to the submitter or make the reply a fixed template that contains no user text. | host / owner | M |
| 7 | medium | Headers | No security headers or CSP exist. The host is not chosen, and there is no `public/` folder for a `_headers` file. Missing `frame-ancestors` means the page and the demo form can be framed (clickjacking). | no `public/_headers`, no `vercel.json`; `dist` has no meta CSP | Add the config in section 3 once the host is known (all three formats are provided). Test with `Content-Security-Policy-Report-Only` first. | host + dev | S |
| 8 | medium | Privacy / cookies | Today the page sets **no cookies and loads no third-party script**, so no cookie banner is needed. `TASKS.md:81` plans analytics on all CTAs and the form. The code emits PII-free `CustomEvent`s only, which is good, but whichever analytics tool is wired to them decides whether consent, a CSP change and a privacy-notice update are required. | `TASKS.md:81`; `DemoModal.astro:384-385,525,555,562,589,595` | Before adding analytics: pick a cookieless, no-PII tool (Plausible, Umami, Cloudflare Web Analytics) or add consent. Keep the events as they are (no name/email/nursery in `detail`). Add the tool's origin to `script-src`/`connect-src` and to the notice. | owner + dev | S |
| 9 | low | XSS (latent) | **The JSON-LD escape is a no-op.** In a JS string literal `"<"` is the single character `<`, so `.replace(/</g, "<")` replaces `<` with `<`. Verified: `</script><img ...>` in an answer passes through unchanged. Not exploitable today (the FAQ strings are first-party, build-time, and contain no `<`; checked `faq.*.json`), but the comment claims protection that is not there, and a future editor or CMS-fed text could close the script element. | `Faq.astro:34-35` | `JSON.stringify(jsonLd).replace(/</g, "\\u003c")` (double backslash, so the output contains the 6 characters `<`). Optional: also escape ` `/` `. Add a one-line test/assert in the build that `dist/**/index.html` JSON-LD contains no `</`. | dev | XS |
| 10 | low | Anti-bot | **Honeypot and timer are only a speed bump.** Cost to bypass: zero for anything that posts straight to the endpoint (it never runs this JS), a `sleep(3)` and an empty field for a scripted browser. The honeypot value is not even sent, so the server cannot run its own check. | `DemoModal.astro:190-204,524-533,535-545` | Keep them as cheap noise reduction, and add Turnstile + server rate limits (#6). Optionally include `company_website` in the payload so the server can drop it and count hits. | dev + host | S |
| 11 | low | Anti-bot (signal leak) | The two traps behave differently, and the difference is an oracle: honeypot gives a fake success (good, indistinguishable from real), but the time trap shows a distinct error ("That was very quick..."), which tells a bot author exactly what to fix. The honeypot fake success also **silently drops a legitimate lead** if a browser or extension fills a field named `company_website` (the field is `inert`, which makes this unlikely), and nobody would know. | `DemoModal.astro:524-533`; `demo.en.json` `error.tooFast` | Make the too-fast case behave like the honeypot (fake success) or simply treat under-3 s as "wait and resend" without saying why. Record the blocked count via the existing `yawmy:demo-submit` event so the owner can see false positives. | dev | XS |
| 12 | low | Reliability / dedupe | No idempotency key. A request that succeeds server-side but times out at 10 s shows an error and a retry creates a **duplicate lead**. Retry is user-initiated only (no automatic retry loop), which is right. The payload also has no timezone, so `date`+`time` are ambiguous for the sales team. | `DemoModal.astro:535-545,573-574` | Add `requestId: crypto.randomUUID()` (reuse it on Retry) and `tz: Intl.DateTimeFormat().resolvedOptions().timeZone` to the payload; server dedupes on `requestId`. | dev | XS |
| 13 | low | Config safety | If the env var is mistyped (for example `http://`, a space, a trailing quote) the code silently falls back to the "not connected yet" error in production. Safe, but only discovered by a visitor. | `DemoModal.astro:496-509`; `.env.example` | Add a prebuild check (`scripts/check-env.mjs`, run before `astro build`) that fails the production build unless `PUBLIC_DEMO_FORM_ENDPOINT` is a valid `https:` URL, and print its origin so the CSP `connect-src` can be derived from the same variable. | dev | XS |
| 14 | low | Fetch details | `redirect` is left at the default `follow`. For a write-only endpoint a redirect is unexpected, and following one re-POSTs to a different origin. Google Apps Script needs the redirect, so this depends on the destination. | `DemoModal.astro:576-587` | If the destination is not Apps Script, add `redirect: "error"`. Keep `credentials: "omit"`, `cache: "no-store"`, 10 s abort, `Accept` header as they are. | dev | XS |
| 15 | low | Dead end | The "not connected" error says to contact "WhatsApp or by email" but there is no link, number or address anywhere, and the same happens for any failure. A visitor who fails has no way to reach the team. Also the social buttons are all `href="#"` and the Watch Demo buttons point to `#watch-demo` (no target). | `demo.en.json` `error.notConnected`; `Header.astro:38-41`; `Footer.astro:41-44`; `FinalCta.astro:37`; `Hero.astro:41`; `Setup.astro:89` | Owner supplies the real contact and social URLs and the video URL. When added, use `https://` only; `Header` already sets `target=_blank rel="noopener noreferrer"` through `external` for `http*` links. `Footer` does not pass `external` for its four social links, so make it consistent. Add a mailto/WhatsApp link into the error panel. | owner + dev | S |
| 16 | low | Exposure of WIP | The build publishes 28 internal pages: `/en|ar/preview/*` (13 each) and `/en|ar/foundation/`. They carry `noindex`, but are public, enumerable, and show unfinished work. `review.md` already says to delete `preview/demo.astro` before launch. There is no `robots.txt` or sitemap. | `src/pages/[lang]/preview/*.astro`, `foundation.astro`; built output (30 pages) | Exclude them from production: return `[]` from their `getStaticPaths()` when `import.meta.env.PROD`, or delete them before release. Check the final `dist/` has only `/en/`, `/ar/` and the root redirect. Add `public/robots.txt` and a sitemap (SEO task). | dev | S |
| 17 | low | Secrets hygiene | `.gitignore` covers `.env`, `.env.*` (with `!.env.example`), `node_modules`, `dist`, `.astro`. `.env.example` has an empty value and a clear warning. No `.env*` file exists. The repo has no commit yet, so there is no history to leak. `.claude/` is untracked and not ignored (holds `launch.json` and `agents/`). | `.gitignore`; `.env.example`; `.claude/` | Add `.claude/settings.local.json` to `.gitignore` (it can hold permissions and local paths). Pre-commit/CI secret scan (gitleaks). Remember `PUBLIC_*` is always shipped to the browser, so a form URL that is itself a capability (an Apps Script `/exec` URL, a Formspree ID) must be treated as spammable and rotatable. | dev | XS |
| 18 | low | CSP readiness | Strict CSP needs hashes or a build step: **3 inline scripts** (`js` class snippet, FAQ accordion, small Header module Astro inlines because it is under the size limit), **1 inline `<style>`**, **109 `style="..."` attributes** (CSS variables for blobs/waves, some with `data:` SVG masks) and `data:` images in CSS. JSON-LD is a data block and is not governed by `script-src`. Hashes change whenever those sources change. | built `en/index.html`; `Faq.astro:87`; `Header.astro:52,178` | See section 3. Preferred: let Astro's built-in CSP support generate the hashes (confirm the option name in the Astro 7 docs), or have a post-build script compute them into the host config. Reduce the moving parts: set `vite.build.assetsInlineLimit: 0` and `build.inlineStylesheets: "never"` so the module script and the CSS are external files, and move the FAQ script into a bundled `<script>` (leaves only the one-line `js` class snippet to hash). | dev | M |
| 19 | low | Content / people | The page names two real people with photos and first-person stories ("Dr. Rana Mustafa", "Mr. Mohammed", no surname), publishes testimonials with identifiable detail ("Owner, Maadi, 45 children"), and shows photos of children in the hero. Each needs consent or a licence. | `founders.en.json:5,14`; `testimonials.en.json:8,12,16`; `src/assets/founders/*`, `src/assets/hero/hero-children.webp` | Written consent from both founders (photo, name, title, quotes). Confirm the "Dr." title is accurate. Confirm each testimonial is real and its author agreed to be quoted with that attribution, or mark them as composites. Confirm the hero children are stock with a commercial licence or released models (guardian consent for minors). Same for the GIF/illustration licences already listed in `DECISIONS.md`. | owner | S |
| 20 | info | XSS | **No XSS sink found.** No `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`, or string-timer anywhere. User input is read from inputs and written only into the JSON body; every DOM write of text uses `textContent` (error/status/labels). `data-messages` is `JSON.stringify` of first-party i18n written as an attribute (Astro escapes it). The only `set:html` uses are the JSON-LD (see #9) and the font-face CSS built from build-time file paths (empty today). | `DemoModal.astro:92,421,431,460-461,479`; `Faq.astro:84`; `BaseLayout.astro:40` | none (fix #9) | dev | none |
| 21 | info | Links / redirects | `target="_blank"` is only produced by `Button` with `external`, and it always adds `rel="noopener noreferrer"`. All `href`s are static literals, `#anchors`, or `#${item.id}` from first-party i18n. No `javascript:` path exists (hrefs never come from user input, URL, storage or fetched data). The language switch is computed **at build time** from the route (`Astro.url.pathname`, regex swap of `/en`↔`/ar`), the client script only copies `location.hash` into the anchor (`a.hash = ...`, URL-encoded by the setter). No open redirect. `canonical`/`hreflang` use `new URL(path, Astro.site)`, so the host cannot be injected. | `Button.astro:124-125`; `Header.astro:34,72,207-210`; `BaseLayout.astro:19-23` | Keep as is. When real social URLs arrive, validate they start with `https://`. | dev | none |
| 22 | info | Public env | Only one env var, `PUBLIC_DEMO_FORM_ENDPOINT`, and it is deliberately public. Production bundle checked: no `PUBLIC_` string, no `console.*`, no URL in the 4.8 KB form script (endpoint was unset, so it would be inlined at build time if set). Dev-only branches (`import.meta.env.DEV`: simulated success, `http:` allowed, `console.warn`) are removed from the production build: a production build never fakes success. No other `import.meta.env` use. | `DemoModal.astro:497-503,549-561`; `src/env.d.ts`; built `_astro/DemoModal*.js` | none | dev | none |
| 23 | info | Dependencies / supply chain | `npm audit` (all) and `npm audit --omit=dev`: **0 vulnerabilities** (392 packages: 199 prod, 93 dev, 111 optional). `package-lock.json` present; all 392 entries resolve from `registry.npmjs.org` with integrity hashes. Only one `hasInstallScript` package (`fsevents`, macOS optional). Direct deps are mainstream and maintained: astro 7.4.2, tailwindcss + @tailwindcss/vite 4.3.3, @fontsource-variable/fraunces and readex-pro 5.3.0 (self-hosted fonts, no Google Fonts request), dev: @astrojs/check, prettier + 2 plugins, typescript 6.0.3 (7.0.2 exists; dev only, not a risk). All use `^` ranges, but the lockfile pins them. | `package.json`; `package-lock.json` | CI: `npm ci --ignore-scripts` then `npm audit --audit-level=high`; enable Dependabot/Renovate; pin Node via `engines`/`.nvmrc`; review the lockfile diff on every update. | dev | S |

### Third-party / runtime requests

Grep of `src/` and the built HTML/JS/CSS for `http(s)://`: only `https://yawmycare.com/...` (canonical/hreflang), `https://schema.org` (JSON-LD `@context`, not a request), the `w3.org` SVG namespace strings, and a `tailwindcss.com` licence comment. **Zero third-party requests.** No CDN script, no external font, no iframe/embed, no analytics, no tracker, no cookies, no storage (`localStorage`, `sessionStorage`, `document.cookie`, IndexedDB: none). Fonts are bundled woff2 from `/_astro/`; the licensed Recoleta/Expo Arabic files, when added, are also same-origin.

### Positive observations

- Native `<dialog>`, no HTML injection anywhere, `textContent` for all dynamic text.
- Form is `method="post"` (a no-JS submit could never put data in a URL), `novalidate` with own messages, `maxlength` set, `autocomplete` tokens correct.
- Fetch hardening is already good: https-only (http only in dev), `new URL()` parse with try/catch, `credentials: "omit"`, `cache: "no-store"`, `referrerPolicy: "no-referrer"`, 10 s `AbortController` with `clearTimeout` in `finally`, non-2xx treated as failure, no response body parsed or displayed, error text is a fixed i18n string (no status code, URL or stack leaks; the thrown `HTTP nnn` is swallowed).
- Double submit is blocked twice: `state !== "idle"` guard and disabled button with `aria-busy`.
- Honeypot is `aria-hidden` + `inert` + `tabindex=-1`, positioned off-flow.
- No PII leaves the form except in the POST body: not in URLs (page value is `origin + pathname`, query and hash stripped), not in storage, not in logs, not in the `CustomEvent`s (`source`, `status`, `reason`, `locale`, `simulated` only). `form.reset()` after success.
- Production never fakes success when the endpoint is missing.
- External links get `noopener noreferrer`.
- No secrets, clean `.gitignore`, empty `.env.example` with a correct warning.

## 2. Requirements for the form endpoint (hand to the owner / whoever builds it)

The endpoint URL is public, so treat every request as hostile and the browser checks as UX only.

1. **HTTPS only**, HSTS, TLS 1.2+. Write-only: the public URL must not be able to read, list or delete anything. No API key or admin URL in `PUBLIC_*`.
2. **CORS**: `Access-Control-Allow-Origin` set to the exact production origin (`https://yawmycare.com`, and the staging origin if any; echo it only if it is in an allowlist, add `Vary: Origin`). No `*` with credentials, never `Allow-Credentials: true`. Answer `OPTIONS` with `Allow-Methods: POST`, `Allow-Headers: Content-Type`.
3. **Method and content type**: accept only `POST` with `Content-Type: application/json`; reject everything else (405/415). Also check the `Origin` header equals the allowlist (see the same-origin `Origin: null` gotcha in #5).
4. **Body limits**: cap the body at about 2 KB, parse JSON strictly, reject unknown keys, reject non-string types.
5. **Re-validate every field server-side** (the client rules are not a control):
   - `name` 1 to 100, `nursery` 1 to 150 (after trim, Unicode letters, digits, space and common punctuation only; strip control characters, including all `\r` and `\n`).
   - `email` max 254, one address only, parsed with a real email parser (no commas, semicolons, angle brackets, spaces, CR/LF), lowercased.
   - `date` real `YYYY-MM-DD`, not in the past, not more than about 90 days ahead; `time` real `HH:MM`.
   - `locale` in `{en, ar}`; `source` in a fixed allowlist of opener names; `page` must start with the site origin; `submittedAt` is client time and untrusted: store the server's own timestamp.
6. **Abuse controls (server side only):** rate limit per IP and per email (and a global ceiling), Cloudflare Turnstile or hCaptcha token verified server-side, drop submissions where `company_website` is present (if the client is changed to send it), dedupe by `requestId` (if added), temporary blocks on bursts. The browser cannot rate limit.
7. **Email header injection (receiving side):** never build mail headers by string concatenation. Use the provider's structured API (Postmark/SES/Resend `to`/`subject`/`replyTo` fields). Reject any CR/LF in `name`, `nursery`, `email`. Use a **fixed subject** (for example "New demo request") and never put user text in `Subject`, `From` or `To`. Use `Reply-To` only after the email passed strict validation.
8. **Output encoding in notifications:** HTML-escape user fields in HTML mail; in Slack/Teams/Telegram messages escape `<`, `>`, `&`, `@channel`, markdown links (a crafted nursery name can otherwise phish your staff). In Sheets/CSV neutralise formulas (#4).
9. **Auto-replies:** if you send a confirmation to the submitter, use a fixed template with no user-supplied text, throttle per recipient, and set up SPF, DKIM and DMARC on the sending domain (this also stops spoofing of `yawmycare.com`).
10. **PII handling:** store only the 5 fields plus server timestamp; encrypt at rest; limit access to named staff; set retention (for example delete unconverted leads after 12 months) and write it into the privacy notice; process data-subject deletion requests; check where the provider stores data (region) and have a DPA with it. Do not log request bodies. Avoid analytics/log tools that capture POST bodies.
11. **Response**: return a small fixed JSON (`{"ok":true}`) and 2xx on success; generic 4xx/5xx otherwise, no stack traces, no validation detail (the client ignores the body anyway). Keep the response time similar for valid and rejected requests.
12. **Monitoring:** alert on submission spikes, on a rising rejection rate and on delivery failures, so a silent failure of the lead channel is noticed (a visitor sees a generic error and the owner would not know otherwise).

## 3. Recommended headers and CSP

### Policy (all hosts)

```
Content-Security-Policy:
  default-src 'none';
  script-src 'self' 'sha256-9Uz2vQb0s28uWrIfdjW8iQNZbQ3yL96Nmqx49q3T9rE=' 'sha256-ZThf88MfQteQ/WHcM8Cp6RaezF2QKOkF/l5gMZXwP1I=' 'sha256-Pru/jjnrcijDjWrrfSRE0Yxmvxc/tDIvaeVu/dTSIpc=';
  style-src 'self' 'sha256-TbP+SgLL40xgvuPzblGkuMYQwL+/93k6FfDibO4uLig=';
  style-src-attr 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  media-src 'self';
  manifest-src 'self';
  connect-src 'self' https://FORM-ENDPOINT-ORIGIN;
  form-action 'self';
  base-uri 'none';
  object-src 'none';
  worker-src 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), interest-cohort=(), browsing-topics=()
X-Frame-Options: DENY
Cross-Origin-Opener-Policy: same-origin
```

Notes:

- The three script hashes and the style hash are from the build of 2026-10-23 (identical for `/en/` and `/ar/`): classic `js`-class snippet, Header module script, FAQ script, Header `<style>`. **They change whenever the source of those blocks changes**, so regenerate them in CI (a 20-line post-build script that hashes inline `<script>`/`<style>` in `dist/**/*.html` and writes the host file, or Astro's built-in CSP option). A stale hash blocks the script, which would break the FAQ and the menu, and the `js` class (`.js` hides the no-JS nav panel).
- `style-src-attr 'unsafe-inline'` is needed for the 109 inline `style=""` attributes (CSS custom properties) and carries far less risk than inline scripts. Needs Safari 15.4+; test the page in Safari.
- `img-src data:` is needed for the inline SVG masks in the wave dividers.
- `connect-src`: replace `FORM-ENDPOINT-ORIGIN` with the origin of `PUBLIC_DEMO_FORM_ENDPOINT` (and Turnstile's `challenges.cloudflare.com` for `script-src`, `frame-src` and `connect-src` if used). If the endpoint is same-origin, remove it.
- If a demo video is added later: `frame-src https://www.youtube-nocookie.com` (or the chosen player) and its privacy text. If analytics is added: its script origin in `script-src` and `connect-src`.
- `frame-ancestors` and `X-Frame-Options` must be real headers; they do nothing in a `<meta>` tag.
- Ship first as `Content-Security-Policy-Report-Only` on staging for one test pass (open every section, the menu, FAQ, modal in EN and AR), then enforce.
- HSTS `preload`: only after confirming every subdomain of `yawmycare.com` serves HTTPS. Start with `max-age=300`, then raise.
- Cache: `/_astro/*` `public, max-age=31536000, immutable`; HTML `public, max-age=0, must-revalidate`.

### Netlify or Cloudflare Pages: `public/_headers` (Astro copies `public/` to the root of `dist/`)

```
/*
  Content-Security-Policy: default-src 'none'; script-src 'self' 'sha256-9Uz2vQb0s28uWrIfdjW8iQNZbQ3yL96Nmqx49q3T9rE=' 'sha256-ZThf88MfQteQ/WHcM8Cp6RaezF2QKOkF/l5gMZXwP1I=' 'sha256-Pru/jjnrcijDjWrrfSRE0Yxmvxc/tDIvaeVu/dTSIpc='; style-src 'self' 'sha256-TbP+SgLL40xgvuPzblGkuMYQwL+/93k6FfDibO4uLig='; style-src-attr 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; manifest-src 'self'; connect-src 'self' https://FORM-ENDPOINT-ORIGIN; form-action 'self'; base-uri 'none'; object-src 'none'; worker-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), interest-cohort=(), browsing-topics=()
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

### Vercel: `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'none'; script-src 'self' 'sha256-9Uz2vQb0s28uWrIfdjW8iQNZbQ3yL96Nmqx49q3T9rE=' 'sha256-ZThf88MfQteQ/WHcM8Cp6RaezF2QKOkF/l5gMZXwP1I=' 'sha256-Pru/jjnrcijDjWrrfSRE0Yxmvxc/tDIvaeVu/dTSIpc='; style-src 'self' 'sha256-TbP+SgLL40xgvuPzblGkuMYQwL+/93k6FfDibO4uLig='; style-src-attr 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; manifest-src 'self'; connect-src 'self' https://FORM-ENDPOINT-ORIGIN; form-action 'self'; base-uri 'none'; object-src 'none'; worker-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), interest-cohort=(), browsing-topics=()" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

Also host-level: force HTTPS and a single canonical host (apex vs `www`), a 301 for `/` to `/en/` (today it is a meta-refresh page, fine for CSP but slower), and `/.well-known/security.txt` with a security contact.

## 4. Business claims and people that the owner must verify before launch

This is a legal/compliance list, not code. For each: "true today, with evidence" or reword/remove. The Arabic strings carry the same claims and must change together.

| Claim (as shown) | Where | Why it matters / what to confirm |
|---|---|---|
| "Encrypted, always. In transit and at rest. **Nobody outside your nursery can read it, including us.**" | `security.en.json:7-8`; `faq.en.json:30` | At-rest encryption is true only if enabled in the database/storage and backups. "Including us" is a strong claim: confirm no staff/support/DBA can read production data, or reword (finding #2). |
| "Backed up daily. Automatic." | `security.en.json:11-12` | Confirm daily backups exist, are encrypted, restore-tested, and where they are stored. Note backups conflict with "permanent deletion" below unless backups also expire. |
| "A teacher sees only her own rooms." | `security.en.json:16`; `faq.en.json:30` | Role-based access must be enforced by the server, not just hidden in the UI. Needs an access-control test. |
| "An admin cannot read private teacher and parent conversations." | same | Confirm this holds at the database/API level (and for support staff and exports). |
| "Incident reports for two years. Chat deleted automatically after six months." | `security.en.json:20` | Confirm retention jobs exist and match; confirm it is lawful for incident records (child-safety obligations may require longer retention). |
| "If you leave, you leave with everything. 90 days to export, then permanent deletion." / "Export your records whenever you want, without asking us." | `commitments.en.json:11,23`; `faq.en.json` (cancel) | Self-service export must exist at launch. "Permanent deletion" must include backups/logs within a stated window. FAQ also says cancellation terms are "shared up front": have those terms written. |
| "We never charge parents." / "Parents never pay anything" / "One flat fee ... No setup fee ... No tuition commission ... Unlimited parents and teachers ... All features included." | `commitments.en.json:6-7`; `pricing.en.json`; `faq.en.json`; `features.en.json:33` | A binding public promise. Confirm it is business policy that will not change (and whether it should be in the terms), and that no add-on, SMS, storage or per-child fee exists. "Not per child" must match the price list. |
| "The first 10 nurseries keep whatever launch price we set, **permanently**..." | `pricing.en.json:31` | A permanent price guarantee is a contractual commitment; define terms (what "permanent", what if the plan changes). The price is also "whatever we set": check consumer/advertising rules on undefined prices. |
| "A human answers, in Arabic, within one working day." | `commitments.en.json:19` | Needs staffing and an SLA; define working days and hours. |
| "Set up in under 20 minutes", "20 minutes · No card, no commitment" | `faq.en.json:14`; `setup.en.json:2,23`; nav label | Measured on real onboardings? The "no card, no commitment" is a promise about the demo and the trial. |
| "Built to run on older Android" | `faq.en.json:41-42` | Define the minimum Android version and test on real low-end devices. |
| "We talked to nurseries on three continents... Egypt, the wider region and the United States." | `testimonials.en.json:2-3` | Factual claim about research; confirm. |
| Testimonials: "Owner, Maadi, 45 children", "Teacher, Heliopolis", "Admin, Sheikh Zayed" | `testimonials.en.json:7-16` | Real people who agreed? Attribution is specific enough to identify them. Else mark as paraphrased. |
| "Dr. Rana Mustafa", "Mr. Mohammed", portraits and personal stories ("we enrolled our children..."); FAQ "built by Dr. Rana Mustafa and Mr. Mohammed" | `founders.en.json`; `faq.en.json:50`; `src/assets/founders/` | Written consent for name, photo and quotes; verify the "Dr." title; add the full name of the second founder; consent to publish personal family details. |
| Hero and other photos of children | `hero-children.webp` | Licence or model release; guardians' consent for minors. |
| "Works anywhere in the region... onboarding nurseries in Egypt first" | `faq.en.json:53-54` | If data is stored outside the customer's country, local data-residency and cross-border transfer rules (Egypt PDPL, KSA PDPL) may apply. State where data is hosted. |
| "Our team will get in touch shortly by email to confirm your demo." | `demo.en.json` `success.body` | Someone must actually do this, with a response time. |
| "Book My Free Demo" / "Free" and "Watch Demo" / "2-minute tour" | `demo.en.json`; `hero.en.json`; `setup.en.json` | "Free" is a claim; the video does not exist yet (`#watch-demo` goes nowhere). Remove or link before launch. |
| Brand / fonts / images | `DECISIONS.md` #9, #11 | Recoleta and Expo Arabic web licences, and the six animated illustrations: licence ownership must be confirmed (already listed as open). |
| Product reality | everything | The page speaks as if the product is live. Every feature shown (wallet, read receipts, check-in, photos, evenings) should exist at launch or be marked "coming soon". |

### Privacy, cookie and consent needs

- **Privacy notice** (EN and AR), reachable from the footer and the form (finding #1): controller name and contact, data collected (name, nursery, email, preferred slot, locale, page, timestamp), purpose (arrange the demo and reply), legal basis, recipients (form/email provider, CRM), international transfers, retention period, rights (access, correction, deletion, withdrawing consent), complaint route.
- **Terms of use / terms of service**: needed once there is a product sign-up; for the landing page, at least the notice. The "we share cancellation terms up front" promise needs the terms to exist.
- **Marketing contact**: a demo request does not by itself consent to newsletters. Do not add the lead to a mailing list without a separate, unticked checkbox.
- **Cookies**: none are set today, so no banner. Re-check when analytics, chat widgets, video embeds or a CRM tracking script are added (decision for #8).
- **Children's data**: the landing page collects none, but the product does. The notice and the claims above should be consistent with how the product handles children's data (parental/guardian consent, photos), and the owner should confirm local registration duties.
- **Accessibility statement** is not a security item but is often requested together with legal links.

## 5. Pre-launch checklist

Blockers (must be done):

- [ ] Owner chooses the form destination and sets `PUBLIC_DEMO_FORM_ENDPOINT` in the host's environment (https, write-only). Confirm a production build posts and shows success on a real test submission, and shows the error panel when the endpoint is blocked.
- [ ] Endpoint meets all 12 requirements in section 2, especially CORS allowlist, server-side validation, rate limit, Turnstile, no header injection, formula neutralisation if a spreadsheet is used.
- [ ] Privacy notice (EN and AR) written, linked from footer and modal, retention and processor named (#1).
- [ ] Every claim in section 4 verified or reworded; "including us" claim fixed or evidenced (#2).
- [ ] Founders' written consent for names, photos, stories; testimonial permissions; photo licences (#19).
- [ ] Real contact (email, WhatsApp) and social URLs added and the error panel links to them (#15); `#watch-demo` link supplied or the buttons removed.
- [ ] JSON-LD escape fixed (`"\\u003c"`) (#9).
- [ ] Preview and foundation pages excluded from the production build; final `dist/` listing reviewed (#16).
- [ ] Security headers and CSP deployed on the chosen host (section 3), first in Report-Only; then enforced; run an external scan (securityheaders.com, Mozilla Observatory) on the staging URL (#7, #18).

Should do:

- [ ] Add `requestId` and `tz` to the payload; make the too-fast case silent; prebuild env check (#11-#13).
- [ ] CI: `npm ci --ignore-scripts`, `npm audit --audit-level=high`, secret scan, Dependabot/Renovate (#17, #23).
- [ ] SPF, DKIM and DMARC on `yawmycare.com` before sending any mail from it.
- [ ] `robots.txt`, sitemap, `/.well-known/security.txt`.
- [ ] HSTS ramp-up (300 s, then 2 years) and preload only after subdomain check.
- [ ] Decide analytics (cookieless, no PII) before adding any script; update CSP and the notice at that moment (#8).
- [ ] Monitoring: uptime check on `/en/` and `/ar/`, alert on form endpoint failures and submission spikes.
- [ ] Re-run this review after the endpoint and the header config exist (CSP breakage test in EN and AR, modal open/submit, FAQ, menu, Safari).
