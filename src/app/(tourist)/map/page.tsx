"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import StarRating from "@/components/StarRating";
import { useI18n } from "@/i18n/I18nProvider";
import { craftTypes, places, TINT_HEX } from "@/lib/data";
import { districtLoc, loc } from "@/lib/types";

const LON_MIN = 100.2;
const LON_MAX = 101.4;
const LAT_MIN = 17.8;
const LAT_MAX = 19.6;

function project(lat: number, lon: number) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 100;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  return { x, y };
}

export default function MapPage() {
  const { t, lang } = useI18n();
  const [craft, setCraft] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("wat-phumin");

  const visible = useMemo(
    () => (craft ? places.filter((p) => p.craftType === craft) : places),
    [craft]
  );
  const sel = places.find((p) => p.id === selected);

  return (
    <>
      <AppHeader title={t("nav.map")} showBack />
      <main className="flex flex-1 flex-col">
        {/* Filter chips */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto bg-navy px-4 py-2.5">
          <button
            onClick={() => setCraft(null)}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs ${
              craft === null ? "bg-gold text-navy" : "bg-navy-600 text-cream"
            }`}
          >
            {t("common.viewAll")}
          </button>
          {craftTypes.map((ct) => (
            <button
              key={ct.key}
              onClick={() => setCraft((v) => (v === ct.key ? null : ct.key))}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs ${
                craft === ct.key ? "bg-gold text-navy" : "bg-navy-600 text-cream"
              }`}
            >
              <i className={`ti ${ct.icon} text-sm`} aria-hidden />
              {loc(ct.name, lang)}
            </button>
          ))}
        </div>

        {/* Map area */}
        <div className="relative flex-1 overflow-hidden bg-[#e8efe8]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(0deg, #cdddcd 1px, transparent 1px), linear-gradient(90deg, #cdddcd 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* stylised river */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M55 0 C50 25, 60 40, 52 60 S40 90, 46 100"
              fill="none"
              stroke="#9fc6e0"
              strokeWidth="2.5"
              opacity="0.7"
            />
          </svg>

          {visible.map((p) => {
            const { x, y } = project(p.lat, p.lon);
            const c = TINT_HEX[p.tint] ?? TINT_HEX.navy;
            const isSel = p.id === selected;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className="absolute -translate-x-1/2 -translate-y-full transition"
                style={{ left: `${x}%`, top: `${y}%`, zIndex: isSel ? 20 : 10 }}
                aria-label={loc(p.name, lang)}
              >
                <span
                  className={`flex items-center justify-center rounded-full border-2 border-white shadow ${
                    isSel ? "h-9 w-9" : "h-7 w-7"
                  }`}
                  style={{ backgroundColor: c.fg }}
                >
                  <i className={`ti ${p.icon} text-sm text-white`} aria-hidden />
                </span>
              </button>
            );
          })}

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-navy shadow">
            <i className="ti ti-map-pin text-xs" aria-hidden /> {visible.length} {t("home.featured")}
          </div>
        </div>

        {/* Selected card */}
        {sel && (
          <div className="border-t border-line bg-white p-3">
            <Link href={`/place/${sel.id}`} className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: (TINT_HEX[sel.tint] ?? TINT_HEX.navy).bg }}
              >
                <i
                  className={`ti ${sel.icon} text-2xl`}
                  style={{ color: (TINT_HEX[sel.tint] ?? TINT_HEX.navy).fg }}
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-navy">{loc(sel.name, lang)}</h3>
                <div className="flex items-center gap-1 text-[11px] text-muted">
                  <i className="ti ti-map-pin text-xs" aria-hidden />
                  {districtLoc(sel.district, lang)}
                </div>
                <div className="mt-0.5 flex items-center gap-1">
                  <StarRating value={sel.rating} size="text-xs" />
                  <span className="text-xs font-medium">{sel.rating}</span>
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
