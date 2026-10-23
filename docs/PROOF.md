# Customer proof strip

`src/components/sections/Proof.astro` shows a "Nurseries already using Yawmy Care" strip right after the testimonials.
It is **data-driven and ships empty**: while `proofEntries` in `src/config/proof.ts` is `[]`, nothing renders (no heading, no gap). Roadmap item 2.1.

## Add a customer
1. Get written consent from the nursery for the name, city, role, logo and the exact quote (EN and AR).
2. Put the logo in `src/assets/proof/` (PNG, WebP, AVIF or JPG, ideally 2x of about 128 x 48 px, transparent background).
3. Append an entry in `src/config/proof.ts`:

```ts
{
  name: "Little Stars Nursery",
  city: { en: "Maadi, Cairo", ar: "المعادي، القاهرة" },
  role: { en: "Owner", ar: "صاحبة الحضانة" },
  quote: { en: "One approved sentence.", ar: "الجملة نفسها بالعربية، بموافقة صاحبها." },
  logo: "little-stars.png", // optional
}
```

The example is illustrative only; never publish it.

4. Optional: change the heading in `src/i18n/sections/proof.{en,ar}.json` (`title`, and `logoAlt` with a `{name}` placeholder).
5. Run `npx astro check`, then look at `/en/` and `/ar/` at 375 and 1440.

Rules: no invented names, numbers or quotes; a quote is shown verbatim as approved; remove an entry the day consent is withdrawn.
