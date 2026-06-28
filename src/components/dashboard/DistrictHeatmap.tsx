"use client";

import { useState } from "react";
import { districts } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { loc } from "@/lib/types";

export default function DistrictHeatmap() {
  const { lang } = useI18n();
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...districts.map((d) => d.scans));

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-[#eef3ee] sm:aspect-[4/3]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(0deg, #d6e3d6 1px, transparent 1px), linear-gradient(90deg, #d6e3d6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M55 2 C50 25, 62 40, 52 60 S40 92, 47 99" fill="none" stroke="#9fc6e0" strokeWidth="2" opacity="0.6" />
      </svg>

      {districts.map((d) => {
        const ratio = d.scans / max;
        const size = 16 + ratio * 44;
        const active = hover === d.key;
        return (
          <div
            key={d.key}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
            onMouseEnter={() => setHover(d.key)}
            onMouseLeave={() => setHover(null)}
          >
            <div
              className="rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: "#d85a30",
                opacity: 0.25 + ratio * 0.5,
                boxShadow: active ? "0 0 0 3px #1b2a4a" : "none",
              }}
            />
            {active && (
              <div className="absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-2 py-1 text-[11px] text-cream shadow">
                {loc(d.name, lang)} · {d.scans.toLocaleString()}
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute bottom-2 right-2 rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] text-navy shadow">
        <div className="mb-1 font-medium">Scans</div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#d85a30] opacity-30" />
          <span className="h-3 w-3 rounded-full bg-[#d85a30] opacity-60" />
          <span className="h-4 w-4 rounded-full bg-[#d85a30] opacity-90" />
        </div>
      </div>
    </div>
  );
}
