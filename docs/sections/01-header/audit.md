# 01 · Header (top bar + nav) — Audit

Figma: EN `1457:3899` (top bar "Group 42"), `1599:43647` (nav). AR reference `1434:3719`, `1434:3741`. Both live inside the hero frame, so the hero bg `surface-sec` shows behind them.

| Element | EN (Updated) | Notes |
|---|---|---|
| Top bar | 1440×76, fill `primary-bg`, 20 scallops pointing down (`wave-topbar`), no shadow | Content frame x120 y12, h40, 1200 wide |
| Tagline | "Manage Smarter with YAWMY CARE." Medium 16/1 `ink` | Start side. Brand written "Yawmy Care" (DECISIONS #5), shared string `brand.tagline` |
| Socials | 4 × 40px circles `surface`, icons 24 `ink`, gap 12 (LinkedIn, Instagram, WhatsApp, Facebook) | End side. AR: mirrored (socials left, tagline right) |
| Gap top bar → nav | 24 (nav at y=100) | hero bg shows through |
| Nav row | 1440×80, inner 1280 at x80, h64 | Wide container exception |
| Logo | PNG 71×64 (AR 84×74) | gap to links 40 |
| Links | 9 × Medium 16/1; gap 12; Home active: `primary-cta` text + 1.5px bottom border, py4 | AR frame: 20px, gap 24, only 5 links |
| Actions | gap 57 after links: language icon button 56 (`surface-tabs`), "Book a Demo" primary 179×56 | |
| Sticky? | Nothing in Figma implies it | Built static |

## Link copy (EN canonical → AR)
| EN | AR source |
|---|---|
| Home | الرئيسية (AR frame) |
| A day at your nursery | drafted |
| Why Yawmy | لماذا يومي كير (AR frame) |
| Set up in 20 minutes | drafted |
| Security | مبني على الثقة (AR frame; old "Built on trust" = the security section) |
| Our commitments | drafted |
| Pricing | drafted |
| Founder (Figma) → **Founders** (DECISIONS #7) | drafted |
| FAQ | drafted |

## Findings
| Sev | Finding | Handling |
|---|---|---|
| should | 9 links + 2 actions do not fit below ~1360px (stand-in fonts are wider than Recoleta; AR even more) | Menu button below 1360px |
| should | AR nav is 20px in the 5-link frame; 9 links at 20px overflow 1440 (links alone 999px) | AR desktop links 16px |
| should | Active nav colour `#76945C` = 3.3:1 on `surface-sec` | Text `primary-cta-strong`, underline keeps `primary-cta` (DECISIONS #1) |
| note | Figma "Founder" singular; AR frame "الميزات الاساسية" typo | "Founders"; the AR item is not used |
| open | Social profile URLs not in Figma | `href="#"` placeholders, `TODO(owner)` in `Header.astro` |
