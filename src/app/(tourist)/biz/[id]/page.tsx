"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import FeedbackModal from "@/components/FeedbackModal";
import { useI18n } from "@/i18n/I18nProvider";
import { getBusiness, getCategory } from "@/lib/data";
import { districtLoc, loc } from "@/lib/types";

export default function BizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, lang } = useI18n();
  const [showFeedback, setShowFeedback] = useState(false);
  const biz = getBusiness(id);
  if (!biz) return notFound();
  const cat = getCategory(biz.category);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    biz.name + " " + biz.district + " น่าน"
  )}`;

  return (
    <>
      <AppHeader title={biz.name} showBack />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-8 pt-4 lg:px-8 lg:pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cream-200">
            <i className={`ti ${cat?.icon ?? "ti-map-pin"} text-2xl text-navy`} aria-hidden />
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy">{biz.name}</h1>
            {cat && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-2 py-0.5 text-[11px] text-gold-700">
                <i className={`ti ${cat.icon} text-xs`} aria-hidden />
                {loc(cat.name, lang)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
          <Row
            icon="ti-map-pin"
            label={t("place.location")}
            value={biz.address || districtLoc(biz.district, lang)}
          />
          {biz.contact && <Row icon="ti-user" label={t("place.contact")} value={biz.contact} />}
          {biz.phone && (
            <Row icon="ti-phone" label={t("common.call")} value={biz.phone} href={`tel:${biz.phone}`} />
          )}
          {biz.facebook && <Row icon="ti-brand-facebook" label="Facebook" value={biz.facebook} />}
        </div>

        <div className="mt-4 flex gap-2">
          {biz.phone && (
            <a
              href={`tel:${biz.phone}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy py-2.5 text-sm font-medium text-cream"
            >
              <i className="ti ti-phone text-base text-gold" aria-hidden />
              {t("common.call")}
            </a>
          )}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy py-2.5 text-sm font-medium text-navy"
          >
            <i className="ti ti-navigation text-base text-gold" aria-hidden />
            {t("common.openMap")}
          </a>
        </div>

        <button
          onClick={() => setShowFeedback(true)}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-sm text-navy"
        >
          <i className="ti ti-star text-base text-gold" aria-hidden />
          {t("common.rate")}
        </button>
      </main>

      {showFeedback && (
        <FeedbackModal placeName={biz.name} onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
}

function Row({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 border-b border-line px-3 py-2.5 last:border-0">
      <i className={`ti ${icon} mt-0.5 text-base text-navy-300`} aria-hidden />
      <div className="min-w-0">
        <div className="text-[11px] text-muted">{label}</div>
        <div className={`text-sm ${href ? "text-navy underline" : "text-ink"}`}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
