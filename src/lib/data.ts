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
