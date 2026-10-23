# Claims the owner must verify before launch

Each row is public copy that makes a factual promise. Wording is unchanged unless stated; EN and AR must change together. Source: `docs/reviews/security.md` section 4. Paths are under `src/i18n/sections/`.

## A. Reworded in this pass (softened to what the product team can stand behind)

| Key · file | Now says (EN / AR) | Verify this is true |
|---|---|---|
| `items[0].body` · `security.{en,ar}.json` | "Your data is encrypted in transit and at rest, and access is limited by role." / "بياناتك مشفّرة أثناء النقل وعند التخزين، والوصول إليها محدود حسب الأدوار." | Encryption in transit (TLS) and at rest is really enabled for the database, file storage and backups; access is enforced server-side by role. The old "nobody outside your nursery can read it, including us" is removed. |
| `items[6].answer` · `faq.{en,ar}.json` | "...Your data is encrypted in transit and at rest, and backed up daily." / "...بياناتك مشفّرة أثناء النقل وعند التخزين، ويُحتفظ بنسخة احتياطية منها كل يوم." | Same as above, plus daily backups (below). |
| `items[5].body` · `features.{en,ar}.json` | "One flat monthly fee, with no commission on tuition and no charges to parents." / "اشتراك شهري ثابت واحد، بلا عمولة على الرسوم الدراسية وبلا أي رسوم على أولياء الأمور." | "extra" removed (it implied parents pay a base fee). Confirm parents are never charged anything. |
| `lead` · `commitments.{en,ar}.json` | "Five promises we make to every nursery that joins Yawmy Care." / "خمسة وعود نقطعها لكل حضانة تنضم إلى يومي كير." | **Replace with the owner's text.** Figma had pasted the Security lead here; this is a placeholder sentence. |

## B. Kept as is, owner to confirm each is true

| Claim | Key · file | EN | AR | Verify this is true |
|---|---|---|---|---|
| Daily backup | `items[1]` · `security` | "Automatic. Nothing to remember, nothing to configure." (title "Backed up daily.") | "نسخ احتياطي تلقائي كل يوم. لا شيء تتذكره ولا شيء تضبطه." | Daily automatic backups exist, are encrypted and restore-tested; say where they are stored. |
| Role access | `items[2].body` · `security`; `items[6].answer` · `faq` | "A teacher sees only her own rooms. An admin cannot read private teacher and parent conversations." | "تشاهد المعلمة فصولها فقط. ولا تستطيع الإدارة قراءة المحادثات الخاصة بين المعلمين وأولياء الأمور." | Enforced at the API/database level (also for support staff and exports), with an access-control test. |
| Retention | `items[3].body` · `security` | "Incident reports for two years. Chat deleted automatically after six months." | "تُحفظ تقارير الحوادث لمدة سنتين، وتُحذف المحادثات تلقائيًا بعد ستة أشهر." | Retention jobs exist and match; two years is lawful for child-safety incident records. |
| Reports kept forever | `items[5].body` · `day` | "...Filed for good, searchable next year." (AR: "ويُحفظ التقرير إلى الأبد ويمكن البحث فيه في العام القادم.") | see left | Daily reports really are kept indefinitely (chat is deleted at 6 months, incident reports at 2 years). Otherwise soften. |
| Export, no permission | `cards.dataYours.body` · `commitments` | "Your data is yours. Export your records whenever you want, without asking us." | "بياناتك ملك لك. صدّر سجلاتك متى شئت دون الحاجة إلى إذن منا." | Self-service export exists at launch. FAQ item 7 is weaker ("we will help you take your records with you"): decide which is the real policy. |
| 90-day export then deletion | `cards.dataStays.body` · `commitments` | "If you leave, you leave with everything. 90 days to export, then permanent deletion." | "إذا قررت المغادرة، فستغادر ومعك كل شيء. لديك 90 يومًا لتصدير بياناتك، ثم تُحذف نهائيًا." | 90-day window is enforced; "permanent deletion" includes backups and logs within a stated period. |
| Cancellation terms up front | `items[7].answer` · `faq` | "...We share the cancellation terms with you up front, before you commit to anything." | "...ونوضّح لك شروط الإلغاء مسبقًا، قبل أن تلتزم بأي شيء." | Written cancellation terms exist and are shown before sign-up. |
| Never charge parents | `title` · `pricing`; `cards.charge.*` · `commitments`; `items[1].answer` · `faq`; `founders[1].paragraphs[2]` | "Simple pricing. We never charge parents." / "We never charge parents" | "أسعار بسيطة. ولن نتقاضى أي رسوم من أولياء الأمور أبدًا." / "لن نتقاضى رسومًا من أولياء الأمور أبدًا" | Binding public promise; no add-on, SMS, storage or per-child fee for parents, now or planned. Consider putting it in the terms. |
| Pricing list | `plan.items` · `pricing` | "Not per child, not per parent. No setup fee. No tuition commission. All features included. Unlimited parents and teachers." | "لا يُحتسب لكل طفل، ولا لكل ولي أمر. / بلا رسوم إعداد. / بلا عمولة على الرسوم الدراسية. / جميع المزايا مشمولة. / عدد غير محدود من أولياء الأمور والمعلمين." | Matches the real price list and contract. |
| Permanent launch price | `partner.body` · `pricing` | "The first 10 nurseries keep whatever launch price we set, permanently..." | "أول 10 حضانات تحتفظ بسعر الإطلاق الذي نحدده لها بصفة دائمة..." | A contractual commitment: define "permanent" and what happens if plans change. |
| Human reply in one working day | `cards.human.body` · `commitments` | "A human answers, in Arabic, within one working day." | "يردّ عليك إنسان، بالعربية، خلال يوم عمل واحد." | Staffing and SLA exist ("[X]" in Figma was a placeholder). |
| Setup in 20 minutes | `title` · `setup`; `items[2].answer` · `faq`; hero lead | "Set up your nursery in under 20 minutes" | "جهّز حضانتك في أقل من 20 دقيقة" | Measured on real onboardings. "No card, no commitment" (`band.title`) is true for the demo/trial. |
| 100 m check-in | `items[0].body` · `features`; `items[0].body` · `day` | "Parents check in within 100 metres." | "...وهو في نطاق 100 متر من الحضانة." | The geofence is 100 m and enforced. |
| Older Android | `items[9].answer` · `faq` | "...built to run on everyday phones, including older Android models." | "...بما فيها طرازات أندرويد القديمة." | A minimum Android version is defined and tested on low-end devices. |
| Other absolutes seen by SEO review (not edited) | `title` · `features`; `title`, `lead` · `testimonials` | "What no other nursery app in MENA has"; "...nurseries on three continents..." | "ما لا يقدّمه أي تطبيق حضانة آخر في المنطقة" | Provable comparison; the research really covered Egypt, the region and the US. |
| Free demo / 2-minute tour | `ctaPrimary`, `ctaWatch` · `hero` | "Book a free demo", "Watch the 2-minute tour" | "احجز عرضًا تجريبيًا مجانيًا", "شاهد جولة سريعة في دقيقتين" | The demo is free and the tour video exists. |

## C. People and sources

Testimonial attributions (owner, Maadi, 45 children; teacher, Heliopolis; admin, Sheikh Zayed) are real and agreed; founders approve all Arabic first-person text, names and the title "أ. محمد" (`founders[1].name`).
