# Fix log: regions, WhatsApp, sticky header, regional pricing

Roadmap 1.1, 1.2, 1.4, 2.2. Decisions: `docs/DECISIONS.md` #16-#19. Env: `docs/ENV.md` ("Regions"), `.env.example`.

## What changed
- `src/config/region.ts` (pure helpers: region ids, currencies, detection, `formatPrice`, `whatsappLink`), `src/config/region-client.ts` (browser state: memory + `data-region` on `<html>` + `yawmy:region-change` event; stores nothing), `src/config/site.ts` (`regions` from `PUBLIC_REGION_<EG|SA|US>_*`, `showRegionUi`, `showWhatsapp`, `whatsappStart`), `src/env.d.ts`.
- `ui/RegionSwitch.astro` (native radio group styled as a segmented control; keyboard, SR, localized names), `ui/RegionData.astro` (JSON of configured values), `ui/WhatsAppFab.astro` (floating button, bottom `end`; script keeps all `[data-wa-link]` in step with the region). Mounted in `BaseLayout` (2 lines). Switch lives in Pricing header and footer, never the header.
- Hero: WhatsApp secondary CTA (`regions.chatOnWhatsApp`); tour button still only with a video URL. Verified with 0, 1, 2 secondaries.
- Header: social icons removed (footer only; `Button` `social-bar` variant, `header.topbar` i18n and foundation demo removed), top bar = tagline only. Sticky: `position: sticky` with `top = -(top bar + nav margin)`, `data-compact` via IntersectionObserver on a sentinel (smaller logo/row, soft shadow, bottom margin keeps in-flow height so nothing jumps), `scroll-padding-top` on `<html>`, open menu scrolls inside the header (`max-height`). Mobile: Book a Demo sits next to the menu button (44px, no icon); the duplicate in the menu panel was removed. Row wraps instead of overflowing at 200% text; top bar height grows with the text size.
- Pricing: price block (From {amount} / month + note, or "Ask for pricing in {region}" opening the demo dialog); `Intl.NumberFormat` currency code, Western digits, `<bdi>`. Footer: switch + current region phone (`tel:`).
- i18n: `regions` in `en.json`/`ar.json`; `price` in `pricing.*.json` (new keys only).

## Behaviour notes
- Production with nothing set: no switch, FAB, WhatsApp CTA, price block, `region-data` in the HTML (checked: 0 matches, 0 `href="#"`). Dev shows dashed markers.
- A region without a number hides FAB/CTA while current (so a visitor in Egypt sees nothing if only Saudi has a number); decision kept strict per the owner's rule.
- Arabic price notes: `_PRICE_NOTE_AR` (falls back to the EN note).

## Verified (headless Chrome over CDP, temporary `.env.local` with fake values, deleted)
Cairo time zone -> eg; switching to US/SA updates FAB href/hidden, hero CTA, price, ask line, footer phone and keeps both switches in sync. Sticky/compact at 375 and 1440 in EN and AR, no horizontal scroll at 320/375/768/1440, 200% text at 320 (header no longer overflows; remaining overflow at 200% is the decorative blob SVGs, not part of this work). `astro check` 0 errors, i18n parity OK.

## Open
- Real numbers/prices from the owner; AR copy of the new strings needs native review.
- Pre-existing: the scroll-spy highlights "Home" at the very bottom of the page.
