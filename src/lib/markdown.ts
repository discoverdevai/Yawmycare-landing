/**
 * Tiny, safe markdown renderer for the owner-supplied legal files (src/content/legal/*.md).
 *
 * Supported: `#`..`####` headings (shifted down one level, because the page title is the h1), paragraphs, `-`/`*` and `1.` lists,
 * `**bold**`, `*italic*`, `` `code` `` and `[text](url)`. Everything else is plain text. ALL input is HTML-escaped first and only
 * the tags produced here are emitted, so a file can never inject markup or script. Link targets are limited to https:, http:,
 * mailto:, tel:, site-relative paths and in-page anchors; anything else renders as plain text.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const safeHref = (raw: string): string | null => {
  const url = raw.trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url) || /^(\/(?!\/)|#)/.test(url)) return url;
  return null;
};

function inline(text: string): string {
  // Escape first; the patterns below only ever see already-escaped text, so no raw HTML can survive.
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*(?!\*)/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    // href is escaped already; unescape &amp; only for the scheme check.
    const url = safeHref(href.replace(/&amp;/g, "&"));
    if (!url) return label;
    const external = /^https?:/i.test(url);
    return `<a href="${escapeHtml(url)}"${external ? ' rel="noopener noreferrer" target="_blank"' : ""}>${label}</a>`;
  });
  return out;
}

export interface MarkdownDoc {
  title: string;
  updated: string;
  /** Rendered, escaped HTML body. */
  html: string;
  /** True when the body has no content (the page is then not generated). */
  empty: boolean;
}

/** Splits optional `---` front matter (simple `key: value` lines: `title`, `updated`) from the body. */
function frontMatter(source: string): { meta: Record<string, string>; body: string } {
  const text = source.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { meta: {}, body: text };
  const meta: Record<string, string> = {};
  for (const line of m[1]!.split("\n")) {
    const kv = /^([A-Za-z_-]+)\s*:\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]!.toLowerCase()] = kv[2]!.trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { meta, body: text.slice(m[0].length) };
}

export function renderMarkdown(source: string): MarkdownDoc {
  const { meta, body } = frontMatter(source);
  const lines = body.split("\n");
  const html: string[] = [];
  let para: string[] = [];
  let list: { tag: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) html.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) html.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${list.tag}>`);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    const bullet = /^\s*[-*]\s+(.+)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.+)$/.exec(line);
    if (line.trim() === "") {
      flushPara();
      flushList();
    } else if (heading) {
      flushPara();
      flushList();
      const level = Math.min(heading[1]!.length + 1, 6);
      html.push(`<h${level}>${inline(heading[2]!)}</h${level}>`);
    } else if (bullet || numbered) {
      flushPara();
      const tag = bullet ? "ul" : "ol";
      if (list && list.tag !== tag) flushList();
      list ??= { tag, items: [] };
      list.items.push((bullet ?? numbered)![1]!);
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();

  return { title: meta.title ?? "", updated: meta.updated ?? "", html: html.join("\n"), empty: html.length === 0 };
}
