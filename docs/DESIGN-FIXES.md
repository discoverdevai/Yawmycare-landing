# Design, content and component fixes (plan)

From the honest review (`docs/REVIEW-COMPETITIVE.md`) and a fresh look at the page at 1440. "Me" = I can do it now; "You" = I need your input first.

## A. Header and first screen
| # | Fix | Detail | Who | Effort |
|---|---|---|---|---|
| A1 | Remove the top strip | Delete the tagline + social strip (frees ~76px); header becomes one row | Me (in progress: social icons already being removed) | S |
| A2 | Trim the nav to 5-6 links | Keep: Why Yawmy, How it works, Security, Pricing, FAQ (+ language, Book a Demo); all 9 stay in the footer; fixes the 1360px collapse problem | Me | S |
| A3 | Sticky compact header + visible Book a Demo on mobile | in progress (features engineer) | Me | S |
| A4 | Single hero CTA + WhatsApp secondary | in progress; tour button only when a video exists | Me | S |
| A5 | Hero shows the product | Owner dashboard + Arabic parent-app screens in the hero (bilingual mockup), Owner/Teacher/Parent switcher; photo becomes secondary | **You: real screenshots** | M |
| A6 | Hero headline fit | 4 lines is too heavy: tune size/line breaks once licensed fonts arrive | **You: fonts**; me | S |

## B. Visual language
| # | Fix | Detail | Who | Effort |
|---|---|---|---|---|
| B1 | Use scalloped edges with restraint | Keep at hero, pricing, footer; flat clean joins elsewhere | Me | S |
| B2 | One illustration style | Replace mismatched animated icons with one consistent set (or a calmer static set) | **You: art direction OK / designer**; me for static set | M |
| B3 | Replace the AI-looking security image | Brand-style illustration or real UI crop | **You / designer** | M |
| B4 | Replace placeholder content in screenshots | Lorem ipsum, logo-as-screen, sample ID | **You: real captures** | S |
| B5 | Real photography direction | Real nursery photos (consented) or a consistent illustration style; replace stock-like toddlers | **You** | M |
| B6 | Licensed fonts + logo SVG | Recoleta + Expo Arabic; logo as SVG | **You** | S |

## C. Sizes, spacing and components
| # | Fix | Detail | Who | Effort |
|---|---|---|---|---|
| C1 | Tighten vertical rhythm ~20-25% | Reduce section gaps (182px -> ~140px at 1440), wave heights, header-to-content gaps; fewer scrolls | Me | S |
| C2 | Blob cards never taller than content | Relax aspect ratio on tablet/mobile; remove empty areas | Me | M |
| C3 | Merge/trim sections | Features to 4-6 cards, FAQ 13 -> 10, three CTA bands -> two; commitments + security overlap | Me (copy engineer in progress) | M |
| C4 | Consistent card and button scale | One set of radii/paddings per card type; check 375/768 | Me | S |
| C5 | Phone mockups larger | Product shots at readable size in the day timeline | Me (+ A5 captures) | M |

## D. Content and proof
| # | Fix | Who |
|---|---|---|
| D1 | Remove repeats, unprovable claims, "15 vs 20 minutes" (in progress) | Me |
| D2 | "Why not WhatsApp, Excel or paper?" block (in progress) | Me |
| D3 | Price per region (EGP/SAR/USD) and regional WhatsApp/phone | **You: prices + numbers** (code ready, hidden until set) |
| D4 | 3 named nurseries with quote + logo | **You: customers + consent** |
| D5 | Trust block with verified facts + privacy page | **You: facts + legal text** |
| D6 | Native Arabic review | **You / reviewer** |

## E. Order of work
1. **Now (me, no inputs):** A1-A4, B1, C1-C4, D1-D2 (A3/A4/D1/D2 already running).
2. **Next (me, after engineers finish):** new booking dialog (`docs/FORM-SPEC.md`), verification, push.
3. **Needs you (send in any order):** real product screenshots (A5, B4, C5); price + WhatsApp numbers per region (D3); customers (D4); fonts + logo SVG (B6, A6); illustration/photo direction (B2, B3, B5); legal text and verified claims (D5).

## F. What I need from you, in one list
1. Screenshots: owner dashboard + Arabic parent app (EN too if available)
2. Price (or "from" price) in EGP, SAR and USD
3. WhatsApp/phone numbers for Egypt, Saudi Arabia and the US
4. Three nurseries (name, city, person, quote, logo, permission)
5. Licensed Recoleta + Expo Arabic files; logo as SVG
6. Decision: keep the animated icons, or switch to one calm consistent style?
7. Decision: real photos (who supplies them?) or illustration for the hero
8. Privacy/terms text and confirmation of the security/data claims in `docs/OWNER-CLAIMS.md`
9. Hosting choice (Netlify, Cloudflare Pages or Vercel)
