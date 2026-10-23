# 01 · Header: Review 2 (reviewer-fixer, real page `/en/` + `/ar/`)

Verdict: **PASS with notes** (after fixes). Measured on the real page at 375 / 768 / 1024 / 1280 / 1440, EN + AR. Figma ref: `shots/figma-nav.png`. `astro check` 0 errors.

| # | Sev | What | Fix | Evidence |
|---|---|---|---|---|
| 1 | should | Menu-panel links were 35px tall (tap target < 44) | Panel links `min-h-11` (44px), `li` padding removed | `[data-nav-panel] a` heights = 44 at 768 |
| 2 | should | Active-link underline was a `border-b`, which made 44px links impossible without a detached underline | Underline now `text-decoration` (`decoration-primary-cta`, offset 6px); same class for desktop and panel | `Header.astro` `linkClass` |
| 3 | should | AR desktop nav: 9 links with 8px gap ran together as one sentence and had 0px slack against the actions at 1360 and 1440 | AR links 15px, gap 12, logo gap 24 (EN unchanged: 16px, gap 8). Links now read as separate items, slack >= 4px at 1360 and 1440 | measured at 1440 AR: clusters at 391 vs 363 |
| 4 | should | AR nav labels differed from the footer ("ابدأ في 20 دقيقة", "مبني على الثقة" vs footer "ابدأ خلال 20 دقيقة", "الأمان") | Header now uses the footer wording ("الأمان" is the literal "Security" and about 50px shorter) | `header.ar.json` |
| 5 | should | Menu breakpoint: tried 1280. EN overflows by about 30px at 1280 with the stand-in font and AR links collide | **Kept 1360** (tested, reverted). Re-test with licensed fonts, then consider 1280 | 1265px viewport: row 1233 wide, content 1245 + gap |
| 6 | should | Skip link (BaseLayout, shared): `not-sr-only` zeroed `px-4 py-2`, so it showed as bare 24px-tall text with the UA outline | Padding moved to `focus:` variants, token focus ring | Tab 1 on `/en/`: rect 113x24 before |
| 7 | verified | One `header` landmark (outside `main`), two `nav[aria-label=Main]` (only one displayed at a time), toggle has `aria-expanded` / `aria-controls`, Esc closes and returns focus to the button, 9 links reachable, scroll spy sets exactly one `aria-current` per section (all 9 anchors exist) | none | keyboard run at 768 |
| 8 | verified | 1440 geometry: top bar 76, nav row y=100 h=80, header 180, scalloped wave, language icon + Book a Demo right edge at x=1360 | none | JS measurement (viewport 1425 + 15px scrollbar) |
| 9 | verified | RTL: logo right, actions left, tagline right, socials left; icons, logo and wave not mirrored | none | AR screenshots 1024 / 1440 |
| 10 | should | Active link and outline buttons used `primary-cta-strong #637C4D` = **4.48:1** on `surface-sec` (needs 4.5) | Token darkened to `#5E7748`: 4.82:1 on surface-sec, 4.95:1 white-on-button, 4.52:1 on surface-tabs. `theme-color` meta updated. Hover `#526840` unchanged | contrast computed; `global.css`, `BaseLayout.astro` |
| 11 | verified | No horizontal scroll at 375 / 768 / 1024 / 1280 / 1440 EN and AR; social buttons 40px visual with 44px hit area (DECISIONS #12); `motion-safe:` only | none | `scrollWidth == clientWidth` |

## Remaining
| Item | Who |
|---|---|
| Social URLs are `#` placeholders (`TODO(owner)`) | owner |
| 1360 breakpoint and AR 15px links: re-check with licensed Recoleta + Expo Arabic (the AR frame uses 20px) | owner (fonts), then lead |
| Header is static; on mobile "Book a Demo" is only inside the menu (room for a compact button beside the burger at 375) | owner decision |
| Logo is a PNG | owner (SVG) |
| DECISIONS #1 should record the new strong green `#5E7748` | lead |
