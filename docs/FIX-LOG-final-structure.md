# Fix log: final page structure (2026-10-23, not committed)

Order: Hero, Proof (renders nothing while `config/proof.ts` is empty: no heading, no gap), Roles, Day, Features, Compare, How it works (Setup), Security + promises, Pricing, FAQ, Final CTA, Footer. Scallops only at hero bottom, pricing top, footer top; flat joins alternate plain / light / sec tints.

## Moved / removed
- Testimonials and Founders unpublished (DECISIONS 27-28): removed from `pages/[lang]/index.astro` and `config/nav.ts`; component and i18n files kept, comment in the .astro files.
- Commitments merged into Security (`Security.astro`: 4 security cards unchanged in claim strength + exactly 3 promises: parents never pay, your data stays yours, one flat fee). Promise cards: `security/PromiseCard.astro` (was `commitments/CommitmentCard.astro`), 3-up from 768. Titles: one h2, promises group h3.
- Setup: CTA band removed; 4 plain steps (book a demo, we set it up with you, invite team and parents, start first day); 48 hours / 30-minute demo; no "20 minutes" left in src.
- Nav (header, menu, footer, scroll-spy) now 7 ids; `#commitments` and `#founders` gone. Labels: Why Yawmy Care, How it works, Security, Pricing, FAQ (+ AR). Footer CTA: "See your own nursery in Yawmy Care" / 30-minute call.
- FAQ: 10 answer-first questions; Arabic question now low-key; teachers feminine in AR; badge is aria-hidden (already).
- Pause toggle: fixed one hidden below 640, in-flow copy in the footer (`MotionToggle inline`), script syncs both.
- Fixes found while looking: Roles tabs overflowed at 375 in AR (page 425px wide) -> flexible tabs; Roles tint removed; Pricing/Security overlap for visible scallop.

## Files deleted
`components/sections/Commitments.astro`, `commitments/CommitmentCard.astro` (moved), `i18n/sections/commitments.{en,ar}.json`, assets `commitments/data-yours*.webp`, `commitments/arabic*.webp`. Kept (reused by promises): `parents`, `human`, `data-stays`.

## Heights at 375 (full page)
EN 18,299 -> 14,588; AR 18,938 -> 14,753 (includes the other engineer's concurrent edits). 1440: EN 11,961, AR 12,273.

## Checked
EN + AR at 390, 768, 1024, 1180, 1440 and 844x390: no horizontal overflow; slices in `docs/design-shots/final/` (not every AR slice was inspected by eye; AR 1024, EN 768/1440/390 were).

## Leftovers
- Other engineer: `public/llms.txt` (and any JSON-LD) must drop #commitments / founders / testimonials mentions; `brand.tagline` footer text is theirs (already new).
- AR strings new/changed need native review (setup, promises, FAQ 5).
- `commitment-wide` BlobCard shape now only used in `foundation.astro`.
- Owner claims unchanged (backups, retention, self-service export): see OWNER-CLAIMS.md.
