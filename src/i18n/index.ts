import commonEn from "./en.json";
import commonAr from "./ar.json";
import headerEn from "./sections/header.en.json";
import headerAr from "./sections/header.ar.json";
import heroEn from "./sections/hero.en.json";
import heroAr from "./sections/hero.ar.json";
import rolesEn from "./sections/roles.en.json";
import rolesAr from "./sections/roles.ar.json";
import testimonialsEn from "./sections/testimonials.en.json";
import testimonialsAr from "./sections/testimonials.ar.json";
import dayEn from "./sections/day.en.json";
import dayAr from "./sections/day.ar.json";
import featuresEn from "./sections/features.en.json";
import featuresAr from "./sections/features.ar.json";
import compareEn from "./sections/compare.en.json";
import compareAr from "./sections/compare.ar.json";
import proofEn from "./sections/proof.en.json";
import proofAr from "./sections/proof.ar.json";
import setupEn from "./sections/setup.en.json";
import setupAr from "./sections/setup.ar.json";
import securityEn from "./sections/security.en.json";
import securityAr from "./sections/security.ar.json";
import pricingEn from "./sections/pricing.en.json";
import pricingAr from "./sections/pricing.ar.json";
import foundersEn from "./sections/founders.en.json";
import foundersAr from "./sections/founders.ar.json";
import faqEn from "./sections/faq.en.json";
import faqAr from "./sections/faq.ar.json";
import footerEn from "./sections/footer.en.json";
import footerAr from "./sections/footer.ar.json";
import demoEn from "./sections/demo.en.json";
import demoAr from "./sections/demo.ar.json";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/*
 * Shared strings live in en.json / ar.json (brand, cta, a11y, social, meta).
 * Every page section owns one pair of files, src/i18n/sections/<slug>.{en,ar}.json, so sections can be
 * built in parallel without touching each other. Read them as `t.sections.<slug>.<key>`.
 */
const en = {
  ...commonEn,
  sections: {
    header: headerEn,
    hero: heroEn,
    roles: rolesEn,
    testimonials: testimonialsEn,
    day: dayEn,
    features: featuresEn,
    proof: proofEn,
    compare: compareEn,
    setup: setupEn,
    security: securityEn,
    pricing: pricingEn,
    founders: foundersEn,
    faq: faqEn,
    footer: footerEn,
    demo: demoEn,
  },
};

export type Dictionary = typeof en;

// The Arabic dictionary must have the same shape as English; this annotation fails type-checking if a key is missing.
const ar: Dictionary = {
  ...commonAr,
  sections: {
    header: headerAr,
    hero: heroAr,
    roles: rolesAr,
    testimonials: testimonialsAr,
    day: dayAr,
    features: featuresAr,
    proof: proofAr,
    compare: compareAr,
    setup: setupAr,
    security: securityAr,
    pricing: pricingAr,
    founders: foundersAr,
    faq: faqAr,
    footer: footerAr,
    demo: demoAr,
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; htmlLang: string; label: string }> = {
  en: { dir: "ltr", htmlLang: "en", label: "English" },
  ar: { dir: "rtl", htmlLang: "ar", label: "العربية" },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}
