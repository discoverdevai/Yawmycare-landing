# 10 Founders: review 2 (real page)

**Verdict: PASS.** 1440 EN matches Figma (photo 439x491 at x120, card inset, outline, name chip). AR: rows swap sides, outline mirrored, photos and icon not mirrored. No horizontal scroll at 375-1440. `astro check` 0 errors.

| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | nit | At 768 the quote ran ~75 characters per line (`max-w-prose`) | `max-w-[60ch]` on the blockquote | 768 EN screenshot |
| 2 | nit | 768 stacked layout leaves ~420x290px empty beside each photo | kept: side by side would need a second grid layout for 768-1023, and the card falls back to a rounded shape there anyway. Lead call | 768 screenshot |
| 3 | note | Wave joins 09 down -> 10 and 10 -> 11 up are seamless | none | joins screenshots |
| 4 | note | Heading order h2 only (quotes are `blockquote`), `cite` = name, photo alt from i18n | none | DOM outline |

Remaining (owner): founders' consent to publish photos and names; native review of the 11 Arabic strings.
