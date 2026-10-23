# 11 FAQ: review 2 (real page)

**Verdict: PASS with notes.** Rows 72px at 1440 (Figma 72), 24 gap, badge 40, EN + AR mirrored (badge on the right in AR, plus/minus on the left). 375: rows wrap, nothing clipped. `astro check` 0 errors. Exactly one `FAQPage` JSON-LD in `/en/` and `/ar/` (13 questions).

| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | 13 `role="region"` panels flooded the landmark list | Removed `role` and the (then invalid) `aria-labelledby`; `aria-expanded` / `aria-controls` stay | landmark dump before/after |
| 2 | ok | Keyboard (CDP key events): Enter and Space toggle, ArrowDown/Up/Home/End move between questions, closed answers are `visibility:hidden` (not tabbable) | none | scripted run |
| 3 | nit | AR Q1 answer had no verb; Q9 "التوقف عن استخدام واتساب وإكسل" stiff | "يقوم يومي كير على رسم شهري ثابت..." and "هل نستطيع الاستغناء عن واتساب وإكسل؟" (flag for native review) | `faq.ar.json` |
| 4 | nit | Latin digits in AR badges | kept (consistent with the rest of the Arabic copy) | n/a |

Remaining (owner): confirm drafted answers (list in `review.md`). Reduced motion: the transition only exists under `no-preference` (CSS).
