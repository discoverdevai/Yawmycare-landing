# Fix log: final copy + SEO (2026-10-23)

Scope: `en.json`, `ar.json`, section JSON for hero, roles, features, compare, day, pricing, demo; `public/llms.txt`, `site.webmanifest`, `public/og/*`; `BaseLayout.astro` head; `JsonLd.astro`; `scripts/*`. Decisions applied: 30 (Arabic is supported, not the headline), 31 (no 100 m), 32 (feminine teachers), 33 (EN first), 34 (48 hours / 30-minute demo), 35 (new tagline). Source spec: `docs/reviews/copy-warmth.md`, `docs/reviews/seo-brand-final.md`.

Checks: `astro check` 0 errors; one `astro build` ok (3 pages); `scripts/seo-verify.mjs` all ok (titles EN 57 / AR 46, descriptions 149 / 139, new guard "no retired claims" passes on the whole built page incl. the other engineer's slugs, `font-display` on all 7 @font-face rules); `check-i18n-parity.mjs` ok (1 warning: the `name@example.com` placeholder is identical by design). `docs/arabic-review.md` regenerated (323 rows). One string (`pricing.ar` "المعلمات") was fixed after the build; JSON only.

## 25 most visible strings (before -> after)

| # | Key | EN before | EN after | AR before | AR after |
|---|---|---|---|---|---|
| 1 | hero.title (H1) | *Nursery* management software, *built* for the region. *In Arabic* from day one. | Run your *nursery* from one app, not *WhatsApp* and *Excel*. | برنامج *إدارة الحضانات*، *مصمم* للمنطقة. *بالعربية* منذ اليوم الأول. | أدِر *حضانتك* من تطبيق واحد، لا من *واتساب* و*إكسل*. |
| 2 | hero.lead | Stop running your nursery on WhatsApp. Daily reports, attendance, parent chat and announcements in one app, in Arabic and English. Set up in under 20 minutes. | Attendance, daily reports, photos and parent chat in one nursery management and daycare app. Set up within 48 hours. | توقّف عن إدارة حضانتك عبر واتساب. ... بالعربية والإنجليزية. جهّز حضانتك في أقل من 20 دقيقة. | الحضور والتقارير اليومية والصور ومحادثات أولياء الأمور في تطبيق واحد لإدارة الحضانة. جهّز حضانتك خلال 48 ساعة. |
| 3 | hero.languageNote (new key) | n/a | Available in English and Arabic. | n/a | متاح بالعربية والإنجليزية. |
| 4 | brand.tagline | Manage Smarter with Yawmy Care. | Every child's day, in one place. | أدر بذكاء مع يومي كير | يوم كل طفل، في مكان واحد. |
| 5 | meta.title | Nursery Management Software & Parent App \| Yawmy Care (kept, 57) | same | يومي كير \| برنامج إدارة الحضانات وتطبيق أولياء الأمور | يومي كير \| برنامج إدارة الحضانات ومتابعة الطفل (46) |
| 6 | meta.description | Nursery management software with Arabic and English apps: ... Book a free demo of Yawmy Care. | Nursery management software and parent app: attendance, daily reports, photos and parent chat in one place. Set up within 48 hours. Book a free demo. (149) | برنامج يومي كير لإدارة الحضانات والمدارس الدولية: ... بالعربية والإنجليزية. | يومي كير: برنامج لإدارة الحضانات ومتابعة الطفل يوميًا. حضور وتقارير وصور ومحادثات أولياء الأمور في تطبيق واحد. احجز عرضًا تجريبيًا مجانيًا. (139) |
| 7 | cta.watchDemo | Watch Demo | Watch the 2-minute tour | شاهد العرض | شاهد جولة سريعة في دقيقتين |
| 8 | cta.contactWhatsApp / regions.chatOnWhatsApp | Message us on WhatsApp / Chat on WhatsApp | Chat with us on WhatsApp (both) | راسلنا عبر واتساب / تواصل عبر واتساب | كلّمنا على واتساب (both) |
| 9 | roles.title | One app for owners, teachers and parents | One app. Three roles. Everyone in the picture. | تطبيق واحد للمالك والمعلمين وأولياء الأمور | تطبيق واحد. ثلاثة أدوار. والجميع في الصورة. |
| 10 | roles.lead | Each role gets its own screens, built around what they do every day. | Each role gets its own screens, built around its day: the owner dashboard, the teacher app and the parent app. | لكل دور شاشاته الخاصة، مبنية على ما يفعله كل يوم. | لكل دور شاشاته الخاصة، على مقاس يومه: لوحة المالك وتطبيق المعلمة وتطبيق ولي الأمر. |
| 11 | roles.owner.items[3] | ...and set the check-in radius and opening hours. | ...and set opening hours and how close parents must be to check in. | ...وحدد نطاق تسجيل الحضور وساعات العمل. | ...وحدّد ساعات العمل والمسافة المسموحة لتسجيل الحضور. |
| 12 | features.title | Built for how nurseries really work | Built around how nurseries really work | مصمَّم لطريقة عمل الحضانات الحقيقية | مبنيّ على طريقة عمل الحضانات فعلًا |
| 13 | features.items[0].body | ...from the gate, within 100 metres. | ...from the gate, within a distance you set. | ...وهو في نطاق 100 متر من الحضانة... | ...داخل النطاق الذي تحدده الحضانة. وللمعلمة أن تسجّل الحضور يدويًا. |
| 14 | features.items[5] (title) | Arabic from day one | Everyone picks their language | بالعربية منذ اليوم الأول | كل شخص يختار لغته |
| 15 | compare.title | Why not WhatsApp, Excel or paper? | When WhatsApp, Excel and paper stop being enough | لماذا لا نكتفي بواتساب أو إكسل أو الورق؟ | متى لا يعود واتساب وإكسل والورق كافيًا؟ |
| 16 | compare.rows[2].new | ...within 100 metres. ...who is in, late or out | ...within a distance you set. ...who is in, late or absent at a glance. | ...في نطاق 100 متر... ومن غادر | ...داخل النطاق الذي تحدده الحضانة... ومن غاب |
| 17 | day.lead | Your nursery already has a system. It is a WhatsApp group. Here is the same day, without it. | Your nursery probably runs on a WhatsApp group today. Here is the same day without it. | لدى حضانتك نظام بالفعل، وهو مجموعة واتساب... | على الأرجح تُدار حضانتك اليوم عبر مجموعة واتساب. وهذا هو اليوم نفسه من دونها. |
| 18 | day.items[0].body | Drop-off. A parent taps check-in from the gate. The button only works inside 100 metres. ... | A parent taps check-in at the gate. The button only works within the distance you set. No book, no queue, no tablet. | وصول الطفل. يسجّل ولي الأمر ... في نطاق 100 متر. ... | يضغط ولي الأمر زر تسجيل الحضور وهو عند البوابة، ولا يعمل الزر إلا داخل النطاق الذي تحدده الحضانة. ... |
| 19 | day.items[5].body | ...Filed for good, searchable next year. | ...and the report stays searchable. (retention claim removed, OWNER-CLAIMS B) | ...ويُحفظ التقرير إلى الأبد... | ...ويبقى التقرير محفوظًا يمكن البحث فيه. |
| 20 | pricing.partner.cta / body | Be The First Partner / ...keep whatever launch price we set, permanently, and decide what we build next... worth it. | Join the first 10 / ...keep their launch price for good and help shape what we build next... your voice counts here. | كن من أوائل الشركاء | انضم إلى أول 10 حضانات |
| 21 | demo.title | See Yawmy Care in Action | Book your free demo | اكتشف يومي كير | احجز عرضك التجريبي المجاني |
| 22 | demo.lead | Discover how Yawmy Care can simplify your nursery's daily operations... | Tell us a little about you and when suits you. It's a 30-minute demo: we'll show you Yawmy Care and answer your questions. | تعرّف على كيفية مساعدة يومي كير لك في تبسيط عملياتك اليومية... | عرّفنا بنفسك وبالوقت المناسب لك. العرض لمدة 30 دقيقة، ونعرض عليك يومي كير ونجيب عن أسئلتك. |
| 23 | demo.submit | Book My Free Demo | Book my free demo | احجز عرضًا تجريبيًا | احجز عرضي التجريبي المجاني |
| 24 | demo.done.title | Thank you. You are all set | Thank you. We will be in touch. | شكرًا لك، تم كل شيء | شكرًا لك، سنتواصل معك. |
| 25 | demo.error.title + email.invalid | Something went wrong / Please enter a valid email address, like name@example.com. | Your request has not gone through / That email does not look right. It should look like name@example.com. | حدث خطأ ما / يرجى إدخال بريد إلكتروني صحيح... | لم يصل طلبك بعد / يبدو أن البريد غير صحيح. يجب أن يكون مثل name@example.com (LTR isolate). |

Also applied (not in the table): all other copy-warmth rows for hero.imageAlt, roles (teacher alt "nappy", parent profile line, owner tab «صاحب الحضانة», heading), features (items 1-3), compare rows 1/3, day items 1-4 and 6, pricing school body and AR title, all 14 form messages kind and specific, nursery label "Nursery or school name", "Email address", sentence-case labels, `legal.consent`, privacy/terms AR brand gender (masculine «يتعامل يومي كير ... وخدمته»), contact page, 404 copy. Features AR badge «عربي» -> «بلغتين» (badge now means "two languages"). `pricing.ar` plan item «المعلمين» -> «المعلمات». Kept (OWNER): "launch price for good", "no commission", "unlimited" lines were not made stronger.

## Files changed
- `src/i18n/en.json`, `ar.json`; `src/i18n/sections/{hero,roles,features,compare,day,pricing,demo}.{en,ar}.json`
- `public/llms.txt` (rewritten: EN first, tagline, 48 hours, 30-minute demo, no 100 m, anchors only #why #setup #security #pricing #faq), `public/site.webmanifest` (`lang`), `public/og/og-en.png`, `og-ar.png` (new art, 1200x630, viewed and checked)
- `scripts/generate-og.mjs` (new: regenerates both OG images with headless Chrome from `brand.tagline` + a real dashboard and parent-home crop; wordmark "Yawmy Care" / «يومي كير»), `scripts/seo-verify.mjs` (AR title <= 55, description <= 155, retired-claims guard, font-display check)
- `src/layouts/BaseLayout.astro` (og/twitter tags skipped when `noindex`, so the 404 has none; font note; OG alt is now "Yawmy Care: Every child's day, in one place."), `src/components/seo/JsonLd.astro` (Organization `slogan`; SoftwareApplication `inLanguage: ["en","ar"]`; descriptions come from the new meta, no Arabic-first pitch)
- `docs/tools/gen-arabic-review.mjs` (tagline and watchDemo are no longer "verbatim owner Figma"), `docs/arabic-review.md` (regenerated)

## For the structure / hero owner (not touched by me)
1. `hero.languageNote` is a new key (EN "Available in English and Arabic." / AR «متاح بالعربية والإنجليزية.»). Render it as a small muted line under the hero CTAs in `Hero.astro` (and a similar line in the footer if wanted). Until then it is unused.
2. Hero LCP: three `loading="eager"` images, only the dashboard has `fetchpriority="high"`. Set the two phone `Picture`s to `loading="lazy"` (or `fetchpriority="low"`) and consider `<link rel="preload" as="image">` for the dashboard AVIF.
3. `testimonials`/`founders` (if ever re-enabled): founders.en.json still says "Today, Yawmy brings..." (use "Yawmy Care"); founders.ar says «المعلمين» (use «المعلمات»); apply the "Why we built Yawmy Care" heading. FAQ item "Is the app available in Arabic?" is fine under decision 30.
4. The demo step-2 "children" chips keep the label as the submitted value, so the en-dash/LTR-isolate fix for "1-30" was NOT applied (it would change stored data). Do it together with a separate `value` attribute if wanted.
5. `Features.astro` shows the AR badge only for id `arabic` in the Arabic locale; the badge text is now «بلغتين». Remove the badge if the card should be plain.
6. FAQ h3 counter ("1How much...") and the "7:30 AM - Drop-off" hyphen (seo-brand-final #3, #5) are component-side fixes.

## Fonts (documented, not changed)
Recoleta / Expo Arabic are still licence-pending. The stand-ins Fraunces and Readex Pro come from `@fontsource-variable` with `font-display: swap` (now asserted by `seo-verify.mjs`). Vite hashes their file names and the package exports only `*.css`, so they cannot be preloaded by a stable URL; when licensed WOFF2 files go into `src/assets/fonts/`, `fontPreloads()` preloads them automatically. A metric-matched fallback (`size-adjust`) is a follow-up for the CSS owner.

## Left for the owner
- Confirm "set up within 48 hours" (hero lead, llms.txt, FAQ) and "30-minute demo" are accurate; both are now public.
- Confirm the 2-minute tour video exists, otherwise keep the secondary hero CTA hidden.
- Confirm `operatingSystem: "Web, iOS, Android"` in JSON-LD and the "launch price for good" / "first 10" promise.
- Native Arabic review (new strings are drafts in `docs/arabic-review.md`); feminine «المعلمات» is applied in my slugs.
- Optional: OG art uses stand-in fonts and in-app screenshots (English UI); re-run `node scripts/generate-og.mjs` after the licensed fonts or new screenshots land.
