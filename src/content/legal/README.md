# Legal pages (owner-supplied text)

Drop the real text here and the pages appear on their own at the next build. Nothing is generated, linked or listed in the
sitemap until a file exists, and we never write legal text for you.

| File            | Page it creates |
| --------------- | --------------- |
| `privacy.en.md` | `/en/privacy/`  |
| `privacy.ar.md` | `/ar/privacy/`  |
| `terms.en.md`   | `/en/terms/`    |
| `terms.ar.md`   | `/ar/terms/`    |

Rules:

- The file name must be exactly `<privacy|terms>.<en|ar>.md`. An empty file (or only a front-matter block) is ignored.
- One language is enough: the page, its footer link and its sitemap entry exist for that language only (the other language's
  language switch then goes to its home page). Add the second file later to get the full `hreflang` pair.
- Optional front matter at the top of the file:

  ```
  ---
  title: Privacy notice
  updated: 2026-10-23
  ---
  ```

  `title` becomes the page heading and `<title>` (default: "Privacy notice" / "Terms of use"). `updated` (use `YYYY-MM-DD`) is
  shown as "Last updated" and sent as `dateModified`.

- Supported markdown: `#`-`####` headings (a `#` becomes a section heading; the page title is the h1), paragraphs, `-` and `1.`
  lists, `**bold**`, `*italic*`, `` `code` `` and `[text](https://...)`. Raw HTML is shown as text, never run. Links may be
  https, http, mailto, tel, `/en/...` paths or `#anchors`.
- The demo form's consent line ("By sending this form you agree to our privacy notice") links to the privacy page of the
  visitor's language only when that file exists.
