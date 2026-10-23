# Roadmap: fix everything, then raise the page to top-edtech standard

Inputs: `docs/FIX-PLAN.md` (open fixes), `docs/REVIEW-COMPETITIVE.md` (benchmark + critique), `docs/OWNER-CLAIMS.md`, `docs/reviews/*`.
"Top edtech startup" bar used here (principles, not claims about any named company): one sharp promise above the fold; **product and proof visible in the first screen**; a clear single action; real customers, numbers and a price; delight without noise (motion with purpose); effortless on a phone; fast; accessible; and trustworthy data handling. Measured by outcomes (conversion, speed, accessibility), not by looks alone.

## Phase 0: Close the loose ends (1-2 days, no owner input needed)
| # | Task | Done when |
|---|---|---|
| 0.1 | Finish the refactors in flight: shared `CtaBand`, `BlobCard` `stretch`, split `DemoModal` | build identical in screenshots; 0 type errors |
| 0.2 | Remaining small fixes: drop unused font subsets (edit `global.css`), move optimise scripts into `scripts/` + npm scripts, keyboard-test MotionToggle | verified in browser |
| 0.3 | CI on GitHub (added) + Lighthouse CI budget (LCP, CLS, weight) | green check on push |
| 0.4 | Hosting: pick host (Netlify/Cloudflare Pages/Vercel), preview deploys per PR, apply `public/_headers` + CSP, `/ -> /en/` 301 | live preview URL, headers verified with a scanner |

## Phase 1: Conversion quick wins (3-5 days; some owner inputs)
| # | Screen / area | Change | Needs owner |
|---|---|---|---|
| 1.1 | Hero | One CTA (Book a Demo) + WhatsApp secondary; tour button only when a video exists | WhatsApp number |
| 1.2 | Header | Sticky compact header on scroll; Book a Demo visible on mobile (not inside the menu) | decision |
| 1.3 | Demo dialog | 3 fields (name, mobile/WhatsApp, nursery name) + optional second step (date/time, governorate, children range); reply-time promise; WhatsApp alternative inside the dialog | reply-time promise |
| 1.4 | Global | Floating WhatsApp button (prefilled AR/EN message), sticky on mobile | number |
| 1.5 | All sections | Remove placeholders (Lorem ipsum bubbles, logo-as-screen, sample IDs); dedupe repeated lines ("never charge parents" x5); unify CTA labels and "15 vs 20 minutes" | confirm wording |
| 1.6 | Claims | Replace unprovable claims with evidenced ones; hold legal/security claims until verified (`OWNER-CLAIMS.md`) | verify claims |
| 1.7 | Arabic | Digit/spacing/bidi QA across the AR page; apply glossary decisions | native review |

## Phase 2: Proof, price, product (1-2 weeks; mostly owner-supplied content)
| # | Screen / area | Change | Needs owner |
|---|---|---|---|
| 2.1 | Below hero | Proof strip: 3 named Egyptian nurseries (logo, name, city, role, approved quote) + one real number once true | customers' consent |
| 2.2 | Pricing | Show the flat fee (EGP) or "from"; what is included; no setup fee, free migration, cancel/export anytime; international-school "talk to us" stays | price decision |
| 2.3 | Hero + Day timeline | Real product: owner dashboard + Arabic RTL parent-app screens (bilingual mockup); Owner / Teacher / Parent switcher | real captures |
| 2.4 | Features | Re-title cards to match what they show; cut to the 4-6 strongest; real UI crops instead of generic icons | copy approval |
| 2.5 | New block | "Why not WhatsApp, Excel, paper?" comparison | copy approval |
| 2.6 | Security / Trust | Specific trust block: who sees photos, data location, retention, parent consent; verified facts only (no "compliant" claim until counsel confirms; Egypt PDPL grace ends ~Nov 2026); replace the AI-looking image | hosting + legal facts |
| 2.7 | Commitments / FAQ | Merge overlapping content; FAQ 13 -> 8-10 + "more"; answers verified (`OWNER-CLAIMS.md`) | facts |
| 2.8 | Founders | Keep; add roles/credentials and a "why Egypt" line; confirm consent and Arabic approval | consent |
| 2.9 | Footer + legal | Privacy policy, terms, contact (address/WhatsApp/email), social links, copyright | legal text |
| 2.10 | Page order | problem -> proof -> product -> how it works -> trust -> price -> objections -> CTA | none |

## Phase 3: Brand and craft (2-3 weeks; needs fonts/design assets)
| # | Area | Change |
|---|---|---|
| 3.1 | Typography | Licensed Recoleta + Expo Arabic; re-tune hero overlap, nav breakpoint (1360 -> 1280), card heights |
| 3.2 | Art direction | Replace stock-style hero photography with a consistent, real-nursery or illustrated set; one illustration style for all icons/animations; logo as SVG |
| 3.3 | Motion | Purposeful, light micro-interactions (scroll reveals, count-ups for real numbers, hover states), all behind reduced-motion and the pause toggle |
| 3.4 | Social share | Designed OG images (EN/AR), favicon art, app-store badges if apps exist |
| 3.5 | Interactive demo | 60-90 s Arabic video or an interactive product tour (restores the tour CTA) |
| 3.6 | Mobile craft | Dedicated mobile layouts reviewed on real devices (iOS Safari, Android Chrome), thumb-zone CTAs |

## Phase 4: Growth engine (ongoing)
| # | Area | Change |
|---|---|---|
| 4.1 | Booking | Instant calendar booking or self-serve trial instead of form -> call |
| 4.2 | Analytics | Privacy-respecting analytics on `yawmy:demo-*`, WhatsApp clicks, scroll depth, form start->submit; consent banner only if required |
| 4.3 | Experiments | A/B: single vs dual hero CTA; 3 vs 5 fields; price shown vs hidden; sticky WhatsApp vs none; AR dialect hook vs MSA |
| 4.4 | Landing variants | Owner vs parent vs international-school; Egypt vs GCC; paid-traffic pages per keyword |
| 4.5 | Local proof + payments | Fawry/e-wallet/bank-transfer features, case studies, local data-law notes |
| 4.6 | SEO content | Arabic + English guides (nursery management, parent communication), `llms.txt`, structured data expansion |

## Targets (acceptance for "top edtech" level)
| Metric | Target |
|---|---|
| Lighthouse mobile (EN + AR) | Perf >= 90, Accessibility 100, Best Practices >= 95, SEO 100 |
| Core Web Vitals (mobile, 4G) | LCP < 2.5 s, CLS < 0.05, INP < 200 ms; page weight < 2.5 MB first view |
| Accessibility | WCAG 2.2 AA, axe 0 violations, tested with a screen reader (VoiceOver/TalkBack) and keyboard |
| Conversion (to be baselined) | demo requests / visitors, WhatsApp click rate, form start->submit > 60% |
| Trust | >= 3 named customers, a visible price, a real product shot above the fold, zero placeholders |
| Arabic quality | native-reviewed copy, real RTL product screens, consistent digits |

## Dependencies on you (what unblocks the most)
1. WhatsApp number + reply-time promise (1.1, 1.3, 1.4)
2. Price or range in EGP (2.2)
3. Three nurseries willing to be named + quotes (2.1)
4. Real product captures: owner dashboard + Arabic parent app (2.3, 2.4)
5. Legal text + verified data facts (2.6, 2.9) and founders' consent (2.8)
6. Licensed fonts, logo SVG, designed OG art (3.1, 3.2, 3.4)
7. Hosting choice + form destination (0.4, 1.3)

## Suggested order and effort
Phase 0 (2 d) -> Phase 1 (5 d) -> Phase 2 (10 d, parallel with content gathering) -> Phase 3 (15 d, design-led) -> Phase 4 (continuous). Phases 0 and 1 can start immediately; everything marked "needs owner" ships as soon as its input arrives, so the order flexes without blocking.
