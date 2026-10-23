import type { ImageMetadata } from "astro";
import dropoff from "@/assets/day/dropoff.png";
import roomPhone from "@/assets/day/room-phone.png";
import roomPanel from "@/assets/day/room-panel.png";
import photos from "@/assets/day/photos.png";
import activities from "@/assets/day/activities.png";
import checkinBack from "@/assets/day/checkin-back.png";
import checkinFront from "@/assets/day/checkin-front.png";
import reportBack from "@/assets/day/report-back.png";
import reportFront from "@/assets/day/report-front.png";
import connectedHand from "@/assets/day/connected-hand.webp";
import allinoneNotices from "@/assets/day/allinone-notices.png";
import allinoneBanner from "@/assets/day/allinone-banner.png";
import allinoneStats from "@/assets/day/allinone-stats.png";
import allinonePhone from "@/assets/day/allinone-phone.png";

/** Figma card frame (588 x 695). Every layer position below is in these design pixels. */
export const CARD_W = 588;
export const CARD_H = 695;

/** Height of the text panel that overlays the picture in "bottom" cards (24 + 137 + 24). */
export const PANEL_H = 185;

export interface Layer {
  src: ImageMetadata;
  /** Start edge and top edge in card design pixels; width in design pixels (height follows the image ratio). */
  x: number;
  y: number;
  w: number;
  opacity?: number;
  /** Soft black drop shadow (Figma: 0 0 20px at 20%). Follows the image's alpha. */
  shadow?: boolean;
  /** Corner radius in design pixels, for layers that are flat crops. */
  radius?: number;
  /** The layer that carries the card's alt text; the others are decorative. */
  primary?: boolean;
}

export interface CardDef {
  tone: "green" | "peach";
  /** "top": text above the picture. "bottom": picture above a text panel that overlaps its lower part. */
  text: "top" | "bottom";
  /** Concentric-arc texture behind the card (Photos, Stay connected). */
  rings?: boolean;
  /** Design y where the picture area starts ("top" cards); "bottom" cards start at 0. */
  stageTop: number;
  /** Space between the text and the picture area, in design pixels ("top" cards). */
  gap: number;
  layers: Layer[];
}

/** The seven time slots, in order. Copy lives in the dictionary (same order). */
export const slots: { datetime: string; card: CardDef }[] = [
  {
    datetime: "07:30",
    card: {
      tone: "green",
      text: "top",
      stageTop: 235,
      gap: 58,
      layers: [{ src: dropoff, x: 65, y: 235, w: 458.5, primary: true }],
    },
  },
  {
    datetime: "08:15",
    card: {
      tone: "peach",
      text: "top",
      stageTop: 204,
      gap: 58,
      layers: [
        { src: roomPhone, x: 94, y: 204, w: 400, opacity: 0.85, primary: true },
        { src: roomPanel, x: 24, y: 252, w: 540, shadow: true },
      ],
    },
  },
  {
    datetime: "10:00",
    card: {
      tone: "peach",
      text: "bottom",
      rings: true,
      stageTop: 0,
      gap: 0,
      layers: [{ src: photos, x: 92, y: 40, w: 404, primary: true }],
    },
  },
  {
    datetime: "12:30",
    card: {
      tone: "green",
      text: "top",
      stageTop: 235,
      gap: 58,
      layers: [{ src: activities, x: 65, y: 235, w: 458, primary: true }],
    },
  },
  {
    datetime: "14:00",
    card: {
      tone: "green",
      text: "top",
      stageTop: 225,
      gap: 48,
      layers: [
        { src: checkinBack, x: 305, y: 286, w: 259 },
        { src: checkinFront, x: 24, y: 225, w: 342, primary: true },
      ],
    },
  },
  {
    datetime: "16:30",
    card: {
      tone: "peach",
      text: "bottom",
      stageTop: 0,
      gap: 0,
      layers: [
        { src: reportBack, x: 273, y: 129, w: 275 },
        { src: reportFront, x: 40, y: 48, w: 314, primary: true },
      ],
    },
  },
  {
    datetime: "20:00",
    card: {
      tone: "peach",
      text: "bottom",
      rings: true,
      stageTop: 0,
      gap: 0,
      layers: [{ src: connectedHand, x: 0, y: 48, w: 588, primary: true }],
    },
  },
];

/** "The day, all in one place": not a time slot, so it is not part of the <ol>. */
export const summaryCard: CardDef = {
  tone: "green",
  text: "top",
  stageTop: 170,
  gap: 24,
  layers: [
    { src: allinonePhone, x: 114, y: 336, w: 361, opacity: 0.77 },
    {
      src: allinoneNotices,
      x: 19,
      y: 170,
      w: 251,
      radius: 12,
      shadow: true,
      primary: true,
    },
    { src: allinoneBanner, x: 276, y: 178, w: 280, shadow: true },
    { src: allinoneStats, x: 276, y: 292, w: 280, shadow: true },
  ],
};
