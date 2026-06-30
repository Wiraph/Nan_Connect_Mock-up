import placesJson from "@/data/places.json";
import categoriesJson from "@/data/categories.json";
import craftTypesJson from "@/data/craftTypes.json";
import hotelsJson from "@/data/hotels.json";
import operatorsJson from "@/data/operators.json";
import districtsJson from "@/data/districts.json";
import dashboardJson from "@/data/dashboard.json";
import { Business, Category, CraftType, District, Place } from "./types";

export const places = placesJson as Place[];
export const categories = categoriesJson as Category[];
export const craftTypes = craftTypesJson as CraftType[];
export const hotels = hotelsJson as Business[];
export const operators = operatorsJson as Business[];
export const districts = districtsJson as District[];
export const dashboard = dashboardJson;

export function getPlace(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}

export function getPlaceByQr(qr: number): Place | undefined {
  return places.find((p) => p.qrPoint === qr);
}

export function getCraft(key: string): CraftType | undefined {
  return craftTypes.find((c) => c.key === key);
}

export function getCategory(key: string): Category | undefined {
  return categories.find((c) => c.key === key);
}

/** The 5 content categories from the dataset (per-place info facets), used as
 *  the home-page browse buckets. `labelKey` points at an i18n dictionary key
 *  so every language is covered. */
export type ContentCategory = {
  key: string;
  icon: string;
  tint: string;
  labelKey: string;
};

export const contentCategories: ContentCategory[] = [
  { key: "about", icon: "ti-book-2", tint: "navy", labelKey: "place.about" },
  { key: "experiences", icon: "ti-compass", tint: "teal", labelKey: "place.experiences" },
  { key: "shopping", icon: "ti-shopping-bag", tint: "gold", labelKey: "place.shopping" },
  { key: "visit", icon: "ti-info-circle", tint: "blue", labelKey: "place.visit" },
  { key: "news", icon: "ti-calendar-event", tint: "coral", labelKey: "place.news" },
];

export function getContentCategory(key: string): ContentCategory | undefined {
  return contentCategories.find((c) => c.key === key);
}

/** Places relevant to a content category — those that actually have data for
 *  that facet. `about`/`visit` apply to every place. */
export function placesForContent(list: Place[], key: string): Place[] {
  switch (key) {
    case "experiences":
      return list.filter((p) => p.experiences.length > 0);
    case "shopping":
      return list.filter((p) => p.shopping.length > 0);
    case "news":
      return list.filter((p) => p.news.length > 0);
    default:
      return list;
  }
}

/** All accommodation-type businesses (hotels + community operators). */
export const businessesByCategory: Record<string, Business[]> = {
  accommodation: [...hotels, ...operators],
  attraction: [],
  restaurant: [],
  souvenir: [],
  spa: [],
  transport: [],
  agency: [],
};

export function getBusiness(id: string): Business | undefined {
  return [...hotels, ...operators].find((b) => b.id === id);
}

export const TINT_HEX: Record<string, { bg: string; fg: string }> = {
  navy: { bg: "#e6e9f0", fg: "#1b2a4a" },
  gold: { bg: "#f5ecd0", fg: "#7a5a0b" },
  teal: { bg: "#dcf0e8", fg: "#0f6e56" },
  coral: { bg: "#f7e3da", fg: "#993c1d" },
  pink: { bg: "#f7e2eb", fg: "#993556" },
  blue: { bg: "#e0edfa", fg: "#185fa5" },
  purple: { bg: "#e9e7f7", fg: "#534ab7" },
};
