"use client";

import Link from "next/link";
import KpiCard from "@/components/dashboard/KpiCard";
import IntentDonut from "@/components/dashboard/IntentDonut";
import RatingBars from "@/components/dashboard/RatingBars";
import Card from "@/components/dashboard/Card";
import { dashboard, districts } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { loc } from "@/lib/types";

export default function DashboardOverview() {
  const { t, lang } = useI18n();
  const k = dashboard.kpi;
  const top = [...districts].sort((a, b) => b.scans - a.scans).slice(0, 6);
  const max = top[0].scans;

  return (
    <div className="flex flex-col gap-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard icon="ti-qrcode" label={t("dashboard.kpi.scans")} value={`${(k.scansPerYear / 1000).toFixed(0)}K`} sub="+18% YoY" />
        <KpiCard icon="ti-mood-smile" label={t("dashboard.kpi.satisfaction")} value={`${k.satisfaction}%`} sub="≥ 85% target" />
        <KpiCard icon="ti-building-store" label={t("dashboard.kpi.stores")} value={`${k.stores}`} sub="> 300" />
        <KpiCard icon="ti-cash" label={t("dashboard.kpi.income")} value={`+${k.incomePerHousehold.toLocaleString()}`} sub={t("common.baht")} />
        <KpiCard icon="ti-star-filled" label={t("dashboard.kpi.rating")} value={`${k.avgRating}`} sub="/ 5.0" accent />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title={t("dashboard.intent")} icon="ti-chart-donut">
          <IntentDonut />
        </Card>

        <Card title={t("dashboard.byDistrict")} icon="ti-map-pin">
          <div className="flex flex-col gap-2.5">
            {top.map((d) => (
              <div key={d.key} className="flex items-center gap-2 text-sm">
                <span className="w-24 shrink-0 truncate text-ink">{loc(d.name, lang)}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-200">
                  <div className="h-full rounded-full bg-navy" style={{ width: `${(d.scans / max) * 100}%` }} />
                </div>
                <span className="w-12 text-right text-xs font-medium text-navy">
                  {d.scans.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title={t("dashboard.feedback")} icon="ti-star">
          <div className="mb-3 flex items-end gap-2">
            <span className="text-4xl font-bold text-navy">{k.avgRating}</span>
            <span className="mb-1 text-sm text-muted">/ 5.0 · {k.scansPerYear.toLocaleString()} reviews</span>
          </div>
          <RatingBars />
        </Card>

        <Card title={t("dashboard.recentReviews")} icon="ti-message-2">
          <div className="flex flex-col gap-2">
            {dashboard.recentReviews.slice(0, 3).map((r, i) => (
              <div key={i} className="rounded-xl border border-line bg-cream/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-navy">{loc(r.place, lang)}</span>
                  <span className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <i key={j} className="ti ti-star-filled text-xs" aria-hidden />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] text-muted">{loc(r.text, lang)}</p>
              </div>
            ))}
            <Link href="/dashboard/feedback" className="mt-1 text-center text-xs font-medium text-navy underline">
              {t("common.viewAll")}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
