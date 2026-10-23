# Environment variables

All variables are `PUBLIC_*`: Astro inlines them into the built HTML / JS, so **never put a secret, API key, token or admin URL in any of them**. Set them in `.env` (git-ignored) for local work and in the host's build settings for production; `.env.example` lists every name. Everything is read in one place, `src/config/site.ts` (the form endpoint is also read by the script in `src/components/sections/DemoModal.astro`). Types: `src/env.d.ts`.

Every variable defaults to empty. **Rule: a link or button whose URL is empty is not rendered in a production build** (no `href="#"`, no dead `#watch-demo`). `astro dev` still renders it with a dashed outline and `data-unconfigured` so the team can see what is missing. A value only counts as set when it parses as an `https:` URL (or `mailto:`; plain `http:` is accepted in dev only).

| Variable | Format | Used by | When empty |
|---|---|---|---|
| `PUBLIC_DEMO_FORM_ENDPOINT` | Full `https://` URL that accepts a JSON `POST` from the site origin (CORS must allow the origin and the `Content-Type` header). Must be a write-only endpoint (email service, CRM form, Sheet web app). | Book a Demo dialog (`DemoModal.astro`, `demo-modal.ts`). **Up to two POSTs per lead** (step 1 on submit, optional step 2 with the same `leadId`), see "Booking dialog payload" below | dev: the submit is simulated and a console warning is logged; production: the dialog shows the "not connected yet" error (no fake success) |
| `PUBLIC_SOCIAL_LINKEDIN` | Full `https://` profile URL | Header top bar + Footer social buttons (`Header.astro`, `Footer.astro`) | that button is not rendered (production). If all four are empty the whole social list disappears and the tagline is centred |
| `PUBLIC_SOCIAL_INSTAGRAM` | Full `https://` profile URL | same | same |
| `PUBLIC_SOCIAL_FACEBOOK` | Full `https://` page URL | same | same |
| `PUBLIC_SOCIAL_WHATSAPP` | `https://` URL (e.g. a `wa.me` link) **or** a phone number with country code (`+20 100 000 0000`, turned into `https://wa.me/<digits>`) | same | same |
| `PUBLIC_CONTACT_WHATSAPP` | `https://` URL or phone number, as above | the demo dialog's "not connected yet" message (Message us on WhatsApp button) | the button is omitted; the message is plain text |
| `PUBLIC_CONTACT_EMAIL` | `name@example.com` or a `mailto:` URL | same (Email us button) | the button is omitted |
| `PUBLIC_DEMO_VIDEO_URL` | Full `https://` URL of the demo / tour video, opened in a new tab | the three "Watch" buttons: Hero, Setup band, Final CTA | the three buttons are not rendered in production; the remaining "Book a demo" button stays centred in each row |

## Checking a production build

```sh
npm run build
grep -c 'href="#"\|#watch-demo' dist/en/index.html dist/ar/index.html   # expect 0 for each
```

With no variables set, `dist/` has no social buttons, no Watch buttons and no contact links; setting a variable and rebuilding adds exactly that element.

## Regions (contact numbers and prices per country)

Egypt (`EG`, currency EGP), Saudi Arabia (`SA`, SAR) and United States (`US`, USD) each have their own WhatsApp number, phone and monthly price. The owner supplies the real values later; **nothing is invented, and anything unset is hidden in production** (dev shows a dashed `data-unconfigured` marker). Read in `src/config/site.ts` (`regions`).

| Variable (replace `EG` with `SA` / `US`) | Format | Used by | When empty |
|---|---|---|---|
| `PUBLIC_REGION_EG_WHATSAPP` | Phone with country code (`+20 100 000 0000`; only the digits are used, 7+ digits) | floating WhatsApp button (`ui/WhatsAppFab.astro`), Hero "Chat on WhatsApp" CTA; link is `https://wa.me/<digits>?text=<localized message>` | for that region both are hidden while it is the current region; if no region has a number, they are not in the HTML at all |
| `PUBLIC_REGION_EG_PHONE` | Phone as it should be shown (`+20 2 0000 0000`) | footer "Call us" `tel:` link | hidden for that region |
| `PUBLIC_REGION_EG_PRICE_AMOUNT` | Plain positive number per month (`1500`, `49.99`); currency is fixed per region, the period is always one month | Pricing: "From EGP 1,500 / month" (`Intl.NumberFormat`, Western digits in EN and AR) | Pricing shows the flat-fee copy plus "Ask for pricing in Egypt" (opens the demo dialog) |
| `PUBLIC_REGION_EG_PRICE_NOTE`, `..._PRICE_NOTE_AR` | Short text (EN / AR) under the price | Pricing | no note (AR falls back to the EN note) |

The visitor's region is detected in the browser (time zone `Africa/Cairo` -> Egypt, `Asia/Riyadh` -> Saudi Arabia, `America/*` -> United States, then the browser language's country, then page language: AR -> Egypt, EN -> United States) and can be changed with the region switch (Pricing header and footer). **Nothing is stored** (no cookie, no localStorage): the choice is in memory, mirrored to `data-region` on `<html>`, and announced with a `yawmy:region-change` event on `document`. If no region has any contact or price configured, the switch, the WhatsApp button and the price block are not rendered in production.

```sh
npm run build
grep -c 'wa.me\|region-data\|data-price-block' dist/en/index.html dist/ar/index.html   # expect 0 with nothing set
```

## Booking dialog payload (`PUBLIC_DEMO_FORM_ENDPOINT`)

The dialog (docs/FORM-SPEC.md) sends up to two JSON `POST`s per lead to the same endpoint. The endpoint must accept both, upsert on `leadId`, and re-validate server-side (docs/reviews/security.md, 12 requirements).

```jsonc
// step 1 (on submit)
{ "step": 1, "leadId": "uuid", "locale": "en|ar", "pageUrl": "https://site/en/", "tz": "Africa/Cairo", "submittedAt": "ISO",
  "name": "...", "phone": "+20 100 123-4567", "phoneE164": "+201001234567" /* only if typed with + or 00 */,
  "nursery": "...", "region": "eg|sa|us", "source": "link|hash|<data-demo-open value>" }
// step 2 (optional; only the filled fields are present)
{ "step": 2, "leadId": "uuid", "locale": "...", "pageUrl": "...", "tz": "...", "submittedAt": "ISO",
  "email": "...", "children": "1-30|31-80|81-150|150+", "currentTool": "whatsapp|excel|paper|other",
  "date": "YYYY-MM-DD", "time": "HH:MM", "region": "eg|sa|us" }
```

No new environment variables. The done panel's WhatsApp link uses the existing `PUBLIC_REGION_<EG|SA|US>_WHATSAPP`.
