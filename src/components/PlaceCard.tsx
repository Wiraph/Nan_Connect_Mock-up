"use client";

import Link from "next/link";
import { Place } from "@/lib/types";
import { districtLoc, loc } from "@/lib/types";
import { useI18n } from "@/i18n/I18nProvider";
import { getCraft } from "@/lib/data";
import PlaceThumb from "./PlaceThumb";
import StarRating from "./StarRating";

export default function PlaceCard({ place }: { place: Place }) {
  const { lang } = useI18n();
  const craft = getCraft(place.craftType);

  return (
    <Link
      href={`/place/${place.id}`}
      className="group flex overflow-hidden rounded-xl border border-line bg-white transition hover:border-navy-300"
    >
      <PlaceThumb tint={place.tint} icon={place.icon} className="w-24 shrink-0" />
      <div className="min-w-0 flex-1 p-3">
        <div className="flex items-center gap-1 text-[11px] text-muted">
          <i className="ti ti-map-pin text-xs" aria-hidden />
          <span className="truncate">{districtLoc(place.district, lang)}</span>
          {craft && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-gold-700">
              <i className={`ti ${craft.icon} text-xs`} aria-hidden />
              {loc(craft.name, lang)}
            </span>
          )}
        </div>
        <h3 className="mt-0.5 truncate font-semibold text-navy">
          {loc(place.name, lang)}
        </h3>
        <p className="line-clamp-2 text-[12.5px] leading-snug text-muted">
          {loc(place.summary, lang)}
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <StarRating value={place.rating} size="text-xs" />
          <span className="text-xs font-medium text-ink">{place.rating}</span>
          <span className="text-[11px] text-muted">({place.reviews})</span>
        </div>
      </div>
    </Link>
  );
}
