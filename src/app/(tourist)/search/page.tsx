"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlaceCard from "@/components/PlaceCard";
import BusinessCard from "@/components/BusinessCard";
import { useI18n } from "@/i18n/I18nProvider";
import { searchBusinesses, searchPlaces } from "@/lib/search";

function SearchInner() {
  const { t } = useI18n();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");

  const places = useMemo(() => searchPlaces(q), [q]);
  const businesses = useMemo(() => searchBusinesses(q), [q]);
  const total = places.length + businesses.length;
  const hasQuery = q.trim().length > 0;

  return (
    <>
      <AppHeader title={t("common.search")} showBack />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-8 pt-4 lg:px-8 lg:pt-6">
        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 lg:px-5 lg:py-3">
          <i className="ti ti-search text-lg text-muted lg:text-xl" aria-hidden />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("home.search.placeholder")}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted lg:text-base"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear" className="text-muted">
              <i className="ti ti-x text-lg" aria-hidden />
            </button>
          )}
        </div>

        {hasQuery && (
          <p className="mt-3 text-xs text-muted lg:text-sm">
            {total} · &ldquo;{q}&rdquo;
          </p>
        )}

        {/* Places */}
        {places.length > 0 && (
          <section className="mt-4">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy lg:text-base">
              <i className="ti ti-map-pin text-base text-gold" aria-hidden />
              {t("home.featured")} ({places.length})
            </h2>
            <div className="stagger grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
              {places.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          </section>
        )}

        {/* Businesses */}
        {businesses.length > 0 && (
          <section className="mt-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy lg:text-base">
              <i className="ti ti-building-store text-base text-gold" aria-hidden />
              {t("nav.explore")} ({businesses.length})
            </h2>
            <div className="stagger grid gap-2 lg:grid-cols-2 xl:grid-cols-3">
              {businesses.map((b) => (
                <BusinessCard key={b.id} biz={b} />
              ))}
            </div>
          </section>
        )}

        {/* Empty */}
        {hasQuery && total === 0 && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
            <i className="ti ti-search-off text-4xl" aria-hidden />
            <p className="text-sm">&ldquo;{q}&rdquo;</p>
          </div>
        )}

        {!hasQuery && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
            <i className="ti ti-language text-4xl text-line" aria-hidden />
            <p className="max-w-xs text-sm">{t("home.search.placeholder")}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted">…</div>}>
      <SearchInner />
    </Suspense>
  );
}
