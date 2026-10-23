# FIX-LOG: Arabic (RTL) app screens

Date: 2026-10-23. Figma proposal file `lvSYX3lP0DsHX7SsRU2fP1`, new page **"App screens AR (RTL)"** (page id `20:2`). Original file `oSQUBKWEqG5XrY4sHCzjzy` was only read (screenshots/metadata), never written. No other page and no `src/` file was touched except the new folder `src/assets/product/ar/`.

These are **design mockups of capabilities that already exist in the English app designs**. The real product UI must be translated and RTL-implemented by the product team to match (the app has no Arabic or RTL frames; see `docs/research/app-coverage.md`).

## 1. New frames

| Frame | Node id | Source (original file) | Size |
|---|---|---|---|
| `AR/Owner Dashboard` | `23:2` | `1659:29977` | 1440 x 1144 |
| `AR/Parent Home` | `20:3` | `606:38038` | 375 x 1949 (source 1932) |
| `AR/Teacher Daily Logs` | `21:2` | `876:53138` | 375 x 1063 (source 1060) |
| `AR/Admin Home` | `22:2` | `598:106917` | 375 x 1338 (source 1286, stat cards are slightly taller) |

Not built (optional, time): announcements `3030:52047`, incident log `3023:48843`.

## 2. Exports (`src/assets/product/ar/`, PNG)

Crops match the existing English webp assets in `src/assets/product/` (same aspect, same region).

| File | Size | Crop |
|---|---|---|
| `dashboard-ar.png` | 1601 x 913 (EN: 1600 x 913) | "Daily Attendance" + "Recent Activity" only (the stat cards are cropped out, like EN). Sidebar excluded: it is on the right in RTL, so the crop is the left 1195 px. |
| `parent-ar.png` | 750 x 1624 (2x) | top 812 pt (header, week strip, attendance, start of schedule) |
| `teacher-ar.png` | 750 x 1624 (2x) | top 812 pt (title bar, child card, mood, meals, nap, ...) |
| `admin-ar.png` | 750 x 1402 (2x) | bottom 701 pt: "Daily Attendance" chart, "Recent Activity", tab bar |

Method: temporary clones were rescaled (2x; dashboard 1.34x) so Figma re-rendered vectors/text crisply, screenshotted, cropped with PIL, then the clones were deleted. Mobile 3x not produced.

## 3. RTL treatment

- Auto layout everywhere. Figma auto layout has no RTL switch, so every horizontal row is built with reversed child order (first logical item at the right); vertical stacks are right-aligned; all Arabic text is right-aligned.
- Mirrored: sidebar (now right), logo (right), header controls (left), back arrow (points right), week strip (Monday at right, dates run right to left), schedule timeline (time labels right, cards left, line and "now" marker mirrored), tab order (Home at right), check-out icon, chart (first day at the right, value axis on the right, bars ordered right to left), icon tile on activity cards (mobile at left, desktop at right, as mirrored from the originals), carousels (start at the right, next card peeks from the left), action bar (Save draft at right, Publish at left).
- Not mirrored (non-directional): bell, calendar, clock, chat, home, document, grid, pin, bookmark, smile icons; status bar (system chrome).
- Western digits everywhere; "Yawmy Care" kept LTR (left-aligned Latin text in the header logo); the language switcher reads "AR".
- Fonts: Readex Pro (stand-in for Expo Arabic), variable-bound fills from `Yawmy/Color` (surface, primary, stroke, ink, accent tokens). Text sizes follow the app (11 to 32 pt), so only raw font settings are used, not the landing-page `AR/*` text styles (their sizes are 14 to 58). Off-palette colours from the original stat cards (peach, pink, teal, yellow, purple icon discs) are raw hex.

## 4. What could not be rebuilt faithfully

- **Photos and illustrations** (child/staff avatars, media photos, event photos, welcome-banner character, the faint toy-blocks image on the teacher screen, GIF-style emoji/line icons) are clearly marked placeholders (flat fills, "صورة توضيحية" labels, generic avatar icon). Teacher-screen background blocks image omitted.
- **Icons** are simple generic line icons, not the original custom icon set (mood/meal/nap/diaper/activity/medication icons are approximated; Daily Log and News use the same document glyph).
- **Wave header** on the parent home is redrawn as a simple vector wave; logo mark is a simplified redraw (brand asset should replace it).
- Status bar is simplified (no real iOS component).
- Original `Quote`/instance-driven components (sessions, event cards) are rebuilt as plain frames, not linked components.
- Stat-card numbers: the original shows "20" on four cards; replaced by plausible clearly-sample values that are consistent between mobile and desktop: Checked in 18, Incident reports 3, Total children 24, Total teachers 6; New daycares 12 and New parents 30 are kept from the original. These are sample numbers, not business metrics, and are not visible in the exported crops.
- Chart data is the same six values as the original (13, 7, 18, 20, 16, 9).
- Original typo "11:00 PM" for the Story Time label was corrected to 11:00 AM (ص) to match its time range.
- Sample names: child "Kaylynn Arcand" -> «ليلى أحمد» (appears in the original), teacher "Ms. Maren Philips" -> «المعلمة مارين فيليبس», admin "Hanna Calzoni" -> «هنا كالزوني», room "Sunflower" -> «عباد الشمس». All are sample data, native review should confirm.

## 5. Translations for native review (EN -> AR)

### Parent Home (`20:3`)

| EN | AR |
|---|---|
| Kaylynn Arcand / Sunflower | ليلى أحمد / عباد الشمس |
| Mo Tu Wed Th Fr Sa Su | الاثنين الثلاثاء الأربعاء الخميس الجمعة السبت الأحد |
| Today's Attendance | حضور اليوم |
| View History | عرض السجل |
| Kaylynn is safely checked in at 08:12 AM. | تم تسجيل وصول ليلى بأمان الساعة 08:12 ص. |
| Check Out | تسجيل المغادرة |
| Today's Schedule | جدول اليوم |
| 09:00 AM / 10:00 AM / 11:00 PM(sic) / 11:30 AM | 09:00 ص / 10:00 ص / 11:00 ص / 11:30 ص |
| Music Session / Art Session / Story Time / Break | حصة الموسيقى / حصة الفن / وقت القصة / استراحة |
| 09:00 AM - 10:00 AM (etc.) | 09:00 ص - 10:00 ص (etc.; 11:30 ص - 12:00 م) |
| Ms. Maren Philips | المعلمة مارين فيليبس |
| Today Logs Preview | معاينة سجلات اليوم |
| See Details / See All | عرض التفاصيل / عرض الكل |
| Mood: Happy and active so far. | المزاج: سعيدة ونشيطة حتى الآن. |
| Nap: 1.5h nap. | القيلولة: ساعة ونصف. |
| Meals: Ate most of breakfast and lunch. | الوجبات: تناولت معظم الفطور والغداء. |
| Today's Media | وسائط اليوم |
| Latest Announcement | آخر إعلان |
| New Update from the Classroom | جديد من الفصل |
| Your child's class had a special activity today. Check out what the kids enjoyed and learned together! | كان لفصل طفلك نشاط مميز اليوم. تعرّف على ما استمتع به الأطفال وتعلّموه معًا! |
| Mar 30- 10:30 PM | 30 مارس - 10:30 م |
| Upcoming Events | الفعاليات القادمة |
| Holiday / Parent Meeting (chips) | عطلة / اجتماع أولياء الأمور |
| Art Day at the Nursery. | يوم الفن في الحضانة. |
| Children will enjoy painting and creative... | سيستمتع الأطفال بالرسم والأنشطة الإبداعية... |
| Progress Discussion Meeting. | اجتماع مناقشة التقدم. |
| Let's discuss your child's progress and dev... | لنناقش تقدم طفلك وتطوره... |
| At Nursery | في الحضانة |
| Home / Daily Log / News / Profile | الرئيسية / السجل اليومي / الأخبار / الملف الشخصي |

### Teacher Daily Logs (`21:2`)

| EN | AR |
|---|---|
| Daily Logs | السجلات اليومية |
| Kaylynn Arcand | ليلى أحمد |
| ID: 12345678 / Age: 3Years | الرقم التعريفي: 12345678 / العمر: 3 سنوات |
| Mood | المزاج |
| Happy / Upset / Playful / Feeling unwell | سعيد / منزعج / مرِح / لا يشعر بخير |
| Meals / Add Meal | الوجبات / إضافة وجبة |
| Nap / Add Nap | القيلولة / إضافة قيلولة |
| Diaper / Mark Diaper Change | الحفاض / تسجيل تغيير الحفاض |
| Activity / Add Activity | النشاط / إضافة نشاط |
| Medication / Add Medication | الأدوية / إضافة دواء |
| Save Draft / Publish | حفظ كمسودة / نشر |

### Admin Home (`22:2`)

| EN | AR |
|---|---|
| Hanna Calzoni / Nursery name | هنا كالزوني / اسم الحضانة |
| DailyOverview | نظرة عامة يومية |
| April, 5, 2026 | 5 أبريل 2026 |
| Checked In (20 Child) | تم تسجيل الحضور (18 طفلًا) |
| Incident Reports (20 Report) | تقارير الحوادث (3 تقارير) |
| Nursery Summary | ملخص الحضانة |
| New Daycares (12 Daycare) | حضانات جديدة (12 حضانة) |
| New Parents (30 Parent) | أولياء أمور جدد (30 ولي أمر) |
| Total Children (20 Child) | إجمالي الأطفال (24 طفلًا) |
| Total teachers (20 Teacher) | إجمالي المعلمات (6 معلمات) |
| Daily Attendance | الحضور اليومي |
| Sat Sun Mon Tue Wed Thu | السبت الأحد الاثنين الثلاثاء الأربعاء الخميس |
| Recent Activity | النشاط الأخير |
| Attendance Updated | تم تحديث الحضور |
| Today's attendance has been recorded for all classes. | تم تسجيل حضور اليوم لجميع الفصول. |
| New Parent Invitation Accepted | تم قبول دعوة ولي أمر جديد |
| A parent has joined and completed their onboarding process. | انضم ولي أمر وأكمل إجراءات التسجيل. |
| Staff Action Completed | اكتمل إجراء الموظفين |
| Today's class activities were updated in sunflower room by a teacher. | حدّثت إحدى المعلمات أنشطة اليوم في فصل عباد الشمس. |
| Home / Rooms / Enrollment / More | الرئيسية / الفصول / التسجيل / المزيد |

### Owner Dashboard (`23:2`)

| EN | AR |
|---|---|
| Dashboard / Rooms / Enrollment / Attendance / Incident Log / Announcements / Events / Data Export / Set Up / Log Out | لوحة التحكم / الفصول / التسجيل / الحضور / سجل الحوادث / الإعلانات / الفعاليات / تصدير البيانات / الإعداد / تسجيل الخروج |
| Good morning! | صباح الخير! |
| Here's what's happening at your nursery today. | إليك ما يحدث في حضانتك اليوم. |
| Overview | نظرة عامة |
| Get a quick overview of your nursery's performance and daily activity. | اطّلع على نظرة سريعة على أداء حضانتك ونشاطها اليومي. |
| Total Children / Total teachers / Checked In / Incident Reports | إجمالي الأطفال / إجمالي المعلمات / تم تسجيل الحضور / تقارير الحوادث |
| Daily Attendance | الحضور اليومي |
| Track today's attendance at a glance. | تابع حضور اليوم بنظرة سريعة. |
| Recent Activity | النشاط الأخير |
| Stay up to date with the latest nursery activities. | ابقَ على اطلاع بآخر أنشطة الحضانة. |
| (3 activity cards) | same strings as Admin Home |
| EN (language switcher) | AR |

Glossary used: حضانة, فصول, أولياء الأمور, المعلمة/المعلمات (feminine). Open points for the reviewer: «تسجيل» for "Enrollment" (could be «القيد»), «حصة» vs «نشاط» for "Session", «الحفاض» vs «الحفّاضات».
