"use client";

import Card from "@/components/dashboard/Card";
import DistrictHeatmap from "@/components/dashboard/DistrictHeatmap";
import { districts } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { loc } from "@/lib/types";

export default function HeatmapPage() {
  const { t, lang } = useI18n();
  const sorted = [...districts].sort((a, b) => b.scans - a.scans);
  const total = districts.reduce((s, d) => s + d.scans, 0);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Card title={t("dashboard.heatmap")} icon="ti-map-pin">
        <p className="mb-3 -mt-2 text-[12.5px] text-muted">
          {t("dashboard.subtitle")} · {total.toLocaleString()} scans · 15 {t("dashboard.byDistrict")}
        </p>
        <DistrictHeatmap />
      </Card>

      <Card title={t("dashboard.byDistrict")} icon="ti-list-numbers">
        <div className="flex flex-col gap-1.5">
          {sorted.map((d, i) => (
            <div key={d.key} className="flex items-center gap-2 border-b border-line py-1.5 text-sm last:border-0">
              <span className="w-5 text-right text-xs font-semibold text-muted">{i + 1}</span>
              <span className="flex-1 text-ink">{loc(d.name, lang)}</span>
              <span className="font-medium text-navy">{d.scans.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
