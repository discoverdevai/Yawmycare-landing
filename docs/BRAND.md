# Yawmy Care brand guide

Version 1, 2026-10-23. Sources: `CLAUDE.md`, `docs/DECISIONS.md` (5, 27, 28, 30-38), `docs/MASTER-PLAN.md`, `docs/reviews/copy-warmth.md`, `docs/COPY-V2.md`, `src/styles/global.css`, `docs/research/*`, Figma proposal `lvSYX3lP0DsHX7SsRU2fP1` (Art direction `14:2`, Tokens `6:2`).

**Status of Arabic.** Every Arabic string in this file is marked **[AR draft, pending native review]** as a group; none is final copy. Where this guide and an older doc disagree, DECISIONS.md wins (see section 12).

---

## 1. Positioning and message pillars

**One-liner (EN, primary):** Yawmy Care is the one app that runs a nursery's day, so owners can stop running it on WhatsApp, Excel and paper.

**One-liner (AR) [AR draft, pending native review]:** يومي كير تطبيق واحد لإدارة يوم الحضانة، لتتوقف عن إدارتها بين واتساب وإكسل والورق.

**Language rule (decisions 30, 33):** English leads. Arabic is a fully supported, complete second page and app language, mentioned once and quietly ("available in Arabic and English"). Never the headline promise: no "Arabic from day one", no "built for the region" as a hook.

| Pillar | Message (EN) | Proof allowed today | Egypt | Gulf (KSA first) | US |
|---|---|---|---|---|---|
| 1. The owner's real pain | Your nursery already runs on WhatsApp, Excel and paper. It works until it does not. | Compare section, Day section. No invented numbers (no "20 messages", no "30 children"). | WhatsApp is the system today: lead with the group-chat midnight message | Same pain, slightly more formal; "international school nursery section" resonates | Name Excel and paper-and-clipboard first; WhatsApp is less central, so use "group texts and spreadsheets" |
| 2. One app for the whole day | Attendance, daily reports, photos and parent chat in one app, for owners, teachers and parents. | Real screens only (Figma dashboard, parent home, teacher daily logs, admin app). App screens are English. | Show the parent phone first | Show the owner dashboard first | Show owner dashboard + role switcher; US buyers compare to Brightwheel-style role pickers |
| 3. Flat fee, parents never pay | One flat monthly fee, paid by the nursery. Parents never pay. No commission on tuition. | Business fact stated by the owner (decision 38). Price only from `PUBLIC_REGION_*`; unset = hidden. | EGP price when set | SAR price when set | USD price when set |

Timing facts allowed (decision 34): **set up within 48 hours**, **30-minute demo**. Never "20 minutes".

Secondary line (use sparingly): "Available in Arabic and English."

Audience order: nursery owner / manager first; teachers and parents are users we describe, not buyers we address.

---

## 2. Name, tagline, logo

### 2.1 Name
| Rule | Do | Don't |
|---|---|---|
| Written form (decision 5) | **Yawmy Care** in all running copy, titles, meta, JSON-LD, social | YAWMY CARE, Yawmy, YawmyCare, yawmy care |
| Arabic | **يومي كير** | يومي (alone), mixing Latin and Arabic in one sentence for the name |
| Uppercase | Footer giant wordmark only, via CSS `text-transform`; stays Latin in both locales | Typing capitals into strings; Figma's "YAWMY CARE" casing |
| Arabic gender | Brand is masculine: «يتعامل يومي كير», «خدمته» | Switching between تتعامل / يتعامل |
| Short form | "Yawmy Care" every time. If space is tight, drop the sentence, not "Care" | "Why Yawmy" in nav (use "Why Yawmy Care") |
| Possessive / plural | "Yawmy Care's dashboard" is fine; avoid "Yawmys" | Pluralising or verbing the brand |
| Product parts | See section 9 | Inventing new product names |

### 2.2 Tagline
| | Text | Status |
|---|---|---|
| EN | **Every child's day, in one place.** | Approved (decision 35) |
| AR | **يوم كل طفل، في مكان واحد.** | [AR draft, pending native review] |

Rules: sentence case, final full stop, always in the footer; may appear as a lockup under the logo on social and decks. Do not translate word for word into other forms ("Manage Smarter" is retired).

### 2.3 Logo
Current state: **PNG only** (285x258, `logo-lockup-raw-1650-27724.png`, mark + "Yawmy Care" wordmark; raster sheet 1024x899 with 3 flat colours: green, terracotta, tan). No SVG exists. **Request to owner/designer: SVG of the mark, the horizontal lockup, a one-colour (green) version and a one-colour (white) version.** Until then, use the PNG at 2x with explicit width/height; never upscale.

| Rule | Value |
|---|---|
| Clear space | Height of the mark's letter "Y" (call it `x`) on every side; nothing (text, edge, other logos) inside it |
| Minimum size | Lockup: 96px wide on screen (printed: 25 mm). Mark alone: 24px (favicon excepted, see 2.5). Below 96px use the mark only |
| On cream (`surface`, `surface-sec`, `surface-tabs`, `primary-bg-light`) | Full-colour lockup |
| On light green (`primary-bg`) | Full-colour lockup (check the tan strokes stay visible; otherwise use the green one-colour) |
| On green (`primary-cta-strong` `#5E7748`, `primary-cta`) | White/cream (`ink-inverse`) one-colour version only. Needs the SVG |
| On white / photos | Full colour on white; on photos only the one-colour white version over a quiet area, with the clear space kept |
| Arabic pages | Same Latin lockup, not mirrored. Optional Arabic lockup «يومي كير» to be designed with the SVG, same mark |

Logo don'ts: recolour outside the palette; stretch or skew; rotate; add shadow, outline or gradient; put on busy photos or on coral; rebuild the wordmark in another font; mirror it for RTL; place it inside a blob mask; use the footer ghost wordmark (`#C7D8B6`) as a logo.

### 2.4 Favicon and OG
| Asset | Spec | Status |
|---|---|---|
| Favicon | The mark alone, 32/48 px ICO + 180 px apple-touch + SVG; mark on transparent or `primary-bg` rounded square | Needs SVG mark |
| `theme-color` | The one allowed raw hex in layout (`BaseLayout`) | Exists |
| OG image | 1200x630, cream `surface` background, mark + "Yawmy Care", one line EN headline ("Every child's day, in one place."), one product screen in a device frame (section 5), safe area 60px. Separate AR version with the AR tagline, text right-aligned | To design; real screens only, no children photos until consent |
| OG text | Title: "Yawmy Care: nursery app for owners, teachers and parents". Description: attendance, daily reports, photos and parent chat in one app. Do not lead with "Arabic" (decision 30). No security claims (decision 38) | Align with `BaseLayout` meta |

---

## 3. Colour

### 3.1 Tokens (from `src/styles/global.css`; components use utilities, never raw hex)
| Token | Hex | Role |
|---|---|---|
| `surface` | `#FFFFF5` | Page background (Figma bg/whiteColor) |
| `surface-sec` | `#FCFCEC` | Hero cream, alternating bands |
| `surface-tabs` | `#F3F5E8` | Tab and quiet tinted bands |
| `primary-bg-light` | `#F8FAEE` | Light green band |
| `primary-bg` | `#DFEBD1` | Green tint shape, icon tile, blob offset, active states |
| `primary-cta-strong` | `#5E7748` | **Buttons and green text** (AA) |
| `primary-cta-hover` | `#526840` | Hover / pressed button |
| `primary-cta` | `#76945C` | Figma green: **decorative fills only** (CTA bands, underline), never text |
| `primary-text` | `#334722` | Dark green headings, focus ring |
| `ink` | `#333333` | Body text |
| `ink-muted` | `#535353` | Secondary text |
| `ink-inverse` | `#FEFEFE` | Text on green |
| `accent` | `#E2725B` | Terracotta: dots, small details; never text |
| `accent-display` | `#E06950` | Large display highlight words (24px+ / 18.5px bold+) |
| `accent-text` | `#B5503C` | Small accent text, links to accent |
| `accent-bg-light` / `accent-bg-soft` | `#FEF8ED` / `#FCF1E6` | Warm cards, FAQ, testimonial-style blobs |
| `accent-stroke` / `stroke-accent-strong` | `#FFCCC1` / `#F5A292` | Accent hairlines, focus-adjacent card edge |
| `stroke-green` / `stroke-sec` | `#ADC697` / `#F5F5DC` | Card strokes, connector lines |
| `stroke-gray` | `#D8D8D8` | Decorative hairlines only (1.4:1) |
| `field-border` | `#898989` | Input borders (3.5:1) |
| `wordmark` | `#C7D8B6` | Footer ghost wordmark only |

Proportions (Figma 1. Colour usage): surfaces 44% / green tints 26% / CTA and active green 14% / ink 12% / accent 4%. Green carries action. Terracotta is **one detail per band**, never a large fill.

### 3.2 Contrast (computed with WCAG 2.x relative luminance from the tokens above)
AA text needs 4.5:1 (normal) or 3:1 (large: 24px, or 18.66px bold). Non-text needs 3:1.

| Text token | surface | surface-sec | surface-tabs | primary-bg-light | primary-bg | accent-bg-light | accent-bg-soft |
|---|---|---|---|---|---|---|---|
| `ink` | 12.6 PASS | 12.2 PASS | 11.5 PASS | 12.0 PASS | 10.2 PASS | 12.0 PASS | 11.4 PASS |
| `ink-muted` | 7.7 PASS | 7.4 PASS | 7.0 PASS | 7.3 PASS | 6.2 PASS | 7.3 PASS | 6.9 PASS |
| `primary-text` | 10.1 PASS | 9.8 PASS | 9.2 PASS | 9.6 PASS | 8.2 PASS | 9.6 PASS | 9.1 PASS |
| `primary-cta-strong` | 5.0 PASS | 4.8 PASS | 4.5 PASS (edge) | 4.7 PASS | **4.0 FAIL normal, large only** | 4.7 PASS | **4.48 FAIL normal, large only** |
| `primary-cta-hover` | 6.1 PASS | 5.9 PASS | 5.6 PASS | 5.8 PASS | 5.0 PASS | 5.8 PASS | 5.5 PASS |
| `accent-text` | 5.0 PASS | 4.9 PASS | 4.6 PASS | 4.8 PASS | **4.06 FAIL normal, large only** | 4.8 PASS | 4.5 PASS (edge) |
| `accent-display` | 3.3 large only | 3.2 large only | 3.0 large only | 3.2 large only | **2.7 FAIL** | 3.2 large only | **3.0 large only (edge)** |
| `accent` (`#E2725B`) | 3.1 non-text only | 3.0 non-text | 2.8 FAIL | 2.9 FAIL | 2.5 FAIL | 2.9 FAIL | 2.8 FAIL |
| `primary-cta` (Figma `#76945C`) | 3.4 large/non-text | 3.3 | 3.1 | 3.2 | 2.8 FAIL | 3.2 | 3.1 |

Reverse (text on fills):
| Pair | Ratio | Verdict |
|---|---|---|
| `ink-inverse` on `primary-cta-strong` (buttons) | 4.95 | PASS all sizes |
| `ink-inverse` on `primary-cta-hover` | 6.1 | PASS |
| `ink-inverse` on `primary-cta` (`#76945C`) | 3.38 | FAIL for text; decorative bands may carry only large (24px+) text |
| `wordmark` on `primary-cta-strong` | 3.3 | Decorative only |
| `field-border` on `surface` | 3.5 | PASS non-text |

**Allowed for running text:** `ink`, `ink-muted`, `primary-text` on any surface or tint; `primary-cta-strong` and `accent-text` on `surface`, `surface-sec`, `primary-bg-light`, `accent-bg-light` (and at the edge on `surface-tabs` / `accent-bg-soft`: prefer `ink` there). **Not allowed for normal text:** `primary-cta-strong` or `accent-text` on `primary-bg` (use `primary-text`); `accent`, `accent-display` and `primary-cta` as text colour below large size; `stroke-*`, `wordmark`.

Accent rules:
1. One accent detail per band (a dot, an underline, one highlighted word).
2. Highlighted hero words use `accent-display` at display size only.
3. Accent dot on icons: 8-10px, top right, only when it adds meaning (unread, new).
4. No accent button fills, no accent backgrounds above ~4% of a band; coral social discs in the footer are the only large accent use (design-approved).
5. Never convey state by colour alone (errors get text and an icon; selected card gets a stroke).

---

## 4. Typography

| | English | Arabic |
|---|---|---|
| Licensed face (pending) | **Recoleta**: Regular, Medium, SemiBold, Bold, Black | **Expo Arabic**: Book, Medium, Bold |
| Stand-in now | **Fraunces Variable** (`@fontsource-variable/fraunces`) | **Readex Pro Variable** |
| Stack | `Recoleta, "Fraunces Variable", Georgia, serif` | `"Expo Arabic", "Readex Pro Variable", Tahoma, "Segoe UI", sans-serif` |
| Switch-over | Drop licensed WOFF2 into `src/assets/fonts`; no code change (decision 9). Licences are the owner's to buy | same |

Note: Fraunces is wider than Recoleta; re-check heading wraps (hero 3 lines) after the swap. Latin spans inside Arabic keep the Latin stack.

### 4.1 Scale (from tokens; mobile base, fluid from 768 to 1280)
| Style | Mobile | Desktop (1440) | Weight | Line-height EN / AR |
|---|---|---|---|---|
| Hero | 36 (AR 38) | 58 (AR 62) | Bold | 1.3 / 1.5 |
| H2 | 28 | 48 | Bold | 1.2 / 1.4 |
| Band title | 26 | 40 | Bold | 1.2 / 1.4 |
| H3 | 24 | 32 | Bold | 1.2 / 1.4 |
| Title | 20 | 24 | Medium-Bold | 1.3 / 1.5 |
| Lead | 18 | 24 | Regular | 1.3 / 1.5 |
| Body | 16 | 20 | Regular (AR Book) | 1.3 / 1.5 |
| Button | 18 | 18 | Medium-Bold | 1 / 1.4 |
| Caption | 14 | 14 | Regular | 1.3 / 1.5 |

### 4.2 Rules
| Rule | EN | AR |
|---|---|---|
| Case | Sentence case on headings and buttons; no Title Case | n/a (no case) |
| Weights | Max 3 per page (Regular, Medium, Bold); no faux bold/italic (`font-synthesis: none`) | Book / Medium / Bold only |
| Line-height | 1.2 headings, 1.3 body | **1.4 headings, 1.5 body; never below 1.4** (diacritics clip at 1.0; e.g. عرضًا) |
| Letter-spacing | Default; small caps labels only +0.02em | **None, ever** (breaks Arabic joins). No `text-transform` |
| Digits | Western (0-9) | **Western digits** in Arabic copy too |
| Mixed text | Phone numbers, emails and ranges wrapped in an LTR isolate (`<bdi>` / `dir="ltr"`) inside RTL: `name@example.com`, `+20 100 000 0000`, `1-30` (use en dash) | same |
| Wrapping | `text-wrap: balance` on h1-h3, `pretty` on p/li; no one-word last lines | same |
| Emphasis | Colour and weight, not underline; underline = links | Same; no italics in Arabic |
| Length | AR hero H1 under ~55 chars, buttons under 28, card titles under 32 | |
| Separators | Do not read middle dots aloud: use separate elements, not "A · B" strings | same |

---

## 5. Imagery, illustration, iconography (Figma art direction, sections 2 and 3)

| Area | Rule |
|---|---|
| **One icon language** | 2px stroke on a 24px grid (scale with the icon), round caps and joins, corner radius 3-4 on every rectangle; colour `primary-cta-strong`; one soft `primary-bg` shape offset down-right behind it; at most one small accent dot (8-10px, top right, only when it adds meaning). **No** gradients, no outlines in other colours, no stock 3D, no mixed weights. Sample set: chat, calendar, camera, shield, bell. (Shield: use only once a security claim is allowed again, decision 38.) Icons are decorative (`aria-hidden`) unless they stand alone, then labelled |
| **Product screens** | Real screens only, untouched: never redraw or tint them. Always inside a **device frame: 4px ink stroke, radius 36 (phone), soft shadow**; desktop dashboard in a lighter frame. Screens come from Figma (owner dashboard `1659:29977`, parent home `598:75365`, teacher daily logs `876:53138`, admin home `598:106917`). No lorem ipsum. App screens are English today: caption "screens shown in English" or supply Arabic screens; do not claim an Arabic UI redesign |
| **Blob masks** | Photos and portraits crop with one of three masks: A (large top-left + bottom-right corners), B (arch), C (soft card), plus a 24px offset `primary-bg` tint behind, down-right. Same shape language as cards. Ratios 4:5, 1:1, 3:2. No drop shadow on photos; no filters beyond light exposure matching; no text on photos |
| **Illustration** | Flat green + coral line style like the dashboard "Good morning" teacher figure and the parent empty-state art; export those (child nodes of `1650:29614`, `598:75365`) to replace any mismatched artwork. Same stroke weight as the icons. **No AI-looking art** (glossy 3D, six-finger hands, symmetrical fake smiles, uncanny textures); the six feature GIFs stay until licence is confirmed (decision 11) and must be restyled if they do not match |
| **Hero** | Product first (dashboard + phones composite). **No stock-toddler hero.** The current hero photo is a placeholder for treatment only |
| **People** | **No founder faces or names** until consent (decisions 27, 28). No invented testimonials, logos, counts. Customer strip appears only from `src/config/proof.ts` with real, consented customers |
| **Wave / scallop** | Only at the hero bottom, the pricing top and the footer top (decision 23); all other joins flat |
| **Alt text** | Describe the product or the moment in one sentence, under ~140 chars; EN and AR both |

### Photography (when real nursery photos exist)
| Topic | Guidance |
|---|---|
| Consent | Signed, per-child parental consent, in writing, including the right to withdraw; the nursery's own consent is not enough. No child shown without it. Keep a consent log per image file. Prefer backs of heads, hands, drawings, and activities where faces are not needed |
| Look | Warm daylight, eye level, faces and hands, calm moments; no heavy filter, no flash, no staged "perfect smile" |
| Settings diversity | Egypt: family-run nurseries, mixed-age rooms, hijab-wearing and non-hijab teachers; Gulf: bigger purpose-built centres, abaya/thobe on pickup, international-school nursery sections; US: home-based and centre-based, diverse families. Show real rooms, not catalogue rooms. Mix of staff genders (teachers are mostly women, show real ratios) |
| Cultural care | Cover/modesty norms respected; no photos of mothers without their consent; avoid religious symbols as props; no alcohol, pork, or other off-context items in frame |
| Credits | Credit the nursery only if they agree in writing; otherwise unattributed |
| Technical | Original at least 2400px long edge, AVIF/WebP with explicit width/height, mask per section 5, alt text in both languages |
| Not allowed | Stock toddlers as the hero; photos of founders/staff before consent; photos with visible logos of other brands, readable screens or documents; children's names or ID badges |

---

## 6. Motion (Figma art direction, section 4)
Calm and purposeful. 200-320 ms, ease-out, **transform and opacity only**. Motion explains or confirms; it never decorates text.

| Element | What animates |
|---|---|
| Hero product composite | Devices rise 16px and fade in on load, 80 ms stagger, **once** |
| Role tabs | Screen cross-fades 200 ms; panel height does not jump |
| Day timeline cards | Each card fades up 12px once when it enters the viewport |
| Buttons and cards | Hover lift 2px with a softer shadow (pointer devices only); press returns to 0 |
| Charts (optional) | Bars grow once when visible |
| **Never** | H1, body text, scallops, header, pricing numbers; no parallax, no autoplay loops, no scroll-jacking |

Rules: play once, never loop; `prefers-reduced-motion` turns everything into instant or a 1 ms fade; the pause-animations control stays (below 640px it sits at the bottom of the footer, decision 36). Focus is always visible: 3px ring in `primary-text`, 2px gap; hover states only on pointer devices. In RTL, slide directions mirror.

---

## 7. Voice and tone

**Who we sound like:** a calm, experienced friend who has sat in many nurseries. Warm, plain, specific, honest, a little dry-funny. One person addressed ("you" / «حضانتك»). We say what happens, not what the product "enables".

### 7.1 Do / Don't
| Do | Don't |
|---|---|
| Short sentences, active verbs ("Parents check in at the gate.") | leverage, streamline, solution, platform, operations, workflow, seamless, all-in-one, smart, revolutionise |
| Name the real thing: attendance, nap, photo, midnight message | "next-gen synergy", "AI-driven insights" (no AI claims) |
| Say what the button does ("Book a free demo") | "Submit", "Get started" with no object, "Watch Demo" |
| One idea per sentence, one promise per card | Repeat the title in the body; same phrase in three sections |
| Contractions in EN, sentence case, UK spelling (nappies, immunisations) kept consistent | Title Case, exclamation marks, emoji |
| Helpful errors ("That number does not look right. Use 8 to 15 digits.") | "Please enter...", "Something went wrong" |
| Same promise strength in AR and EN | Stronger Arabic than English |
| Say "we are new" when it is true | "number one", "trusted by thousands", "most nurseries" |

### 7.2 Twelve before / after (EN and AR) **[AR draft, pending native review]**
| # | Before EN | After EN | Before AR | After AR |
|---|---|---|---|---|
| 1 | Nursery management software, built for the region. | Run your nursery from one app, not WhatsApp and Excel. | برنامج إدارة الحضانات، مصمم للمنطقة. | أدِر حضانتك من تطبيق واحد، لا من واتساب وإكسل. |
| 2 | Manage Smarter with Yawmy Care. | Every child's day, in one place. | أدر بذكاء مع يومي كير | يوم كل طفل، في مكان واحد. |
| 3 | Get Your Daily Care Ready | We set it up with you | كل شيء جاهز للبدء | نجهّزها معك |
| 4 | Watch Demo | Watch the 2-minute tour | شاهد العرض | شاهد جولة سريعة في دقيقتين |
| 5 | Most nurseries are set up in under 20 minutes. | We set your nursery up within 48 hours. | تُجهَّز معظم الحضانات في أقل من 20 دقيقة. | نجهّز حضانتك خلال 48 ساعة. |
| 6 | Five things we will not do to you | Five promises to every nursery | خمسة أشياء لن نفعلها معك | خمسة وعود لكل حضانة |
| 7 | Please enter a valid email address, like name@example.com. | That email does not look right. It should look like name@example.com. | يرجى إدخال بريد إلكتروني صحيح. | يبدو أن البريد غير صحيح. يجب أن يكون مثل name@example.com. |
| 8 | Something went wrong | Your request has not gone through | حدث خطأ ما | لم يصل طلبك بعد |
| 9 | Thank you. You are all set | Thank you. We will be in touch. | شكرًا لك، تم كل شيء | شكرًا لك، سنتواصل معك. |
| 10 | Prefer a walkthrough? Book a demo | Prefer to see it first? Book a demo | تفضل عرضًا مباشرًا؟ احجز عرضًا تجريبيًا | تحب أن ترى التطبيق أولًا؟ احجز عرضًا تجريبيًا |
| 11 | Parents message you at midnight and you answer out of fear. | Parents message at midnight, and you reply so they do not worry. | ترد عليهم خوفًا من أن يظنوا أن هناك مشكلة. | فتردّ عليهم حتى لا يقلقوا. |
| 12 | Powerful AI-driven insights for every child. | Meals, nap, mood: noted as they happen, not from memory at half past four. | رؤى قوية مدعومة بالذكاء الاصطناعي. | الوجبات والقيلولة والمزاج: تُسجَّل في وقتها، لا من الذاكرة عند الرابعة والنصف. |

### 7.3 CTA vocabulary
| Use | EN | AR [draft] | Notes |
|---|---|---|---|
| Primary | Book a free demo | احجز عرضًا تجريبيًا مجانيًا | Always names the thing; "30-minute demo" when time is stated |
| Nav / bands | Book a demo | احجز عرضًا تجريبيًا | |
| Secondary | Watch the 2-minute tour | شاهد جولة سريعة في دقيقتين | Only while the video exists; otherwise hide |
| Chat | Chat with us on WhatsApp | كلّمنا على واتساب | Only when the current region has a number |
| Email | Email us | راسلنا بالبريد | |
| Submit | Book my free demo | احجز عرضي التجريبي المجاني | |
| Pricing | Ask for pricing in {region} | اسأل عن السعر في {المنطقة} | When price unset |
| Never | Submit, Click here, Learn more (alone), Get started (alone), Sign up now, Don't miss out | | |

Glossary (fixed): room = فصل; parents = أولياء الأمور; nursery = الحضانة; teachers = المعلمات (feminine, decision 32; EN "teachers"); demo = عرض تجريبي; subscription = اشتراك; tour = جولة; check-in = تسجيل الحضور; quiet hours = ساعات الهدوء; "WhatsApp" = واتساب and "Excel" = إكسل in Arabic sentences.

### 7.4 Claims policy
| Rule | Detail |
|---|---|
| Show it or drop it | Every claim maps to a real screen or an owner-confirmed fact (`docs/OWNER-CLAIMS.md`) |
| No unprovable superlatives | no "best", "#1", "smartest", "most nurseries", "thousands" |
| **No security / data / privacy claims** (decision 38) | No encryption, backup, retention, deletion, export, role-based access, data location, compliance, "safe / secure / protected". Re-enable only after the owner confirms facts |
| No fake proof | No invented testimonials, logos, counts, ratings, case studies, "as seen in"; testimonial and founders sections stay unpublished (27, 28) |
| No invented numbers | No prices, phone numbers, radius ("100 m" is gone, decision 31: say "within a distance you set"), counts, save-time stats |
| No unbuilt features | No billing/invoices, NFC, transport, AI, curriculum (MASTER-PLAN) |
| Allowed business facts | Parents never pay; one flat monthly fee paid by the nursery; no commission on tuition; setup within 48 hours; 30-minute demo |
| No reply-time promises | Beyond what the owner has stated ("We will contact you to confirm your demo") |
| Competitors | Name categories (WhatsApp, Excel, paper), not rival brands, in marketing copy |
| Honest stage | "We are new" is acceptable and good |

### 7.5 Humour and warmth boundaries
Dry, observational humour about the *situation* ("Nothing lost in a group chat. Nothing written twice."), never about parents, teachers, children or nursery owners; no sarcasm about incidents, allergies, medication or attendance errors; no jokes in error states, incident reports or anything touching child safety; at most one light line per section; no emoji, no memes, no exclamation marks (one allowed in the demo success state, pending owner OK).

### 7.6 Regional notes
| | Egypt | Gulf (KSA first) | US |
|---|---|---|---|
| Arabic register | Warm light-MSA site-wide; a touch of Egyptian colloquial **only** in short social copy and WhatsApp replies, never in H1/FAQ (COPY-V2's "بطّل", "كام" are retired on the page) | Light-MSA; slightly more formal; honorifics fine in sales replies; avoid Egyptian dialect | n/a |
| English | Plain, short; many readers are English-second | Plain, international; "nursery" and "international school" both understood | American: "daycare", "child care center", "preschool", "director", "diaper", "classroom"; use US spelling on US-facing pages/ads, otherwise the site's UK spelling |
| Pain framing | WhatsApp groups, midnight messages | Same + oversight for owners with several branches (only if the product supports it) | Excel, paper sign-in sheets, group texts; compare to role-based apps |
| Greeting / prefill | السلام عليكم in WhatsApp prefill | السلام عليكم | Hi |
| Money / numbers | EGP, Western digits | SAR, Western digits | USD |
| Do not | Over-colloquialise; sound local-only | Imply religious endorsement; mix dialects | Use "nursery" for daycare; assume Brightwheel-style certifications |

---

## 8. Naming (product and spec words)
Spec for UI labels and copy. AR labels **[AR draft, pending native review]**.

| EN (use) | AR [draft] | What it is | Avoid |
|---|---|---|---|
| Owner dashboard | لوحة المالك (or لوحة صاحب الحضانة) | Desktop web: attendance, rooms, enrollment, activity | "Admin panel", "back office" |
| Admin app | تطبيق الإدارة | Mobile admin: setup, rooms, enrollment, chat | "Manager app" |
| Teacher app | تطبيق المعلمة | Daily logs, attendance, incidents, photos, chat | "Staff app" (staff = المعلمات والموظفين) |
| Parent app | تطبيق ولي الأمر | Child's day, check-in, gallery, announcements, chat | "Parent portal" (that is a Figma flow name) |
| Yawmy Care app | تطبيق يومي كير | Umbrella when role is not needed | "the platform" |
| Roles in tabs | Owner / Teacher / Parent | المالك (or صاحب الحضانة) / المعلمة / ولي الأمر | |
| Parts | Daily report, attendance, check-in, announcements, gallery, chat, incident report | التقرير اليومي، الحضور، تسجيل الحضور، الإعلانات، المعرض، المحادثة، تقرير الحادثة | "Logs" (use "daily report" to owners), "feed" |

Rule: capitalise only the product names above in running text ("the Teacher app"), lower-case features.

---

## 9. Social, OG, email (templates described, not designed)
| Item | Template description |
|---|---|
| OG / link preview | See 2.4. EN and AR versions, one product screen in a device frame on cream |
| Social profile | Avatar: the mark on `primary-bg`. Banner: cream, tagline, one device frame. Bio EN: "Nursery app for owners, teachers and parents. Every child's day, in one place." |
| Social post grid | Cream background, one `ink` headline (max 8 words, sentence case), one product screen or the icon tile, small logo bottom corner, one accent detail. No stock photos; photos only with consent |
| Post types | "A day at your nursery" (one timeline card), "Before/after" (WhatsApp mess vs one screen, using generic art, not real chats), product tip, promise of the week (flat fee, parents never pay). Never fake reviews |
| Ads | Same grid; headline from the Do-list; CTA "Book a free demo"; landing page by audience and region; Egypt/Gulf Arabic ads in light-MSA with a colloquial opener only if natively reviewed |
| WhatsApp (main sales channel) | Greeting, one-line answer, link to book a demo, no attachments with claims; prefilled site message per 7.6 |
| Email, transactional (demo confirmation) | Plain, cream header with logo (PNG until SVG), 2 short paragraphs, the stated 30-minute demo, one button "Add to calendar" or "Reply to confirm"; no security statements; footer with company details supplied by the owner; EN/AR per the visitor's page language |
| Email, follow-up | Subject: sentence case, under 50 chars, no emoji; body 80-120 words, one question, one CTA |
| Email layout | 600px, `surface` background, `ink` text 16px+, buttons `primary-cta-strong` with `ink-inverse`, RTL for Arabic (`dir="rtl"`, right-aligned), Western digits |
| Legal | Privacy and terms text is the owner's; we never write it (decision 27 second) |

---

## 10. Review checklist (any new page, ad, email)
Tick every row; any "no" blocks release.

| # | Check |
|---|---|
| 1 | Name is "Yawmy Care" / «يومي كير»; no uppercase typed; tagline exact if used |
| 2 | English leads; Arabic is a supported language, not the headline (decision 30) |
| 3 | Headline names a real pain or product job; no "smart/seamless/revolutionary" |
| 4 | One of the three pillars is clear; parents-never-pay appears where price is discussed |
| 5 | Every claim has a screen or an owner-confirmed fact; **no security/data/privacy claim** (38) |
| 6 | No invented numbers, prices, quotes, logos, founders, customers (27, 28) |
| 7 | Timings are 48 hours setup, 30-minute demo; no "20 minutes", no "100 metres" |
| 8 | Colours are tokens; every text pair passes section 3.2 (no `cta-strong` or `accent-text` text on `primary-bg`; no accent text below large size) |
| 9 | Accent: one detail per band, no accent fills |
| 10 | Fonts per section 4: sentence case, max 3 weights, AR line-height 1.4+ and no letter-spacing, Western digits |
| 11 | Icons from the one set; product screens untouched, in device frame; no stock-toddler or AI-looking art |
| 12 | Photos: consent on file, blob mask, no shadow/filter, alt text in both languages |
| 13 | Motion: once, 200-320 ms, transform/opacity only, reduced-motion respected |
| 14 | CTA says what happens; button text per 7.3; one primary per view |
| 15 | Arabic is light-MSA, feminine teachers, masculine brand, same promise strength; **flagged for native review** until reviewed |
| 16 | RTL: logical properties, emails/phones in LTR isolate, no mirrored logo, arrows mirrored |
| 17 | Contrast and focus checked; targets at least 44px; works at 375 / 768 / 1024 / 1440 in EN and AR |
| 18 | Regional values (WhatsApp, price, currency) come from `regions`; unset = hidden |
| 19 | Humour only about the situation, none near safety |
| 20 | Legal text, contact numbers and addresses supplied by the owner, not written by us |

---

## 11. What the owner must supply
1. Logo as SVG (mark, lockup, one-colour green and white, favicon source).
2. Licensed fonts: Recoleta (Regular, Medium, SemiBold, Bold, Black) and Expo Arabic (Book, Medium, Bold), web licences, WOFF2.
3. Photography direction: real photos or one illustration style (MASTER-PLAN item 6), plus a consent process and the first consenting nursery.
4. Native Arabic review of every string marked draft in this file.
5. Confirmation of the six feature GIF licences; Arabic app screens or acceptance of "screens shown in English".
6. Company details for email footers and legal text; real regional numbers and prices.
7. Decisions: the demo-success exclamation exception; whether the tour video exists; Arabic teacher gender confirmation; brand gender in Arabic.

## 12. Known conflicts resolved here
| Older source says | This guide uses | Why |
|---|---|---|
| Figma art direction Do: "The button only works inside 100 metres." | "within a distance you set" | Decision 31 |
| copy-warmth / COPY-V2: "20 minutes" setup and demo | 48 hours setup, 30-minute demo | Decision 34 |
| Figma Do/security items, copy-warmth security rows | No security/data claims | Decision 38 |
| COPY-V2: "Arabic from day one", Egyptian colloquial H1 | Arabic supported, not headline; light-MSA | Decisions 30, 33; copy-warmth register note |
| copy-warmth: "Why Yawmy Care" nav, teachers "المعلمات" | Adopted | Decisions 5, 32 |
| `CLAUDE.md`: Figma copy "YAWMY CARE" | "Yawmy Care" in strings | Decision 5 |
