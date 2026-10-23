# 11 · FAQ — Review

**Verdict: PASS with notes** (needs owner answers; see below).

Checked at 1440 / 768 / 375 (EN and AR) on `/en/preview/faq/` and `/ar/preview/faq/`; 1024 uses the same desktop layout and was not separately screenshotted. `astro check`: 0 errors. No console errors. No horizontal overflow at the widths checked.

## Matches Figma
| Item | Result |
|---|---|
| Wave `up` with shadow, 58 gap, title 48, 40 to rows, 24 between rows | match |
| Row: 32 radius, `stroke-sec`, badge 40 `primary-bg`, plus/minus 24, 72px high at 1440 (measured 71) | match |
| Open row: 2px `primary-cta` border, minus icon, answer 24px regular, 12px gap | match (compared with #13) |
| 13 questions, order and wording | match (stray space in "anything ?" removed) |

## Deviations
| Deviation | Why |
|---|---|
| Page ships all rows closed (Figma shows #13 open) | #13 is a state demo; `initialOpen` prop exists for previews |
| Rows toggle independently, not single-open | Figma does not say; avoids layout jumps when closing a row above |
| Answers 1–12 drafted; #13's "[next country]" removed | Figma has only #13, with a placeholder |
| Closed rows carry a transparent 2px border and 2px less padding | open and closed rows stay the same size |
| 13 `role="region"` panels | requested; assistive tech may announce many landmarks. Drop the role if testing shows noise |
| Latin digits in the Arabic badges | AR frame has none; switch to Arabic-Indic if the owner prefers |
| Transitions are throttled in background browser tabs | final open heights were verified by script |

## Needs owner (drafted answers; no prices or legal terms were invented)
| Row | What to confirm |
|---|---|
| 1 How much does it cost? | Says "one flat monthly fee, paid by the nursery"; no amount. Confirm against Section 09 |
| 3 Setup | "under 20 minutes", "same day"; confirm the steps |
| 4 Teacher training | "No formal training needed"; confirm an onboarding walkthrough is offered |
| 6 Check-in | Describes teacher marks child in/out from the app; confirm the real flow (parent notification is not claimed) |
| 8 What if we cancel? | Data-export help and "terms shared up front" are assumptions; owner must supply the real cancellation / export policy |
| 9 WhatsApp and Excel | "we help you bring your existing lists across": confirm that service exists |
| 10 Older Android | No Android version stated; add a minimum version if there is one |
| 12 Who is behind | Names taken from the plan (Dr. Rana Mustafa, Mr. Mohammed); confirm wording |
| 13 Outside Egypt | "more countries will follow" replaces Figma's "[next country]"; supply the real next country or keep generic |

## Needs lead
- Wire `<Faq locale={locale} />` after Founders; wave `up` is built in (confirmed by render).
- JSON-LD is rendered inside the section; keep only one FAQPage block on the page.
- Footer nav "FAQ" link target is `#faq`.
