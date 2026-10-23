# Yawmy Care landing page: honest self-critique (2026-10-23)

Method: read CLAUDE.md, PLAN.md, DECISIONS.md, OWNER-CLAIMS.md, i18n JSON; full-page headless Chrome captures of /en/ and /ar/ at 1440 and 375, plus page text. Not done: Figma comparison, formal skill runs (design-critique etc. were not invoked; their lenses were applied by hand), live competitor audit. Caveat: the 375 captures came from a headless window that clips at the right edge, so I make no claim about mobile horizontal overflow; verify on a real device. Mobile findings are limited to what is visible regardless (header, CTA order, page length).

## Scores (1-10)
| Area | Score | Reason |
|---|---|---|
| 1 First 5 seconds | 5 | Headline says what and region; the "who" is only implied; hero photo is generic and shows no product. |
| 2 Narrative / order | 5 | Customer voice first is good; then many reassurance sections before price; 3 CTA bands; no product overview or comparison. |
| 3 Visual design | 7 | Distinct, warm, coherent system; wavy shapes mostly charming; mixed asset quality (AI security image, 2 icon styles, placeholder phone). |
| 4 Copy (EN) | 7 | Plain, human, specific in places (100 m, 6-month chat deletion); but unprovable absolutes and a few generic Figma-pasted blocks. |
| 4b Copy (AR) | 6 | Hero reads naturally; but the page around it shows English product UI; drafted MSA unreviewed. |
| 5 Conversion mechanics | 4 | Two competing hero CTAs, one pointing at a video that does not exist; 5-field form with date/time; no WhatsApp, no price, no sticky CTA. |
| 6 Trust / credibility | 4 | Real founders and testimonials are good; zero logos, numbers, named nurseries, store badges; "Lorem ipsum" visible; no contact details. |
| 7 A11y/perf where it affects conversion | 6 | Contrast fixed; but 6 GIF illustrations (4.3 MB per DECISIONS #11) and big images for a mobile-first audience. |

## 12 biggest problems, ranked by impact
1. **No price, no proof of existence.** The pricing card ("One flat monthly fee") never states a figure, and there is not one nursery name, logo, count or number anywhere. "We are new" is honest, but the buyer is left to infer risk. FAQ #1 "How much does it cost?" is behind an accordion.
2. **Hero CTA dead end.** "Watch the 2-minute tour" is a co-equal outlined button with a dashed coral border (more visual noise than the primary) and, per DECISIONS "still open", the video does not exist. It repeats as "Watch Demo" in two more bands.
3. **Hero shows no product.** Two stock-looking toddlers (the alt text describes a girl with a plush bunny and a boy in a bow tie). Cute, but it could sell any nursery or children's clothing brand; no parent app, dashboard or Arabic UI. The buyer is the owner/admin. First product frame appears about 1,100 px lower.
4. **The Arabic page contradicts its own headline.** AR hero says "بالعربية منذ اليوم الأول", yet every phone mockup in the AR day timeline is English ("Today's Attendance", "Mark as Checked-in", "Child Daily Logs", "Mo Tu Wed"). The core differentiator is not demonstrated in the AR proof.
5. **Placeholder content visible.** The 8:00 PM phone shows "Lorem ipsum dolor sit amet" chat bubbles; the "day, all in one place" card uses the logo as the phone screen and crops its UI cards at the card edge; sample data is "Kaylynn Arcand / ID: 12345678 / March 2026".
6. **Unprovable or loose copy.** "What no other nursery app in MENA has" (features title), "three continents", "Filed for good", "Evenings back for teachers" (the feature is a warning before sending after hours, not evenings back). All on the owner-claims list; the first is the riskiest.
7. **Form friction and no fast path.** Demo form has 5 fields incl. preferred date and time; no WhatsApp button although the pitch is "stop running your nursery on WhatsApp" to a WhatsApp-native audience. The WhatsApp icon in the top bar is a social link. No phone, email or address anywhere on the page.
8. **Narrative repeats itself and lacks the real comparison.** After proof and the day timeline come 6 feature cards, a 4-step setup (steps 1 and 4 are generic: "See Yawmy Care in Action", "Everything in One Place"), security, 5 promises, pricing, founders, 13 FAQs. "Never charge parents" appears in features, commitments, pricing title, founders and FAQ #2. No WhatsApp/Excel/paper vs Yawmy comparison, which is the actual competitor.
9. **Three CTA bands, inconsistent labels.** "Book a free demo" (hero), "Book a Demo" (nav, setup, pricing, final), "Be The First Partner", "Talk to us", "Watch Demo". The setup band and final band repeat the same two buttons; the final band says "Fifteen minutes" while the setup band says "20 minutes".
10. **Security section leans on generic AI imagery.** The centre image is a glossy AI-style desk monitor with fake charts and padlocks, off-brand and unrelated to the product. The lead ("ensuring your data remains protected while you focus on delivering exceptional care every day") is boilerplate against the otherwise plain tone. Claims have no badge, policy link or hosting-location statement, which matters for MENA data-residency concerns.
11. **Mobile conversion path.** Header not sticky; on mobile Book a Demo sits in the menu (AR header shows only a hamburger); the page is very long (about 14,600 px at 1440, far longer at 375, with 7 stacked phone cards) and has no persistent CTA.
12. **Asset and type inconsistency.** Stand-in fonts (Recoleta / Expo Arabic unlicensed) so the final brand voice is not seen. Icon set mixes black-outline pictograms (wallet, server, handshake) with green/coral ones. FAQ runs flush into the final band. Section rhythm is uniform (title, lead, cards), so nothing after the hero is a visual peak except the timeline.

## What is genuinely strong
- Headline is clear and different: category + region + "In Arabic from day one"; the AR hero typography is very legible with coral highlights.
- Customer voice comes right after the hero, with specific quotes ("My phone is the nursery's filing system") and credible attributions (place, 45 children).
- The day-in-the-life timeline is the best section: real product UI, concrete behaviour (100 m geofence, one-tap report), story rather than a feature list.
- "Five things we will not do to you" and "We never charge parents" form a clear, memorable commercial position; the first-10 partner offer is honest about being new.
- Founders with real names, motive (they enrolled their own children) and photos: a valuable trust block for a young vendor.
- Coherent brand system: green/cream/coral, scalloped dividers, blob cards, warm serif. Reads as nursery without primary-colour clip art. Contrast fixes are deliberate and documented.
- Bilingual build is careful (logical properties, RTL mirrors correctly); the owner-claims doc is unusually disciplined.
- FAQ questions match real objections (cost, parents pay, WhatsApp/Excel, older Android).

## Backlog

### Quick wins (under 1 day)
| Change | Expected effect | Test |
|---|---|---|
| Hide "Watch the tour" / "Watch Demo" until the video exists; hero secondary becomes "WhatsApp us" or "See pricing" | Removes a dead click, focuses on one action | A/B single vs two CTAs; metric: hero CTA click-through, form starts |
| Replace Lorem ipsum chat and logo-in-phone with a real bilingual sample chat; anonymised sample data | Removes visible placeholder | Visual QA |
| Add WhatsApp click-to-chat (wa.me, prefilled per language) next to the demo CTA, in the form success state and footer | Lower friction for a WhatsApp-native audience | wa.me clicks vs form submits per visit |
| Cut form to name, nursery, phone/email; make date/time optional or a post-submit step | Higher completion | A/B 5 vs 3 fields; submit rate and lead quality |
| State a price or range (or when and how you quote) in the pricing card and FAQ #1 | Removes the top objection | A/B price vs none; demo bookings, qualified rate |
| Replace "What no other nursery app in MENA has" with a provable headline ("What WhatsApp can't do for your nursery"); fix the "Evenings back" card | Credibility and legal safety | Scroll depth on Features |
| Unify CTA label to "Book a free demo"; drop the second "Watch Demo"; reconcile 15 vs 20 minutes | Consistency | Review |
| Sticky mobile bar: "Book a free demo" + WhatsApp icon | Persistent CTA on a long page | A/B on mobile; mobile conversion |
| Add spacing between FAQ and final band; open FAQ #1 and #2 by default | Visible price and parents answers | FAQ opens, scroll |

### Medium (a few days)
| Change | Effect | Test |
|---|---|---|
| Product overview right under the hero: admin dashboard + parent app (EN and AR) with 3 outcomes | Shows the product above the 1,100 px mark; the owner buys the dashboard | Scroll depth to Day section, heatmap |
| Arabic phone mockups for the AR page | Proves the differentiator, fixes AR contradiction | AR vs EN conversion parity |
| Comparison block "WhatsApp + Excel + paper vs Yawmy" (6 rows) | Names the real competitor, compresses the narrative | A/B placement before/after the Day timeline |
| Merge Security + Commitments; keep "never charge parents" once in pricing; trim FAQ to 7-8, grouped | Shorter page, less repetition | Time-to-CTA, scroll depth, bounce |
| Swap the AI security image for an on-brand illustration or real roles/settings screenshot; add hosting location and privacy policy link | Credibility | Security-question rate on calls |
| Real Egyptian nursery photography, or product-in-hand with a parent, for the hero | Trust, differentiation | A/B hero image; CTA click |
| Convert GIF illustrations to WebP/MP4 or SVG; lazy-load mockups | Faster mobile load | Lighthouse / CrUX LCP |
| Add pilot numbers or named pilot nurseries (with permission) as a strip under the hero | Social proof | A/B with vs without proof strip |

### Big bets
| Change | Effect | Test |
|---|---|---|
| Produce the 90-second tour (EN and AR) and a short hero loop, then reintroduce the watch CTA | Strong demo-intent driver | Play rate, play-to-booking rate |
| Pilot case study with before/after (hours saved on daily reports) | Biggest trust jump for a new vendor | Conversion of visitors who view it |
| Interactive demo sandbox (parent app + admin) | Self-serve for some, shorter sales cycle | Self-serve activation vs bookings |
| Segment pages: nursery owner vs international-school section; pricing calculator | Intent match, better ad quality | Segment conversion |
| Licensed fonts, SVG logo, unified icon set | Brand polish | Qualitative |

### Measurement
Primary: demo requests per unique visitor, split EN/AR and mobile/desktop. Secondary: WhatsApp clicks, form start-to-submit, scroll depth at Day/Pricing/FAQ, FAQ opens, video plays once it exists. Run one test at a time on the hero (CTA set first, then image). Launch traffic will be small, so favour large directional changes over micro-copy tests.
