"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { useDataStore } from "@/lib/DataStore";
import { usePlanStore } from "@/lib/PlanStore";
import { craftTypes, getCraft, TINT_HEX } from "@/lib/data";
import { districtLoc, loc, Place } from "@/lib/types";
import { LangCode } from "@/i18n/dictionaries";
import {
  buildSchedule,
  minutesToHHMM,
  orderRoute,
  recommendNearby,
  type ScheduleStop,
  type TravelMode,
} from "@/lib/planner";

function travelLabel(t: (k: string) => string, mode: TravelMode, minutes: number, km: number) {
  const verb = mode === "walk" ? t("plan.byWalk") : t("plan.byCar");
  return `${verb} ${minutes} ${t("common.minutes")} · ${km.toFixed(1)} ${t("plan.km")}`;
}

function dirUrl(from: Place, to: Place, lang: LangCode, t: (k: string) => string) {
  const o = encodeURIComponent(`${loc(from.name, lang)} ${t("map.nanProvince")}`);
  const d = encodeURIComponent(`${loc(to.name, lang)} ${t("map.nanProvince")}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${o}&destination=${d}`;
}

export default function PlanPage() {
  const { t, lang } = useI18n();
  const { places } = useDataStore();
  const { placeIds, startMin, setPlan, removeStop } = usePlanStore();

  const [aiState, setAiState] = useState<"idle" | "thinking" | "fallback" | "ok">("idle");
  const [aiNotes, setAiNotes] = useState<Record<string, string>>({});
  const [pickerOpen, setPickerOpen] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // placeIds is the canonical order; schedule walks it directly.
  const schedule = useMemo(
    () => buildSchedule(placeIds, places, { startMin }),
    [placeIds, places, startMin]
  );
  const recs = useMemo(() => recommendNearby(placeIds, places, 6), [placeIds, places]);
  const available = useMemo(
    () => places.filter((p) => !placeIds.includes(p.id)),
    [places, placeIds]
  );

  const resetAi = () => {
    setAiNotes({});
    setAiState("idle");
  };

  const moveStop = useCallback(
    (targetId: string) => {
      if (!draggedId || draggedId === targetId) return;
      const fromIndex = placeIds.indexOf(draggedId);
      const toIndex = placeIds.indexOf(targetId);
      if (fromIndex < 0 || toIndex < 0) return;

      const next = [...placeIds];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      resetAi();
      setPlan(next);
    },
    [draggedId, placeIds, setPlan]
  );

  const finishDrag = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const addPlace = useCallback(
    (id: string) => {
      resetAi();
      setPlan(orderRoute([...placeIds, id], places));
    },
    [placeIds, places, setPlan]
  );

  const askAI = useCallback(async () => {
    if (!placeIds.length) return;
    setAiState("thinking");
    try {
      const resp = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: placeIds, lang, startTime: minutesToHHMM(startMin) }),
      });
      const data = await resp.json();
      if (data?.fallback || !Array.isArray(data?.stops) || !data.stops.length) {
        setAiState("fallback");
        return;
      }
      const order: string[] = data.stops.map((s: { id: string }) => s.id);
      const notes: Record<string, string> = {};
      for (const s of data.stops as { id: string; note?: string }[]) {
        if (s.note) notes[s.id] = s.note;
      }
      setAiNotes(notes);
      setAiState("ok");
      setPlan(order);
    } catch {
      setAiState("fallback");
    }
  }, [placeIds, lang, startMin, setPlan]);

  return (
    <>
      <AppHeader title={t("common.planRoute")} showBack />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-8 pt-4 lg:px-8 lg:pb-10 lg:pt-8">
        {/* Hero */}
        <div className="plan-lanna-hero overflow-hidden rounded-2xl border border-gold/25 bg-navy text-cream shadow-sm">
          <div className="lanna-strip h-2 bg-navy" />
          <div className="relative p-5 lg:p-6">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-25 lanna-watermark" />
            <div className="relative flex items-center gap-2">
              <i className="ti ti-sparkles text-xl text-gold lg:text-2xl" aria-hidden />
              <h1 className="text-xl font-bold lg:text-2xl">{t("plan.title")}</h1>
            </div>
            <p className="relative mt-1 text-sm text-cream/75 lg:text-base">{t("plan.sub")}</p>
            <div className="relative mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-cream/80 lg:text-sm">
              <span className="inline-flex items-center gap-1">
                <i className="ti ti-map-pin text-gold" aria-hidden /> {schedule.length} {t("home.featured")}
              </span>
              <span className="inline-flex items-center gap-1">
                <i className="ti ti-clock text-gold" aria-hidden />
                {schedule.length
                  ? `${minutesToHHMM(schedule[0].arrivalMin)}–${minutesToHHMM(
                      schedule[schedule.length - 1].departMin
                    )}`
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setPickerOpen(true)}
            className="lanna-plan-action flex items-center gap-1.5 rounded-full border border-navy bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-cream"
          >
            <i className="ti ti-plus text-base text-gold" aria-hidden />
            {t("plan.addPlace")}
          </button>
          <button
            onClick={askAI}
            disabled={aiState === "thinking" || !placeIds.length}
            className="lanna-plan-action flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream hover:bg-navy-600 disabled:opacity-60"
          >
            <i className={`ti ${aiState === "thinking" ? "ti-loader-2 animate-spin" : "ti-robot"} text-base text-gold`} aria-hidden />
            {aiState === "thinking" ? t("plan.aiThinking") : t("plan.aiPlan")}
          </button>
          <Link
            href="/map"
            className="lanna-plan-action flex items-center gap-1.5 rounded-full border border-navy bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-cream"
          >
            <i className="ti ti-map-2 text-base text-gold" aria-hidden />
            {t("plan.viewMap")}
          </Link>
        </div>

        {aiState === "fallback" && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-cream-200 px-3 py-1.5 text-xs text-gold-700">
            <i className="ti ti-info-circle" aria-hidden /> {t("plan.aiFallback")}
          </p>
        )}

        {/* Schedule */}
        {schedule.length === 0 ? (
          <div className="lanna-soft mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gold/35 bg-white/65 py-12 text-center text-muted">
            <i className="ti ti-route-off text-4xl" aria-hidden />
            <p className="max-w-xs text-sm">{t("plan.empty")}</p>
            <button
              onClick={() => setPickerOpen(true)}
              className="lanna-plan-action flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream hover:bg-navy-600"
            >
              <i className="ti ti-plus text-base text-gold" aria-hidden />
              {t("plan.addPlace")}
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-navy lg:mt-7">
              <i className="ti ti-list-numbers text-gold" aria-hidden /> {t("plan.yourRoute")}
            </div>
            <div className="plan-timeline relative mt-3 pl-2 lg:pl-4">
              <div className="plan-timeline-line" aria-hidden />
              <div className="flex flex-col gap-3 lg:gap-4">
                {schedule.map((s, i) => (
                  <PlanStop
                    key={s.place.id}
                    stop={s}
                    index={i}
                    prev={i > 0 ? schedule[i - 1] : null}
                    lang={lang as LangCode}
                    t={t}
                    note={aiNotes[s.place.id]}
                    isDragging={draggedId === s.place.id}
                    isDragOver={dragOverId === s.place.id && draggedId !== s.place.id}
                    onDragStart={() => setDraggedId(s.place.id)}
                    onDragOver={() => setDragOverId(s.place.id)}
                    onDragLeave={() => setDragOverId((current) => (current === s.place.id ? null : current))}
                    onDrop={() => {
                      moveStop(s.place.id);
                      finishDrag();
                    }}
                    onDragEnd={finishDrag}
                    onRemove={() => {
                      resetAi();
                      removeStop(s.place.id);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Add another stop */}
            <button
              onClick={() => setPickerOpen(true)}
              className="lanna-plan-action mt-3 flex w-fit items-center gap-1.5 rounded-full border border-dashed border-navy-300 px-4 py-2 text-sm font-medium text-navy hover:border-navy hover:bg-cream"
            >
              <i className="ti ti-plus text-base text-gold" aria-hidden />
              {t("plan.addPlace")}
            </button>
          </>
        )}

        {/* Recommendations */}
        {recs.length > 0 && (
          <div className="mt-7">
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-navy">
              <i className="ti ti-sparkles text-gold" aria-hidden /> {t("plan.recommend")}
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {recs.map((r) => {
                const tint = TINT_HEX[r.place.tint] ?? TINT_HEX.navy;
                const craft = getCraft(r.place.craftType);
                return (
                  <div key={r.place.id} className="plan-recommend-card flex items-center gap-3 rounded-xl border border-line bg-white p-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: tint.bg }}>
                      <i className={`ti ${r.place.icon} text-xl`} style={{ color: tint.fg }} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-navy">{loc(r.place.name, lang)}</div>
                      <div className="truncate text-[11px] text-muted">
                        {craft ? loc(craft.name, lang) + " · " : ""}
                        {travelLabel(t, r.mode, r.minutes, r.km)}
                      </div>
                    </div>
                    <button
                      onClick={() => addPlace(r.place.id)}
                      className="lanna-plan-action flex shrink-0 items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-medium text-cream hover:bg-navy-600"
                    >
                      <i className="ti ti-plus text-sm text-gold" aria-hidden /> {t("plan.addStop")}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {pickerOpen && (
        <PlacePicker
          available={available}
          lang={lang as LangCode}
          t={t}
          onAdd={addPlace}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
}

function PlacePicker({
  available,
  lang,
  t,
  onAdd,
  onClose,
}: {
  available: Place[];
  lang: LangCode;
  t: (k: string) => string;
  onAdd: (id: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [craft, setCraft] = useState<string | null>(null);

  // craft types that actually appear in the remaining places
  const crafts = useMemo(
    () => craftTypes.filter((ct) => available.some((p) => p.craftType === ct.key)),
    [available]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return available.filter((p) => {
      if (craft && p.craftType !== craft) return false;
      if (!needle) return true;
      return (
        loc(p.name, lang).toLowerCase().includes(needle) ||
        p.name.th.toLowerCase().includes(needle) ||
        p.name.en.toLowerCase().includes(needle) ||
        districtLoc(p.district, lang).toLowerCase().includes(needle)
      );
    });
  }, [available, craft, q, lang]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-cream shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lanna-subnav-surface flex items-center justify-between border-b border-gold/25 px-4 py-3 text-cream">
          <h2 className="flex items-center gap-1.5 font-semibold text-navy">
            <i className="ti ti-map-pin-plus text-gold" aria-hidden /> <span className="text-cream">{t("plan.pickPlace")}</span>
          </h2>
          <button
            onClick={onClose}
            aria-label={t("plan.close")}
            className="flex h-8 w-8 items-center justify-center rounded-full text-cream/75 hover:bg-navy-600/60 hover:text-cream"
          >
            <i className="ti ti-x text-lg" aria-hidden />
          </button>
        </div>

        <div className="border-b border-line bg-white px-4 pb-3">
          <div className="flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-2">
            <i className="ti ti-search text-base text-muted" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("plan.searchPlace")}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          {crafts.length > 0 && (
            <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto">
              <button
                onClick={() => setCraft(null)}
                className={`lanna-plan-action shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                  craft === null ? "border-navy bg-navy text-cream" : "border-line bg-white text-navy"
                }`}
              >
                {t("plan.all")}
              </button>
              {crafts.map((ct) => (
                <button
                  key={ct.key}
                  onClick={() => setCraft((v) => (v === ct.key ? null : ct.key))}
                  className={`lanna-plan-action flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                    craft === ct.key ? "border-navy bg-navy text-cream" : "border-line bg-white text-navy"
                  }`}
                >
                  <i className={`ti ${ct.icon} text-xs`} aria-hidden />
                  {loc(ct.name, lang)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {available.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted">{t("plan.allAdded")}</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted">{t("plan.noMatch")}</div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((p) => {
                const tint = TINT_HEX[p.tint] ?? TINT_HEX.navy;
                const craftType = getCraft(p.craftType);
                return (
                  <button
                    key={p.id}
                    onClick={() => onAdd(p.id)}
                    className="plan-recommend-card flex items-center gap-3 rounded-xl border border-line bg-white p-2.5 text-left transition hover:border-gold/60"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: tint.bg }}>
                      <i className={`ti ${p.icon} text-xl`} style={{ color: tint.fg }} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-navy">{loc(p.name, lang)}</div>
                      <div className="truncate text-[11px] text-muted">
                        {districtLoc(p.district, lang)}
                        {craftType ? ` · ${loc(craftType.name, lang)}` : ""}
                      </div>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-cream">
                      <i className="ti ti-plus text-base text-gold" aria-hidden />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlanStop({
  stop,
  index,
  prev,
  lang,
  t,
  note,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onRemove,
}: {
  stop: ScheduleStop;
  index: number;
  prev: ScheduleStop | null;
  lang: LangCode;
  t: (k: string) => string;
  note?: string;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
}) {
  const tint = TINT_HEX[stop.place.tint] ?? TINT_HEX.navy;
  const craft = getCraft(stop.place.craftType);
  const detail = note ?? loc(stop.place.summary, lang);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", stop.place.id);
        onDragStart();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      onDragEnd={onDragEnd}
      className={`relative flex cursor-grab flex-col gap-1 active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      } ${isDragOver ? "rounded-2xl bg-gold/10 ring-2 ring-gold/45" : ""}`}
    >
      {/* Travel leg from the previous stop */}
      {prev && stop.mode && (
        <a
          href={dirUrl(prev.place, stop.place, lang, t)}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-12 inline-flex w-fit items-center gap-1.5 rounded-full bg-cream-200 px-2.5 py-0.5 text-[11px] text-gold-700 hover:bg-cream-300 lg:ml-14"
        >
          <i className={`ti ${stop.mode === "walk" ? "ti-walk" : "ti-car"} text-xs`} aria-hidden />
          {travelLabel(t, stop.mode, stop.legMin, stop.legKm)}
          <i className="ti ti-external-link text-[10px]" aria-hidden />
        </a>
      )}

      <div className="relative flex items-center gap-3 lg:gap-4">
        <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-cream bg-navy text-[11px] font-semibold text-gold lg:h-11 lg:w-11 lg:text-sm">
          {index + 1}
        </div>
        <div className="plan-route-card flex flex-1 items-center gap-3 rounded-xl border border-line bg-white p-3 transition hover:border-gold/60 lg:gap-4 lg:rounded-2xl lg:p-4">
          <span className="hidden h-10 w-6 shrink-0 items-center justify-center rounded-full text-muted md:flex">
            <i className="ti ti-grip-vertical text-lg" aria-hidden />
          </span>
          <Link
            href={`/place/${stop.place.id}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg lg:h-16 lg:w-16"
            style={{ backgroundColor: tint.bg }}
          >
            <i className={`ti ${stop.place.icon} text-2xl lg:text-3xl`} style={{ color: tint.fg }} aria-hidden />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-gold-700">
                {t("plan.arrive")} {minutesToHHMM(stop.arrivalMin)}
              </span>
              {craft && <span className="text-[10px] text-muted lg:text-xs">{loc(craft.name, lang)}</span>}
            </div>
            <Link href={`/place/${stop.place.id}`} className="mt-0.5 block truncate font-semibold text-navy hover:underline lg:text-lg">
              {loc(stop.place.name, lang)}
            </Link>
            <p className="truncate text-[12px] text-muted lg:text-sm">{detail}</p>
          </div>
          <button
            onClick={onRemove}
            aria-label={t("plan.removeStop")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:border-[#993c1d] hover:text-[#993c1d]"
          >
            <i className="ti ti-x text-base" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
