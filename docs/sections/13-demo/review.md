# 13 · Book a Demo modal — Review

**Verdict: PASS with notes.** Checked in the built-in browser at 1440, 768 and 375 in `/en/preview/demo/` and `/ar/preview/demo/` (the dev server is shared with other builders; page reloads from their edits interrupted a couple of scripted runs, which I re-ran in smaller chunks). `astro check`: 0 errors. No console errors (only the expected dev `console.warn` for the unset endpoint). `astro build` not run (left to the lead).

## Behaviour verified
Open by button, `href="#demo"` anchor and `#demo` hash on load; Esc closes; backdrop press closes; success "Close" closes; focus returns to the opener; `html` overflow hidden while open; invalid submit shows 5 messages, focuses the first field and writes the summary; bad email / past date messages; too-fast (< 3 s) error panel + retry keeps values; valid submit shows "Sending…" (disabled, `aria-busy`), then the success panel with focus on its heading and the form reset; `yawmy:demo-open` / `yawmy:demo-submit` fire; closing clears a `#demo` hash. AR: layout mirrors the AR frame, email set LTR with swapped padding. No horizontal scroll at 375.
Not exercised: a real network POST (no endpoint yet), the timeout path, Firefox/Safari native pickers.

## Deviations from Figma
| Deviation | Why |
|---|---|
| Close button added (top end corner, 44px) | required by the contract; none in Figma |
| Modal ~26px taller than 608 (EN) | labels/title use the foundation's 1.3 line-height instead of Figma's 1.0 (Arabic diacritics clip at 1.0) |
| Input value text 16px; placeholder 14 (AR frame has 12 Light, we use 14) | 16px avoids iOS zoom on focus; 12px AR placeholder is too small |
| Date / time show the browser's native format instead of "Select Date / time" | native `type=date` / `type=time` per brief; the native picker button sits invisibly under the trailing icon |
| Submit uses `primary-cta-strong #637C4D` | DECISIONS #1 |
| Submit has no icon (matches Figma; the kit's primary defaults to a calendar) | passed `icon={null}` |
| Brand "Yawmy Care" in the EN title/lead | DECISIONS #5 |

## Open items
- Input border `#D8D8D8` on `#FFFFF5` is 1.4:1 (WCAG wants 3:1 for non-text UI). Kept per the spec; the invalid state uses the accent-text border and focus uses the 2px focus outline. Owner call.
- The form destination is undecided (see `spec.md`); until `PUBLIC_DEMO_FORM_ENDPOINT` is set, production shows the "not connected yet" error.
- The error copy says "WhatsApp or by email" but has no links: contact details / WhatsApp URL are not in the dictionary.
- Arabic: 22 drafted strings, see `arabic-review.md`.

## Needs lead
- Mount `<DemoModal locale={locale} />` once in `index.astro` (after the sections) and point every CTA at `data-demo-open` (or `href="#demo"`).
- Set `PUBLIC_DEMO_FORM_ENDPOINT` in the deploy environment once the owner chooses a destination.
- Optional: add `PUBLIC_DEMO_FORM_ENDPOINT` to an `ImportMetaEnv` declaration in `src/env.d.ts` (currently untyped, handled by a runtime string check).
- Delete `src/pages/[lang]/preview/demo.astro` before launch.
