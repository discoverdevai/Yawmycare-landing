# Fix log: copy + content structure, pass 2

Roadmap items 1.5, 1.6, 1.7, 2.4, 2.5, 2.6 (no new claims), 2.7, 2.10. `npx astro check` 0 errors, `check-i18n-parity` OK (16 pairs), headless Chrome shots at 375 and 1440, EN + AR, no horizontal overflow.

## Claims: before -> after (EN; AR changed together)
| Key | Before | After |
|---|---|---|
| `features.title` | What no other nursery app in MENA has | Built for how nurseries really work |
| `features.items[evenings].title` | Evenings back for teachers (body was about parents seeing off-hours) | Respects your hours (AR: رسائل تحترم ساعات عملك) |
| `features.items[arabic].body` | Full right to left, Arabic notifications and support. Each person picks their own language. | Staff and parents each pick their own language, Arabic or English, and see the whole app in it. (no longer repeats the Arabic commitment card) |
| `testimonials.title` | We talked to nurseries on three continents before we wrote a line of code. | We listened to nurseries before we wrote a line of code. |
| `testimonials.lead` | ...nurseries in Egypt, across the wider region, and in the United States... | We sat with owners, teachers and parents in their nurseries and listened. ... (no geography claim) |
| `faq` "Do you work outside Egypt?" | "works anywhere in the region" | removed (unprovable) |
Security and retention wording untouched (softened versions from `OWNER-CLAIMS.md` kept). No compliance, residency or certification claim added.

## Dedupe and CTA system
- "We never charge parents" now: pricing title, commitments card (body shortened to "One flat fee, paid by the nursery. No commission on tuition."), FAQ once (answer now "No. Parents use the app for free. The nursery pays."), founders closing sentence. Removed: the Features "Nursery pays, not parents" card. **Owner decision:** the founders' last sentence was kept because `Founders.astro` marks those paragraphs as the founders' own words; cut it if you want it only twice.
- 15 vs 20: `footer.cta.lead` "Fifteen minutes on a call" -> "20 minutes on a call" (AR: 20 دقيقة). Setup band title no longer repeats "20 minutes" (the section title says it).
- Three bands, distinct jobs: Setup band = terms ("No card, no commitment · In Arabic or English" + "Book a demo and we set it up with you on a call."); final band = what the call is (20 minutes, your own nursery); pricing "Be The First Partner" untouched (feature engineer). Labels: nav/bands "Book a Demo", hero "Book a free demo", dialog submit "Book My Free Demo" only (unchanged).
- AR: setup.steps[0] "عرضًا توضيحيًا" -> "عرضًا تجريبيًا" (glossary).

## Structure
- **Features 6 -> 4** (check-in, know who read, respects your hours, Arabic). Cut: photos (covered by the 10:00 AM day card and the new compare row) and "Nursery pays" (pricing + commitments). Grid is 1 col / 2x2 from 640 / 4 across from 1280: no orphans at 1440, 768, 375. Deleted unreferenced `src/assets/features/{photo,wallet}{,-still}.webp`.
- **FAQ 13 -> 10** (JSON-LD follows: 10 Question entries). Kept: cost, parents, setup, training, Arabic, data, cancel, WhatsApp/Excel, older Android, school nursery. Dropped: check-in (Features/Day), who is behind (Founders), outside Egypt.
- **Compare** (`sections/Compare.astro`, slug `compare`, `id="compare"`): 4 rows (daily report, parent updates, attendance, last week's photo), only claims already on the page. Table with caption + scoped headers from 768, labelled cards below. `wave="down"`; joins with Features (up) and Setup verified seamless. No nav entry (header full).
- **Proof** (`sections/Proof.astro`, `config/proof.ts`, `docs/PROOF.md`, slug `proof`): ships empty, renders nothing. Wired after Testimonials.
- `src/i18n/index.ts`: two imports + `proof`, `compare` entries. `index.astro`: 2 imports + 2 usages.

## Page order (2.10): proposal, not applied
Current: Hero, Testimonials (problem), [Proof], Day (product), Features, Compare, Setup (how), Security, Commitments (trust), Pricing, Founders, FAQ, CTA. This already follows problem -> proof -> product -> how -> trust -> price -> objections -> CTA. One proposal: move Founders before Pricing (trust before price). Not applied: it needs `navItems` order (`config/nav.ts`), header/footer labels and the wave alternation (Founders down next to Commitments down, Pricing up next to Founders) changed together, and Pricing/Header are being edited by the feature engineer.

## Arabic QA
Scanned every `*.ar.json`: no Arabic-Indic digits, no digit glued to Arabic letters; Western digits with a (non-breaking, where numbers carry units) space; glossary (فصل, اشتراك شهري ثابت, ألبوم, نقرة, singular address, brand يومي كير) already consistent. Only Latin in running AR text is "QR" (renders correctly in RTL). WhatsApp is written واتساب everywhere, so no `<bdi>` needed; Latin brand names in the proof strip are wrapped in `<bdi>`. `docs/arabic-review.md` regenerated (251 rows).

## Needs real capture (not faked)
All in `src/assets/day/` and cannot be covered without removing or inventing UI:
1. `connected-hand.webp` (8:00 PM card): "Lorem ipsum dolor sit amet" chat bubbles on the phone. Needs a real bilingual sample chat capture.
2. `allinone-phone.png` ("the day, all in one place" card): the Yawmy logo splash used as the phone screen. Needs a real home-screen capture.
3. `room-phone.png` (8:15 AM card): sample rows "Kaylynn Arcand ... ID: 12345678" (and "Search by name or ID..."). Needs anonymised Arabic-named sample data.
4. `allinone-banner.png` / `allinone-notices.png`: sample dates (Mar 30, April 21-26), English-only UI; replace with Arabic captures for AR.

## Needs owner facts
- Replace-or-confirm: commitments lead, human reply in one working day, 90-day export, "filed for good" (`OWNER-CLAIMS.md`).
- Customers for the proof strip (name, city, role, logo, quote, consent) per `docs/PROOF.md`.
- Whether the demo/setup call is really 20 minutes (now stated on the final band and the setup title).
