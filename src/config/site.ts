/**
 * Site-wide configuration read from `import.meta.env` (PUBLIC_* values ship in the public bundle, so only
 * ever put public URLs here). Every value defaults to "" (unset). See docs/ENV.md.
 *
 * Rule: a link or button whose URL is unset is NOT rendered in production builds. In dev it is
 * rendered with a dashed outline and `data-unconfigured` so the team can see what is still missing.
 * Use `resolveLink()` for that decision; `isConfigured()` for a plain check.
 */

const env = import.meta.env;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** True for a non-empty, parseable https URL (plain http is accepted only in dev builds, for local tests). */
export function isConfigured(url: string | undefined | null): url is string {
  const raw = clean(url);
  if (raw === "") return false;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" || u.protocol === "mailto:" || (env.DEV && u.protocol === "http:");
  } catch {
    return false;
  }
}

/** A WhatsApp value may be a full https URL or just a phone number ("+20 100 000 0000"); returns a wa.me URL or "". */
function whatsappUrl(value: unknown): string {
  const raw = clean(value);
  if (raw === "") return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 7 ? `https://wa.me/${digits}` : "";
}

/** An email value may be "name@example.com" or a full mailto: URL; returns a mailto: URL or "". */
function mailtoUrl(value: unknown): string {
  const raw = clean(value);
  if (raw === "") return "";
  if (/^mailto:/i.test(raw)) return raw;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw) ? `mailto:${raw}` : "";
}

export const socials = {
  linkedin: clean(env.PUBLIC_SOCIAL_LINKEDIN),
  instagram: clean(env.PUBLIC_SOCIAL_INSTAGRAM),
  whatsapp: whatsappUrl(env.PUBLIC_SOCIAL_WHATSAPP),
  facebook: clean(env.PUBLIC_SOCIAL_FACEBOOK),
} as const;

export type SocialName = keyof typeof socials;
export const socialOrder: readonly SocialName[] = ["linkedin", "instagram", "whatsapp", "facebook"];

export const contact = {
  whatsapp: whatsappUrl(env.PUBLIC_CONTACT_WHATSAPP),
  email: mailtoUrl(env.PUBLIC_CONTACT_EMAIL),
} as const;

export const demoVideoUrl = clean(env.PUBLIC_DEMO_VIDEO_URL);

/** Form endpoint status (the demo dialog's script reads the same variable; this is the build-time view). */
export const formEndpoint = {
  url: clean(env.PUBLIC_DEMO_FORM_ENDPOINT),
  get configured(): boolean {
    return isConfigured(this.url);
  },
};

export interface ResolvedLink {
  /** Render the element at all? false only in production when the URL is unset. */
  render: boolean;
  href: string;
  /** Dev only: rendered although the URL is unset (show the dashed marker). */
  unconfigured: boolean;
}

export function resolveLink(url: string | undefined | null): ResolvedLink {
  if (isConfigured(url)) return { render: true, href: url, unconfigured: false };
  return { render: !!env.DEV, href: "#", unconfigured: true };
}

/** Whether an href should open in a new tab (http/https, not mailto). */
export const isExternal = (href: string) => /^https?:/i.test(href);

/* ------------------------------------------------------------------------------------------------
 * Regions (docs/DECISIONS.md #16-#18, docs/ENV.md). Contact numbers and prices are per region: Egypt, Saudi
 * Arabia, United States. Everything defaults to unset and is then HIDDEN in production (never invented).
 * The visitor's region is chosen in the browser (src/config/region-client.ts); nothing is stored.
 * ---------------------------------------------------------------------------------------------- */
import {
  regionIds,
  regionCurrency,
  defaultRegionForLocale,
  whatsappLink,
  type RegionId,
  type RegionPayload,
  type RegionsPayload,
} from "./region";

export { regionIds, defaultRegionForLocale, type RegionId, type RegionPayload, type RegionsPayload };

export interface RegionConfig {
  id: RegionId;
  /** i18n key (in the common dictionary) of the localized region name. */
  label: `regions.names.${RegionId}`;
  currency: string;
  /** Digits only (wa.me), "" when unset. */
  whatsapp: string;
  /** As typed by the owner, "" when unset. */
  phone: string;
  /** Present only when a valid positive amount is configured. Period is always one month. */
  price?: { amount: number; period: "month"; note: string; noteAr: string };
}

function digitsOf(value: unknown): string {
  const digits = clean(value).replace(/\D/g, "");
  return digits.length >= 7 ? digits : "";
}

function region(
  id: RegionId,
  v: { whatsapp?: string; phone?: string; amount?: string; note?: string; noteAr?: string },
): RegionConfig {
  const amount = Number(clean(v.amount).replace(/,/g, ""));
  return {
    id,
    label: `regions.names.${id}`,
    currency: regionCurrency[id],
    whatsapp: digitsOf(v.whatsapp),
    phone: clean(v.phone)
      .replace(/[^\d+()\-\s]/g, "")
      .trim(),
    price:
      Number.isFinite(amount) && amount > 0
        ? { amount, period: "month", note: clean(v.note), noteAr: clean(v.noteAr) }
        : undefined,
  };
}

export const regions: Record<RegionId, RegionConfig> = {
  eg: region("eg", {
    whatsapp: env.PUBLIC_REGION_EG_WHATSAPP,
    phone: env.PUBLIC_REGION_EG_PHONE,
    amount: env.PUBLIC_REGION_EG_PRICE_AMOUNT,
    note: env.PUBLIC_REGION_EG_PRICE_NOTE,
    noteAr: env.PUBLIC_REGION_EG_PRICE_NOTE_AR,
  }),
  sa: region("sa", {
    whatsapp: env.PUBLIC_REGION_SA_WHATSAPP,
    phone: env.PUBLIC_REGION_SA_PHONE,
    amount: env.PUBLIC_REGION_SA_PRICE_AMOUNT,
    note: env.PUBLIC_REGION_SA_PRICE_NOTE,
    noteAr: env.PUBLIC_REGION_SA_PRICE_NOTE_AR,
  }),
  us: region("us", {
    whatsapp: env.PUBLIC_REGION_US_WHATSAPP,
    phone: env.PUBLIC_REGION_US_PHONE,
    amount: env.PUBLIC_REGION_US_PRICE_AMOUNT,
    note: env.PUBLIC_REGION_US_PRICE_NOTE,
    noteAr: env.PUBLIC_REGION_US_PRICE_NOTE_AR,
  }),
};

const all = regionIds.map((id) => regions[id]);
export const anyRegionWhatsapp = all.some((r) => r.whatsapp !== "");
export const anyRegionPhone = all.some((r) => r.phone !== "");
export const anyRegionPrice = all.some((r) => r.price !== undefined);
/** Any region with a contact or a price. False in production = region UI, WhatsApp and prices are not rendered at all. */
export const anyRegionConfigured = anyRegionWhatsapp || anyRegionPhone || anyRegionPrice;
/** Render the region UI (switch, FAB, price block)? Production: only when something is configured; dev: always (dashed marker). */
export const showRegionUi = anyRegionConfigured || !!env.DEV;
/** Render WhatsApp links? Same rule, for numbers only. */
export const showWhatsapp = anyRegionWhatsapp || !!env.DEV;

/** Public data for the browser (embedded as JSON in the page). Contains only what the owner set. */
export const regionsPayload: RegionsPayload = {
  eg: toPayload(regions.eg),
  sa: toPayload(regions.sa),
  us: toPayload(regions.us),
};
function toPayload(r: RegionConfig): RegionPayload {
  return {
    currency: r.currency,
    whatsapp: r.whatsapp,
    phone: r.phone,
    price: r.price ? { amount: r.price.amount, note: r.price.note, noteAr: r.price.noteAr } : null,
  };
}

/**
 * Server-side starting state of a WhatsApp link (the browser then follows the visitor's region). Starts on the
 * locale's default region; when that region has no number but another has, the link is rendered hidden (the
 * visitor may switch region). `render` is false in production when no region has a number.
 */
export function whatsappStart(locale: string, text: string) {
  const first = regionIds.find((id) => regions[id].whatsapp !== "");
  const start = regions[defaultRegionForLocale(locale)].whatsapp ? defaultRegionForLocale(locale) : first;
  const digits = start ? regions[start].whatsapp : "";
  return {
    render: showWhatsapp,
    href: digits ? whatsappLink(digits, text) : "#",
    hidden: !!digits && start !== defaultRegionForLocale(locale),
    unconfigured: !anyRegionWhatsapp,
  };
}
