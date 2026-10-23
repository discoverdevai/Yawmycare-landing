import type { Locale } from "@/i18n";

/**
 * Picks up licensed WOFF2 files dropped into src/assets/fonts/ (see the README there) and turns them
 * into @font-face rules + preload hints. With no files present this emits nothing, so there are no
 * 404s and the open-licence stand-ins (global.css) render instead.
 */
const files = import.meta.glob<string>("/src/assets/fonts/*.woff2", {
  eager: true,
  query: "?url",
  import: "default",
});

const FAMILIES = { recoleta: "Recoleta", "expo-arabic": "Expo Arabic" } as const;

interface Face {
  family: string;
  weight: number;
  url: string;
  locale: Locale;
}

const faces: Face[] = Object.entries(files).flatMap(([path, url]) => {
  const match = /\/(recoleta|expo-arabic)-(\d{3})\.woff2$/.exec(path);
  if (!match) return [];
  const key = match[1] as keyof typeof FAMILIES;
  return [{ family: FAMILIES[key], weight: Number(match[2]), url, locale: key === "recoleta" ? "en" : "ar" }];
});

/** @font-face rules for every licensed file found. */
export const fontFaceCss = faces
  .map(
    ({ family, weight, url }) =>
      `@font-face{font-family:"${family}";src:url("${url}") format("woff2");font-weight:${weight};font-style:normal;font-display:swap}`,
  )
  .join("");

// Most-used weights per locale; preloading more than two per locale costs more than it saves.
const CRITICAL: Record<Locale, number[]> = { en: [600, 400], ar: [700, 400] };

export function fontPreloads(locale: Locale): string[] {
  return CRITICAL[locale].flatMap((weight) => {
    const face = faces.find((f) => f.locale === locale && f.weight === weight);
    return face ? [face.url] : [];
  });
}
