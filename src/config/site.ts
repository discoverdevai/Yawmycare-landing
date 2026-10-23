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
