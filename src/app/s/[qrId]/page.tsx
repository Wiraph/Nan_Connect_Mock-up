"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import LangSwitcher from "@/components/LangSwitcher";
import PlaceIllustration, { placeIllo } from "@/components/PlaceIllustration";
import StarRating from "@/components/StarRating";
import { useI18n } from "@/i18n/I18nProvider";
import { useDataStore } from "@/lib/DataStore";
import { getCraft } from "@/lib/data";
import { districtLoc, loc } from "@/lib/types";

export default function ScanLanding({
  params,
}: {
  params: Promise<{ qrId: string }>;
}) {
  const { qrId } = use(params);
  const { t, lang } = useI18n();
  const { getPlaceByQr, hydrated } = useDataStore();
  const place = getPlaceByQr(parseInt(qrId, 10));
  if (!place) {
    if (hydrated) return notFound();
    return <div className="p-6 text-center text-cream/70">…</div>;
  }
  const craft = getCraft(place.craftType);

  return (
    <div className="min-h-dvh bg-navy text-cream">
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-navy text-cream">
      <div className="lanna-strip h-2.5 bg-navy" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2">
          <i className="ti ti-qrcode text-xl text-gold" aria-hidden />
          <span className="font-lanna text-lg">Nan Connect</span>
        </div>
        <LangSwitcher dark />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-6 lg:px-8 lg:py-10">
        <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs text-gold">
          <i className="ti ti-circle-check-filled" aria-hidden />
          {t("common.scanned")} · {t("common.point")} {String(place.qrPoint).padStart(3, "0")}
        </div>

        <p className="mt-4 text-sm text-cream/70">{t("scan.welcome")}</p>
        <h1 className="text-3xl font-bold leading-tight">{loc(place.name, lang)}</h1>

        <div className="mt-1 flex items-center gap-2 text-sm text-cream/80">
          <span className="inline-flex items-center gap-1">
            <i className="ti ti-map-pin text-sm text-gold" aria-hidden />
            {districtLoc(place.district, lang)}
          </span>
          {craft && (
            <span className="inline-flex items-center gap-1">
              <i className={`ti ${craft.icon} text-sm text-gold`} aria-hidden />
              {loc(craft.name, lang)}
            </span>
          )}
        </div>

        <div className="relative mt-5 h-40 overflow-hidden rounded-2xl lg:h-64">
          <PlaceIllustration
            kind={placeIllo(place.id)}
            tint={place.tint}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <StarRating value={place.rating} />
          <span className="font-semibold">{place.rating}</span>
          <span className="text-sm text-cream/60">({place.reviews})</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-cream/85">{loc(place.summary, lang)}</p>

        <div className="mt-auto flex flex-col gap-2 pt-6">
          <Link
            href="/chat"
            className="flex items-center justify-center gap-2 rounded-full bg-gold py-3 font-medium text-navy"
          >
            <i className="ti ti-message-chatbot text-lg" aria-hidden />
            {t("common.askAI")}
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/place/${place.id}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-cream/30 py-2.5 text-sm"
            >
              <i className="ti ti-info-circle text-base text-gold" aria-hidden />
              {t("place.about")}
            </Link>
            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-cream/30 py-2.5 text-sm"
            >
              <i className="ti ti-compass text-base text-gold" aria-hidden />
              {t("nav.explore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
