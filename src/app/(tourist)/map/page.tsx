"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type {
  LatLngBoundsExpression,
  LatLngExpression,
  LayerGroup,
  Map as LeafletMap,
} from "leaflet";
import AppHeader from "@/components/AppHeader";
import StarRating from "@/components/StarRating";
import { useI18n } from "@/i18n/I18nProvider";
import { craftTypes, TINT_HEX } from "@/lib/data";
import { useDataStore } from "@/lib/DataStore";
import { NAN_BOUNDARY } from "@/lib/nanBoundary";
import { districtLoc, loc, Place } from "@/lib/types";

type LeafletModule = typeof import("leaflet");

const NAN_BOUNDS: LatLngBoundsExpression = [
  [18.01, 100.33],
  [19.64, 101.36],
];

const NAN_MAX_BOUNDS: LatLngBoundsExpression = [
  [17.82, 100.13],
  [19.83, 101.56],
];

const WORLD_MASK: LatLngExpression[] = [
  [85, -180],
  [85, 180],
  [-85, 180],
  [-85, -180],
];

const KEY_PLACE_IDS = [
  "wat-phra-that-chae-haeng",
  "wat-phumin",
  "doi-phu-kha",
  "bo-kluea",
  "sapan-village",
  "doi-samer-dao",
];

const ROUTES = [
  {
    color: "#1f6feb",
    dashArray: "8 8",
    points: [
      [18.7757, 100.7716],
      [19.183, 100.9286],
      [19.2058, 101.0769],
      [19.0786, 101.1556],
      [19.0492, 101.1281],
    ] as LatLngExpression[],
  },
  {
    color: "#e06b2f",
    dashArray: "7 7",
    points: [
      [18.7757, 100.7716],
      [18.5419, 100.7361],
      [18.303664, 100.753968],
    ] as LatLngExpression[],
  },
  {
    color: "#8a55d7",
    dashArray: "10 8",
    points: [
      [18.7757, 100.7716],
      [19.1456, 100.8222],
      [19.1786, 100.9133],
      [19.1, 101.08],
    ] as LatLngExpression[],
  },
];

function copy(lang: string) {
  const th = lang === "th";
  return {
    title: th ? "แผนที่จริงจังหวัดน่าน" : "Live Nan Map",
    subtitle: th
      ? "แสดงเฉพาะพื้นที่จังหวัดน่าน พร้อมเส้นทางและจุดท่องเที่ยวจากข้อมูลจริง"
      : "Nan-only map view with real tiles, routes, and seeded POIs",
    routes: th ? "เส้นทางแนะนำ" : "Suggested routes",
    keyPlaces: th ? "แหล่งท่องเที่ยวสำคัญ" : "Key destinations",
    boundary: th ? "ขอบเขตจังหวัดน่าน" : "Nan province boundary",
    scanNetwork: th ? "จุดสแกน QR 150 จุด" : "150 QR scan points",
    smartRoute: "Smart Tourism Route",
    mapNote: th
      ? "จำกัดการเลื่อนแผนที่ไว้เฉพาะโซนจังหวัดน่าน"
      : "Panning is constrained around Nan province",
    routeItems: th
      ? [
          ["เมืองน่าน - ปัว - บ่อเกลือ - สะปัน", "เส้นทางชุมชนและธรรมชาติ"],
          ["เมืองน่าน - นาน้อย", "ดอยเสมอดาวและเสาดิน"],
          ["เมืองน่าน - ท่าวังผา - ปัว", "วัด งานคราฟ และผ้าทอ"],
        ]
      : [
          ["Nan city - Pua - Bo Kluea - Sapan", "Community and nature route"],
          ["Nan city - Na Noi", "Doi Samer Dao and earth pillars"],
          ["Nan city - Tha Wang Pha - Pua", "Temples, crafts, and weaving"],
        ],
  };
}

function markerHtml(place: Place, active: boolean) {
  const tint = TINT_HEX[place.tint] ?? TINT_HEX.navy;
  return `
    <span class="nan-map-marker ${active ? "is-active" : ""}" style="--marker-bg:${tint.fg};">
      <i class="ti ${place.icon}" aria-hidden="true"></i>
    </span>
  `;
}

export default function MapPage() {
  const { t, lang } = useI18n();
  const { places } = useDataStore();
  const [craft, setCraft] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("wat-phumin");
  const [mapReady, setMapReady] = useState(false);
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<LayerGroup | null>(null);

  const c = copy(lang);
  const choosePlace = useCallback((id: string) => setSelected(id), []);

  const visible = useMemo(
    () => (craft ? places.filter((p) => p.craftType === craft) : places),
    [craft, places]
  );
  const selectedPlace = places.find((p) => p.id === selected);
  const activePlace =
    selectedPlace && visible.some((p) => p.id === selectedPlace.id)
      ? selectedPlace
      : visible[0] ?? selectedPlace;
  const keyPlaces = places.filter((p) => KEY_PLACE_IDS.includes(p.id));

  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;
    let cancelled = false;

    async function initMap() {
      const L = await import("leaflet");
      if (cancelled || !mapElRef.current) return;

      leafletRef.current = L;
      const map = L.map(mapElRef.current, {
        zoomControl: false,
        minZoom: 8,
        maxZoom: 15,
        maxBounds: NAN_MAX_BOUNDS,
        maxBoundsViscosity: 1,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.polygon([WORLD_MASK, NAN_BOUNDARY], {
        color: "transparent",
        fillColor: "#f5f1e6",
        fillOpacity: 0.88,
        fillRule: "evenodd",
        interactive: false,
        stroke: false,
      }).addTo(map);

      L.polygon(NAN_BOUNDARY, {
        color: "#1b2a4a",
        dashArray: "8 6",
        fill: false,
        opacity: 0.9,
        weight: 2.5,
        interactive: false,
      }).addTo(map);

      ROUTES.forEach((route) => {
        L.polyline(route.points, {
          color: route.color,
          dashArray: route.dashArray,
          opacity: 0.86,
          weight: 4,
          interactive: false,
        }).addTo(map);
      });

      markerLayerRef.current = L.layerGroup().addTo(map);
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.scale({ imperial: false, metric: true, position: "bottomleft" }).addTo(map);
      map.fitBounds(NAN_BOUNDS, { padding: [24, 24] });
      mapRef.current = map;
      setMapReady(true);
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      leafletRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const markerLayer = markerLayerRef.current;
    if (!mapReady || !L || !markerLayer) return;

    markerLayer.clearLayers();
    visible.forEach((place) => {
      const active = place.id === activePlace?.id;
      const marker = L.marker([place.lat, place.lon], {
        icon: L.divIcon({
          className: "nan-map-marker-wrapper",
          html: markerHtml(place, active),
          iconAnchor: active ? [22, 22] : [18, 18],
          iconSize: active ? [44, 44] : [36, 36],
        }),
        keyboard: true,
        title: loc(place.name, lang),
      });

      marker.on("click", () => choosePlace(place.id));
      marker.bindTooltip(loc(place.name, lang), {
        direction: "top",
        offset: [0, -18],
        opacity: 0.92,
      });
      marker.addTo(markerLayer);
    });
  }, [activePlace?.id, choosePlace, lang, mapReady, visible]);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !activePlace) return;
    mapRef.current.panTo([activePlace.lat, activePlace.lon], {
      animate: true,
      duration: 0.45,
    });
  }, [activePlace, mapReady]);

  return (
    <>
      <AppHeader title={t("nav.map")} showBack />
      <main className="flex flex-1 flex-col">
        <div className="lanna-subnav-surface border-b border-gold/20">
          <div className="no-scrollbar flex w-full gap-2 overflow-x-auto px-4 py-2.5 pr-8 lg:px-8 lg:py-3 lg:pr-10">
            <button
              onClick={() => setCraft(null)}
              className={`lanna-subnav-link flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium lg:px-4 lg:text-sm ${
                craft === null
                  ? "border-gold bg-gold text-navy"
                  : "border-cream/10 bg-navy-600/70 text-cream hover:border-gold/50"
              }`}
            >
              {t("common.viewAll")}
            </button>
            {craftTypes.map((ct) => (
              <button
                key={ct.key}
                onClick={() => setCraft((v) => (v === ct.key ? null : ct.key))}
                className={`lanna-subnav-link flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium lg:px-4 lg:text-sm ${
                  craft === ct.key
                    ? "border-gold bg-gold text-navy"
                    : "border-cream/10 bg-navy-600/70 text-cream hover:border-gold/50"
                }`}
              >
                <i className={`ti ${ct.icon} text-sm lg:text-base`} aria-hidden />
                {loc(ct.name, lang)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-[#dfe9d8]">
          <div ref={mapElRef} className="absolute inset-0 z-0" aria-label={c.title} />

          {!mapReady && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream">
              <div className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy shadow">
                {c.title}
              </div>
            </div>
          )}

          <div className="absolute left-3 top-3 z-20 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-navy shadow lg:left-8 lg:top-4 lg:px-4 lg:py-1.5 lg:text-sm xl:left-80">
            <i className="ti ti-map-pin text-xs lg:text-sm" aria-hidden /> {visible.length} {t("home.featured")}
          </div>

          <aside className="absolute left-4 top-4 z-10 hidden w-72 rounded-2xl border border-line bg-white/95 p-4 shadow-sm backdrop-blur xl:block">
            <div className="text-xs font-semibold uppercase tracking-wide text-gold-700">
              Nan Connect
            </div>
            <h2 className="mt-1 text-xl font-bold text-navy">{c.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{c.subtitle}</p>

            <div className="mt-4 rounded-xl border border-line bg-cream/70 p-3 text-xs text-muted">
              <i className="ti ti-boundary text-sm text-gold" aria-hidden /> {c.boundary}
              <div className="mt-1 text-[11px]">{c.mapNote}</div>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-sm font-semibold text-navy">{c.routes}</div>
              <div className="flex flex-col gap-2">
                {c.routeItems.map((route, index) => (
                  <div key={route[0]} className="flex gap-2 rounded-xl border border-line bg-cream/60 p-2">
                    <span
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                        ["bg-blue-600", "bg-orange-500", "bg-purple-600"][index]
                      }`}
                    />
                    <div>
                      <div className="text-xs font-semibold text-navy">{route[0]}</div>
                      <div className="text-[11px] text-muted">{route[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <aside className="absolute right-4 top-4 z-10 hidden w-72 rounded-2xl border border-line bg-white/95 p-4 shadow-sm backdrop-blur xl:block">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-navy">{c.keyPlaces}</h2>
              <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-gold-700">
                {c.scanNetwork}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {keyPlaces.map((p, index) => {
                const tint = TINT_HEX[p.tint] ?? TINT_HEX.navy;
                return (
                  <button
                    key={p.id}
                    onClick={() => choosePlace(p.id)}
                    className={`lanna-subnav-link flex items-center gap-2 rounded-xl border p-2 text-left transition ${
                      activePlace?.id === p.id
                        ? "border-gold bg-cream"
                        : "border-gold/20 bg-white hover:border-gold/60"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-gold">
                      {index + 1}
                    </span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: tint.bg }}
                    >
                      <i className={`ti ${p.icon} text-lg`} style={{ color: tint.fg }} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-navy">
                        {loc(p.name, lang)}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {districtLoc(p.district, lang)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>

        {activePlace && (
          <div className="border-t border-line bg-white">
            <Link href={`/place/${activePlace.id}`} className="mx-auto flex w-full max-w-7xl items-center gap-3 p-3 lg:px-8 lg:py-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg lg:h-14 lg:w-14"
                style={{ backgroundColor: (TINT_HEX[activePlace.tint] ?? TINT_HEX.navy).bg }}
              >
                <i
                  className={`ti ${activePlace.icon} text-2xl lg:text-3xl`}
                  style={{ color: (TINT_HEX[activePlace.tint] ?? TINT_HEX.navy).fg }}
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-navy lg:text-lg">{loc(activePlace.name, lang)}</h3>
                <div className="flex items-center gap-1 text-[11px] text-muted lg:text-xs">
                  <i className="ti ti-map-pin text-xs" aria-hidden />
                  {districtLoc(activePlace.district, lang)}
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[10px] font-medium text-gold-700 lg:text-[11px]">
                    <i className="ti ti-route text-xs" aria-hidden />
                    {c.smartRoute}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1">
                  <StarRating value={activePlace.rating} size="text-xs" />
                  <span className="text-xs font-medium">{activePlace.rating}</span>
                </div>
              </div>
              <i className="ti ti-chevron-right text-lg text-muted" aria-hidden />
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
