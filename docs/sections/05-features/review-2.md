# 05 Features: review 2 (reviewer-fixer, real page `/en/` + `/ar/`)

**Verdict: PASS with notes.** Measured on the wired page at 1440 / 1280 / 1024 / 768 / 375, EN + AR: `scrollWidth == clientWidth` everywhere, no text overflow, 0 console errors, `astro check` 0 errors.

| # | Severity | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | Reduced-motion stills never loaded in dev: an unencoded space in the srcset URL (`C:/Users/Mohamed Ali/...`) splits the candidate, so the `<source>` was discarded and the animation kept playing | `srcset={spaceSafe(still.src)}` (spaces to `%20`; no-op for built, hashed paths) | Cloned each `<picture>` with the source media forced to `all`: before 0/6 chose the still, after 6/6 chose `*-still.webp` with `naturalWidth` 220. A real `prefers-reduced-motion` cannot be emulated with the tools here; mechanism and URL verified |
| 2 | should | AR title of card 4 "مساؤهم لهم" is unclear | "أمسيات المعلمين تعود إليهم" | `features.ar.json`, `arabic-review.md` |
| 3 | nit | AR card 3 "معرضه الخاص" (exhibition) and "خلاصة مشتركة" (summary) read oddly; card 6 "الأهل" vs "أولياء الأمور" used elsewhere | "ألبومه الخاص", "منشورات مشتركة", "لا أولياء الأمور" | `features.ar.json` |
| 4 | nit | Cards 319 / 350 tall at 1440 vs 312 in Figma (second row wraps one line more) | none: Fraunces stand-in is wider than Recoleta. Width 384, padding 32, gaps 24 / 32, h2 48 at y=134, cards start at y=240 as in Figma | measured |
| 5 | nit | 375 EN/AR: 279-296px cards with some air above the icon | kept: height is the Figma aspect (343/384 x 312) and content is about 300 | measured |

Checked and fine: one `h2` + six `h3`, `section[aria-labelledby]`, decorative `alt=""`, no `left/right`, no raw hex, tokens only; contrast (h3 9.2:1, body 11.5:1, badge 8.2:1); illustration and blob not mirrored in AR (icon sits at the start side in both locales); no dead code.

Open (owner): licence of the six GIFs (DECISIONS #11); animated WebP is 2.0 MB total (see `review.md`); native review of the 14 AR strings (3 changed, see `arabic-review.md`).
