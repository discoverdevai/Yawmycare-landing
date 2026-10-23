# Section 10 · Founders — review

**Verdict: PASS with notes.** Checked `/en/` and `/ar/preview/founders/` at 1440, 1024, 768, 375 (scrollWidth <= viewport at 1024 / 768 / 375, no console errors).

| Area | Result |
|---|---|
| 1440 vs Figma | Photo, card and text offsets match (percentages derived from the Figma px values); outline, wave, heading and name chip match |
| 1024 | Same side-by-side layout; card grows past the 1181:423 ratio when the text is longer than the card; photo stays top aligned |
| 768 / 375 | Photo stacks above a rounded card (BlobCard fallback below 886px), alternating sides at 768 |
| RTL | Photos and text swap sides, outline mirrored so the scallops stay opposite the photo; Arabic fits (card grows) |
| a11y | One h2, `aria-labelledby`, alt "Portrait of …" from i18n, name in `cite`, decorative icon hidden |

## Deviations from Figma
| Deviation | Why |
|---|---|
| 8px gap between paragraphs (Figma: none) | Readability; no wording changed |
| Text 20px at 1024-1279, 24px from 1280 | Keeps 45-60 characters per line when the card narrows |
| Second card is the first outline mirrored (1175 vs 1181 wide) | Same vector; the 6px difference is not visible |
| Below 1024 the photo sits above the card | No mobile frames exist |
| Name chip uses `footer`/`cite` inside `blockquote` | Semantics; look is identical |

## Open items
- Founders must approve the Arabic (see `arabic-review.md`) and confirm consent for photo and name publication.
- No role/title text exists in Figma; none was added.
- Photos are about 600 KB PNG originals (kept in `assets-original/`); served as WebP via `astro:assets`.

## Needs lead
- `BlobCard` got an optional `flip` prop (backwards compatible).
- Wire `<Founders locale={locale} />` into `index.astro` (anchor `#founders`); wave `down` matches the §8.1 table.
