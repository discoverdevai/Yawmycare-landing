/**
 * Which optional pages exist (docs/SITEMAP-PLAN.md). A page is generated, linked from the footer / demo dialog and put in
 * the sitemap ONLY when its content exists:
 *  - privacy / terms: a non-empty `src/content/legal/<slug>.<lang>.md` (owner-supplied text; we never write legal text),
 *  - contact: at least one configured WhatsApp / phone / email (src/config/site.ts).
 * The routes (src/pages/[lang]/{privacy,terms,contact}.astro) and every link read this one module, so they cannot disagree.
 */
import { renderMarkdown, type MarkdownDoc } from "@/lib/markdown";
import { locales, type Locale } from "@/i18n";
import { anyRegionPhone, anyRegionWhatsapp, contact } from "@/config/site";

export const legalSlugs = ["privacy", "terms"] as const;
export type LegalSlug = (typeof legalSlugs)[number];
export type PageSlug = LegalSlug | "contact";

const raw = import.meta.glob("/src/content/legal/*.md", { query: "?raw", import: "default", eager: true }) as Record<
  string,
  string
>;

const docs = new Map<string, MarkdownDoc>();
for (const [path, source] of Object.entries(raw)) {
  const m = /\/(privacy|terms)\.(en|ar)\.md$/.exec(path);
  if (!m) continue; // README.md and anything else
  const doc = renderMarkdown(source);
  if (!doc.empty) docs.set(`${m[1]}.${m[2]}`, doc);
}

export function legalDoc(slug: LegalSlug, locale: Locale): MarkdownDoc | undefined {
  return docs.get(`${slug}.${locale}`);
}

/** Contact page exists when anything is configured to show on it (any region number, or the general WhatsApp / email). */
export const hasContactPage = anyRegionWhatsapp || anyRegionPhone || contact.whatsapp !== "" || contact.email !== "";

/** Locales in which a page exists. */
export function pageLocales(slug: PageSlug): Locale[] {
  if (slug === "contact") return hasContactPage ? [...locales] : [];
  return locales.filter((l) => docs.has(`${slug}.${l}`));
}

export const hasPage = (slug: PageSlug, locale: Locale) => pageLocales(slug).includes(locale);

/** URL path of a page in a locale (trailing slash, matching the build output). */
export const pagePath = (slug: PageSlug | "", locale: Locale) => (slug ? `/${locale}/${slug}/` : `/${locale}/`);

/** Footer / dialog links for a locale: only pages that exist in that locale. */
export function pageLinks(locale: Locale): { slug: PageSlug; href: string }[] {
  return (["privacy", "terms", "contact"] as const)
    .filter((slug) => hasPage(slug, locale))
    .map((slug) => ({ slug, href: pagePath(slug, locale) }));
}

/** Static paths for a `[lang]/<slug>.astro` route. */
export function pagePaths(slug: PageSlug) {
  return pageLocales(slug).map((lang) => ({ params: { lang } }));
}
