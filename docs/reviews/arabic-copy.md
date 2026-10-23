# Arabic copy review, Yawmy Care landing page

Reviewer: Arabic copy editor / localisation pass (read-only; `src/` untouched).
Scope: `src/i18n/ar.json` + 13 `src/i18n/sections/*.ar.json`, read against the matching `*.en.json` and `docs/sections/*/arabic-review.md`.
Date: 2026-10-23.

**Strings reviewed: 227 translatable values** (243 JSON leaves minus 15 `id` slugs and the Latin `footer.wordmark`). No key is missing from AR; no AR value is left as English.

Severity: **H** = changes meaning, drops a legal/claim modality, or is a grammar/reference error. **M** = mistranslation-by-calque, terminology break, awkward or ambiguous, gender/register problem. **L** = polish, punctuation, SEO, consistency. No Critical (no wrong-negation or inverted meaning was found; the claim-sensitive risks are loss of "never"/"within").

Staleness note: several `arabic-review.md` files lag the JSON (hero lead, features items 2/3/5, setup `band.title`, FAQ items 0 and 8, demo `error.tooFast`). The JSON is treated as the source of truth here.

---

## 1. Glossary (decide once, apply everywhere)

| English | Recommended Arabic | Where used / inconsistent today |
|---|---|---|
| nursery | حضانة / حضانات | Consistent everywhere. "nursery section" = قسم الحضانة. "early-years" = مرحلة الطفولة المبكرة (FAQ[10] says "المرحلة المبكرة", too bare). |
| room / class / classroom | **فصل / فصول** | Split 3 ways: الصف/صفوف (day[1] title+body+alt, day summary.alt, security[2].body, FAQ[6]) vs فصول (FAQ[2], pricing school.body) . Use الفصل/فصول (Egyptian and Gulf both understand; avoids "grade" sense of صف). |
| parents | أولياء الأمور / ولي الأمر | Consistent. "الأهل" was already removed. Keep أسرة only for "families". |
| teacher(s) | المعلمة (generic singular, mirrors EN "her") / المعلمون (generic plural) | Testimonials use المعلمات only (excludes men); use "المعلمين والمعلمات" there. |
| admin | الإدارة (role in security/FAQ), إدارية (testimonial person) | Today "المدير" (security[2], FAQ[6]) = manager, not "admin role". |
| staff | الفريق / الموظفين | OK. |
| demo | عرض تجريبي | "عرضًا توضيحيًا" in setup.steps[0].body breaks it. "شاهد العرض" (owner verbatim) stays. |
| dashboard | لوحة تحكم | Only in `meta.description`. OK. |
| software / platform / app / product | برنامج (H1, SEO), تطبيق (what users open), منصة (only meta + owner-verbatim security/setup) | "المنتج" (footer.cta.lead, commitments.arabic.body) is a calque: use التطبيق. |
| flat monthly fee | **اشتراك شهري ثابت** (recommended) | Today "رسم شهري" ×7, "رسوم شهرية" ×1 (FAQ[1]). Singular "رسم" reads oddly in Egyptian Arabic and clashes with "رسوم" for tuition/setup. Owner to confirm (Q1). |
| tuition | الرسوم الدراسية | Consistent. (Egypt-only alternative: المصروفات.) |
| setup fee | رسوم إعداد | OK. |
| set up (verb) / setup (noun) | جهّز / التجهيز؛ الإعداد | Mixed تجهيز/إعداد/ابدأ. Acceptable: جهّز for the user action, الإعداد for the noun. Hero lead "ابدأ الاستخدام" should say جهّز. |
| tap | نقرة واحدة | day uses نقرة ×4; features[0].title uses لمسة. Use نقرة. |
| check-in (attendance) | تسجيل الحضور | OK. |
| photo gallery / album | ألبوم | day[2] says معرض (= exhibition). features already fixed to ألبوم. |
| WhatsApp group | مجموعة واتساب | day.summary says "مجموعة محادثة". |
| "Arabic from day one" | بالعربية منذ اليوم الأول | hero "من اليوم الأول", features "عربية من اليوم الأول", FAQ "منذ اليوم الأول". Use منذ + بالعربية. |
| never | أبدًا (always present on parent-fee claims) | Dropped in pricing.title, commitments.charge.title, FAQ[1].answer. |
| tour | جولة | OK. |
| addressing the reader | singular imperative (أدر، احجز، شاهد، ابقَ) | FAQ[7]–[10] switch to plural (قررتم، نساعدكم، أخبرونا، قوائمكم). Pricing school uses فصولكم. Use singular (فصولك، لك). |
| founders' titles | د. (Dr.), أ. (Mr., Egyptian-friendly) | founders name "السيد محمد" vs FAQ "الأستاذ محمد". |

Conventions I applied (and recommend freezing):
- Western digits everywhere (20, 100, 90, 10, 45, 7:30). Spelled numerals only where EN spells them (خمس عشرة دقيقة, اثنتا عشرة أسرة, ستة أشهر). Consistent, keep.
- Time: `7:30 ص` / `م` with NBSP inside `<bdi>`: correct. Keep.
- Quote marks: «» for in-copy quotes (features[3].body already does). Testimonial quotes use English curly “ ”; switch to «» (rows below).
- Arabic comma ، and ؟ are used correctly everywhere; no stray space before punctuation found. Colon ":" and ellipsis "…" fine.
- Brand: يومي كير in all running text; "Yawmy Care" Latin only in `footer.wordmark` (aria-hidden, logo). Never bare "يومي" (it also means "daily"): founders[1].paragraphs[1] breaks this.

---

## 2. Findings (recommended changes)

Format: `#` · severity · `file:key` · current AR · problem · recommended AR (paste-ready). File names are under `src/i18n/` (sections files under `src/i18n/sections/`).

### 2.1 Global meta / a11y (`ar.json`)

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 1 | M | ar.json:meta.title | يومي كير — منصة متكاملة لإدارة الحضانات الخاصة والمدارس الدولية | Does not match EN (software, built for the region); 70 chars, will truncate in SERP; main MENA query phrase is "برنامج إدارة الحضانات" | يومي كير — برنامج إدارة الحضانات بالعربية، مصمَّم للمنطقة |
| 2 | L | ar.json:meta.description | …تساعدك على تنظيم عملياتك اليومية، وتعزيز التواصل مع أولياء الأمور، وإدارة كل ما تحتاجه من خلال لوحة تحكم واحدة سهلة وواضحة. | ~190 chars (truncates at ~155); "من خلال" calque; no search phrases (تطبيق للحضانة, أولياء الأمور) | يومي كير برنامج متكامل لإدارة الحضانات الخاصة والمدارس الدولية بالعربية: تنظيم العمل اليومي، وتواصل أسهل مع أولياء الأمور، وكل شيء في لوحة تحكم واحدة وتطبيق واحد. |
| 3 | L | ar.json:a11y.opensInNewTab | (يفتح في علامة تبويب جديدة) | Active "it opens" reads oddly; shorter standard phrase | (يُفتح في تبويب جديد) |

### 2.2 Hero

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 4 | L | hero.ar.json:title | برنامج `*إدارة الحضانات*`، `*مصمَّم*` للمنطقة. `*بالعربية*` من اليوم الأول. | "من اليوم الأول" vs "منذ" used in FAQ; keep the three highlight markers as is | برنامج `*إدارة الحضانات*`، `*مصمَّم*` للمنطقة. `*بالعربية*` منذ اليوم الأول. |
| 5 | M | hero.ar.json:lead | …ابدأ الاستخدام في أقل من 20 دقيقة. | EN says "Set up in under 20 minutes" (setup), AR says "start using"; list has no closing verb | توقّف عن إدارة حضانتك عبر واتساب. التقارير اليومية والحضور ومحادثات أولياء الأمور والإعلانات، كلها في تطبيق واحد، بالعربية والإنجليزية. جهّز حضانتك في أقل من 20 دقيقة. |
| 6 | L | hero.ar.json:ctaWatch | شاهد الجولة في دقيقتين | "watch the tour in two minutes" can read as a time limit for the viewer; also fine for width | شاهد جولة سريعة في دقيقتين |

### 2.3 Day (A day at your nursery)

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 7 | L | day.ar.json:lead | حضانتك تعمل بنظام تعرفه جيدًا: مجموعة على واتساب. هذا هو اليوم نفسه، لكن بدونها. | Loses "already"; "على واتساب" clunky | لدى حضانتك نظام بالفعل، وهو مجموعة واتساب. وهذا هو اليوم نفسه، لكن من دونها. |
| 8 | L | day.ar.json:items[0].body | …من عند البوابة، ولا يعمل الزر إلا ضمن 100 متر… | "من عند", "ضمن" (within) calque; geofence claim should read "inside 100 m radius" | وصول الطفل. يسجّل ولي الأمر الحضور بنقرة واحدة وهو عند البوابة، ولا يعمل الزر إلا في نطاق 100 متر. بلا دفتر، ولا طابور، ولا جهاز لوحي. |
| 9 | M | day.ar.json:items[1].title | نظرة على الصف | Glossary: room = فصل | نظرة على الفصل |
| 10 | M | day.ar.json:items[1].body | الصف بنظرة واحدة. … | same | الفصل بنظرة واحدة. ترى المعلمة من حضر ومن تأخر ومن غاب، وتسجّل الحضور يدويًا بنقرة واحدة. |
| 11 | M | day.ar.json:items[1].alt | شاشة المعلمة تعرض قائمة حضور الصف وزر تسجيل الحضور | same | شاشة المعلمة تعرض قائمة حضور الفصل وزر تسجيل الحضور |
| 12 | H | day.ar.json:items[2].body | …تصل كل صورة إلى معرض طفلها وحده، لا إلى مجموعة تبحث فيها اثنتا عشرة أسرة عن صورة طفلها. | "معرض" = exhibition (already fixed to ألبوم in Features); "طفلها" right after "كل صورة" points at the photo, not the child | كل صورة في ألبومها الصحيح. تصل كل صورة إلى ألبوم الطفل نفسه فقط، لا إلى مجموعة تبحث فيها اثنتا عشرة أسرة عن صورة طفلها. |
| 13 | M | day.ar.json:items[2].alt | شاشة معرض الوسائط تعرض صور الطفل خلال اليوم | same "معرض" | شاشة ألبوم الصور تعرض صور الطفل خلال اليوم |
| 14 | L | day.ar.json:items[5].body | …ويُحفظ التقرير للأبد ويمكن البحث فيه العام القادم. | "للأبد" colloquial (إلى الأبد); retention claim vs Security (chats 6 months, incident reports 2 years): see Q6 | بنقرة واحدة يُرسَل اليوم كله. يصل إلى كل ولي أمر إشعار بلغته، ويُحفظ التقرير إلى الأبد ويمكن البحث فيه في العام القادم. |
| 15 | L | day.ar.json:items[6].title | تواصل مستمر | EN is imperative "Stay connected"; brief voice (ابقَ) | ابقَ على تواصل |
| 16 | L | day.ar.json:items[6].body | …وتبقى كل التحديثات في المحادثة نفسها. | "تبقى" twice in 3 clauses | تبقى المحادثة في مكان واحد. يراسل أولياء الأمور الحضانة مباشرة، ويتابعون يوم أطفالهم، وتجتمع كل التحديثات في المحادثة نفسها. |
| 17 | L | day.ar.json:summary.body | لا شيء يضيع في مجموعة محادثة. ولا شيء يُكتب مرتين. ولا شيء يصل عند منتصف الليل. | "مجموعة محادثة" = glossary; "عند منتصف" → "في منتصف" | لا شيء يضيع في مجموعة واتساب. ولا شيء يُكتب مرتين. ولا شيء يصل في منتصف الليل. |
| 18 | M | day.ar.json:summary.alt | إعلانات وتحديث من الصف ونظرة على الحضور فوق تطبيق يومي كير | glossary (الصف) | إعلانات وتحديث من الفصل ونظرة على الحضور فوق تطبيق يومي كير |

### 2.4 Demo form (`demo.ar.json`)

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 19 | L | demo.ar.json:lead | تعرّف على كيف يساعدك يومي كير في تبسيط… | Owner verbatim, but "على كيف" is ungrammatical (needs كيفية + masdar). Owner may veto | تعرّف على كيفية مساعدة يومي كير لك في تبسيط عملياتك اليومية، والحفاظ على تواصل فريقك وأولياء الأمور بسهولة. |
| 20 | L | demo.ar.json:fields.email.invalid | يرجى إدخال بريد إلكتروني صحيح، مثل name@example.com. | Bidi: sentence ends with a Latin token + full stop; the dot can detach visually | يرجى إدخال بريد إلكتروني صحيح (مثل name@example.com). , render the example inside `<bdi>`/`dir="ltr"` |
| 21 | M | demo.ar.json:summary | يرجى تصحيح الحقول المحددة ثم المحاولة مرة أخرى. | "المحددة" = specified/selected; EN means highlighted/marked | يرجى تصحيح الحقول المميّزة ثم المحاولة مرة أخرى. |
| 22 | L | demo.ar.json:fields.time.past | هذا الوقت مضى بالفعل اليوم، يرجى اختيار وقت لاحق. | comma splice (two sentences) | مضى هذا الوقت بالفعل اليوم. يرجى اختيار وقت لاحق. |
| 23 | L | demo.ar.json:error.tooFast | كان ذلك سريعًا جدًا. يرجى مراجعة بياناتك والمحاولة مرة أخرى. | Literal "That was very quick" reads as small talk | تم الإرسال بسرعة غير معتادة. يرجى مراجعة بياناتك والمحاولة مرة أخرى. |

### 2.5 FAQ

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 24 | M | faq.ar.json:items[0].answer | يقوم يومي كير على رسم شهري ثابت تدفعه الحضانة… | "يقوم على" stiff; fee wording (Q1) | يومي كير باشتراك شهري ثابت واحد تدفعه الحضانة. احجز عرضًا تجريبيًا وسنشرح لك التفاصيل. |
| 25 | H | faq.ar.json:items[1].answer | لا. أولياء الأمور لا يدفعون أي شيء. تدفع الحضانة الرسوم الشهرية الثابتة… | EN "Parents **never** pay anything": "أبدًا" dropped on a legal claim; present tense reads as a description, not a promise | لا. لن يدفع أولياء الأمور أي شيء أبدًا. تدفع الحضانة الاشتراك الشهري الثابت، ويستخدم أولياء الأمور التطبيق مجانًا. |
| 26 | M | faq.ar.json:items[6].answer | الوصول يكون حسب الدور. تشاهد المعلمة صفوفها فقط، ولا يستطيع المدير… بياناتك مشفّرة ويُؤخذ لها نسخ احتياطي يوميًا… | صفوف→فصول; المدير→الإدارة; "يُؤخذ لها نسخ" clumsy passive | يعتمد الوصول على الدور. تشاهد المعلمة فصولها فقط، ولا تستطيع الإدارة قراءة المحادثات الخاصة بين المعلمين وأولياء الأمور. بياناتك مشفّرة ويُحتفظ بنسخة احتياطية منها كل يوم، ولا يستطيع أحد خارج حضانتك قراءتها، حتى نحن. |
| 27 | M | faq.ar.json:items[7].answer | …إذا قررتم التوقف، سنساعدكم على أخذ سجلاتكم معكم. ونوضح لكم… قبل أن تلتزموا… | Switches from singular (بياناتك) to plural mid-answer | بياناتك ملك لحضانتك. إذا قررت التوقف، سنساعدك على أخذ سجلاتك معك. ونوضّح لك شروط الإلغاء مسبقًا، قبل أن تلتزم بأي شيء. |
| 28 | M | faq.ar.json:items[8].answer | نعم، وهذا ما تبدأ به معظم الحضانات… نساعدكم على نقل قوائمكم… | "هذا ما تبدأ به" ambiguous (EN: that is where most start); plural address | نعم، وهذه نقطة البداية لدى معظم الحضانات. الحضور والتحديثات اليومية ورسائل أولياء الأمور كلها في مكان واحد، ونساعدك على نقل قوائمك الحالية أثناء الإعداد. |
| 29 | M | faq.ar.json:items[9].answer | صُمم يومي كير ليعمل على الهواتف المتداولة… وإن لم تكونوا متأكدين… أخبرونا… معكم | "المتداولة" = circulating (currency sense); EN "everyday"; plural address | صُمم يومي كير ليعمل على الهواتف الشائعة، بما فيها طرازات أندرويد القديمة. وإن لم تكن متأكدًا من جهاز بعينه، أخبرنا أثناء العرض التجريبي وسنتحقق معك. |
| 30 | M | faq.ar.json:items[10].answer | …ومنها قسم الحضانة أو المرحلة المبكرة داخل المدرسة. تحدّث معنا وسنريك كيف يناسب نظامكم. | "المرحلة المبكرة" incomplete; "نظامكم" for "your setup" + plural | نعم. صُمم يومي كير للحضانات الخاصة والمدارس الدولية، ومنها قسم الحضانة أو مرحلة الطفولة المبكرة داخل المدرسة. تحدّث معنا وسنريك كيف يناسب طريقة عملك. |
| 31 | M | faq.ar.json:items[11].answer | …الدكتورة رنا مصطفى والأستاذ محمد، بالتعاون مع الحضانات التي تحدثا إليها في رحلتهما. وتجد قصتهما… | Title mismatch with founders (السيد محمد); "في رحلتهما" calque of "along the way" | يقف وراء يومي كير الدكتورة رنا مصطفى والأستاذ محمد، بالتعاون مع الحضانات التي تحدثا إليها خلال رحلتهما. وتجد قصتهما في قسم المؤسسين أعلاه. |
| 32 | L | faq.ar.json:items[12].answer | …نبدأ بتجهيز الحضانات في مصر أولًا، وستتبعها دول أخرى. | "نبدأ بتجهيز…أولًا" double "begin/first"; | نعم. يعمل التطبيق في أي مكان في المنطقة، بالعربية والإنجليزية. نبدأ بالحضانات في مصر أولًا، وستلحق بها دول أخرى. |

### 2.6 Features

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 33 | L | features.ar.json:items[0].title | تسجيل حضور بلمسة | "tap" = نقرة elsewhere | تسجيل الحضور بنقرة واحدة |
| 34 | M | features.ar.json:items[0].body | يسجّل ولي الأمر الحضور وهو على بُعد 100 متر… | EN "within 100 metres" (up to); AR says "at a distance of 100 m" (exactly). Day section says "ضمن" | يسجّل ولي الأمر الحضور وهو في نطاق 100 متر من الحضانة. بلا رمز سري، ولا رمز QR، ولا جهاز لوحي عند الباب. |
| 35 | M | features.ar.json:items[3].title | أمسيات المعلمين تعود إليهم | Calque; "أمسيات" suggests events/soirées. Short and natural alternative | المعلمون يستعيدون أمسياتهم |
| 36 | M | features.ar.json:items[3].body | يرى أولياء الأمور أنهم يراسلون خارج ساعات الحضانة، قبل أن يضغطوا على «إرسال». | "يرون أنهم" = "see that they" is clumsy; who is being messaged (teachers) lost | يعرف أولياء الأمور متى يراسلون المعلمين خارج ساعات الحضانة، قبل أن يضغطوا على «إرسال». |
| 37 | L | features.ar.json:items[4].title | عربية من اليوم الأول | bare "عربية" ambiguous; glossary | بالعربية منذ اليوم الأول |
| 38 | L | features.ar.json:items[4].body | اتجاه كامل من اليمين إلى اليسار، وإشعارات ودعم بالعربية… | "support" ambiguous; commitments says "دعم فني" | دعم كامل للكتابة من اليمين إلى اليسار، وإشعارات ودعم فني بالعربية. وكل شخص يختار لغته. |
| 39 | H | features.ar.json:items[5].body | …وبلا أي رسوم إضافية على أولياء الأمور. | "extra" (in EN too) implies parents pay a base fee, contradicting "never charge parents" | اشتراك شهري ثابت واحد، بلا عمولة على الرسوم الدراسية وبلا أي رسوم على أولياء الأمور. (Also fix EN, see Q2.) |

### 2.7 Footer

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 40 | M | footer.ar.json:cta.lead | خمس عشرة دقيقة عبر مكالمة، بالعربية أو الإنجليزية. سنعرض لك حضانتك أنت داخل المنتج. | "داخل المنتج" calque of "in the product"; "عبر مكالمة" | خمس عشرة دقيقة في مكالمة، بالعربية أو الإنجليزية. سنعرض لك حضانتك أنت داخل التطبيق. |
| 41 | L | footer.ar.json:navLabel | التذييل | Screen-reader name; "التذييل" alone is jargon | تذييل الصفحة |

### 2.8 Founders (first-person; founders must approve, Q8)

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 42 | L | founders.ar.json:title | لماذا بنينا هذا؟ | "هذا" has no antecedent in Arabic | لماذا بنينا يومي كير؟ |
| 43 | L | founders.ar.json:founders[0].paragraphs[0] | …بدأنا نرى الثغرات بأنفسنا. | "ثغرات" also means loopholes / security vulnerabilities | بعد سنوات من العيش خارج مصر، عدنا وسجّلنا أطفالنا في حضانات محلية. وعندها بدأنا نرى الفجوات بأعيننا. |
| 44 | L | founders.ar.json:founders[0].paragraphs[2] | …في الطريقة التي يرتبط بها كل شيء ببعضه. | "ببعضه" colloquial | أدركنا أن المشكلة لم تكن في الرعاية، بل في الطريقة التي يرتبط بها كل شيء ببعض. |
| 45 | M | founders.ar.json:founders[1].name | السيد محمد | Register: FAQ uses الأستاذ; "السيد" stiff for Egypt; parallel to "د. رنا" | أ. محمد |
| 46 | M | founders.ar.json:founders[1].photoAlt | صورة شخصية للسيد محمد | same | صورة شخصية للأستاذ محمد |
| 47 | M | founders.ar.json:founders[1].paragraphs[1] | واليوم، يجمع يومي الحضانة والمعلمين… | Bare "يومي" = "daily": reads "the daily gathers the nursery…" | واليوم، يجمع يومي كير الحضانة والمعلمين وأولياء الأمور في مساحة واحدة منظّمة، فيصبح تنظيم اليوم والبقاء على تواصل أسهل. |

### 2.9 Pricing

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 48 | H | pricing.ar.json:title | أسعار بسيطة. لا نتقاضى أي رسوم من أولياء الأمور. | EN "We **never** charge parents": AR is a plain present negative; commitments uses "لن … أبدًا" | أسعار بسيطة. ولن نتقاضى أي رسوم من أولياء الأمور أبدًا. |
| 49 | M | pricing.ar.json:plan.title | رسم شهري ثابت واحد، تدفعه الحضانة | Glossary (Q1) | اشتراك شهري ثابت واحد، تدفعه الحضانة |
| 50 | M | pricing.ar.json:plan.itemsLabel | ما يشمله الرسم الشهري | Glossary | ما يشمله الاشتراك الشهري |
| 51 | M | pricing.ar.json:plan.items[0] | ليس لكل طفل ولا لكل ولي أمر. | Ambiguous ("not for every child"); EN "not per child" | لا يُحتسب لكل طفل، ولا لكل ولي أمر. |
| 52 | M | pricing.ar.json:school.body | تواصل معنا. نسعّر بما يناسب فصولكم. | Plural address; "بما يناسب" loses "around your rooms" | تواصل معنا. نسعّر بحسب فصولك. |
| 53 | L | pricing.ar.json:partner.title[3].text | ما هو قادم. | Calque of "what comes next"; the em-segment must stay a clean noun phrase | القادم. (full title reads: كن ضمن أول **10 حضانات**. شارك في صنع **القادم.**) |
| 54 | M | pricing.ar.json:partner.body | أول 10 حضانات تحتفظ بسعر الإطلاق الذي نحدده بشكل دائم… نحن في البداية، وهذا تحديدًا… | "بشكل دائم" calque and misplaced (attaches to "نحدده"); "نحن في البداية" odd; claim = permanent price lock | أول 10 حضانات تحتفظ بسعر الإطلاق الذي نحدده لها بصفة دائمة، وتشارك في تقرير ما سنبنيه لاحقًا. نحن في بداية الطريق، وهذا بالتحديد ما يجعل الانضمام الآن يستحق العناء. |
| 55 | L | pricing.ar.json:partner.cta | كن أول شريك | "the first partner" = only one; EN also, but the promise is the first 10 | كن من أوائل الشركاء |

### 2.10 Security

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 56 | M | security.ar.json:items[2].body | تشاهد المعلمة صفوفها فقط. ولا يستطيع المدير… | صفوف→فصول; المدير→الإدارة | تشاهد المعلمة فصولها فقط. ولا تستطيع الإدارة قراءة المحادثات الخاصة بين المعلمين وأولياء الأمور. |
| 57 | M | security.ar.json:items[3].title | نحتفظ بها للمدة اللازمة فقط | "بها" has no antecedent in the card | نحتفظ بالبيانات للمدة اللازمة فقط |
| 58 | M | security.ar.json:items[3].body | تقارير الحوادث لمدة سنتين. وتُحذف المحادثات تلقائيًا بعد ستة أشهر. | Verbless first clause leaves "kept" implicit; retention claim should be literal | تُحفظ تقارير الحوادث لمدة سنتين، وتُحذف المحادثات تلقائيًا بعد ستة أشهر. |

### 2.11 Setup

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 59 | L | setup.ar.json:lead | …خلال مكالمة واحدة، وتتم إضافة الأطفال ودعوة فريقك في اليوم نفسه. | "تتم إضافة" = "يتم" calque; adds "واحدة" | نُجهّز كل شيء معك في مكالمة، وتضيف الأطفال وتدعو فريقك في اليوم نفسه. |
| 60 | M | setup.ar.json:steps[0].body | احجز عرضًا توضيحيًا مجانيًا… | Glossary: demo = عرض تجريبي (owner text used توضيحي; the CTA is تجريبي) | احجز عرضًا تجريبيًا مجانيًا وتعرّف على كيفية توافق يومي كير مع احتياجات حضانتك اليومية، وتبسيط إدارتها من خلال منصة واحدة متكاملة. |
| 61 | M | setup.ar.json:steps[2].title | اجمع الجميع في مكان واحد | Near-duplicate of steps[3].title ("…في مكان واحد"); EN is "Bring Everyone Together" | اجمع الجميع معًا |
| 62 | L | setup.ar.json:steps[2].body | …من خلال منصة واحدة متكاملة. | "منصة واحدة متكاملة" appears 4× in this section (steps 0, 2, 3, band.lead) plus meta: filler | ادعُ المعلمين والموظفين، واجعل الجميع على تواصل في مكان واحد. |
| 63 | L | setup.ar.json:steps[3].body | …بسهولة، من خلال منصة واحدة متكاملة. | same | أدر الحضور والتواصل والعمليات اليومية بسهولة، وكلها في تطبيق واحد. |

### 2.12 Commitments

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 64 | M | commitments.ar.json:lead | صُممت منصة يومي كير مع وضع الأمان في مقدمة أولوياتها… | Identical to security.lead (EN is a copy-paste); says nothing about "five things we will not do". Source problem, see Q3. Interim AR if EN changes to "Five promises we keep" | خمسة وعود نلتزم بها تجاه حضانتك وتجاه أولياء الأمور، مهما تغيّر أي شيء آخر. |
| 65 | H | commitments.ar.json:cards.charge.title | لا رسوم على أولياء الأمور | EN "We **never** charge parents": modality dropped on the flagship legal claim | لن نتقاضى رسومًا من أولياء الأمور أبدًا |
| 66 | M | commitments.ar.json:cards.charge.body | …رسم شهري ثابت واحد تدفعه الحضانة، وبلا أي عمولة… | Glossary; "وبلا" awkward after the comma; AR added "monthly" (fine) | لن نتقاضى أي رسوم من أولياء الأمور أبدًا. اشتراك شهري ثابت واحد تدفعه الحضانة، وبلا عمولة على الرسوم الدراسية. |
| 67 | L | commitments.ar.json:cards.arabic.body | العربية عندنا ليست طبقة ترجمة فوق المنتج. … | "طبقة ترجمة" calque, "المنتج" | العربية عندنا ليست ترجمة تُضاف فوق التطبيق. دعم كامل للكتابة من اليمين إلى اليسار، وإشعارات بالعربية، ودعم فني بالعربية. |
| 68 | M | commitments.ar.json:cards.human.title | يمكنك التحدث إلى إنسان | "إنسان" is a literal "human"; not what a customer says | يمكنك التحدث إلى شخص حقيقي |
| 69 | L | commitments.ar.json:cards.human.body | يرد عليك شخص حقيقي، باللغة العربية، خلال يوم عمل واحد. | Repeats the new title word; SLA unconfirmed (Q5) | يردّ عليك إنسان، بالعربية، خلال يوم عمل واحد. |

### 2.13 Testimonials

| # | Sev | file:key | Current AR | Problem | Recommended AR |
|---|---|---|---|---|---|
| 70 | M | testimonials.ar.json:lead | جلسنا مع أصحاب الحضانات والمعلمات وأولياء الأمور… وفي المنطقة وفي الولايات المتحدة… ولم يخرج من قائمة مزايا. | "المعلمات" only (EN "teachers"); "في المنطقة" for "across the wider region"; clumsy last clause | جلسنا مع أصحاب الحضانات والمعلمين والمعلمات وأولياء الأمور في حضانات داخل مصر وفي أنحاء المنطقة وفي الولايات المتحدة. كل ما تراه في هذه الصفحة خرج من تلك المحادثات، لا من قائمة مزايا. |
| 71 | L | testimonials.ar.json:label | ماذا يقول أصحاب الحضانات والمعلمات وأولياء الأمور | same gender point | ماذا يقول أصحاب الحضانات والمعلمون والمعلمات وأولياء الأمور |
| 72 | L | testimonials.ar.json:items[0].quote | “هاتفي هو نظام الأرشفة في الحضانة. لو ضاع مني، ضاع كل شيء.” | Curly English quotes; use «» | «هاتفي هو نظام الأرشفة في الحضانة. لو ضاع مني، ضاع كل شيء.» |
| 73 | M | testimonials.ar.json:items[1].quote | “أكتب تقرير اليوم نفسه مرتين…” | "تقرير اليوم نفسه" reads "the report of the day itself"; EN = the same daily report | «أكتب التقرير اليومي نفسه مرتين: مرة على الورق ومرة على واتساب.» |
| 74 | L | testimonials.ar.json:items[2].quote | “يراسلني أولياء الأمور في منتصف الليل…” | quotes only | «يراسلني أولياء الأمور في منتصف الليل وأرد عليهم، لأنني لو لم أفعل ظنوا أن هناك مشكلة.» |

---

## 3. Approved as good

Of 227 strings reviewed, **153 are approved unchanged** (227 minus the 74 rows above). They include: all owner-verbatim nav, hero-CTA and footer-title strings (الرئيسية, لماذا يومي كير, أدر بذكاء مع يومي كير, احجز عرضًا تجريبيًا, شاهد العرض, ابدأ إدارة أكثر ذكاءً مع يومي كير), all social/a11y labels except #3, the demo field labels/placeholders/required messages (with the "work email" and "المؤسسة" questions in section 4), the commitments `dataYours`/`dataStays` cards, the Security `title`/`lead`/`imageAlt` and the first two items, the setup `title`, `steps[1]`, `steps[3].title`, `band.*`, FAQ items 2–5, the founders' commitment sentence (`founders[1].paragraphs[2]`: "لن نفعله أبدًا", correct and literal), numeral agreement (خمسة أشياء, اثنتا عشرة أسرة, 90 يومًا, 45 طفلًا, سنتين, خمس عشرة دقيقة all correct), guillemets in features, ص/م times, and punctuation.

Verified correct (no change): "جارٍ الإرسال…" (tanween on the defective participle), "ادعُ", "تحدثا" (dual), "ذكاءً", hamza in "الإلكتروني" site-wide, bdi wrapping of times and attributions.

---

## 4. Questions only a native owner can settle

1. **Fee noun.** "اشتراك شهري ثابت" (recommended, SaaS-natural) vs the current "رسم شهري ثابت". Whichever you choose, apply to features[5], pricing ×2, commitments.charge.body, FAQ[0], FAQ[1] together. Keep "رسوم" for setup fee and tuition.
2. **"No extra parent charges"** (EN `features.items[5].body`): is "extra" intentional? It implies parents pay a base amount. Recommend EN "no charges to parents" and the AR in row 39.
3. **Commitments lead** is a verbatim copy of the Security lead in both languages and does not introduce "five things we will not do". Provide a real lead (interim AR in row 64), and note the five cards are phrased as promises, not as "things we will not do".
4. **Nav label for Security.** Owner's old frame says "مبني على الثقة"; the build now uses "الأمان" (matches footer). Which wins? "مبني على الثقة" is warmer but vaguer in a nav bar.
5. **Human reply time.** "within one working day" was `[X]` in Figma; AR repeats the placeholder value. Confirm the SLA before launch.
6. **Retention claims.** Daily reports are "filed for good" (day.items[5]) while chats are deleted at 6 months and incident reports at 2 years (Security). Confirm daily-report retention is truly indefinite, otherwise soften EN and AR. Also FAQ[7] ("we will help you take your records") is weaker than commitments.dataYours ("export whenever you want, without asking us"): which is the real policy?
7. **Fasl vs saff.** Confirm "فصول" for rooms/classes (my pick) vs "صفوف" or "قاعات" for your market; applies to ~7 strings.
8. **Founders' voice.** Both founders must approve all 11 strings (first-person promises, names). Confirm "د. رنا مصطفى" spelling, whether Mr. Mohammed prefers "أ. محمد" or a full name, and that "المؤسسون" (mixed-gender masculine plural) is acceptable.
9. **Testimonials.** Are the speakers real, and what gender are the owner (صاحب/صاحبة حضانة), teacher (معلمة) and admin (إدارية)? Drafted as masculine, feminine, feminine.
10. **Address form.** Owner's voice is singular masculine imperative (أدر, احجز). Keep singular masculine for a mixed audience, or add feminine variants where a woman owner is expected? (Current plan: keep singular masculine; plural only in FAQ[7]–[10], which I recommend normalising.)
11. **Demo form.** (a) Submit says "احجز عرضًا تجريبيًا" while EN says "Book My Free Demo": add "مجانيًا"? (b) Email label is "البريد الإلكتروني" while EN is "Work Email": add "للعمل"? (c) Field "اسم المؤسسة" vs EN "Nursery Name": keep "المؤسسة" because international-school sections also apply?
12. **Digits and time.** Western digits are used site-wide; confirm no Arabic-Indic digits wanted for Egypt/Gulf (all numerals live in strings, so it is a one-pass change).
13. **Brand wordmark.** Footer wordmark is Latin "Yawmy Care" while all copy says "يومي كير": is a bilingual logo lock-up intended?
14. **Hero "مصمَّم للمنطقة".** Keep "للمنطقة" (shorter, as in features) or the warmer "لمنطقتنا"?
15. **"التزاماتنا".** Fine as a literal "Our commitments", but "تعهداتنا" is warmer for a promise page. Owner preference.
