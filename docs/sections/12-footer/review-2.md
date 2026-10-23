# 12 Final CTA + footer: review 2 (real page)

**Verdict: PASS with notes.** The join 11 up -> band -> footer wave is seamless at 1440 / 768 / 375, EN and AR. `<footer>` is the only `contentinfo`. Wordmark not clipped horizontally at 375 (44px). No horizontal scroll. `astro check` 0 errors.

| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | White 18px bold "Watch Demo" on the Figma green (`primary-cta`) band was 3.38:1 | Band fill `primary-cta-strong` (4.61:1), same fix as the Setup band; the 24px lead is 4.4:1 | contrast calc, 1440 screenshot |
| 2 | should | Footer nav: 32px high links on touch devices at >=1024, "FAQ" 33px wide | `min-h-11 min-w-11`; 32px only for fine pointers at >=1024 (`pointer-coarse:lg:min-h-11`) | scan: no link under 44px below 1024 |
| 3 | nit | CTA lead orphaned "product." on its own line | `text-balance` on centred `SectionHeader` leads (kit, backwards compatible) | 1440 screenshot |
| 4 | should | AR footer nav wording differed from the header ("ابدأ خلال" vs "ابدأ في", "الأمان" vs "مبني على الثقة") | Aligned to the header (`footer.ar.json`); native reviewer picks the final wording for both | AR dumps |
| 5 | nit | `#watch-demo` goes nowhere in the band | `TODO(owner)` comment, like the hero | n/a |
| 6 | note | Social buttons: 40px visual, 44px hit area via `::after` (DECISIONS #12); URLs still `#` | owner supplies URLs | scan |
| 7 | note | Footer taller than Figma at 1440 (44px rows below 1024, wider stand-in font) | acceptable | n/a |
