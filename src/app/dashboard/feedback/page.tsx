"use client";

import Card from "@/components/dashboard/Card";
import KpiCard from "@/components/dashboard/KpiCard";
import RatingBars from "@/components/dashboard/RatingBars";
import { dashboard } from "@/lib/data";
import { languages } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/I18nProvider";
import { loc } from "@/lib/types";

export default function FeedbackPage() {
  const { t, lang } = useI18n();
  const k = dashboard.kpi;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard icon="ti-star-filled" label={t("dashboard.kpi.rating")} value={`${k.avgRating}`} sub="/ 5.0" accent />
        <KpiCard icon="ti-messages" label="Reviews" value={k.scansPerYear.toLocaleString()} sub="2569" />
        <KpiCard icon="ti-mood-smile" label={t("dashboard.kpi.satisfaction")} value={`${k.satisfaction}%`} sub="≥ 85%" />
        <KpiCard icon="ti-thumb-up" label="5★" value="75%" sub={t("dashboard.feedback")} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title={t("dashboard.feedback")} icon="ti-chart-bar">
          <RatingBars />
        </Card>

        <Card title={t("dashboard.recentReviews")} icon="ti-message-2">
          <div className="flex flex-col gap-2">
            {dashboard.recentReviews.map((r, i) => {
              const flag = languages.find((l) => l.code === r.lang)?.flag ?? "🌐";
              return (
                <div key={i} className="rounded-xl border border-line bg-cream/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy">
                      {flag} {loc(r.place, lang)}
                    </span>
                    <span className="flex items-center gap-0.5 text-gold">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <i key={j} className="ti ti-star-filled text-xs" aria-hidden />
                      ))}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted">{loc(r.text, lang)}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
