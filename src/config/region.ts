/**
 * Region model, pure helpers shared by the server (Astro frontmatter) and the browser (region-client.ts).
 * No env access here: the env-backed values live in `regions` in site.ts. Never invents numbers or prices.
 */
export const regionIds = ["eg", "sa", "us"] as const;
export type RegionId = (typeof regionIds)[number];

export const regionCurrency: Record<RegionId, string> = { eg: "EGP", sa: "SAR", us: "USD" };

export function isRegionId(value: unknown): value is RegionId {
  return typeof value === "string" && (regionIds as readonly string[]).includes(value);
}

/** Public, serialisable view of one region (what the browser receives in #region-data). */
export interface RegionPayload {
  currency: string;
  /** Digits only (wa.me format), "" when unset. */
  whatsapp: string;
  /** Phone as typed by the owner, "" when unset. */
  phone: string;
  /** null when no valid amount is configured. */
  price: { amount: number; note: string; noteAr: string } | null;
}
export type RegionsPayload = Record<RegionId, RegionPayload>;

/** Fallback by page language: Arabic pages default to Egypt, English pages to the United States. */
export const defaultRegionForLocale = (locale: string): RegionId => (locale === "ar" ? "eg" : "us");

/** Time zone first, then the browser language's country subtag, then the page language. */
export function detectRegion(timeZone: string | undefined, languages: readonly string[], pageLocale: string): RegionId {
  const tz = timeZone ?? "";
  if (tz === "Africa/Cairo") return "eg";
  if (tz === "Asia/Riyadh") return "sa";
  if (tz.startsWith("America/")) return "us";
  for (const lang of languages) {
    const country = /^[a-z]{2,3}-([A-Za-z]{2})\b/.exec(lang)?.[1]?.toLowerCase();
    if (country && isRegionId(country)) return country;
  }
  return defaultRegionForLocale(pageLocale);
}

/** wa.me link with a prefilled message. `digits` must be digits only. */
export const whatsappLink = (digits: string, text: string) =>
  `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/**
 * "EGP 1,500": currency code (unambiguous across regions), Western digits in both locales (project convention).
 * Callers wrap the result in <bdi> so the number and code keep their order inside Arabic text.
 */
export function formatPrice(amount: number, currency: string, locale: string): string {
  const tag = locale === "ar" ? "ar-EG-u-nu-latn" : "en-US-u-nu-latn";
  return new Intl.NumberFormat(tag, {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
