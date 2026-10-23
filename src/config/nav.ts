/**
 * The nine in-page sections shared by the header nav, the footer nav and the scroll-spy.
 * The section ids are the contract (every section element carries its id); labels come from
 * `sections.header.nav.items` (one label per id, so header and footer always agree, WCAG 3.2.4).
 */
export const navItems = [
  { id: "home" },
  { id: "day" },
  { id: "why" },
  { id: "setup" },
  { id: "security" },
  { id: "commitments" },
  { id: "pricing" },
  { id: "founders" },
  { id: "faq" },
] as const;

export type NavId = (typeof navItems)[number]["id"];

/** Resolve [{id, href, label}] for a locale's header dictionary (`t.sections.header.nav.items`). */
export function navLinks(labels: readonly { id: string; label: string }[]) {
  const byId = new Map(labels.map((l) => [l.id, l.label]));
  return navItems.map(({ id }) => ({ id, href: `#${id}`, label: byId.get(id) ?? id }));
}
