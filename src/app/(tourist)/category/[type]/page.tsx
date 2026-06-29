"use client";

import { useMemo, useState, use } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlaceCard from "@/components/PlaceCard";
import BusinessCard from "@/components/BusinessCard";
import { useI18n } from "@/i18n/I18nProvider";
import { useDataStore } from "@/lib/DataStore";
import { getCategory } from "@/lib/data";
import { loc } from "@/lib/types";

const CRAFT_MAP: Record<string, string[]> = {
  restaurant: ["food"],
  souvenir: ["weaving", "silver", "wickerwork", "pottery", "bamboo"],
  spa: ["wellness"],
  transport: ["nature"],
  agency: ["nature", "culture"],
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const { t, lang } = useI18n();
  const { places, businessesForCategory } = useDataStore();
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(20);
  const cat = getCategory(type);

  const biz = useMemo(() => businessesForCategory(type), [type, businessesForCategory]);
  const placeItems = useMemo(
    () =>
      type === "attraction"
        ? places
        : places.filter((p) => (CRAFT_MAP[type] ?? []).includes(p.craftType)),
    [type, places]
  );

  const filteredBiz = useMemo(
    () =>
      biz.filter(
        (b) =>
          b.name.toLowerCase().includes(q.toLowerCase()) ||
          b.district.toLowerCase().includes(q.toLowerCase())
      ),
    [biz, q]
  );

  if (!cat) return notFound();

  return (
    <>
      <AppHeader title={loc(cat.name, lang)} showBack />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-8 pt-4 lg:px-8 lg:pt-6">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-navy px-4 py-3 text-cream">
          <i className={`ti ${cat.icon} text-2xl text-gold`} aria-hidden />
          <div>
            <div className="font-semibold">{loc(cat.name, lang)}</div>
            <div className="text-xs text-cream/70">
              {(biz.length || placeItems.length).toLocaleString()} {t("common.viewAll").toLowerCase()}
            </div>
          </div>
        </div>

        {biz.length > 0 && (
          <div className="mb-4 flex max-w-2xl items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
            <i className="ti ti-search text-base text-muted" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("home.search.placeholder")}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        )}

        {/* Place items (attractions / craft-mapped) */}
        {placeItems.length > 0 && biz.length === 0 && (
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {placeItems.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        )}

        {/* Business listings */}
        {biz.length > 0 && (
          <>
            <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredBiz.slice(0, limit).map((b) => (
                <BusinessCard key={b.id} biz={b} />
              ))}
            </div>
            {filteredBiz.length > limit && (
              <button
                onClick={() => setLimit((l) => l + 20)}
                className="mt-4 w-full rounded-full border border-navy py-2.5 text-sm font-medium text-navy"
              >
                {t("common.viewAll")} ({filteredBiz.length - limit})
              </button>
            )}
          </>
        )}

        {placeItems.length === 0 && biz.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-muted">
            <i className="ti ti-database-off text-4xl" aria-hidden />
            <p className="text-sm">{loc(cat.name, lang)}</p>
          </div>
        )}
      </main>
    </>
  );
}
