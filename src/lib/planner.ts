import { Place } from "./types";

/** Great-circle distance in km between two lat/lon points. */
export function haversineKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export type TravelMode = "walk" | "car";

/** Rough travel time for a leg. Mountain roads ~35 km/h; short hops walked. */
export function travelEstimate(km: number): { minutes: number; mode: TravelMode } {
  if (km < 0.8) {
    return { minutes: Math.max(2, Math.round((km / 4.5) * 60)), mode: "walk" };
  }
  return { minutes: Math.max(5, Math.round((km / 35) * 60)), mode: "car" };
}

const DEFAULT_OPEN = 8 * 60; // 08:00
const DEFAULT_CLOSE = 17 * 60; // 17:00

/** Pull an open/close window out of a free-text hours string like
 *  "ทุกวัน 08:00–18:00". Returns null when nothing matches. */
export function parseHours(hours: {
  th: string;
  en: string;
}): { open: number; close: number } | null {
  const text = `${hours.th} ${hours.en}`;
  const matches = [...text.matchAll(/(\d{1,2}):(\d{2})/g)].map(
    (m) => parseInt(m[1], 10) * 60 + parseInt(m[2], 10)
  );
  if (matches.length < 2) return null;
  return { open: matches[0], close: matches[matches.length - 1] };
}

/** open/close window for a place, falling back to sensible defaults. */
export function placeHours(place: Place): { open: number; close: number } {
  return parseHours(place.visit.hours) ?? { open: DEFAULT_OPEN, close: DEFAULT_CLOSE };
}

export function minutesToHHMM(min: number): string {
  const m = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function byId(places: Place[]): Map<string, Place> {
  return new Map(places.map((p) => [p.id, p]));
}

/** Greedy nearest-neighbour ordering. Starts from the first selected id
 *  (or a city anchor if present), then always hops to the closest unvisited. */
export function orderRoute(ids: string[], places: Place[]): string[] {
  const map = byId(places);
  const pool = ids.filter((id) => map.has(id));
  if (pool.length <= 2) return pool;

  const anchor = pool.includes("wat-phumin") ? "wat-phumin" : pool[0];
  const ordered: string[] = [anchor];
  const remaining = new Set(pool.filter((id) => id !== anchor));

  while (remaining.size) {
    const last = map.get(ordered[ordered.length - 1])!;
    let best: string | null = null;
    let bestKm = Infinity;
    for (const id of remaining) {
      const km = haversineKm(last, map.get(id)!);
      if (km < bestKm) {
        bestKm = km;
        best = id;
      }
    }
    ordered.push(best!);
    remaining.delete(best!);
  }
  return ordered;
}

export type ScheduleWarning = "closed" | "tight" | "late";

export type ScheduleStop = {
  place: Place;
  arrivalMin: number;
  departMin: number;
  legKm: number;
  legMin: number;
  mode: TravelMode | null;
  warning?: ScheduleWarning;
};

export type ScheduleOpts = {
  startMin?: number; // default 08:30
  dwellMin?: number; // time spent at each stop
  dayEndMin?: number; // hard end-of-day cap
};

/** Walk the ordered route assigning arrival/leave times, leg distances and
 *  flagging stops that don't fit opening hours or overrun the day. */
export function buildSchedule(
  orderedIds: string[],
  places: Place[],
  opts: ScheduleOpts = {}
): ScheduleStop[] {
  const { startMin = 8 * 60 + 30, dwellMin = 60, dayEndMin = 19 * 60 } = opts;
  const map = byId(places);
  const stops: ScheduleStop[] = [];
  let clock = startMin;
  let prev: Place | null = null;

  for (const id of orderedIds) {
    const place = map.get(id);
    if (!place) continue;

    let legKm = 0;
    let legMin = 0;
    let mode: TravelMode | null = null;
    if (prev) {
      legKm = haversineKm(prev, place);
      const est = travelEstimate(legKm);
      legMin = est.minutes;
      mode = est.mode;
      clock += legMin;
    }

    const { open, close } = placeHours(place);
    const arrivalMin = clock;
    const effectiveStart = Math.max(arrivalMin, open); // wait if too early
    const departMin = effectiveStart + dwellMin;

    let warning: ScheduleWarning | undefined;
    if (arrivalMin >= close) warning = "closed";
    else if (effectiveStart + dwellMin > close) warning = "tight";
    else if (departMin > dayEndMin) warning = "late";

    stops.push({ place, arrivalMin, departMin, legKm, legMin, mode, warning });
    clock = departMin;
    prev = place;
  }
  return stops;
}

export type Recommendation = {
  place: Place;
  km: number;
  minutes: number;
  mode: TravelMode;
  fromId: string;
};

/** "If you go to A, don't miss…" — rank unselected places by proximity to the
 *  current selection, lightly favouring craft-type variety. */
export function recommendNearby(
  selectedIds: string[],
  places: Place[],
  max = 6
): Recommendation[] {
  const map = byId(places);
  const selected = selectedIds.map((id) => map.get(id)).filter(Boolean) as Place[];
  if (!selected.length) return [];

  const selectedCrafts = new Set(selected.map((p) => p.craftType));

  const candidates = places
    .filter((p) => !selectedIds.includes(p.id))
    .map((p) => {
      // distance to the nearest already-selected stop
      let nearest = selected[0];
      let bestKm = Infinity;
      for (const s of selected) {
        const km = haversineKm(s, p);
        if (km < bestKm) {
          bestKm = km;
          nearest = s;
        }
      }
      const est = travelEstimate(bestKm);
      // score: closer is better; a small bonus for a new craft type
      const variety = selectedCrafts.has(p.craftType) ? 0 : -6;
      return {
        rec: {
          place: p,
          km: bestKm,
          minutes: est.minutes,
          mode: est.mode,
          fromId: nearest.id,
        } as Recommendation,
        score: bestKm + variety,
      };
    })
    .sort((a, b) => a.score - b.score);

  return candidates.slice(0, max).map((c) => c.rec);
}

/** Mulberry32 — tiny deterministic PRNG so "regenerate" is reproducible per seed. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random selection of place ids, optionally filtered to chosen craft types. */
export function randomPick(
  places: Place[],
  interests: string[],
  count: number,
  seed: number
): string[] {
  const rand = rng(seed || 1);
  const pool = (
    interests.length ? places.filter((p) => interests.includes(p.craftType)) : places
  ).slice();
  // Fisher–Yates with seeded rng
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const picked = pool.slice(0, Math.min(count, pool.length)).map((p) => p.id);
  return orderRoute(picked, places);
}
