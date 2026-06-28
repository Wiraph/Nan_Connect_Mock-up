"use client";

import { dashboard } from "@/lib/data";

export default function RatingBars() {
  const data = dashboard.ratingDistribution;
  return (
    <div className="flex flex-col gap-2">
      {data.map((r) => (
        <div key={r.stars} className="flex items-center gap-2 text-sm">
          <span className="flex w-10 items-center gap-0.5 text-gold">
            {r.stars}
            <i className="ti ti-star-filled text-xs" aria-hidden />
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-200">
            <div
              className="h-full rounded-full bg-gold"
              style={{ width: `${r.pct}%` }}
            />
          </div>
          <span className="w-9 text-right text-xs font-medium text-navy">{r.pct}%</span>
        </div>
      ))}
    </div>
  );
}
