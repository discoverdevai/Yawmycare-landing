# Fix log: copy stream (FIX-PLAN items 4 and 5)

Scope: `src/i18n/**` except `en.json` meta. Scripts: `docs/tools/apply-copy-fixes.mjs` (the edits, idempotent), `check-i18n-parity.mjs`, `gen-arabic-review.mjs`.

## Strings changed (78 values)
| File | Changed |
|---|---|
| ar.json (meta 2, a11y 1) | 3 |
| hero.ar | 3 |
| day.ar | 12 |
| demo.ar | 5 |
| faq.ar | 9 (+ faq.en 1) |
| features.ar | 7 (+ features.en 1) |
| footer.ar | 4 |
| founders.ar | 6 |
| pricing.ar | 9 |
| security.ar | 4 (+ security.en 1) |
| setup.ar | 1 |
| commitments.ar | 6 (+ commitments.en 1) |
| testimonials.ar | 5 |

Header AR untouched (already matches). EN changes: security item 0, FAQ 6, features item 5, commitments lead.

## What was applied
- Review rows 1-3, 4-6 (hero title without tashkeel per SEO), 7-18, 19-23, 24-32, 33-39, 40-41, 42-47, 48-55, 56-58, 59, 64-69, 70-74.
- Parent-fee promise restored with "أبدًا": `pricing.title`, `commitments.cards.charge.{title,body}`, `faq.items[1].answer`. `features.items[5].body` EN + AR no longer says "extra".
- Glossary: فصل/فصول, اشتراك شهري ثابت (replaces رسم شهري everywhere), singular address in FAQ and pricing, «» in testimonials, one name form "أ. محمد" (founders name) / "الأستاذ محمد" (prose, FAQ and alt).
- Footer AR links aligned to header labels ("ابدأ خلال 20 دقيقة", "الأمان").
- AR meta: title 53 chars `يومي كير | برنامج إدارة الحضانات وتطبيق أولياء الأمور`; description 130 chars (SEO proposal minus the "free demo" sentence, to stay accurate and short). a11y.opensInNewTab updated; social.* and cta.* reviewed, unchanged.
- Softened claims: Security card 1 and FAQ 6 (the "including us" lines removed in EN and AR). Retention, export, deletion and backup wording unchanged and listed in `docs/OWNER-CLAIMS.md`.
- Commitments lead: placeholder EN/AR sentence, flagged "replace with the owner's text".

## Not applied (owner's verbatim Figma Arabic kept)
- Rows 60, 61, 62, 63 (setup steps[0], [2], [3]): owner text; includes "عرضًا توضيحيًا" (steps[0]) which breaks the demo glossary. Left for the owner.
- Only grammar fix to owner text: `demo.lead` ("على كيف" -> "كيفية مساعدة ... لك"), row 19. Marked "owner Figma, grammar-fixed (confirm)" in `docs/arabic-review.md`.
- Row 20 bidi note (render the example in `<bdi>`): component task, not done here; the string now has the example in parentheses.

## Docs and checks
- 13 per-section `arabic-review.md` replaced by a pointer; `docs/arabic-review.md` generated (230 rows: 30 verbatim, 200 draft).
- `node docs/tools/check-i18n-parity.mjs`: 14 pairs OK, no warnings.
- `npx astro check`: 1 error, in `src/components/sections/Faq.astro:41` ("expected `---`"), a component owned by another engineer's in-progress edit; no i18n type errors.

## Owner questions still open
1. Fee noun: اشتراك شهري (applied) vs رسم شهري.
2. Commitments lead text (placeholder in place).
3. Security nav label: "الأمان" (applied) vs "مبني على الثقة".
4. Reply SLA (one working day); retention of daily reports ("إلى الأبد"); FAQ 7 vs export promise.
5. فصول vs صفوف/قاعات; "أ. محمد" form and full name; founders approve all first-person text.
6. Testimonial speakers and genders (صاحب, معلمة, إدارية); address form (singular masculine for all).
7. Demo form: add "مجانيًا" to submit, "للعمل" to the email label, keep "المؤسسة".
8. Western vs Arabic-Indic digits; Latin wordmark in footer; "للمنطقة" vs "لمنطقتنا"; "التزاماتنا" vs "تعهداتنا".
9. Setup steps wording (rows 60-63) and "عرضًا توضيحيًا" vs "تجريبيًا".
10. All claims in `docs/OWNER-CLAIMS.md` section B.
