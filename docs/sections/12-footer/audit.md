# 12 · Final CTA + Footer — Audit

Figma `oSQUBKWEqG5XrY4sHCzjzy`. EN `1457:4197` (CTA group) + `1457:4213` (footer). AR `1434:4017` + `1434:4033`.

## Structure (1440 canvas)
| Item | Figma | Notes |
|---|---|---|
| Final CTA blob | `1457:4199`, 1200x910, `primary-cta`, x=120 | Stored rotated -90 (910x1200 vector). Only the top ~380px shows; the footer covers the rest |
| CTA content | x=58 inside blob, y=88, w=1084, gap 30 | h2 Bold 48/48 white centred, lead Regular 24/1.3 `primary-bg-light`, gap 24, then buttons |
| Buttons | 386x56, gap 16, centred | Book a Demo `on-green` (calendar), Watch Demo `on-green-outline` (video-circle) |
| Footer box | `1457:4214`, 1440x509 at y=40 of footer group, `primary-bg` | No shadow |
| Footer wave | `1457:4244`, 1440x76, flipped (scallops up) | Sits ON TOP of the blob: footer group starts at y=306, blob is 910 tall |
| Footer column | w=1200, centred, gap 24 (AR: 32) | logo 158x139 + 12 + tagline 16 Medium; nav row gap 24; social row gap 12 |
| Social | 4 x 40px circles, `accent` fill, white icons | LinkedIn, Instagram, WhatsApp, Facebook |
| Wordmark | `1457:4215`, live text, Recoleta Medium 170/170, `#C7D8B6`, centred | Box bottom is 28px below the footer, so it is clipped. 52px under the social row |
| Copyright | none | Not in EN or AR frame. Not added |

## How the band meets the footer
The CTA blob does not end above the footer: the footer's scalloped top edge is drawn over the blob. Blob shows through the scallop gaps; the cream page shows beside the blob. Visible gap from buttons to wave top: 29px (EN), 43px (AR, 2-line lead).

## Copy
| Key | EN (Figma) | AR frame | Used |
|---|---|---|---|
| CTA title | Start managing smarter with Yawmy Care | ابدأ إدارة أكثر ذكاءً مع يومي كير | AR verbatim |
| CTA lead | Fifteen minutes on a call, in Arabic or English. We will show you your own nursery in the product. | older, different text ("اكتشف كيف يساعدك يومي كير …") | AR drafted from the new EN (flagged) |
| Tagline | Manage Smarter with YAWMY CARE. | أدر بذكاء مع يومي كير | Existing `brand.tagline` (already matches, brand casing fixed) |
| Nav (EN) | Home, Built with nurseries, A day at your nursery, Why Yawmy, Set up in 20 minutes, Security, Our commitments, Pricing, Founder, FAQ | الرئيسية، عن يومي كير، لماذا يومي كير، الميزات الاساسية، مبني على الثقة (old structure) | Per DECISIONS #7: header links + FAQ, "Built with nurseries" dropped, "Founders" |
| Wordmark | YAWMY CARE | YAWMY CARE (Latin) | Latin both locales, CSS uppercase |

## RTL cues from the AR frame
Button order mirrors (Book a Demo on the right), icons inline-start, nav and social rows start at the right, logo/wordmark unmirrored, nav font 20 (AR `text-nav`), footer column gap 32.

## Problems found in the existing kit
| Issue | Impact |
|---|---|
| `src/assets/shapes/final-cta.svg` has the path in the unrotated 910x1200 space inside a 1200x910 viewBox, so `BlobCard shape="final-cta"` draws a wrong, cropped shape | Worked around with `src/assets/footer/final-cta.svg` (path wrapped in `transform="matrix(0 -1 1 0 0 910)"`). `cta-band.svg` may have the same issue (not checked) |
