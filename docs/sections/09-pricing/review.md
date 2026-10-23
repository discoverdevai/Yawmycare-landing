# 09 Pricing: review

**Verdict: PASS with notes.** Checked at 1440 / 1024 / 768 / 375 in `/en/preview/pricing/` and `/ar/preview/pricing/`; no console errors, no horizontal scroll at 375, `astro check` 0 errors. RTL mirrors correctly (school card and text on the right, illustrations stay unmirrored).

## Deviations from Figma
| Where | Deviation | Why |
|---|---|---|
| Bullet 1, first10 body | copy fixed (see audit #1, #2) | Figma text is broken |
| Green text / buttons | `primary-cta-strong` instead of `#76945C` | DECISIONS #1 |
| Pricing card title | wraps to 2 lines at 1440 with the stand-in Fraunces | Recoleta is narrower; re-check once licensed fonts land |
| Card heights | blobs keep native aspect ratio but grow with content; the two bottom cards are not forced to equal height | BlobCard limitation |
| 768 | blobs fall back to rounded cards (container < 900 / 594), by design of BlobCard | spec §8.4 |
| Illustrations | animated WebP at native 375px, `<img>` instead of `astro:assets` `<Image>` | Astro would re-encode and flatten the animation; resized variants were 2-3x larger. Metadata height of animated WebP is wrong (stacked frames), so width/height are set to 375 |
| No reduced-motion handling | the animations autoplay and loop (~5 s) | not pausable; enhancer may swap in a still for `prefers-reduced-motion` |

## Open items
- Owner to confirm the first10 body rewrite and that the GIFs are licensed (DECISIONS #11).
- 14 Arabic strings need native review (`arabic-review.md`).
- Lead wires `<Pricing locale={locale} />` after Commitments; the `#demo` dialog must listen to `[data-demo-open]`.

## Needs lead
- `Button` got one additive variant, `outline-accent`.
