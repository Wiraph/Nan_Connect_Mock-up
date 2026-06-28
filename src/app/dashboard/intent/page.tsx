"use client";

import Card from "@/components/dashboard/Card";
import IntentDonut from "@/components/dashboard/IntentDonut";
import { craftTypes, places } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { loc } from "@/lib/types";

export default function IntentPage() {
  const { t, lang } = useI18n();

  // Derive interest by craft type from place reviews (mock signal).
  const byCraft = craftTypes
    .map((c) => ({
      craft: c,
      total: places
        .filter((p) => p.craftType === c.key)
        .reduce((s, p) => s + p.reviews, 0),
    }))
    .filter((x) => x.total > 0)
    .sort((a, b) => b.total - a.total);
  const max = byCraft[0]?.total ?? 1;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title={t("dashboard.intent")} icon="ti-chart-donut">
        <IntentDonut />
        <p className="mt-4 rounded-xl bg-cream/60 p-3 text-[12.5px] leading-relaxed text-muted">
          <i className="ti ti-bulb mr-1 text-gold" aria-hidden />
          {lang === "th"
            ? "งานคราฟและวัฒนธรรมคือความสนใจอันดับหนึ่ง — ใช้กำหนดทิศทางการตลาดเชิงพื้นที่ในปีถัดไป"
            : "Crafts and culture lead all intent — a signal to steer next year's place-based marketing."}
        </p>
      </Card>

      <Card title={t("home.crafts")} icon="ti-needle">
        <div className="flex flex-col gap-2.5">
          {byCraft.map((x) => (
            <div key={x.craft.key} className="flex items-center gap-2 text-sm">
              <i className={`ti ${x.craft.icon} w-5 text-navy-300`} aria-hidden />
              <span className="w-28 shrink-0 truncate text-ink">{loc(x.craft.name, lang)}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-200">
                <div className="h-full rounded-full bg-gold" style={{ width: `${(x.total / max) * 100}%` }} />
              </div>
              <span className="w-12 text-right text-xs font-medium text-navy">
                {x.total.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
