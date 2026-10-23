# Yawmy Care Landing Page — Build Plan

## 1. What we're building

A bilingual (EN / AR-RTL) single-page marketing site for Yawmy Care. It has 12 content sections plus a "Book a Demo" modal form. The canonical design is the **Updated Version** frame (`1457:3895`). The Arabic frame (`1434:3715`) is an older, shorter version of the page.

**Proposed stack (pending your OK):** Astro 5 + Tailwind CSS v4, static output, `/en` and `/ar` routes. Near-zero JS gives the best LCP for a marketing page. Small vanilla-JS islands handle the nav menu, FAQ accordion and demo modal. The demo form posts to one serverless endpoint.

## 2. Section map

| # | Section | EN node (Updated) | AR node (old) | Notes |
|---|---|---|---|---|
| 00 | Foundation | — | — | Scaffold, tokens, fonts, i18n, layout, wave divider, blob card, buttons |
| 01 | Top bar + Header/Nav | in `1592:43586` (nav `1599:43647`) | `1434:3719`, `1434:3741` | 9 nav links + Book a Demo + language switch → needs mobile menu |
| 02 | Hero | `1457:3898` | `1434:3718` | "Nursery management software, built for the region. In Arabic from day one." |
| 03 | Testimonials | in `1592:43586` | — | "We talked to nurseries on three continents…" + Owner/Teacher/Admin quotes |
| 04 | A day at your nursery | `1532:31922` | — | Timeline 7:30 → 20:00 with phone mockups; tallest section (3209px) |
| 05 | What no other app in MENA has | `1575:41862` | — | 6 differentiator cards |
| 06 | Set up in under 20 minutes | `1575:41867` | `1434:3912` (old "Getting started") | 4 steps + CTA band |
| 07 | Security | `1575:41874` | `1434:3977` | 4 items around a centre illustration |
| 08 | Five commitments | `1580:41973` | — | "Five things we will not do to you" |
| 09 | Pricing + First-10 partner | `1589:43302` | — | Flat fee, international-school "Talk to us", "Be The First Partner" |
| 10 | Founders | `1592:43397` | — | "Why we built this?" — Dr. Rana Mustafa, Mr. Mohammed |
| 11 | FAQ | `1592:43584` | — | 13 questions, accordion, FAQPage schema |
| 12 | Final CTA + Footer | `1457:4197`, `1457:4213` | `1434:4017`, `1434:4033` | Big "YAWMY CARE" wordmark footer |
| 13 | Book a Demo modal | `1326:4515` | `1437:4595` | 5 fields, validation, submission, success state |
| 14 | Launch hardening | — | — | Full-page a11y/perf/SEO pass, analytics, deploy |

The old EN frame (`1326:4089`) also has "About Yawmy" (mission/vision) and "Core Features" sections that the Updated Version dropped. **They are not in this plan unless you want them back.**

## 3. Agent team & pipeline

Five project agents in `.claude/agents/`. Each section runs through the same gated pipeline:

```
 auditor ──► planner ──► developer ◄──► reviewer ──► enhancer ──► YOU sign off ──► next section
 audit.md     spec.md      code        review.md      enhance.md
```

| Agent | Role | Writes | Key skills / tools it uses |
|---|---|---|---|
| `yawmy-auditor` | Extract and inspect the Figma section; flag gaps | `audit.md` | Figma MCP, `figma-design-to-code`, `copy-proof-check`, `ux-writing`, `accessibility-audit` |
| `yawmy-planner` | Spec, i18n keys, responsive/RTL rules, tasks with acceptance criteria | `spec.md`, `TASKS.md` | `planning-and-task-breakdown`, `spec-driven-development`, `cro-optimization` |
| `yawmy-developer` | Build the section in EN + AR, responsive | code | Figma MCP, `figma-design-to-code`, `frontend-ui-engineering`, `incremental-implementation`, built-in browser |
| `yawmy-reviewer` | Visual diff vs Figma, RTL, responsive, a11y, code review → PASS/CHANGES | `review.md` + shots | Figma screenshots, built-in browser, `accessibility-audit`, `code-review-and-quality` |
| `yawmy-enhancer` | Perf, SEO/schema, CRO, copy, motion — applies only low-risk changes | `enhance.md` | `performance-optimization`, `on-page-seo`, `schema-markup`, `cro-optimization`, `form-strategy`, `interaction-design` |

Built-in agents used alongside them:
- `agent-protocols:accessibility-specialist` for the full-page pass in section 14.
- `agent-protocols:performance-engineer` for Core Web Vitals in section 14.
- `agent-protocols:security-auditor` for the demo-form endpoint in section 13.
- `/code-review` on the final diff.

**Rules:** one section at a time. The developer and reviewer loop until the verdict is PASS. Nothing moves to the next section without your sign-off.

## 4. Plugin & tool review

**Used (already active, no install needed):**
- **Figma MCP** (connected). Reads frames, screenshots, variables and assets. Plus the `figma:*` skills: `figma-design-to-code` and `figma-use`.
- **agent-protocols.** Agents for spec, review, a11y, perf and security, plus engineering skills.
- **design-skills / design.** Accessibility audit, design critique, UX writing, interaction design.
- **copywriting-kit.** Proof-checking and editing landing-page copy.
- **rampstack-skills.** CRO, form strategy, internationalization, performance, QA testing.
- **searchfit-seo.** On-page SEO, schema markup, technical SEO, AI visibility.
- **modern-web-guidance.** Current web-platform best practice.
- **Built-in browser.** Visual QA at each breakpoint and locale.

**Not used for this job:** sales and Apollo tools, social-media, Supermetrics, Manifold, Canva, the 8b site builder (we build from Figma, not from a generator), and the deprecated Cloudflare bindings MCP.

**Needs your auth only if wanted:** GitHub (`/mcp`) for PRs, plus Notion, Linear or Asana if you want tasks mirrored there.

## 5. Preliminary audit findings (to resolve early)

| Sev | Finding |
|---|---|
| **Blocker** | The Arabic design covers only the *old* page. Sections 03, 04, 05, 08, 09, 10 and 11 have **no Arabic copy or RTL layout**. They need translated copy, and the RTL layout will be derived from the EN design. |
| **Blocker** | Commercial fonts **Recoleta** (EN) and **Expo Arabic** (AR) need licensed web-font files. |
| **Blocker** | The demo form has no submission destination yet (email, CRM, sheet?). "Watch Demo / 2-minute tour" needs a video URL. |
| Should | Placeholder copy: "A human answers, in Arabic, within **[X]** working hours." |
| Should | Grammar: "What Owners. Teachers, Parents Says :" → "What owners, teachers and parents say". |
| Should | Time labels mix formats: "14:00PM", "16:30PM", "20:00PM". Pick 12h ("2:00 PM") or 24h ("14:00"). |
| Should | Only 1440px desktop frames exist. Mobile and tablet layouts will be derived by us and reviewed with you per section. |
| Should | Testimonials and founder names/photos must be real and approved for publication. |
| Should | Pricing shows "one flat monthly fee" but no price. Confirm whether that's intentional. |
| Nice | The header has 9 nav links. Consider trimming the desktop nav to 5–6 and keeping the rest in the footer. |

## 6. Definition of done (every section)

- Matches Figma at 1440 in EN and AR, and works at 1024, 768 and 375 with no horizontal scroll.
- All copy comes from i18n files, and AR is native-quality with correct RTL.
- WCAG 2.2 AA: headings, landmarks, alt text, focus states, contrast and reduced motion.
- Reviewer PASS, enhancer pass, and your sign-off.
