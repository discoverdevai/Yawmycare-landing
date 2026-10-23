/**
 * Browser-side region state. Stores NOTHING (no cookie, no localStorage/sessionStorage): the choice lives in this
 * module's memory, mirrored to `data-region` on <html>, and announced with a `yawmy:region-change` CustomEvent on
 * `document` (detail: { region }). The data comes from <script type="application/json" id="region-data">
 * rendered by ui/RegionData.astro (only values the owner configured).
 */
import { detectRegion, isRegionId, defaultRegionForLocale, type RegionId, type RegionsPayload } from "./region";

export const REGION_EVENT = "yawmy:region-change";

let current: RegionId | null = null;
let payload: RegionsPayload | null | undefined;

export function regionData(): RegionsPayload | null {
  if (payload === undefined) {
    try {
      const el = document.getElementById("region-data");
      payload = el?.textContent ? (JSON.parse(el.textContent) as RegionsPayload) : null;
    } catch {
      payload = null;
    }
  }
  return payload;
}

export function pageLocale(): "ar" | "en" {
  return document.documentElement.lang.startsWith("ar") ? "ar" : "en";
}

export function getRegion(): RegionId {
  if (current) return current;
  const fromAttr = document.documentElement.dataset.region;
  if (isRegionId(fromAttr)) {
    current = fromAttr;
  } else {
    let tz: string | undefined;
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      tz = undefined;
    }
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language ?? ""];
    current = detectRegion(tz, langs, pageLocale()) ?? defaultRegionForLocale(pageLocale());
  }
  document.documentElement.dataset.region = current;
  return current;
}

export function setRegion(id: RegionId): void {
  if (!isRegionId(id) || id === getRegion()) return;
  current = id;
  document.documentElement.dataset.region = id;
  document.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: { region: id } }));
}

/** Calls `cb` now with the current region and again on every change. */
export function onRegion(cb: (region: RegionId) => void): void {
  cb(getRegion());
  document.addEventListener(REGION_EVENT, (e) => cb((e as CustomEvent<{ region: RegionId }>).detail.region));
}
