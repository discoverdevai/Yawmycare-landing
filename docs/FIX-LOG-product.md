# Fix log: product showcase (hero composite, role switcher, features)

Date 2026-10-23. Not committed.

## Changed
- **Hero** (`sections/Hero.astro`, `i18n/sections/hero.*`): toddler photo replaced by a product composite (owner dashboard + parent phone + admin phone, overlapping, soft shadows). Two columns from 1200px, centred composite 768-1199, phones stacked under the dashboard below 768. Logical insets, so it mirrors in AR; screen images are never flipped. One solid primary CTA + at most one outline (WhatsApp when configured, else the tour when configured, else none; the third button is gone). H1 is `clamp(2.375rem, .5rem + 4.1vw, 3.75rem)` (60px at 1440, rem-based, `text-wrap: balance`), 4 lines with the stand-in serif; expect 3 lines with the licensed Recoleta (TODO owner, same as the old overlap note). Hero `imageAlt` rewritten (EN + AR; AR alt says the app UI is English).
- **Role switcher** (new `sections/Roles.astro`, slug `roles`, EN/AR json, wired after `<Proof>` in `pages/[lang]/index.astro`, `i18n/index.ts` imports/entries). Owner / Teacher / Parent tabs, 4 capabilities each (app-coverage 4.2 table), one screenshot per role. `role=tablist/tab/tabpanel`, roving tabindex, arrows (swapped in RTL), Home/End. No JS: tablist hidden, all three panels stacked. Keyboard tested via CDP in EN and AR (arrow order correct in both). AR is MSA draft, flagged in `docs/arabic-review.md` (regenerated: 333 rows).
- **Features** (`Features.astro`, `features.*`): 6 cards (1 col, 2 from 640, 3 from 1024 = 3x2 at desktop), icon beside the title at every width, no min-height, cards as tall as their text. Added announcements + events, and safety (incident log, allergies, authorised pickups; inline line icons, no illustration exists). Rewrote per NEXT-PLAN A4: "Know who read it" -> "Know they were told: parents acknowledge incident reports"; "Respects your hours" -> "Respects quiet hours: parents can set quiet hours, you set opening days and hours"; check-in card now says "in and out ... teachers can mark a child in by hand". The "Arabic from day one" card is unchanged (owner copy).
- Deleted unreferenced `src/assets/hero/hero-children.webp` (toddlers) and the empty folder; the owner may want it back for a testimonial spot (it is in the previous export history only).

## Figma nodes and assets (file oSQUBKWEqG5XrY4sHCzjzy), `src/assets/product/`
| File | Node | Source px | Notes |
|---|---|---|---|
| `owner-dashboard-1659-29977.webp` 1600x913, 50 KB | `1659:29977` | 2x export cropped x>=245, y>=462 | Daily Attendance chart + Recent Activity. The "Overview" stat cards are cropped out (all read "20"); sidebar/top bar also cropped. |
| `parent-home-606-38038.webp` 750x1624, 63 KB | `606:38038` | 3x export, top 375x812 | Check-in status + Today's Schedule. Real data, no lorem. |
| `admin-app-598-106917.webp` 750x1402, 61 KB | `598:106917` | 3x export from "Daily Attendance" down | Top stat cards (all "20") cropped out. |
| `teacher-logs-876-53138.webp` 750x1624, 53 KB | `876:53138` | 3x export, top 375x812 | The cleaner teacher screen, no lorem. |
Served through `astro:assets` as AVIF + WebP fallback with explicit sizes. Hero LCP (dashboard, `fetchpriority=high`): 840w AVIF is 10.4 KB, 1120w 15.2 KB; both phones eager at 5-17 KB each. Total hero images at 1440 about 40 KB (was a 1220px photo).

## Verified (headless Chrome, `docs/tools/vq-cap.mjs` + section captures)
390 / 768 / 1024 / 1440, EN + AR: no horizontal overflow (scrollWidth = viewport everywhere), hero composite not clipped, features and roles render. `astro check` 0 errors, i18n parity OK, one `astro build` OK.

## Arabic caveat (A7, owner decision still open)
The app exists in English only. AR pages show the same English UI in hero and switcher (stated in the alt text, no visible caption). The owner's Arabic positioning copy (H1 "بالعربية منذ اليوم الأول", features "Arabic from day one", lead "in Arabic and English") is left as is; no new Arabic-UI claims were added. Needs Arabic/RTL app screens from the designer, or softer AR claims.

## Owner confirmation still needed (claims outside my files, not edited)
- Security / FAQ: "admin cannot read private teacher-parent chats" (admin chat design exists), encryption and backup lines, incident retention "two years", "export everything" (export covers child records, attendance, incident log only), daily report "in their own language", "searchable next year", "we help you bring your existing lists across" (no import screen), "Staff and parents each pick their own language" (no language switch in teacher/parent app designs; only the owner dashboard has one), "no tablet at the door" is fine.
- New copy that is inferred from screens and should be confirmed: "Teachers log an incident in a minute", parents acknowledge incident reports (only a "Parent Ack:" field is designed), "one tap away" for child medical profile, owner "set the check-in radius" (design typo shows Km).
- Geofence chips read "50/100/200 Km" in the design (typo vs 100 m).
