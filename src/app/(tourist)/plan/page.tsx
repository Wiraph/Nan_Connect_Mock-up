"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { ITINERARY } from "@/lib/mockAI";
import { getPlace, getCraft, TINT_HEX } from "@/lib/data";
import { loc } from "@/lib/types";

export default function PlanPage() {
  const { t, lang } = useI18n();
  const [seed, setSeed] = useState(0);

  const stops = ITINERARY.map((it) => ({ ...it, place: getPlace(it.id)! }));

  return (
    <>
      <AppHeader title={t("common.planRoute")} showBack />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-8 pt-4 lg:px-8 lg:pb-10 lg:pt-8">
        <div className="rounded-2xl bg-navy p-5 text-cream lg:p-6">
          <div className="flex items-center gap-2">
            <i className="ti ti-sparkles text-xl text-gold lg:text-2xl" aria-hidden />
            <h1 className="text-xl font-bold lg:text-2xl">{t("plan.title")}</h1>
          </div>
          <p className="mt-1 text-sm text-cream/75 lg:text-base">{t("plan.sub")}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-cream/80 lg:text-sm">
            <span className="inline-flex items-center gap-1">
              <i className="ti ti-map-pin text-gold" aria-hidden /> {stops.length} {t("home.featured")}
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="ti ti-clock text-gold" aria-hidden /> 1 {t("nav.home").toLowerCase()}/day
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="ti ti-building-arch text-gold" aria-hidden /> อ.เมืองน่าน
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div key={seed} className="relative mt-6 pl-2 lg:mt-7 lg:pl-4">
          <div className="absolute bottom-4 left-[18px] top-3 w-0.5 bg-line lg:left-[24px]" />
          <div className="flex flex-col gap-3 lg:gap-4">
            {stops.map((s, i) => {
              const c = TINT_HEX[s.place.tint] ?? TINT_HEX.navy;
              const craft = getCraft(s.place.craftType);
              return (
                <div key={s.id} className="relative flex gap-3 lg:gap-4">
                  <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-cream bg-navy text-[11px] font-semibold text-gold lg:h-11 lg:w-11 lg:text-sm">
                    {i + 1}
                  </div>
                  <Link
                    href={`/place/${s.place.id}`}
                    className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-white p-3 transition hover:border-navy-300 lg:gap-4 lg:rounded-2xl lg:p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg lg:h-16 lg:w-16" style={{ backgroundColor: c.bg }}>
                      <i className={`ti ${s.place.icon} text-2xl lg:text-3xl`} style={{ color: c.fg }} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-gold-700">
                          {s.time}
                        </span>
                        {craft && (
                          <span className="text-[10px] text-muted lg:text-xs">{loc(craft.name, lang)}</span>
                        )}
                      </div>
                      <div className="mt-0.5 truncate font-semibold text-navy lg:text-lg">{loc(s.place.name, lang)}</div>
                      <p className="truncate text-[12px] text-muted lg:text-sm">{loc(s.note, lang)}</p>
                    </div>
                    <i className="ti ti-chevron-right text-base text-muted" aria-hidden />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setSeed((s) => s + 1)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-navy py-2.5 text-sm font-medium text-navy lg:py-3 lg:text-base"
        >
          <i className="ti ti-refresh text-base text-gold" aria-hidden />
          {t("plan.regenerate")}
        </button>
      </main>
    </>
  );
}
