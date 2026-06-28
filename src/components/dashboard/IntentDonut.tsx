"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { dashboard } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { loc } from "@/lib/types";

type IntentItem = {
  key: string;
  value: number;
  tint: string;
  label: { th: string; en: string };
};

export default function IntentDonut() {
  const { lang } = useI18n();
  const data = dashboard.intent as IntentItem[];

  return (
    <div className="grid items-center gap-4 sm:grid-cols-2">
      <div className="relative mx-auto h-52 w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="key"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.key} fill={d.tint} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-navy">{data[0].value}%</span>
          <span className="text-[11px] text-muted">{loc(data[0].label, lang)}</span>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.tint }} />
            <span className="flex-1 text-ink">{loc(d.label, lang)}</span>
            <span className="font-semibold text-navy">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
