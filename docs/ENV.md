# Environment variables

All variables are `PUBLIC_*`: Astro inlines them into the built HTML / JS, so **never put a secret, API key, token or admin URL in any of them**. Set them in `.env` (git-ignored) for local work and in the host's build settings for production; `.env.example` lists every name. Everything is read in one place, `src/config/site.ts` (the form endpoint is also read by the script in `src/components/sections/DemoModal.astro`). Types: `src/env.d.ts`.

Every variable defaults to empty. **Rule: a link or button whose URL is empty is not rendered in a production build** (no `href="#"`, no dead `#watch-demo`). `astro dev` still renders it with a dashed outline and `data-unconfigured` so the team can see what is missing. A value only counts as set when it parses as an `https:` URL (or `mailto:`; plain `http:` is accepted in dev only).

| Variable | Format | Used by | When empty |
|---|---|---|---|
| `PUBLIC_DEMO_FORM_ENDPOINT` | Full `https://` URL that accepts a JSON `POST` from the site origin (CORS must allow the origin and the `Content-Type` header). Must be a write-only endpoint (email service, CRM form, Sheet web app). | Book a Demo dialog (`DemoModal.astro`) | dev: the submit is simulated and a console warning is logged; production: the dialog shows the "not connected yet" error (no fake success) |
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
