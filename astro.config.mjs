// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Canonical, hreflang and sitemap URLs derive from this.
  site: "https://yawmycare.com",
  output: "static",
  // `/` has no content of its own. Hosts that read public/_redirects (Netlify, Cloudflare Pages) answer it
  // with a real 301 first; this keeps a meta-refresh fallback for every other host.
  redirects: { "/": "/en/" },
  integrations: [
    sitemap({
      // Emits xhtml:link hreflang alternates for /en/ and /ar/.
      i18n: { defaultLocale: "en", locales: { en: "en", ar: "ar" } },
      // Not indexable: the bare `/` (redirect to /en/) and the 404 page. Privacy / terms / contact appear here
      // automatically when their routes are generated (src/config/pages.ts); alternates only for the locales that exist.
      filter: (page) => !["/", "/404/", "/404"].includes(new URL(page).pathname),
      // Build date: the site is rebuilt on every content change.
      lastmod: new Date(),
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
