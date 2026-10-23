# Responsive QA: small screens (<= 767px)

Scope: whole page `/en/` and `/ar/` at 320, 360, 375, 390, 414, 600, 767; landscape 667x375 and 812x375; 200% text size (root font-size 200%) at 375 and 320. Measured with headless Chrome over CDP (mobile emulation, DPR 2, touch) plus full-page screenshot reviews. `astro check`: 0 errors, 0 warnings. `astro build` not run (as instructed).

## Results (after fixes)

| Area | 320 | 360 | 375 | 390 | 414 | 600 | 767 | 667x375 | 812x375 | 200% @375 | 200% @320 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| No horizontal scroll (`scrollWidth <= innerWidth`), EN | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS (was FAIL) | PASS (was FAIL) |
| No horizontal scroll, AR | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS (was FAIL) | PASS (was FAIL) |
| No element past the viewport edge (clip-aware) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Header / mobile menu (opens, links 44px, Esc closes + focus returns, no overflow) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Hero (H1 36/38px, CTAs stack < 640, photo below text, undistorted) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Testimonial / feature / security / step / commitment blob cards | PASS | PASS | PASS | PASS | PASS | FAIL -> PASS | FAIL -> PASS | PASS | PASS | PASS | PASS |
| Wave dividers (72px tile repeat, no stretched scallops) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Day cards (single column, phones scale with card) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Setup steps + connector rail | PASS | PASS | PASS | PASS | PASS | PASS | FAIL -> PASS (2x2 from 640) | PASS | PASS | PASS | PASS |
| Pricing cards | PASS | PASS | PASS | PASS | PASS | PASS | FAIL -> PASS | PASS | PASS | PASS | PASS |
| Founders | PASS | PASS | PASS | PASS | PASS | PASS | FAIL -> PASS | PASS | PASS | PASS | PASS |
| FAQ accordion (rows >= 72px, long AR questions wrap) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Final CTA band + footer wordmark (bottom-clipped by design, no overflow) | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Demo dialog (scrolls, submit reachable, close pinned 44px, inputs 16px) | PASS | n/t | PASS | n/t | n/t | PASS | PASS | PASS | n/t | PASS (was FAIL) | PASS with note (1) |
| Body text >= 16px | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Tap targets >= 44 | PASS (2) | PASS (2) | PASS (2) | PASS (2) | PASS (2) | PASS (2) | PASS (2) | PASS (2) | PASS (2) | PASS | PASS |
| Fixed/sticky elements covering content | none | none | none | none | none | none | none | none | none | none | none |

EN and AR gave the same result in every cell except the scroll rows listed separately. n/t = not tested at that size (dialog was tested at 375x667, 320x568, 375x340 (keyboard-height), 667x375, 600x900, 767x1000, EN + AR).

(1) At 320 + 200% text the native date input keeps a ~194px intrinsic width in a 176px column; it stays inside the dialog (dialog scrolls, nothing is cut off). (2) Social buttons are 40px visual with a 44px hit area (DECISIONS #12), so the measurer lists them; nothing else is under 44px except inline text links.

## Issues found and fixes

| # | Where | Problem | Fix (file:line) |
|---|---|---|---|
| 1 | 480-767 wide, all blob cards (shared pattern) | `BlobCard` locks the native aspect ratio, so a card wider than its shape was far taller than its content: feature card 735x598 with one line of text, security cards 800px tall, testimonial 735x615, commitment cards 309px with 140px empty. Page was 26,002px tall at 767 (now 18,243). | `BlobCard.astro:38-45` new `grow` option; `:51,52,56,57,58,59,62` per-shape literals. Below `md`, once the card is wider than the shape's native width, the aspect lock is dropped (`aspect-auto`) and the card is as tall as its content with the native height as a floor (feature 312, step 201, testimonial 236, security 312, commitment 247, intl-school 360). `:95` applies it, `:105` content layer is `flex-1` so it fills the frame. `md` and up unchanged (verified 1440/1024/768 card sizes unchanged); the old security `relax` is now `md:` only (`:57`). |
| 2 | 640-767, Features, Security, Setup | Single column of 600-735px wide cards (huge blank right half; Setup steps were a 288px column hugging the start edge) | `Features.astro:46`, `Security.astro:35,37`: 2 columns from `sm` (640). `Setup.astro:35,50,55,63`: 2x2 grid with circle above card from `sm` (was `md`); header comment updated. |
| 3 | 594-767, Pricing "first 10" card | The 792px blob is shown from 594px; at 24-32px side padding the text ran into the scalloped outline | `Pricing.astro:73`: `@min-[594px]:px-[7.3%]` (same 7.3% the card already used from `lg`) replaces `md:px-8 lg:px-[7.3%]`. |
| 4 | 640-767, Founders | 280px portrait pinned to one side leaves a ~400x290 empty area beside it (open item from the 09-13 review) | `Founders.astro:56`: `sm:max-md:justify-self-center` (portrait centred over the card between 640 and 767; < 640 and >= 768 unchanged). |
| 5 | 200% text size, top social bar | Four 80px buttons (rem sized) + gaps = 392px, wider than a 375 screen: whole page became 474px wide (horizontal scroll, buttons cut off) | `Button.astro:107`: `social-bar` size is `min(2.5rem, (100vw - 2rem - 2.25rem) / 4)`: 40px at normal size, shrinks only when the row would not fit (stays >= 46px at 320 + 200%). |
| 6 | 200% text size, hero H1 ("management" at 72px), setup band H3 ("commitment") | A single long word wider than the column pushed the page wider (474px at 375, 363px-wide band text at 320) | `global.css:183` `overflow-wrap: anywhere` on `html` (breaks a word only when it cannot fit; no visible change at normal size). |
| 7 | Demo dialog at 200% text (also narrow real devices with wide date fields) | The date/time inputs' intrinsic width (446px at 32px font) widened the single grid column; both pickers were 446px in a 231px dialog and cut off by `overflow-hidden` | `DemoModal.astro:156`: `grid-cols-1` (= `minmax(0,1fr)`) before `sm:grid-cols-2`. Date/time now equal the other fields (231px). |

## Verified, no change needed
- Menu: opens, 11 links (9 + CTA + language) all reachable, every link row 44px, Esc closes and returns focus to the toggle, outside click and link click close it. The header is static, so the in-flow panel pushes the page down and nothing sits behind it; with a landscape phone (375px tall) the 570px panel is reached by scrolling the page (fine, but see decisions).
- Hero: H1 6 lines at 320 (EN 36px, AR 38px), never overlaps the photo; CTA pills stack to full width below 640 and sit side by side from 640; the secondary EN label wraps to 2 lines at 320 inside the 56px pill (fits).
- Waves: 72x76 tile repeated, scallops keep their proportion at 320 (wave 32px tall) up to 767.
- Dialog: 16px inputs and labels (no iOS zoom), 48px fields, submit reachable after scrolling, close button pinned at 44px inside the scroller, dialog `max-height: 100dvh - 2rem` with `interactive-widget=resizes-content` (375x340 emulates a keyboard: still scrolls to the submit button). EN and AR. RTL date/time order is mirrored correctly.
- AR long strings (FAQ questions, step titles, pricing bullets, nav labels) wrap without clipping; no `textClip` entries at any size.
- No images distorted (only `object-fit: fill` images checked: hero photo ratio matches).
- Day cards are clipped on purpose (Figma "cut-off phones"); the final summary card cuts the notification pop-ups ("New Update from the Classr...") at the card edge on mobile, as in Figma.

## Left / for the lead
- Skip link (1x1 until focused) and the 14px captions (testimonial author lines, "عربي" tag) are by design; body text is >= 16px everywhere.
- Pricing "international school" illustration and the first Day-card art are cropped inside the source images (a bush is cut at the left edge of `daycare` frame): an asset issue, not layout.
- Testimonials at 600-767 are single wide cards (735x236 each) with one line of text; acceptable, but a 2-column layout would leave an orphan, so it was not changed.
- Hero CTAs are 568px-wide pills at 480-639 (stacked). Acceptable; cap with `max-w` if the owner dislikes it.
- 200% text size at 320 is functional but H1 breaks mid-word ("manage/ment") and the date input is 18px wider than its column (dialog still scrolls vertically only).
- Not testable here: real iOS/Android date pickers, real software keyboard, real Safari. Astro dev toolbar was removed from the DOM for screenshots only.

### Decisions for the lead
1. The header is static, so on a phone the menu button is only visible at the top of the page (no sticky nav, no visible "Book a Demo" outside the menu): still an owner decision (REVIEW-QUEUE).
2. Changes that also touch widths >= 768 (the other QA's range): `Pricing.astro:73` (first-10 padding now 7.3% from a 594px card, was 32px at 768-1023; same as before from 1024), `BlobCard.astro:105` (`flex-1` on the content layer, no visual effect found at 1440/1024/768) and `global.css:183` (`overflow-wrap: anywhere`, only acts when a word cannot fit).
