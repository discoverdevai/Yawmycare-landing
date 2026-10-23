/**
 * Optional "customers" strip (src/components/sections/Proof.astro).
 *
 * SHIPS EMPTY ON PURPOSE: while `proofEntries` is [] the section renders nothing at all (no heading, no spacing).
 * Add an entry only with the customer's written consent for the name, logo and quote. Never invent or paraphrase one.
 * Full guide: docs/PROOF.md.
 *
 * Example (illustrative only, copy into the array below and replace every value):
 *
 *   {
 *     name: "Little Stars Nursery",            // shown as-is in both languages (brand name)
 *     city: { en: "Maadi, Cairo", ar: "المعادي، القاهرة" },
 *     role: { en: "Owner", ar: "صاحبة الحضانة" },
 *     quote: { en: "One approved sentence.", ar: "الجملة نفسها بالعربية، بموافقة صاحبها." },
 *     logo: "little-stars.png",                // optional: a PNG/WebP/AVIF/JPG file in src/assets/proof/
 *   }
 */
export interface ProofEntry {
  name: string;
  city: { en: string; ar: string };
  role: { en: string; ar: string };
  quote: { en: string; ar: string };
  /** File name inside src/assets/proof/ (raster only). Optional: the card falls back to the name. */
  logo?: string;
}

export const proofEntries: ProofEntry[] = [];
