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
      // The bare `/` is only a redirect to /en/.
      filter: (page) => new URL(page).pathname !== "/",
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
