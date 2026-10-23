# Copy warmth review, Yawmy Care landing page (EN + AR)

Scope: every live string in `src/i18n/en.json`, `ar.json`, `sections/*.en.json`, `sections/*.ar.json`, plus `docs/COPY-V2.md`. Read-only for `src/`. Rules respected: brand "Yawmy Care" / "يومي كير"; no new facts, numbers, customers or proof; Western digits; glossary from `docs/reviews/arabic-copy.md` (room = فصل, demo = عرض تجريبي, subscription = اشتراك). Every recommendation keeps the promise strength of the current line (a "never" stays a "never"). Rows tagged **[OWNER]** touch a claim in `docs/OWNER-CLAIMS.md` or need an owner decision; the recommended text does not make that claim stronger.

Notation: `*word*` in hero/pricing titles are emphasis markers, keep the same number of marked spans or tell engineering. `(none)` = remove the string.

---

## (a) Verdict and scores

### English: 6.5 / 10 overall

| Warmth | Clarity | Consistency |
|---|---|---|
| 6 | 7 | 6 |

What works: the "Day" timeline, the compare rows, the testimonials and "Nothing lost in a group chat. Nothing written twice." are specific, human and funny in the right way. Short sentences, concrete nouns.

What holds it back:
- Three voices in one page: a warm human voice (Day, Compare, FAQ), a brochure voice (Setup steps "Get Your Daily Care Ready", Security lead "exceptional care", Demo lead "simplify your nursery's daily operations") and Figma-title-case leftovers ("Be The First Partner", "See Yawmy Care in Action", "Book My Free Demo").
- Same idea said twice in a row: "Drop-off. / Drop-off.", "Logged as it happens... Recorded in the moment", "Your data is yours. Your data is yours." Titles are repeated in the body.
- Weak CTAs and microcopy: "Watch Demo" next to "Book a Demo" sounds like the same thing; 14 form errors start "Please enter...", the error state says "Something went wrong".
- Over-promise: "Your Data Is Safe", "Encrypted, always", "exceptional care", "decide what we build next", "Most nurseries are set up in under 20 minutes" (the product is new; there is no "most").
- Small slips: "Why we built this?", "she" used for both the parent and the child in one sentence, UK/US mix (nappies vs diaper, metres), "Yawmy" vs "Yawmy Care".

### Arabic: 5.5 / 10 overall

| Warmth | Clarity | Consistency |
|---|---|---|
| 5 | 6 | 5 |

What works: the Day section and Compare rows read like Arabic written for a person; "العربية ليست ترجمة" and "بياناتك ملك لك" are strong; glossary mostly applied.

What holds it back:
- Stiffer than the English. Several lines are translationese: "منصة واحدة متكاملة" three times in Setup (an echo of "integrated platform"), "بأعلى درجات الموثوقية" (Security lead: stronger than the EN), "أدر بذكاء" (tagline), "لن نتقاضى رسومًا" (legal register), "تفضل عرضًا مباشرًا؟" ("تفضل" also means "please go ahead", so the question reads oddly).
- Wrong meaning in places: "حساسية كل طفل" (the child's sensitivity, not allergies), "ترد عليهم خوفًا من أن يظنوا" (you reply out of fear), "من هنا" in Compare lead (from here = this page?), "نكتفي" (we are content) shifts the subject of the Compare title.
- Gender/number drift: brand is feminine in the legal pages ("تتعامل يومي كير ... وخدمتها") and masculine in FAQ ("بُني يومي كير"); teachers are المعلمين / المعلمة / المعلمين والمعلمات in different places.
- Register risk: COPY-V2 proposes Egyptian colloquial ("بطّل تدير", "كام التكلفة؟", "لازم تدوّر"). The site has a Saudi region and a US region; colloquial Egyptian in H1 and FAQ questions will feel local to Egypt and informal to a Gulf owner. Recommended register below: warm, simple Modern Standard ("فصحى مبسطة") with short sentences and a few pan-Arab friendly verbs (كلّمنا، شاهد، ابدأ) instead of dialect.
- Labels differ from EN: "Nursery Name" -> "اسم المؤسسة"; "Work Email" -> "البريد الإلكتروني"; "out" -> "غادر" vs "غاب".

### Verdict in one line each
- **EN**: a good, specific page that slips into brochure language in Setup, Security, Demo; fix those and the repeated title/body echoes and it is genuinely lovely.
- **AR**: needs a warmth pass more than a correctness pass; make it sound like a friendly person (shorter, active, same promise strength), unify gender/terms, drop "منصة متكاملة".

---

## (b) Recommended changes (paste-ready)

Row format: `file:key · current EN · current AR · issue · recommended EN · recommended AR`.
`ar.json`/`en.json` rows are listed as `root:`. Section files as `section:`.

### B1. Global, brand, CTAs, region, legal, 404 (`en.json` / `ar.json`)

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| root:meta.description | Nursery management software with Arabic and English apps: attendance, daily reports and parent chat in one place. Book a free demo of Yawmy Care. | برنامج يومي كير لإدارة الحضانات والمدارس الدولية: حضور وتقارير يومية ومحادثات مع أولياء الأمور في تطبيق واحد بالعربية والإنجليزية. | AR mentions international schools, EN does not; AR has no call to action | Nursery management software in Arabic and English: attendance, daily reports and parent chat in one app, for nurseries and international schools. Book a free demo of Yawmy Care. (check length, about 155 chars) | برنامج لإدارة الحضانات والمدارس الدولية بالعربية والإنجليزية: الحضور والتقارير اليومية ومحادثات أولياء الأمور في تطبيق واحد. احجز عرضًا تجريبيًا مجانيًا مع يومي كير. |
| root:brand.tagline | Manage Smarter with Yawmy Care. | أدر بذكاء مع يومي كير | "Smarter" is generic and unprovable; Title Case; AR is an order with no period, mismatched with EN | Every child's day, in one place. | يوم كل طفل، في مكان واحد. |
| root:brand.logoAlt | Yawmy Care home | الصفحة الرئيسية ليومي كير | fine | KEEP | KEEP |
| root:cta.bookDemo | Book a Demo | احجز عرضًا تجريبيًا | Title Case is inconsistent with the rest of the page | Book a free demo | احجز عرضًا تجريبيًا مجانيًا |
| root:cta.watchDemo | Watch Demo | شاهد العرض | Sits next to "Book a Demo": the visitor cannot tell the two apart; the hero already calls it a tour | Watch the 2-minute tour | شاهد جولة سريعة في دقيقتين |
| root:cta.contactWhatsApp | Message us on WhatsApp | راسلنا عبر واتساب | Three different WhatsApp labels across the site | Chat with us on WhatsApp | كلّمنا على واتساب |
| root:cta.contactEmail | Email us | راسلنا عبر البريد الإلكتروني | AR is long for a button and reuses "راسلنا" | Email us | راسلنا بالبريد |
| root:regions.chatOnWhatsApp | Chat on WhatsApp | تواصل عبر واتساب | Same job, third wording | Chat with us on WhatsApp | كلّمنا على واتساب |
| root:regions.whatsappMessage | Hello Yawmy Care, I would like to learn more about your nursery app. | مرحبًا يومي كير، أود معرفة المزيد عن تطبيق إدارة الحضانة. | Prefilled message the visitor sends in their own voice; stiff; no Arabic greeting | Hi Yawmy Care, I'd like to know more about your nursery app. | السلام عليكم، أودّ أن أعرف المزيد عن تطبيق يومي كير للحضانات. |
| root:social.whatsapp | Chat with Yawmy Care on WhatsApp | تواصل مع يومي كير عبر واتساب | aria label, ok | KEEP | كلّم يومي كير على واتساب |
| root:legal.consent | By sending this form you agree to our {link}. | بإرسال هذا النموذج فإنك توافق على {link}. | missing comma; "فإنك" heavy | By sending this form, you agree to our {link}. | بإرسال هذا النموذج، فأنت توافق على {link}. |
| root:legal.pages.privacy.description | How Yawmy Care handles the information you share with us. | كيف تتعامل يومي كير مع المعلومات التي تشاركها معنا. | brand gender: feminine here, masculine in FAQ | How Yawmy Care looks after the information you share with us. | كيف يتعامل يومي كير مع المعلومات التي تشاركها معنا. |
| root:legal.pages.terms.description | The terms that apply when you use the Yawmy Care website and service. | الشروط التي تسري عند استخدام موقع يومي كير وخدمتها. | gender ("خدمتها") | The terms that apply when you use the Yawmy Care website and service. (KEEP) | الشروط التي تسري عند استخدام موقع يومي كير وخدمته. |
| root:contactPage.lead | Choose the way that suits you. We reply in Arabic or English. | اختر الطريقة التي تناسبك. نرد بالعربية أو الإنجليزية. | cool; "suits you" is formal | Pick whatever is easiest for you. We reply in Arabic or English. | اختر الطريقة الأسهل لك. نرد بالعربية أو الإنجليزية. |
| root:contactPage.description | Talk to the Yawmy Care team on WhatsApp, by phone or by email. | تحدث مع فريق يومي كير عبر واتساب أو الهاتف أو البريد الإلكتروني. | ok | Talk to the Yawmy Care team on WhatsApp, by phone or by email. (KEEP) | تحدّث مع فريق يومي كير على واتساب أو بالهاتف أو بالبريد. |
| root:contactPage.whatsapp | Message us on WhatsApp | راسلنا عبر واتساب | unify | Chat with us on WhatsApp | كلّمنا على واتساب |
| root:contactPage.email | Email us | راسلنا عبر البريد الإلكتروني | long | Email us | راسلنا بالبريد |
| root:contactPage.bookDemo | Prefer a walkthrough? Book a demo | تفضل عرضًا مباشرًا؟ احجز عرضًا تجريبيًا | AR: "تفضل" reads as "please go ahead", "عرضًا" twice | Prefer to see it first? Book a demo | تحب أن ترى التطبيق أولًا؟ احجز عرضًا تجريبيًا |
| root:notFound.title | We could not find that page | لم نعثر على هذه الصفحة | cold; no contractions | We can't find that page | لم نجد هذه الصفحة |
| root:notFound.lead | The link may be old or mistyped. Start again from the home page. | قد يكون الرابط قديمًا أو به خطأ. ابدأ من الصفحة الرئيسية. | order-like | The link may be old or mistyped. Let's take you back to the start. | قد يكون الرابط قديمًا أو فيه خطأ. لنعد بك إلى البداية. |
| root:notFound.goHome | Go to Yawmy Care | اذهب إلى يومي كير | "Go to Yawmy Care" does not say where | Back to the home page | العودة إلى الصفحة الرئيسية |

### B2. Header and footer navigation

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| header:nav.items[2] (why) | Why Yawmy | لماذا يومي كير | EN drops "Care"; AR keeps it | Why Yawmy Care | لماذا يومي كير (KEEP) |
| header:nav.items[5] (commitments) | Our commitments | التزاماتنا | "commitments" is legal; the section calls them promises | Our promises | وعودنا |
| header:nav.items[7] (founders) **[OWNER]** | Founders | المؤسسون | cold label for the most human section | Our story | قصتنا |
| header:nav.items[3] (setup) | How it works | كيف يعمل | fine | KEEP | كيف يعمل (KEEP) |
| footer:links.why / commitments / founders | Why Yawmy / Our commitments / Founders | لماذا يومي كير / التزاماتنا / المؤسسون | must mirror header | Why Yawmy Care / Our promises / Our story | لماذا يومي كير / وعودنا / قصتنا |
| footer:cta.title | Start managing smarter with Yawmy Care | ابدأ إدارة أكثر ذكاءً مع يومي كير | repeats the generic tagline; AR is clumsy ("إدارة أكثر ذكاءً") | See your own nursery in Yawmy Care | شاهد حضانتك داخل يومي كير |
| footer:cta.lead | 20 minutes on a call, in Arabic or English. We will show you your own nursery in the product. | 20 دقيقة في مكالمة، بالعربية أو الإنجليزية. سنعرض لك حضانتك أنت داخل التطبيق. | AR "حضانتك أنت" fine; EN has no verb in line 1 | A 20-minute call, in Arabic or English. We'll show you your own nursery in the product. | مكالمة من 20 دقيقة، بالعربية أو الإنجليزية. سنعرض لك حضانتك أنت داخل التطبيق. |
| footer:links.setup | Set up in 20 minutes | ابدأ خلال 20 دقيقة | EN is a statement, AR an order; the header label is "How it works" | Set up in 20 minutes (KEEP) | جهّز حضانتك في 20 دقيقة |

### B3. Hero

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| hero:title | *Nursery* management software, *built* for the region. *In Arabic* from day one. | برنامج *إدارة الحضانات*، *مصمم* للمنطقة. *بالعربية* منذ اليوم الأول. | Category label, not a promise; "built for the region" says nothing; reads like a directory. The keyword stays in `<title>`/lead | Run your *nursery* from one app, not *WhatsApp* and *Excel*. | أدِر *حضانتك* من تطبيق واحد، لا من *واتساب* و*إكسل*. |
| hero:title (alternative, more direct, same as COPY-V2) | | | Punchier but "Stop running..." can sound accusing | Stop running your *nursery* on *WhatsApp* and *Excel*. | كفى إدارة *حضانتك* على *واتساب* و*إكسل*. |
| hero:lead | Stop running your nursery on WhatsApp. Daily reports, attendance, parent chat and announcements in one app, in Arabic and English. Set up in under 20 minutes. | توقّف عن إدارة حضانتك عبر واتساب. التقارير اليومية والحضور ومحادثات أولياء الأمور والإعلانات، كلها في تطبيق واحد، بالعربية والإنجليزية. جهّز حضانتك في أقل من 20 دقيقة. | "Stop" repeats the new H1; AR "عبر" and "توقّف" cold; list is long | Nursery management software for Arabic and English: attendance, daily reports, photos and parent chat in one app. Set up in under 20 minutes. | الحضور والتقارير اليومية والصور ومحادثات أولياء الأمور في تطبيق واحد، بالعربية والإنجليزية. جهّز حضانتك في أقل من 20 دقيقة. |
| hero:ctaPrimary | Book a free demo | احجز عرضًا تجريبيًا مجانيًا | good | KEEP | KEEP |
| hero:ctaWatch | Watch the 2-minute tour | شاهد جولة سريعة في دقيقتين | good ("2-minute" exists, owner to confirm video) | KEEP | KEEP |
| hero:imageAlt | Yawmy Care on a desktop and two phones: the owner dashboard with the daily attendance chart and recent activity, the parent home with check-in and today's schedule, and the admin app. The app screens are in English. | (long) | Too long for alt text; screen readers read it all | Yawmy Care on a desktop and two phones: the owner dashboard with today's attendance, the parent home with check-in, and the admin app. Screens shown in English. | يومي كير على سطح المكتب وهاتفين: لوحة المالك مع حضور اليوم، والصفحة الرئيسية لولي الأمر مع تسجيل الحضور، وتطبيق الإدارة. الشاشات المعروضة بالإنجليزية. |

### B4. Features

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| features:title | Built for how nurseries really work | مصمَّم لطريقة عمل الحضانات الحقيقية | AR says "real nurseries" (as opposed to fake ones); diacritic noise | Built around how nurseries really work | مبنيّ على طريقة عمل الحضانات فعلًا |
| features:items[0].body | Parents check in and out from the gate, within 100 metres. Teachers can mark a child in by hand. | يسجّل ولي الأمر الحضور والانصراف من البوابة وهو في نطاق 100 متر من الحضانة، ويمكن للمعلمة تسجيل حضور الطفل يدويًا. | one run-on sentence in AR | KEEP | يسجّل ولي الأمر حضور طفله وانصرافه من البوابة، في نطاق 100 متر. وللمعلمة أن تسجّل الحضور يدويًا. |
| features:items[1].body | Tell the whole nursery or just one room. Announcements and events go to parents' phones, no group chat needed. | أبلغ الحضانة كلها أو فصلًا واحدًا فقط. تصل الإعلانات والفعاليات إلى هواتف أولياء الأمور، بلا مجموعة واتساب. | EN "no group chat", AR "no WhatsApp group": align; "فقط" filler | Tell the whole nursery or just one room. Announcements and events land on parents' phones. No WhatsApp group needed. | أبلغ الحضانة كلها أو فصلًا واحدًا. تصل الإعلانات والفعاليات إلى هواتف أولياء الأمور، بلا حاجة إلى مجموعة واتساب. |
| features:items[2].body | Teachers log an incident in a minute. Every child's allergies, medical notes and authorised pickups are one tap away. | تسجّل المعلمة الحادثة في دقيقة. وتظهر لك حساسية كل طفل وملاحظاته الصحية والمخوّلون باستلامه بنقرة واحدة. | AR "حساسية كل طفل" = the child's sensitivity | KEEP | تسجّل المعلمة الحادثة في دقيقة. وتجد حالات الحساسية والملاحظات الصحية وأسماء المخوّلين بالاستلام لكل طفل على بعد نقرة. |
| features:items[3].title | Know they were told | تأكد أنهم عَلِموا | AR diacritics, odd | Know parents saw it | اعرف أنهم اطّلعوا |
| features:items[3].body | Parents acknowledge incident reports, so you know they were told. | يؤكد أولياء الأمور اطلاعهم على تقارير الحوادث، فتعرف أنهم أُبلِغوا. | repeats the title | Parents confirm they have read incident reports, so you are never left guessing. | يؤكد ولي الأمر اطلاعه على تقرير الحادثة، فلا تضطر إلى التخمين. |
| features:items[5].title | Arabic from day one | بالعربية منذ اليوم الأول | the phrase already appears in the hero (old), FAQ and commitments; repeated | Everyone picks their language | كل شخص يختار لغته |
| features:items[5].body | Staff and parents each pick their own language, Arabic or English, and see the whole app in it. | يختار كل فرد من الفريق وكل ولي أمر لغته، العربية أو الإنجليزية، ويرى التطبيق كله بها. | fine | Staff and parents each choose Arabic or English and see the whole app in it. | يختار كل فرد من الفريق وكل ولي أمر العربية أو الإنجليزية، ويرى التطبيق كله بها. |

### B5. Roles ("One app for owners, teachers and parents")

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| roles:title | One app for owners, teachers and parents | تطبيق واحد للمالك والمعلمين وأولياء الأمور | functional; teacher gender drift (see questions) | One app. Three roles. Everyone in the picture. | تطبيق واحد. ثلاثة أدوار. والجميع في الصورة. |
| roles:lead | Each role gets its own screens, built around what they do every day. | لكل دور شاشاته الخاصة، مبنية على ما يفعله كل يوم. | AR sentence is broken (who does "كل يوم"?) | Each role gets its own screens, built around its day. | لكل دور شاشاته الخاصة، على مقاس يومه. |
| roles:roles[0].tab | Owner | المالك | cold; warmer | Owner | صاحب الحضانة |
| roles:roles[0].items[1] | Manage rooms, capacity and teacher assignments, with schedules. | أدر الفصول والسعة وتوزيع المعلمين، مع جداول الفصول. | awkward tail | Manage rooms, capacity, schedules and which teacher is where. | أدر الفصول والسعة والجداول، وحدّد أي معلمة في أي فصل. |
| roles:roles[0].items[3] | Review attendance and incident logs, export your records, and set the check-in radius and opening hours. | راجع سجلات الحضور والحوادث، وصدّر سجلاتك، وحدد نطاق تسجيل الحضور وساعات العمل. | five jobs in one bullet; "radius" is jargon; **[OWNER]** also conflicts with the fixed "100 metres" claim | Review attendance and incident logs, export your records, and choose how close parents must be to check in. | راجع سجلات الحضور والحوادث، وصدّر سجلاتك، وحدّد المسافة المسموحة لتسجيل الحضور وساعات العمل. |
| roles:roles[1].tab | Teacher | المعلمة | OK; decide المعلمة vs المعلم | Teacher | المعلمة |
| roles:roles[1].imageAlt | ...mood, meals, nap, diaper and activity... | ...والحفاضات... | "diaper" (US) vs "nappies" (UK) in the body | ...mood, meals, nap, nappy and activity... | KEEP |
| roles:roles[1].items[1] | Log mood, meals, nap, nappies, activities and medication. Save drafts and publish. | سجّل المزاج والوجبات والقيلولة والحفاضات والأنشطة والأدوية، واحفظ مسودة أو انشر. | ok | KEEP | KEEP |
| roles:roles[2].items[3] | Keep your child's profile with allergies, immunisations and authorised pickups, and set quiet hours. | احتفظ بملف طفلك بالحساسية والتطعيمات والمخوّلين بالاستلام، وحدد ساعات الهدوء. | AR "بالحساسية" reads as "with the sensitivity" | Keep your child's profile up to date: allergies, immunisations, who may collect them, and your quiet hours. | حدّث ملف طفلك: الحساسية والتطعيمات ومن يحق له الاستلام، وساعات الهدوء الخاصة بك. |

### B6. Day ("A day at your nursery")

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| day:title | A day at your nursery, from open to close | يوم في حضانتك، من الافتتاح حتى الإغلاق | good | KEEP | KEEP |
| day:lead | Your nursery already has a system. It is a WhatsApp group. Here is the same day, without it. | لدى حضانتك نظام بالفعل، وهو مجموعة واتساب. وهذا هو اليوم نفسه، لكن من دونها. | tells the reader what they do; a touch mocking | Your nursery probably runs on a WhatsApp group today. Here is the same day without it. | على الأرجح تُدار حضانتك اليوم عبر مجموعة واتساب. وهذا هو اليوم نفسه من دونها. |
| day:items[0].body | Drop-off. A parent taps check-in from the gate. The button only works inside 100 metres. No book, no queue, no tablet. | وصول الطفل. يسجّل ولي الأمر الحضور بنقرة واحدة وهو عند البوابة، ولا يعمل الزر إلا في نطاق 100 متر. بلا دفتر، ولا طابور، ولا جهاز لوحي. | body repeats the title ("Drop-off." twice) | A parent taps check-in at the gate. The button only works within 100 metres. No book, no queue, no tablet. | يضغط ولي الأمر زر تسجيل الحضور وهو عند البوابة، ولا يعمل الزر إلا في نطاق 100 متر. بلا دفتر ولا طابور ولا جهاز لوحي. |
| day:items[1].body | The room, at a glance. The teacher sees who is in, who is late, who is out. Manual mark in one tap. | الفصل بنظرة واحدة. ترى المعلمة من حضر ومن تأخر ومن غاب، وتسجّل الحضور يدويًا بنقرة واحدة. | "out" (left) vs "غاب" (absent); "Manual mark" is telegram style | The teacher sees who is in, who is late and who is absent. Marking a child in by hand takes one tap. | ترى المعلمة من حضر ومن تأخر ومن غاب. وتسجيل حضور طفل يدويًا يحتاج نقرة واحدة. |
| day:items[2].body | Photos, in the right album. Each photo goes to that child's own gallery, not a group where twelve families scroll to find their own. | كل صورة في ألبومها الصحيح. تصل كل صورة إلى ألبوم الطفل نفسه فقط، لا إلى مجموعة تبحث فيها اثنتا عشرة أسرة عن صورة طفلها. | repeats title; AR "نفسه فقط" heavy | Each photo goes straight to that child's own gallery, not into a group where twelve families scroll to find theirs. | تذهب كل صورة مباشرة إلى ألبوم طفلها، لا إلى مجموعة تبحث فيها اثنتا عشرة أسرة عن صورة أطفالها. |
| day:items[3].body | Logged as it happens. Meals, nap, mood, nappies, medication. Recorded in the moment, not from memory at half past four. | تُسجَّل لحظة حدوثها: الوجبات والقيلولة والمزاج والحفاضات والأدوية. في وقتها، لا من الذاكرة عند الرابعة والنصف. | "Logged" and "Recorded" say the same thing | Meals, nap, mood, nappies, medication: noted as they happen, not from memory at half past four. | الوجبات والقيلولة والمزاج والحفاضات والأدوية: تُسجَّل في وقتها، لا من الذاكرة عند الرابعة والنصف. |
| day:items[4].title | Parent check-in | متابعة ولي الأمر | confusing: "check-in" means attendance elsewhere | Peace of mind at work | اطمئنان ولي الأمر |
| day:items[4].body | A parent checks in. From her desk, without messaging anyone, she sees what her child ate, how long she slept, and this morning's photos. | تتابع إحدى الأمهات يوم طفلها. من مكتبها، ودون أن تراسل أحدًا، ترى ما أكله وكم نام وصور هذا الصباح. | "her... she... she" ambiguous (parent or child?) | At her desk, a mother opens the app. Without messaging anyone, she sees what her child ate, how long they slept and this morning's photos. | من مكتبها، تفتح إحدى الأمهات التطبيق. ودون أن تراسل أحدًا، ترى ما أكله طفلها ومدة نومه وصور هذا الصباح. |
| day:items[5].body **[OWNER]** | One tap, and the day is sent. Every parent gets a notification in their own language. Filed for good, searchable next year. | بنقرة واحدة يُرسَل اليوم كله. يصل إلى كل ولي أمر إشعار بلغته، ويُحفظ التقرير إلى الأبد ويمكن البحث فيه في العام القادم. | "for good / إلى الأبد" is a retention claim not yet confirmed (OWNER-CLAIMS B) | One tap sends the day. Every parent gets a notification in their own language, and the report stays searchable. | بنقرة واحدة يُرسَل اليوم كله. يصل إلى كل ولي أمر إشعار بلغته، ويبقى التقرير محفوظًا يمكن البحث فيه. |
| day:items[6].title | Stay connected | ابقَ على تواصل | vague; AR is an order | Questions, answered in one place | كل الأسئلة في مكان واحد |
| day:items[6].body | The conversation stays in one place. Parents message the nursery directly, follow up on their child's day, and keep every update in the same chat. | تبقى المحادثة في مكان واحد. يراسل أولياء الأمور الحضانة مباشرة، ويتابعون يوم أطفالهم، وتجتمع كل التحديثات في المحادثة نفسها. | wordy, "same place... same chat" | Parents message the nursery in the app, follow their child's day, and every update stays in one chat. | يراسل أولياء الأمور الحضانة من التطبيق، ويتابعون يوم أطفالهم، وتبقى كل التحديثات في محادثة واحدة. |
| day:summary.body | Nothing lost in a group chat. Nothing written twice. Nothing arriving at midnight. | لا شيء يضيع في مجموعة واتساب. ولا شيء يُكتب مرتين. ولا شيء يصل في منتصف الليل. | best lines on the page | KEEP | KEEP |

### B7. Compare

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| compare:title | Why not WhatsApp, Excel or paper? | لماذا لا نكتفي بواتساب أو إكسل أو الورق؟ | defensive; AR "نكتفي" (we) changes the subject | When WhatsApp, Excel and paper stop being enough | متى لا يعود واتساب وإكسل والورق كافيًا؟ |
| compare:lead | Most nurseries start there. Here is the same job, done both ways. | تبدأ معظم الحضانات من هنا. وهذه المهمة نفسها بالطريقتين. | AR "من هنا" = "from here" (this page?); no warmth | Most nurseries start there, and that is fine. Here is the same job, done both ways. | تبدأ معظم الحضانات بها، ولا عيب في ذلك. وهذه المهمة نفسها بالطريقتين. |
| compare:rows[1].old | Parents message at midnight, and you answer in case they think something is wrong. | يراسلك أولياء الأمور في منتصف الليل، وترد عليهم خوفًا من أن يظنوا أن هناك مشكلة. | AR "خوفًا" says you reply out of fear | Parents message at midnight, and you reply so they do not worry. | يراسلك أولياء الأمور في منتصف الليل، فتردّ عليهم حتى لا يقلقوا. |
| compare:rows[1].new | Parents see what their child ate, how long she slept and the day's photos, without messaging anyone. | يرى ولي الأمر ما أكله طفله ومدة نومه وصور يومه، دون أن يراسل أحدًا. | "she" assumes a girl | Parents see what their child ate, how long they slept and the day's photos, without messaging anyone. | KEEP |
| compare:rows[2].new | ...Teachers see who is in, late or out at a glance. | ...ومن غادر بنظرة واحدة. | "out" vs "absent" mismatch with Day | Parents check in from the gate, within 100 metres. Teachers see who is in, late or absent at a glance. | يسجّل ولي الأمر الحضور من البوابة في نطاق 100 متر، وترى المعلمة من حضر ومن تأخر ومن غاب بنظرة واحدة. |
| compare:rows[3].old | Scrolling a group where twelve families look for their own. | التمرير في مجموعة تبحث فيها اثنتا عشرة أسرة عن صور أطفالها. | fine; AR a noun-chain | Scrolling a group chat while twelve families look for their own. | تمرير طويل في مجموعة تبحث فيها اثنتا عشرة أسرة عن صور أطفالها. |
| compare:rows[3].new | Each photo goes to that child's own gallery. | تذهب كل صورة إلى ألبوم الطفل الخاص به. | ok | KEEP | تذهب كل صورة إلى ألبوم ذلك الطفل. |

### B8. Setup ("How it works")

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| setup:title | Set up your nursery in under 20 minutes | جهّز حضانتك في أقل من 20 دقيقة | good **[OWNER]** (claim) | KEEP | KEEP |
| setup:lead | We do it with you on a call. Adding children and inviting your team happens the same day. | نُجهّز كل شيء معك في مكالمة، وتضيف الأطفال وتدعو فريقك في اليوم نفسه. | "do it" vague; AR "كل شيء" stronger than EN | We set it up with you on a call. You can add your children and invite your team the same day. | نجهّزها معك في مكالمة، وتضيف الأطفال وتدعو فريقك في اليوم نفسه. |
| setup:steps[0].title | See Yawmy Care in Action | تعرّف على يومي كير | Title Case, cliché | Book a free demo | احجز عرضًا تجريبيًا مجانيًا |
| setup:steps[0].body | Book a free demo and explore how Yawmy Care can fit your nursery's daily operations. | احجز عرضًا تجريبيًا مجانيًا وتعرّف على كيفية توافق يومي كير مع احتياجات حضانتك اليومية، وتبسيط إدارتها من خلال منصة واحدة متكاملة. | AR repeats title, one 30-word sentence, "منصة متكاملة" | Pick a time that suits you. We show you how Yawmy Care fits your nursery's day. | اختر الوقت المناسب لك، ونعرض عليك كيف يناسب يومي كير يوم حضانتك. |
| setup:steps[1].title | Get Your Daily Care Ready | كل شيء جاهز للبدء | EN means nothing; AR does not match EN | We set it up with you | نجهّزها معك |
| setup:steps[1].body | We'll help you set up your nursery and configure the platform around your daily workflow. | نساعدك في إعداد المنصة وتجهيزها بما يتناسب مع طريقة عملك واحتياجاتك اليومية، حتى تبدأ العمل بسهولة وتنظيم. | "configure / workflow / platform" jargon | On a call, we set up your nursery around the way you already work. | في مكالمة، نجهّز حضانتك على طريقة عملك الحالية. |
| setup:steps[2].title | Bring Everyone Together | اجمع الجميع في مكان واحد | | Invite your team and parents | ادعُ فريقك وأولياء الأمور |
| setup:steps[2].body | Invite your teachers and staff, and get everyone connected through one platform. | ادعُ المعلمين والموظفين، واجعل الجميع على تواصل من خلال منصة واحدة متكاملة. | "platform" x2; "منصة متكاملة" echo | Invite your teachers and staff, then parents. Everyone is connected in one app. | ادعُ المعلمات والموظفين ثم أولياء الأمور، ويصبح الجميع على تواصل في تطبيق واحد. |
| setup:steps[3].title | Everything in One Place | كل ما تحتاجه في مكان واحد | a result, not a step; "in one place" used 6 times on the page | Start your first day | ابدأ يومك الأول |
| setup:steps[3].body | Manage attendance, communication, and daily operations in one place. | أدر الحضور والتواصل والعمليات اليومية بسهولة، من خلال منصة واحدة متكاملة. | "daily operations" is corporate | Attendance, messages and daily reports, together from day one. | الحضور والرسائل والتقارير اليومية معًا منذ اليوم الأول. |
| setup:band.title | No card, no commitment · In Arabic or English | بلا بطاقة ائتمان ولا التزام · بالعربية أو الإنجليزية | dot separator read aloud as "middle dot" **[OWNER]** (true for demo) | No card needed. No commitment. Arabic or English. | لا بطاقة مطلوبة، ولا التزام. بالعربية أو الإنجليزية. |
| setup:band.lead | Book a demo and we set it up with you on a call. | احجز عرضًا تجريبيًا ونجهّز كل شيء معك في مكالمة. | ok | Book a demo and we'll set it up with you on a call. | احجز عرضًا تجريبيًا ونجهّزها معك في مكالمة. |

### B9. Security

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| security:title | Your Data Is Safe. Your Focus Stays on Care. | بياناتك بأمان، وتركيزك يبقى على الرعاية | "Safe" is an absolute; Title Case | Your data is protected, so you can focus on the children. | بياناتك محمية، لتتفرغ للأطفال. |
| security:lead **[OWNER]** | Yawmy Care is built with security at its core, ensuring your data remains protected while you focus on delivering exceptional care every day. | صُممت منصة يومي كير مع وضع الأمان في مقدمة أولوياتها، لضمان حماية بياناتك والحفاظ عليها بأعلى درجات الموثوقية، حتى تتمكن من التركيز على تقديم رعاية متميزة كل يوم. | Brochure filler; AR over-promises ("highest degrees of reliability" is not in EN) | We look after the data side, with encryption, daily backups and access by role, so you can look after the children. | نتولى نحن جانب البيانات: تشفير ونسخ احتياطي يومي وصلاحيات حسب الدور، لتتفرغ أنت لرعاية الأطفال. |
| security:items[0].title | Encrypted, always. | تشفير دائم | "always" absolute | Encrypted | مشفّرة |
| security:items[0].body **[OWNER]** | Your data is encrypted in transit and at rest, and access is limited by role. | بياناتك مشفّرة أثناء النقل وعند التخزين، والوصول إليها محدود حسب الأدوار. | role access duplicates item 3; jargon "in transit / at rest" | Your data is encrypted while it travels and while it is stored. | بياناتك مشفّرة أثناء نقلها وأثناء تخزينها. |
| security:items[1].body | Automatic. Nothing to remember, nothing to configure. | نسخ احتياطي تلقائي كل يوم. لا شيء تتذكره ولا شيء تضبطه. | AR repeats title; EN good | KEEP | تلقائيًا، فلا شيء تتذكره ولا شيء تضبطه. |
| security:items[2].body **[OWNER]** | A teacher sees only her own rooms. An admin cannot read private teacher and parent conversations. | تشاهد المعلمة فصولها فقط. ولا تستطيع الإدارة قراءة المحادثات الخاصة بين المعلمين وأولياء الأمور. | "her" | A teacher sees only their own rooms. An admin cannot read private teacher and parent conversations. | تشاهد المعلمة فصولها فقط. ولا تستطيع الإدارة قراءة المحادثات الخاصة بين المعلمات وأولياء الأمور. |
| security:items[3].title | Kept only as long as needed | نحتفظ بالبيانات للمدة اللازمة فقط | good | KEEP | KEEP |

### B10. Commitments

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| commitments:title | Five things we will not do to you | خمسة أشياء لن نفعلها معك | cards are positive promises (talk to a human, Arabic), so "will not do" does not fit; "to you" sounds slightly menacing | Five promises to every nursery | خمسة وعود لكل حضانة |
| commitments:lead **[OWNER]** (placeholder) | Five promises we make to every nursery that joins Yawmy Care. | خمسة وعود نقطعها لكل حضانة تنضم إلى يومي كير. | repeats the new title | What every nursery that joins Yawmy Care can count on. | ما تستطيع كل حضانة تنضم إلى يومي كير أن تعتمد عليه. |
| commitments:cards.charge.title | We never charge parents | لن نتقاضى رسومًا من أولياء الأمور أبدًا | "نتقاضى" legal register, long, wraps in a card | We never charge parents | لا رسوم على أولياء الأمور، أبدًا |
| commitments:cards.charge.body | One flat fee, paid by the nursery. No commission on tuition. | اشتراك شهري ثابت واحد تدفعه الحضانة، وبلا عمولة على الرسوم الدراسية. | EN lacks "monthly" | One flat monthly fee, paid by the nursery. No commission on tuition. | اشتراك شهري ثابت تدفعه الحضانة، بلا عمولة على الرسوم الدراسية. |
| commitments:cards.dataYours.title | Your data is yours | بياناتك ملك لك | Two cards ("yours" and "stays with you") have almost the same title and body | Export whenever you like | صدّر بياناتك متى شئت |
| commitments:cards.dataYours.body **[OWNER]** | Your data is yours. Export your records whenever you want, without asking us. | بياناتك ملك لك. صدّر سجلاتك متى شئت دون الحاجة إلى إذن منا. | the title repeated inside the body | Your records are yours. Export them whenever you want, without asking us. | سجلاتك ملك لك. صدّرها متى شئت دون أن تحتاج إلى إذن منا. |
| commitments:cards.arabic.body | Full right to left, Arabic notifications, Arabic support. | دعم كامل للكتابة من اليمين إلى اليسار، وإشعارات بالعربية، ودعم فني بالعربية. | EN has no noun after "Full right to left"; "الكتابة" is not "layout" | Full right-to-left layout, Arabic notifications and Arabic support. | تصميم كامل من اليمين إلى اليسار، وإشعارات بالعربية، ودعم فني بالعربية. |
| commitments:cards.human.title | You can talk to a human | يمكنك التحدث إلى شخص حقيقي | stiff AR | You can talk to a real person | تكلّم مع شخص حقيقي |
| commitments:cards.human.body **[OWNER]** | A human answers, in Arabic, within one working day. | يردّ عليك إنسان، بالعربية، خلال يوم عمل واحد. | "A human" is odd; "إنسان" cold | A real person replies, in Arabic, within one working day. | يردّ عليك شخص حقيقي، بالعربية، خلال يوم عمل واحد. |
| commitments:cards.dataStays.title | Your data stays with you | بياناتك تبقى معك | see dataYours | Leave with everything | غادر ومعك كل شيء |
| commitments:cards.dataStays.body **[OWNER]** | If you leave, you leave with everything. 90 days to export, then permanent deletion. | إذا قررت المغادرة، فستغادر ومعك كل شيء. لديك 90 يومًا لتصدير بياناتك، ثم تُحذف نهائيًا. | title and first sentence repeat each other | If you go, you take everything with you. You have 90 days to export, then we delete it permanently. | إذا قررت المغادرة، تأخذ كل شيء معك. أمامك 90 يومًا لتصدير بياناتك، ثم نحذفها نهائيًا. |

### B11. Pricing

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| pricing:title | Simple pricing. We never charge parents. | أسعار بسيطة. ولن نتقاضى أي رسوم من أولياء الأمور أبدًا. | AR long, legal | Simple pricing. We never charge parents. (KEEP) | أسعار بسيطة، ولا رسوم على أولياء الأمور أبدًا. |
| pricing:school.body | Talk to us. We price around your rooms. | تواصل معنا. نسعّر بحسب فصولك. | "price around" is unclear | Talk to us. We will price it around your rooms. | تواصل معنا، ونضع السعر بحسب فصولك. |
| pricing:partner.body **[OWNER]** | The first 10 nurseries keep whatever launch price we set, permanently, and decide what we build next. We are new. That is exactly why this is worth it. | أول 10 حضانات تحتفظ بسعر الإطلاق الذي نحدده لها بصفة دائمة، وتشارك في تقرير ما سنبنيه لاحقًا. نحن في بداية الطريق، وهذا بالتحديد ما يجعل الانضمام الآن يستحق العناء. | EN stronger than AR ("decide" vs "take part in deciding"); "whatever price we set" sounds like a blank cheque; "worth it" is defensive | The first 10 nurseries keep their launch price for good and help shape what we build next. We are new, and that is exactly why your voice counts here. | أول 10 حضانات تحتفظ بسعر الإطلاق لها بصفة دائمة، وتشارك في تشكيل ما نبنيه لاحقًا. نحن في بداية الطريق، ولهذا بالذات يهمّنا رأيك. |
| pricing:partner.cta | Be The First Partner | كن من أوائل الشركاء | Title Case; "partner" is vague | Join the first 10 | انضم إلى أول 10 حضانات |

### B12. Founders and testimonials

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| founders:title | Why we built this? | لماذا بنينا يومي كير؟ | EN is not a question; "this" | Why we built Yawmy Care | لماذا بنينا يومي كير؟ (KEEP) |
| founders:founders[0].paragraphs[1] (Rana; founder to approve) | Parents had little visibility into their child's day, while nursery teams were managing updates, photos, attendance, and communication across WhatsApp groups and manual processes. | كان أولياء الأمور لا يرون إلا القليل مما يجري في يوم طفلهم، بينما كانت فرق الحضانة تدير التحديثات والصور والحضور والتواصل عبر مجموعات واتساب وإجراءات يدوية. | corporate ("visibility", "manual processes"); 30 words | Parents saw very little of their child's day, while nursery teams juggled updates, photos, attendance and messages across WhatsApp groups and paper. | كان أولياء الأمور يرون القليل جدًا من يوم طفلهم، بينما تتنقل فرق الحضانة بين مجموعات واتساب والأوراق لإدارة التحديثات والصور والحضور والرسائل. |
| founders:founders[0].paragraphs[2] | We realised the problem was not the care. It was the way everything was connected. | أدركنا أن المشكلة لم تكن في الرعاية، بل في الطريقة التي يرتبط بها كل شيء ببعض. | "the way everything was connected" is unclear; AR clumsy | We realised the problem was never the care. It was that nothing was connected. | أدركنا أن المشكلة لم تكن في الرعاية، بل في أن كل شيء كان منفصلًا عن الآخر. |
| founders:founders[1].paragraphs[1] | Today, Yawmy brings the nursery, teachers, and parents into one organised space, making it easier to manage the day and stay connected. | واليوم، يجمع يومي كير الحضانة والمعلمين وأولياء الأمور في مساحة واحدة منظّمة، فيصبح تنظيم اليوم والبقاء على تواصل أسهل. | "Yawmy" instead of "Yawmy Care"; "organised space" filler | Today, Yawmy Care brings the nursery, teachers and parents together in one app, so the day is easier to run and everyone stays in touch. | واليوم يجمع يومي كير الحضانة والمعلمات وأولياء الأمور في تطبيق واحد، فيصبح تنظيم اليوم أسهل ويبقى الجميع على تواصل. |
| founders:founders[1].paragraphs[2] | And one thing we will never do: charge parents to stay connected to their children. | وهناك أمر واحد لن نفعله أبدًا: أن نتقاضى من أولياء الأمور رسومًا مقابل البقاء على تواصل مع أطفالهم. | strong line; AR heavy "نتقاضى" | KEEP | وهناك أمر واحد لن نفعله أبدًا: أن نأخذ من أولياء الأمور رسومًا ليبقوا على تواصل مع أطفالهم. |
| testimonials:label | What owners, teachers and parents say | ماذا يقول أصحاب الحضانات والمعلمون والمعلمات وأولياء الأمور | no parent quote is shown; "say" over-claims | What owners, teachers and admins told us | ما قاله لنا أصحاب الحضانات والمعلمات والإداريات |
| testimonials:items[0].quote (real quote; check with source) | "My phone is the nursery's filing system. If I lose it, I lose everything." | «هاتفي هو نظام الأرشفة في الحضانة. لو ضاع مني، ضاع كل شيء.» | "نظام الأرشفة" is a calque | KEEP | «هاتفي هو أرشيف الحضانة كله. لو ضاع مني، ضاع كل شيء.» |
| testimonials:items[2].quote | "Parents message me at midnight and I answer, because if I don't they think something is wrong." | «يراسلني أولياء الأمور في منتصف الليل وأرد عليهم، لأنني لو لم أفعل ظنوا أن هناك مشكلة.» | "لو لم أفعل" ok but stiff | KEEP | «يراسلني أولياء الأمور في منتصف الليل وأرد عليهم، لأنني لو لم أرد ظنوا أن هناك مشكلة.» |

### B13. FAQ

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| faq:showLess | Show fewer questions | عرض أسئلة أقل | AR is odd | Show fewer questions | عرض أقل |
| faq:items[0].question / answer | How much does it cost? / Yawmy Care costs one flat monthly fee, paid by the nursery. Book a demo and we will go through the details with you. | كم تبلغ التكلفة؟ / تكلفة يومي كير اشتراك شهري ثابت واحد... وسنشرح لك التفاصيل. | AR "تبلغ التكلفة" stiff | How much does it cost? / One flat monthly fee, paid by the nursery. Book a demo and we will go through the details with you. | كم التكلفة؟ / اشتراك شهري ثابت واحد تدفعه الحضانة. احجز عرضًا تجريبيًا ونشرح لك التفاصيل. |
| faq:items[1].answer | No. Parents use the app for free. The nursery pays. | لا. يستخدم أولياء الأمور التطبيق مجانًا، وتدفع الحضانة. | good but no "never" while the site promises "never" (**[OWNER]**) | No, never. Parents use the app for free. The nursery pays. | لا، أبدًا. يستخدم أولياء الأمور التطبيق مجانًا، وتدفع الحضانة. |
| faq:items[2].answer **[OWNER]** | Most nurseries are set up in under 20 minutes. You add your classes, children and teachers, invite parents, and you can start using it the same day. | تُجهَّز معظم الحضانات في أقل من 20 دقيقة... | "Most nurseries" is a statistic about a young product (see pricing: "We are new") | Setup takes under 20 minutes, with us on the call. You add your classes, children and teachers, invite parents, and can start the same day. | الإعداد يستغرق أقل من 20 دقيقة، ونحن معك في المكالمة. تضيف فصولك وأطفالك ومعلماتك، وتدعو أولياء الأمور، وتبدأ في اليوم نفسه. |
| faq:items[3].question / answer | Do my teachers need training? / No formal training is needed. The screens are simple and fully in Arabic, and we walk your team through the basics when you set up. | هل يحتاج المعلمون إلى تدريب؟ / ... باللغة العربية بالكامل ... | gender drift; "fully in Arabic" is ok but they can pick English | Do my teachers need training? / No formal training. The screens are simple and available fully in Arabic, and we walk your team through the basics during setup. | هل تحتاج المعلمات إلى تدريب؟ / لا حاجة إلى تدريب رسمي. الشاشات بسيطة ومتاحة بالعربية بالكامل، ونأخذ فريقك في جولة سريعة على الأساسيات أثناء الإعداد. |
| faq:items[4].question | Is the app fully in Arabic? | هل التطبيق متاح بالعربية بالكامل؟ | AR heavy | Is the app fully in Arabic? | هل التطبيق بالعربية بالكامل؟ |
| faq:items[5].question / answer | Who can see our data? / ... A teacher sees only her own rooms... | من يستطيع الاطلاع على بياناتنا؟ | AR "الاطلاع" formal; EN "her" | Who can see our data? / Only people with the right role. A teacher sees only their own rooms, and an admin cannot read private teacher and parent conversations. Your data is encrypted in transit and at rest, and backed up daily. | من يمكنه رؤية بياناتنا؟ / فقط من له الدور المناسب. تشاهد المعلمة فصولها فقط، ولا تستطيع الإدارة قراءة المحادثات الخاصة بين المعلمات وأولياء الأمور. بياناتك مشفّرة أثناء النقل وعند التخزين، ويُحتفظ بنسخة احتياطية منها كل يوم. |
| faq:items[6].question | What if we cancel? | ماذا لو أردنا الإلغاء؟ | OK | What happens if we cancel? | ماذا يحدث لو ألغينا؟ |
| faq:items[7].question / answer | Can we move off WhatsApp and Excel? / Yes, and that is where most nurseries start. Attendance, daily updates and parent messages all live in one place, and we help you bring your existing lists across during setup. | هل نستطيع الاستغناء عن واتساب وإكسل؟ / نعم، وهذه نقطة البداية... | answer starts with "and that is where most nurseries start", which does not answer the question | Can we stop using WhatsApp and Excel? / Yes. Most nurseries start there, so we help you bring your existing lists across during setup. Attendance, daily updates and parent messages then live in one place. | هل نستطيع التوقف عن استخدام واتساب وإكسل؟ / نعم. تبدأ معظم الحضانات منهما، ولذلك نساعدك على نقل قوائمك الحالية أثناء الإعداد. وبعدها تجتمع الحضور والتحديثات اليومية ورسائل أولياء الأمور في مكان واحد. |
| faq:items[9].question | We are a school nursery section. Does this fit? | نحن قسم حضانة داخل مدرسة. هل يناسبنا يومي كير؟ | EN reads like a note | We run a nursery inside a school. Is Yawmy Care a fit? | KEEP |

### B14. Demo dialog and form microcopy

| file:key | current EN | current AR | issue | recommended EN | recommended AR |
|---|---|---|---|---|---|
| demo:title | See Yawmy Care in Action | اكتشف يومي كير | Title Case; does not say what happens (this is the dialog name for assistive tech too) | Book your free demo | احجز عرضك التجريبي المجاني |
| demo:lead | Discover how Yawmy Care can simplify your nursery's daily operations and keep your team and parents connected. | تعرّف على كيفية مساعدة يومي كير لك في تبسيط عملياتك اليومية... | brochure language | Tell us a little about you and when suits you. We will show you Yawmy Care and answer your questions. | عرّفنا بنفسك وبالوقت المناسب لك، ونعرض عليك يومي كير ونجيب عن أسئلتك. |
| demo:fields.name.placeholder | Enter your Name | أدخل اسمك | placeholder repeats label; capital N | e.g. Sara Ahmed | مثال: سارة أحمد |
| demo:fields.name.required | Please enter your name. | يرجى إدخال اسمك. | "Please enter" x14 / "يرجى" x14 is robotic | Add your name so we know who to ask for. | اكتب اسمك لنعرف بمن نتصل. |
| demo:fields.phone.label | Mobile / WhatsApp number | رقم الجوال / واتساب | fine | KEEP | KEEP |
| demo:fields.phone.required | Please enter your mobile or WhatsApp number. | يرجى إدخال رقم جوالك أو رقم واتساب. | | Add a mobile or WhatsApp number so we can reach you. | أضف رقم جوال أو واتساب لنتمكن من الوصول إليك. |
| demo:fields.phone.invalid | Please enter a valid number with 8 to 15 digits. Include the country code if you can. | يرجى إدخال رقم صحيح من 8 إلى 15 رقمًا، ويفضّل إضافة رمز الدولة. | blames the user | That number does not look right. Use 8 to 15 digits, and add the country code if you can. | يبدو أن الرقم غير صحيح. أدخل من 8 إلى 15 رقمًا، ويفضّل إضافة رمز الدولة. |
| demo:fields.nursery.label | Nursery Name | اسم المؤسسة | EN "Nursery", AR "institution" (mismatch); Title Case | Nursery or school name | اسم الحضانة أو المدرسة |
| demo:fields.nursery.placeholder / required | Enter your Nursery Name / Please enter your nursery's name. | أدخل اسم المؤسسة / يرجى إدخال اسم المؤسسة. | | (none) / Add the name of your nursery or school. | (none) / أضف اسم الحضانة أو المدرسة. |
| demo:fields.email.label | Work Email | البريد الإلكتروني | EN says "Work" (excludes owners who use personal emails), AR does not | Email address | البريد الإلكتروني |
| demo:fields.email.placeholder / required | Enter your Work Email / Please enter your work email. | أدخل بريدك الإلكتروني / يرجى إدخال البريد الإلكتروني. | | name@example.com / Add your email address. | name@example.com (render left-to-right) / أضف بريدك الإلكتروني. |
| demo:fields.email.invalid | Please enter a valid email address, like name@example.com. | يرجى إدخال بريد إلكتروني صحيح (مثل name@example.com). | bidi: wrap the address in an LTR isolate | That email does not look right. It should look like name@example.com. | يبدو أن البريد غير صحيح. يجب أن يكون مثل name@example.com. |
| demo:fields.date.label | Preferred Date | التاريخ المناسب | Title Case | Preferred date | التاريخ المناسب (KEEP) |
| demo:fields.date.required / invalid / min | Please choose a preferred date. / Please enter a valid date. / Please choose today or a later date. | يرجى اختيار التاريخ المناسب. / يرجى إدخال تاريخ صحيح. / يرجى اختيار تاريخ اليوم أو تاريخ لاحق. | | Pick a day that suits you. / That date does not look right. / Pick today or a later day. | اختر اليوم المناسب لك. / يبدو أن التاريخ غير صحيح. / اختر اليوم أو تاريخًا لاحقًا. |
| demo:fields.time.label / required / invalid / past | Preferred Time / Please choose a preferred time. / Please enter a valid time. / That time has already passed today. Please choose a later time. | الوقت المناسب / ... | | Preferred time / Pick a time that suits you. / That time does not look right. / That time has passed for today. Pick a later one. | الوقت المناسب / اختر الوقت المناسب لك. / يبدو أن الوقت غير صحيح. / مضى هذا الوقت اليوم. اختر وقتًا لاحقًا. |
| demo:fields.region.required | Please choose your country. | يرجى اختيار دولتك. | | Choose your country. | اختر دولتك. |
| demo:fields.children.legend | Number of children | عدد الأطفال | a form legend that reads like a database column | How many children? | كم عدد الأطفال؟ |
| demo:fields.tool.legend | What do you use today? | ماذا تستخدم اليوم؟ | fine | KEEP | ماذا تستخدم اليوم لإدارة الحضانة؟ |
| demo:submit | Book My Free Demo | احجز عرضًا تجريبيًا | Title Case; AR drops "free" | Book my free demo | احجز عرضي التجريبي المجاني |
| demo:summary | Please fix the highlighted fields and try again. | يرجى تصحيح الحقول المميّزة ثم المحاولة مرة أخرى. | "highlighted" relies on colour only | A few fields need a quick fix. We have marked them below. | بعض الحقول تحتاج إلى تعديل بسيط، وقد وضعنا عليها علامة. |
| demo:step2.lead | We will contact you to confirm your demo. Add a few details so we can prepare. | سنتواصل معك لتأكيد موعد العرض التجريبي. أضف بعض التفاصيل لنتجهّز لك بشكل أفضل. | | We will contact you to confirm your demo. A few details help us prepare. | سنتواصل معك لتأكيد موعد العرض التجريبي. وبعض التفاصيل تساعدنا على الاستعداد. |
| demo:step2.skip | Skip for now | تخطَّ هذه الخطوة | AR unfriendly | Skip for now | تخطَّ الآن |
| demo:done.title | Thank you. You are all set | شكرًا لك، تم كل شيء | missing full stop; "all set" over-claims (the demo is not confirmed yet) | Thank you. We will be in touch. | شكرًا لك، سنتواصل معك. |
| demo:done.body | We will contact you to confirm your demo. | سنتواصل معك لتأكيد موعد العرض التجريبي. | repeats next[0] | We have your details and will contact you to confirm your demo. | وصلتنا بياناتك، وسنتواصل معك لتأكيد موعد العرض التجريبي. |
| demo:done.next[1] | We will walk you through Yawmy Care and answer your questions. | سنعرض لك يومي كير ونجيب عن أسئلتك. | | Then we will walk you through Yawmy Care and answer your questions. | ثم نعرض لك يومي كير ونجيب عن أسئلتك. |
| demo:error.title | Something went wrong | حدث خطأ ما | says nothing | Your request has not gone through | لم يصل طلبك بعد |
| demo:error.body | We couldn't send your request. Please check your connection and try again. | تعذّر إرسال طلبك. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى. | | We could not send your request. Check your connection and try again. | تعذّر إرسال طلبك. تحقّق من اتصالك بالإنترنت وحاول مرة أخرى. |
| demo:error.notConnected | This form is not connected yet. Please contact us on WhatsApp or by email. | هذا النموذج غير مفعّل بعد. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني. | "connected" is developer language | This form is not working yet. Please reach us on WhatsApp or by email instead. | هذا النموذج لا يعمل بعد. تواصل معنا على واتساب أو بالبريد بدلًا من ذلك. |
| demo:error.tooFast | That was very quick. Please check your details and try again. | تم الإرسال بسرعة غير معتادة. يرجى مراجعة بياناتك والمحاولة مرة أخرى. | sounds like a bot accusation | That went through very fast, so we paused it. Check your details and try once more. | تم الإرسال بسرعة كبيرة فأوقفناه. راجع بياناتك وحاول مرة أخرى. |
| demo:error.retry | Try again | حاول مرة أخرى | | Try again | أعد المحاولة |
| demo:step2.childrenOptions | 1-30, 31-80, 81-150, 150+ | same | Hyphen between digits can reorder in RTL; "150+" the plus can flip | KEEP (wrap each range in an LTR isolate, use an en dash) | KEEP |

---

## COPY-V2 evaluation (KEEP / IMPROVE, with exact replacement)

General: V2 has the right instinct (concrete, specific, short). Two systemic fixes: (1) its Arabic is **Egyptian colloquial** (بطّل، كام، لازم، بتضيع، ليه، أكتر). The site serves Saudi Arabia and the US too; recommended register is warm light-MSA, as below. (2) "20 messages" and "30 children" style numbers are illustrations that read as facts; V2 already dropped 30, drop 20 too.

| V2 line | Verdict | EN replacement | AR replacement |
|---|---|---|---|
| H1 "Stop running your nursery on WhatsApp and Excel." | KEEP EN (strong). IMPROVE AR (dialect) | KEEP. Positive alternative: "Run your nursery from one app, not WhatsApp and Excel." | أدِر حضانتك من تطبيق واحد، لا من واتساب وإكسل. |
| Sub "Attendance, daily reports, photos and parent chat in one app, in Arabic and English. Set up in under 20 minutes." | KEEP EN. IMPROVE AR ("شات") | KEEP | الحضور والتقارير اليومية والصور ومحادثات أولياء الأمور في تطبيق واحد، بالعربية والإنجليزية. جهّز حضانتك في أقل من 20 دقيقة. |
| CTA 1 "Book a free demo" | KEEP | KEEP | KEEP |
| CTA 2 "Chat on WhatsApp" | IMPROVE | Chat with us on WhatsApp | كلّمنا على واتساب |
| Under-CTA "Free for parents. The nursery pays one flat fee." | IMPROVE (EN lacks "monthly", AR has it; add the "always" promise strength only if the owner confirms) | Always free for parents. The nursery pays one flat monthly fee. | مجاني لأولياء الأمور دائمًا. والحضانة تدفع اشتراكًا شهريًا ثابتًا. |
| Switcher title "One app. Three people. Everyone in sync." | KEEP EN. IMPROVE AR ("على نفس الصفحة" is a calque of "on the same page") | One app. Three roles. Everyone in the picture. | تطبيق واحد. ثلاثة أدوار. والجميع في الصورة. |
| Owner "See your whole nursery at a glance / شوف حضانتك كلها في نظرة" | KEEP EN, IMPROVE AR (dialect) | KEEP | شاهد حضانتك كلها في نظرة واحدة |
| Teacher "Less paperwork, more time with the children / ورق أقل ووقت أكتر مع الأطفال" | KEEP EN, IMPROVE AR | KEEP | أوراق أقل ووقت أطول مع الأطفال |
| Parent "Know how your child's day went / اعرف يوم طفلك كان عامل إزاي" | KEEP EN, IMPROVE AR | KEEP | اعرف كيف كان يوم طفلك |
| Capability "Enrolment records" | KEEP only if a screen exists (V2's own rule) | KEEP / drop | KEEP / drop |
| Compare title "Why nurseries outgrow WhatsApp and paper" | IMPROVE (drops Excel, which the H1 names) | When WhatsApp, Excel and paper stop being enough | متى لا يعود واتساب وإكسل والورق كافيًا؟ |
| Row "Attendance: a notebook you have to find / one tap" | KEEP EN, IMPROVE AR | KEEP | الحضور: دفتر عليك أن تبحث عنه / نقرة واحدة |
| Row "Daily report: 20 messages / one report per child" | IMPROVE (invented number) | Daily report: the same update typed again and again / one report per child | التقرير اليومي: الرسالة نفسها تُكتب مرة بعد مرة / تقرير واحد لكل طفل |
| Row "Photos: lost in group chats / in each child's day" | KEEP EN, IMPROVE AR | KEEP | الصور: تضيع بين المجموعات / داخل يوم كل طفل |
| Row "Announcements: copy-paste to every group / one broadcast" | IMPROVE ("broadcast" is jargon) | Announcements: copied into every group / one announcement | الإعلانات: تُنسخ إلى كل مجموعة / إعلان واحد للجميع |
| Day heading "A day at your nursery, from open to close" | KEEP | KEEP | يوم في حضانتك، من الافتتاح حتى الإغلاق |
| How it works "Book a demo → We set you up → Invite teachers and parents" | IMPROVE: add the 4th, warm step; arrows must mirror in RTL | Book a demo, we set it up with you, invite your team and parents, start your first day | احجز عرضًا، نجهّزها معك، ادعُ فريقك وأولياء الأمور، وابدأ يومك الأول |
| Promises "Parents never pay · Your data stays yours · Arabic from day one" | KEEP the 3 (OK to cut from 5). Consider keeping "A real person replies within a day" as the warmest promise (owner decision) | Parents never pay · Your data stays yours · Arabic from day one | ولي الأمر لا يدفع أبدًا · بياناتك تبقى ملكك · بالعربية منذ اليوم الأول |
| Security "Encrypted in transit and at rest · Access by role" | IMPROVE wording | Encrypted when it travels and when it is stored · Access by role | مشفّرة أثناء النقل والتخزين · صلاحيات حسب الدور |
| Pricing "Simple pricing. Parents never pay. From {price} / month" | KEEP | KEEP | أسعار بسيطة. ولي الأمر لا يدفع أبدًا. ابتداءً من {السعر} / شهريًا |
| Final CTA "See Yawmy Care run your nursery. 20-minute demo." | IMPROVE ("run your nursery" over-promises; "demo 20 minutes" vs "set up in 20 minutes" confuses; see questions) | See your own nursery in Yawmy Care. A 20-minute demo, in Arabic or English. | شاهد حضانتك داخل يومي كير. عرض من 20 دقيقة، بالعربية أو الإنجليزية. |
| FAQ questions in Egyptian ("كام التكلفة؟", "لو عايزين نلغي؟", "نقدر نبطّل واتساب وإكسل؟") | IMPROVE: use light-MSA (see B13) | n/a | كم التكلفة؟ · ماذا يحدث لو ألغينا؟ · هل نستطيع التوقف عن استخدام واتساب وإكسل؟ |
| FAQ list drops "school nursery section" and "who can see our data" | IMPROVE: keep both (live pricing and security depend on them) | n/a | n/a |
| FAQ rule "first sentence = direct answer" | KEEP (and apply it to Q8, see B13) | | |
| Tone table | KEEP; update the dialect row (see voice guide) | | |

---

## (c) Voice guide (one page)

### Who we sound like
A calm, experienced friend who has sat in a lot of nurseries. Clear, specific, a little dry-funny, never salesy. We talk to **one person** ("you", "حضانتك"). We say what happens, not what the product "enables".

### Do / Don't

| Do | Don't |
|---|---|
| Short sentences, active verbs ("Parents check in at the gate") | "Leverage", "streamline", "solution", "platform", "operations", "workflow" |
| Name the real thing: attendance, nap, photo, midnight message | "Seamless", "all-in-one", "exceptional care", "smart" |
| Say what the button does ("Book a free demo") | "Submit", "Watch Demo", "Get started" with no object |
| One idea per sentence, one promise per card | Repeat the title inside the body; the same phrase in three sections |
| Contractions in English (we'll, can't), sentence case | Title Case on buttons and headings, exclamation marks, emoji |
| Errors that help ("That number does not look right. Use 8 to 15 digits") | "Please enter...", "Something went wrong", blaming the user |
| Same promise strength in both languages ("never" stays "أبدًا") | Stronger Arabic than English ("بأعلى درجات الموثوقية") |
| Arabic: simple MSA with warm verbs, active voice, short lines | Egyptian dialect in headings/FAQ, legal verbs ("نتقاضى"), "منصة متكاملة", literal calques |
| Treat the brand as masculine in Arabic ("يتعامل يومي كير") and keep it everywhere | Switch between "تتعامل" and "يتعامل" |
| Write numbers as Western digits; keep Latin names (WhatsApp as واتساب, Excel as إكسل, Yawmy Care in footer wordmark only) | Mix Arabic-Indic digits, or leave "WhatsApp" in Latin inside Arabic sentences |

Terms (fixed): room: فصل · parents: أولياء الأمور · nursery: الحضانة · teachers: المعلمات (owner to confirm, see questions) · demo: عرض تجريبي · subscription: اشتراك · tour: جولة · check-in: تسجيل الحضور · quiet hours: ساعات الهدوء.
Hygiene: use "they" or rephrase when a child or parent has no stated gender; quiet UK spelling throughout (nappies, immunisations, metres, organised).

### Ten before / after

| # | Before (EN) | After (EN) | Before (AR) | After (AR) |
|---|---|---|---|---|
| 1 | Nursery management software, built for the region. | Run your nursery from one app, not WhatsApp and Excel. | برنامج إدارة الحضانات، مصمم للمنطقة. | أدِر حضانتك من تطبيق واحد، لا من واتساب وإكسل. |
| 2 | Manage Smarter with Yawmy Care. | Every child's day, in one place. | أدر بذكاء مع يومي كير | يوم كل طفل، في مكان واحد. |
| 3 | Get Your Daily Care Ready | We set it up with you | كل شيء جاهز للبدء | نجهّزها معك |
| 4 | Watch Demo | Watch the 2-minute tour | شاهد العرض | شاهد جولة سريعة في دقيقتين |
| 5 | Your Data Is Safe. Your Focus Stays on Care. | Your data is protected, so you can focus on the children. | بياناتك بأمان، وتركيزك يبقى على الرعاية | بياناتك محمية، لتتفرغ للأطفال. |
| 6 | Five things we will not do to you | Five promises to every nursery | خمسة أشياء لن نفعلها معك | خمسة وعود لكل حضانة |
| 7 | Please enter a valid email address, like name@example.com. | That email does not look right. It should look like name@example.com. | يرجى إدخال بريد إلكتروني صحيح (مثل name@example.com). | يبدو أن البريد غير صحيح. يجب أن يكون مثل name@example.com. |
| 8 | Something went wrong | Your request has not gone through | حدث خطأ ما | لم يصل طلبك بعد |
| 9 | Thank you. You are all set | Thank you. We will be in touch. | شكرًا لك، تم كل شيء | شكرًا لك، سنتواصل معك. |
| 10 | Prefer a walkthrough? Book a demo | Prefer to see it first? Book a demo | تفضل عرضًا مباشرًا؟ احجز عرضًا تجريبيًا | تحب أن ترى التطبيق أولًا؟ احجز عرضًا تجريبيًا |

### Format and layout notes
- Length: keep AR hero H1 under about 55 characters, buttons under 28, card titles under 32 (AR card titles in B10 are shorter than the current ones). Re-check wraps at 375 px after the change.
- RTL: wrap `name@example.com`, `+20 100 000 0000`, and ranges like `1-30` in an LTR isolate (`<bdi>`/`dir="ltr"`). Keep "·" separators out of announced text (Setup band, COPY-V2 promises row); use separate elements.
- Hero emphasis markers (`*...*`): the recommended H1 marks 3 spans (nursery, WhatsApp, Excel), the same count as today.

---

## (d) Questions only the owner can answer

1. **Arabic register**: is the audience Egypt-first (then a light Egyptian touch in buttons is lovely) or pan-Arab including Saudi? I assumed pan-Arab: light-MSA everywhere, no dialect. COPY-V2's colloquial lines are rewritten on that assumption.
2. **Teachers**: do we write "المعلمات" (female, matches the Heliopolis quote and the product's "she") or keep "المعلمين"? Male teachers exist in international schools. Fallback: "فريق التدريس" or "المعلمين والمعلمات" only in the first mention.
3. **Check-in radius**: features and Day say a fixed 100 m; the Owner role says the owner sets the radius. Which is true? If it is a default, EN/AR should say "100 metres by default".
4. **Setup claim**: "Most nurseries are set up in under 20 minutes" implies a population of nurseries. Is it measured, or is it a design target? The recommended text says "setup takes under 20 minutes, with us on the call".
5. **20 minutes**: footer/V2 say the demo is 20 minutes and setup is under 20 minutes. Are both true, or should one number go?
6. **"Filed for good / searchable next year"**: are daily reports kept indefinitely? (OWNER-CLAIMS B.) The recommended text drops "for good" for now.
7. **"A real person replies in one working day"**: staffing exists? Also decide whether to keep it as one of the promises when cutting 5 to 3 (it is the warmest one).
8. **"First 10 keep their launch price for good and help shape what we build"**: is "shape" accurate, or do they actually vote/decide? The EN currently says "decide", the AR "take part".
9. **Founders**: the founders must approve the revised English and Arabic in B12; "Mr. Mohammed" has no surname; keep "Founders" or switch to "Our story"/"قصتنا"?
10. **Demo form**: should the email be work-only? (EN says "Work Email"; the recommended label is "Email address".) Do we need "Nursery or school name"?
11. **Proof strip** ("Nurseries already using Yawmy Care"): only show with real, approved logos. Until then keep it hidden in both languages.
12. **Tagline**: the recommended "Every child's day, in one place." — OK, or does the owner prefer to keep a "Manage smarter" idea?
13. **Brand gender in Arabic**: masculine ("يتعامل يومي كير") recommended; confirm.
14. **Exclamation marks**: the guide bans them; one exception allowed in the demo success state ("Thank you!")?
15. **Real quotes**: the Arabic translations of the three testimonials were agreed with the speakers. Is it fine to polish the Arabic wording of quotes 1 and 3, or must they stay as given?
16. **Tour video**: does the 2-minute tour exist yet? Until it does, keep the secondary CTA hidden or point to the demo.
