"use client";

import Link from "next/link";
import { Business, districtLoc } from "@/lib/types";
import { getCategory } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

export default function BusinessCard({ biz }: { biz: Business }) {
  const { lang } = useI18n();
  const cat = getCategory(biz.category);

  return (
    <Link
      href={`/biz/${biz.id}`}
      className="hover-lift flex items-center gap-3 rounded-xl border border-line bg-white p-3 hover:border-navy-300"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cream-200">
        <i className={`ti ${cat?.icon ?? "ti-map-pin"} text-xl text-navy`} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium text-navy">{biz.name}</h3>
        <div className="flex items-center gap-1 text-[11px] text-muted">
          <i className="ti ti-map-pin text-xs" aria-hidden />
          <span className="truncate">{districtLoc(biz.district, lang)}</span>
        </div>
      </div>
      {biz.phone && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-navy">
          <i className="ti ti-phone text-base" aria-hidden />
        </span>
      )}
      <i className="ti ti-chevron-right text-base text-muted" aria-hidden />
    </Link>
  );
}
