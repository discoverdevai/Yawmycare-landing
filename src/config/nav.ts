/**
 * The nine in-page sections shared by the header nav, the footer nav, the mobile menu and the scroll-spy.
 * The section ids are the contract (every section element carries its id); labels come from
 * `sections.header.nav.items` (one label per id, so header, menu and footer always agree, WCAG 3.2.4).
 *
 * `header: true` = shown as a text link in the desktop header row (5 links; Home is the logo link, so it has no
 * separate text link there). The footer nav and the menu panel (below the desktop breakpoint) list all nine, and the
 * scroll-spy tracks all nine whether or not they are in the header.
 */
export const navItems = [
  { id: "home", header: false },
  { id: "day", header: false },
  { id: "why", header: true },
  { id: "setup", header: true },
  { id: "security", header: true },
  { id: "commitments", header: false },
  { id: "pricing", header: true },
  { id: "founders", header: false },
  { id: "faq", header: true },
] as const;

export type NavId = (typeof navItems)[number]["id"];

/** Resolve [{id, href, label, header}] for a locale's header dictionary (`t.sections.header.nav.items`). */
export function navLinks(labels: readonly { id: string; label: string }[]) {
  const byId = new Map(labels.map((l) => [l.id, l.label]));
  return navItems.map(({ id, header }) => ({ id, header, href: `#${id}`, label: byId.get(id) ?? id }));
}
