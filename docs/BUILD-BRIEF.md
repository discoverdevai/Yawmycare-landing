# Section build brief (read this first)

You are building ONE section of the Yawmy Care landing page, end to end, in **English and Arabic (RTL)**. Several other builders are working on other sections at the same time, so follow the ownership rules below exactly.

## Read first
`CLAUDE.md` · `docs/DECISIONS.md` · `docs/sections/00-foundation/spec.md` (design-system rules) and `audit.md` · the existing kit in `src/components/ui/` (Container, Section, SectionHeader, Button, BlobCard, WaveDivider, Icon, Logo), `src/styles/global.css` (tokens + type scale), `src/i18n/index.ts`, and the showcase `src/pages/[lang]/foundation.astro` (shows each kit piece in use).

## Pipeline you run yourself (audit → spec → build → self-review)
1. **Audit** the section in Figma (file `oSQUBKWEqG5XrY4sHCzjzy`; Figma MCP tools `mcp__ff0aee01-da29-4a87-b11a-9210c6da48da__*`, load with ToolSearch; `create_session` once, reuse the sessionId; load the `figma:figma-design-to-code` skill before `get_design_context`). The canonical EN design is the "Updated Version" frame `1457:3895`; query only your section's node(s). Where an older AR frame (`1434:3715`, modal `1437:4595`) has the section, copy its Arabic strings and RTL layout cues.
2. Write `docs/sections/NN-slug/audit.md` and a short `spec.md` (components, i18n keys, responsive + RTL notes, acceptance criteria). Keep both brief: tables, no prose.
3. **Build** it (rules below).
4. **Self-review** at 1440 / 1024 / 768 / 375 in BOTH `/en/preview/<slug>/` and `/ar/preview/<slug>/` and write `docs/sections/NN-slug/review.md` (verdict, deviations from Figma, open items). Fix what you find.

## Files you own (create these; touch nothing else)
| File | Purpose |
|---|---|
| `src/components/sections/<Name>.astro` (+ any helper components in `src/components/sections/<slug>/`) | the section; takes `locale: Locale` as its only required prop |
| `src/i18n/sections/<slug>.en.json` and `<slug>.ar.json` | ALL copy for the section. Currently `{}`. Same keys and array lengths in both files (the Arabic file is type-checked against the English one). Read as `getDictionary(locale).sections.<slug>.<key>` |
| `src/assets/<slug>/…` | images, illustrations, mockups exported from Figma (download them; Figma asset URLs expire) |
| `src/pages/[lang]/preview/<slug>.astro` | your private preview route (BaseLayout + your section only, `noindex`). The lead deletes these before launch |
| `docs/sections/NN-slug/*` | audit, spec, review, `arabic-review.md` |

**Do not edit** `src/pages/[lang]/index.astro` (the lead wires sections in), `src/i18n/index.ts`, `src/i18n/en.json|ar.json`, `global.css`, or other sections' files. Shared kit (`src/components/ui/*`): you may make small, backwards-compatible additions (a new optional prop or variant); re-Read the file right before editing, since others may touch it too. If a token or kit change is bigger than that, record it in your `review.md` under "Needs lead" and work around it locally.

## Build rules
- Page order, wave directions and hero→testimonials joins: see `PLAN.md` and `docs/sections/00-foundation/spec.md` §8.1. Use the kit (`Section`, `SectionHeader`, `Button`, `BlobCard`, …) instead of re-creating its pieces.
- **No hard-coded strings or raw hex** in components. Colors only via Tailwind token utilities (`bg-primary-bg`, `text-ink` …). Brand is written **Yawmy Care** (never "YAWMY CARE") in copy.
- **RTL**: CSS logical properties only (`ms-/me-/ps-/pe-/start-/end-/text-start`, `border-s`, …), never left/right. Mirror layouts (grid/flex order follows `dir`), do not mirror icons, logos, phone mockups, or blob shapes. Numbers / Latin names inside Arabic text: wrap in `<bdi>` or `dir="ltr"`.
- **Arabic copy**: if the AR Figma frame has the string, use it verbatim. Otherwise draft natural Modern Standard Arabic (warm, clear, not word-for-word; keep the product tone), and list every drafted string in `docs/sections/NN-slug/arabic-review.md` as a table `key | EN | AR draft | note` so a native speaker can review. Use "يومي كير" for the brand in Arabic text.
- **Responsive** (no mobile frames exist): desktop layout from Figma at ≥1024; sensible tablet at 768; single column at 375 with the foundation's rhythm tokens. No horizontal scroll at any width.
- **Accessibility**: one `h2` per section (use `SectionHeader`), `aria-labelledby` on the section, real lists/buttons/links, alt text from i18n (decorative → `alt=""`), visible focus, `motion-safe:` for any animation, contrast per `docs/DECISIONS.md`.
- **Images**: use `astro:assets` `<Image>` (explicit width/height, `loading="lazy"` below the fold, `fetchpriority="high"` only for the hero LCP image). Animated GIFs: keep the original in `docs/sections/NN-slug/assets-original/` and ship a converted animated WebP (or an `<img>`-compatible lighter format) if sharp can do it; otherwise ship as is and note it in `review.md`.
- Interactive behaviour (accordion, tabs, modal, mobile menu) = small vanilla JS in an inline `<script>` in the component, progressive enhancement, keyboard + screen-reader correct. No frameworks.
- Keep files small and readable; match the surrounding code's style (see the kit components).

## Verification (required before you finish)
- `npx astro check` → 0 errors. (Other builders edit files at the same time; a transient error in a file you do not own is not yours: wait a minute and re-run, never "fix" it.)
- View `/en/preview/<slug>/` and `/ar/preview/<slug>/` in the built-in browser. A dev server is already running (find the port with `mcp__Claude_Browser__preview_list`, normally http://localhost:4323). **Open your own tab** (`tabs_create`) and close it when done; do not navigate other tabs. Use `resize_window` for 1440/1024/768/375 (reset with preset `desktop` when done). Compare against `get_screenshot` of the Figma node.
- No console errors. Do not run `astro build` more than once at the end (it writes `dist/` that others may be reading).

## Final reply (≤ 25 lines)
Files created · what matches Figma · deviations and why · Arabic strings that need native review (count) · anything under "Needs lead" · verdict (PASS / PASS with notes / BLOCKED).
