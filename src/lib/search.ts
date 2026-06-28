import { languages } from "@/i18n/dictionaries";
import { translateContentText } from "@/i18n/contentTranslations";
import { districtLoc, type Business, type Place } from "@/lib/types";
import { getCraft, hotels, operators, places } from "@/lib/data";

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

const placeIndex = places.map((p) => {
  const craft = getCraft(p.craftType);
  const hay = [
    ...variants(p.name),
    ...variants(p.summary),
    ...tagVariants(p.tags),
    ...(craft ? variants(craft.name) : []),
    ...districtVariants(p.district),
    p.about.th,
    p.about.en,
  ]
    .join("  ")
    .toLowerCase();
  return { place: p, hay };
});

const bizIndex = [...hotels, ...operators].map((b) => {
  const hay = [b.name, b.address, b.contact ?? "", b.facebook ?? "", ...districtVariants(b.district)]
    .join(" ")
    .toLowerCase();
  return { biz: b, hay };
});

function matches(hay: string, query: string): boolean {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return false;
  return tokens.every((t) => hay.includes(t));
}

export function searchPlaces(query: string): Place[] {
  if (!query.trim()) return [];
  return placeIndex.filter((x) => matches(x.hay, query)).map((x) => x.place);
}

export function searchBusinesses(query: string, limit = 40): Business[] {
  if (!query.trim()) return [];
  return bizIndex.filter((x) => matches(x.hay, query)).slice(0, limit).map((x) => x.biz);
}
