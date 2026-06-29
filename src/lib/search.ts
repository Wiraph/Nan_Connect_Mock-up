import { languages } from "@/i18n/dictionaries";
import { translateContentText } from "@/i18n/contentTranslations";
import { districtLoc, type Business, type Place } from "@/lib/types";
import { getCraft } from "@/lib/data";

const LANGS = languages.map((l) => l.code);

/** Every language variant of a {th,en} field (so search works cross-language). */
function variants(field?: { th: string; en: string }): string[] {
  if (!field) return [];
  const out = new Set<string>([field.th, field.en]);
  for (const lang of LANGS) {
    out.add(translateContentText(field.en, lang));
    out.add(translateContentText(field.th, lang));
  }
  return [...out];
}

function tagVariants(tags: { th: string[]; en: string[] }): string[] {
  const out: string[] = [...tags.th, ...tags.en];
  for (const t of tags.en) for (const lang of LANGS) out.push(translateContentText(t, lang));
  return out;
}

function districtVariants(d: string): string[] {
  const out = [d, d.replace(/^อ\./, "").replace(/^อำเภอ/, "")];
  for (const lang of LANGS) out.push(districtLoc(d, lang));
  return out;
}

function placeHay(p: Place): string {
  const craft = getCraft(p.craftType);
  return [
    ...variants(p.name),
    ...variants(p.summary),
    ...tagVariants(p.tags),
    ...(craft ? variants(craft.name) : []),
    ...districtVariants(p.district),
    p.about.th,
    p.about.en,
  ]
    .join("  ")
    .toLowerCase();
}

function bizHay(b: Business): string {
  return [b.name, b.address, b.contact ?? "", b.facebook ?? "", ...districtVariants(b.district)]
    .join(" ")
    .toLowerCase();
}

function matches(hay: string, query: string): boolean {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return false;
  return tokens.every((t) => hay.includes(t));
}

export function searchPlaces(query: string, places: Place[]): Place[] {
  if (!query.trim()) return [];
  return places.filter((p) => matches(placeHay(p), query));
}

export function searchBusinesses(
  query: string,
  businesses: Business[],
  limit = 40
): Business[] {
  if (!query.trim()) return [];
  return businesses.filter((b) => matches(bizHay(b), query)).slice(0, limit);
}
