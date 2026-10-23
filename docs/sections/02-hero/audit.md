# 02 · Hero — Audit

Figma: EN `1457:3898` (1440×937), AR reference `1434:3718`.

| Element | EN | Notes |
|---|---|---|
| Section bg | `surface-sec` | Includes the top bar + nav area (the Header component owns those) |
| Text column | x120 y262 (82px below the nav row), 792 wide, gaps 24 | h1 → lead 24 → buttons 24 |
| h1 | SemiBold 58/1.3 `ink`; words "Nursery", "built", "In Arabic" `#E2725B` | Code: `accent-display #E06950` (3.2:1, DECISIONS #2). AR: Bold 62/1.5 |
| Lead | Medium 24/1.3 `ink-muted`, 565 wide | AR: Book 400 |
| CTAs | primary "Book a free demo" (282 fixed), outline "Watch the 2 minute tour" (hug), gap 16 | Label "2-minute" hyphenated (DECISIONS #4) |
| Photo | `image 110`: 656×611, x784 y266, bleeds off the inline-end edge; transparent cutout (source 1385×1136, Figma crops to the middle 1220px) | bottom 60px above hero bottom (tucks behind the wave) |
| Bottom edge | `wave-hero-bottom` scallops up, `surface` fill, `0 0 12px` at 48% `primary-cta` | WaveDivider `shadow="glow"` |
| Next section | starts 32px below the hero | `mb-8` on the hero |
| AR layout | text block on the right, photo on the left (`image 17` 731×711), CTAs mirrored, icon after text | Same markup, mirrors via `dir` |

## Copy
| Key | EN | AR |
|---|---|---|
| title | Nursery management software, built for the region. In Arabic from day one. | drafted (old AR hero is a different headline) |
| lead | Stop running your nursery on WhatsApp… Set up in under 20 minutes. | drafted |
| ctaPrimary | Book a free demo | drafted |
| ctaWatch | Watch the 2-minute tour | drafted |

## Findings
| Sev | Finding | Handling |
|---|---|---|
| should | Coral `#E2725B` 2.99:1 on `#FCFCEC` | `accent-display` |
| should | Hero photo is the LCP element (656×611) | AVIF + WebP, `fetchpriority="high"`, `loading="eager"`, explicit size |
| note | Photo is a transparent cutout of two children; Figma gives no alt | Descriptive alt in both languages |
| open | Demo video URL | `href="#watch-demo"` + `TODO(owner)` |
