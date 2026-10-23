/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Full https URL that receives the Book a Demo form as a JSON POST (see .env.example).
   * Ships in the public bundle, so it must be a write-only endpoint. Unset: dev simulates success,
   * a production build shows the "not connected yet" error.
   */
  readonly PUBLIC_DEMO_FORM_ENDPOINT?: string;
  /** Social profile URLs (Header + Footer). Unset: the link is not rendered in production. See docs/ENV.md. */
  readonly PUBLIC_SOCIAL_LINKEDIN?: string;
  readonly PUBLIC_SOCIAL_INSTAGRAM?: string;
  readonly PUBLIC_SOCIAL_WHATSAPP?: string;
  readonly PUBLIC_SOCIAL_FACEBOOK?: string;
  /** Contact for the form's "not connected" message: WhatsApp (URL or phone number) and email address. */
  readonly PUBLIC_CONTACT_WHATSAPP?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  /** Demo/tour video URL (https). Unset: the "Watch demo" buttons are not rendered in production. */
  readonly PUBLIC_DEMO_VIDEO_URL?: string;
  /** Per-region contact + price (Egypt, Saudi Arabia, United States). Unset: hidden in production. See docs/ENV.md. */
  readonly PUBLIC_REGION_EG_WHATSAPP?: string;
  readonly PUBLIC_REGION_EG_PHONE?: string;
  readonly PUBLIC_REGION_EG_PRICE_AMOUNT?: string;
  readonly PUBLIC_REGION_EG_PRICE_NOTE?: string;
  readonly PUBLIC_REGION_EG_PRICE_NOTE_AR?: string;
  readonly PUBLIC_REGION_SA_WHATSAPP?: string;
  readonly PUBLIC_REGION_SA_PHONE?: string;
  readonly PUBLIC_REGION_SA_PRICE_AMOUNT?: string;
  readonly PUBLIC_REGION_SA_PRICE_NOTE?: string;
  readonly PUBLIC_REGION_SA_PRICE_NOTE_AR?: string;
  readonly PUBLIC_REGION_US_WHATSAPP?: string;
  readonly PUBLIC_REGION_US_PHONE?: string;
  readonly PUBLIC_REGION_US_PRICE_AMOUNT?: string;
  readonly PUBLIC_REGION_US_PRICE_NOTE?: string;
  readonly PUBLIC_REGION_US_PRICE_NOTE_AR?: string;
  /** Opt-in analytics (src/scripts/analytics.ts, docs/CRO.md). All unset = no tracker, no script. */
  readonly PUBLIC_ANALYTICS_CF_TOKEN?: string;
  readonly PUBLIC_ANALYTICS_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_ANALYTICS_PLAUSIBLE_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
