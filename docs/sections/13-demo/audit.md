# 13 · Book a Demo modal — Audit

Source: Figma `oSQUBKWEqG5XrY4sHCzjzy`, EN `1326:4515`, AR `1437:4595` (old frames; the modal is not in the Updated Version).

## Frame
| Item | Value |
|---|---|
| Backdrop | `rgba(0,0,0,.6)` → `--color-overlay` |
| Modal | 767 wide, centred, `bg/whiteColor` (`surface`), radius 50 (`rounded-modal`), padding 32 / 24, content gap 32 |
| Header | gap 8. Title EN Recoleta Bold 24/1 `#333`; AR Expo Arabic Bold 32/32. Lead 16/1.5 `#535353` |
| Form | field gap 16, then 24 to the button |
| Field | label (EN Medium 16/1, AR Book 16) + 12 gap + input 48 high, 1px `#D8D8D8` (`stroke-gray`), radius 20, padding 8/12, icon 24 + 12 gap, placeholder EN Regular 14, AR Light 12, `#535353` |
| Date / Time row | two inputs 348 / 347 wide, ~24 gap; each repeats its icon (calendar / clock) at the inline end (picker affordance) |
| Submit | full width, 56 high, pill, `#76945C` (code: `primary-cta-strong`), EN Bold 18 "Book My Free Demo", no icon |

## Copy
| Slot | EN | AR (Figma) |
|---|---|---|
| Title | See YAWMY CARE in Action (brand written "Yawmy Care", DECISIONS #5) | اكتشف يومي كير |
| Lead | Discover how YAWMY CARE can simplify your nursery’s daily operations and keep your team and parents connected. | تعرّف على كيف يساعدك يومي كير في تبسيط عملياتك اليومية، والحفاظ على تواصل فريقك وأولياء الأمور بسهولة. |
| Name | Name / Enter your Name | الاسم / إدخل اسمك |
| Nursery | Nursery Name / Enter your Nursery Name | اسم المؤسسة / إدخل اسم المؤسسة |
| Email | Work Email / Enter your Work Email | البريد الالكتروني / ادخل البريد الالكتروني |
| Date | Preferred Date / Select Date | التاريخ المناسب / حدد التاريخ المناسب |
| Time | Preferred Time / Select time | الوقت المناسب / حدد الوقت المناسب |
| Submit | Book My Free Demo | احجز عرضًا تجريبيًا |

## RTL cues (AR frame)
- Everything right-aligned; leading icons on the right (inline start); date/time row order mirrored (date on the right).
- Trailing picker icons on the left (inline end).
- AR frame has no close button, no states, no validation copy.

## Gaps in the design (filled in code)
Close button, focus/hover/invalid/disabled states, success and error panels, validation messages, honeypot. Native `date`/`time` controls replace the "Select Date/Time" placeholder text (the native control shows `mm/dd/yyyy` / `--:-- --` instead), so those two Figma strings are not used.
