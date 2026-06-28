"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlaceIllustration, { placeIllo } from "@/components/PlaceIllustration";
import StarRating from "@/components/StarRating";
import FeedbackModal from "@/components/FeedbackModal";
import { useI18n } from "@/i18n/I18nProvider";
import { getCraft, getPlace } from "@/lib/data";
import { districtLoc, loc, textLoc } from "@/lib/types";

export default function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, lang } = useI18n();
  const [showFeedback, setShowFeedback] = useState(false);
  const place = getPlace(id);
  if (!place) return notFound();
  const craft = getCraft(place.craftType);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`;

  return (
    <>
      <AppHeader title={loc(place.name, lang)} showBack />

      <main className="mx-auto w-full max-w-5xl flex-1 pb-24 lg:px-8 lg:pt-6">
        {/* Hero */}
        <div className="relative h-44 overflow-hidden lg:h-72 lg:rounded-2xl lg:border lg:border-line">
          <PlaceIllustration
            kind={placeIllo(place.id)}
            tint={place.tint}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm shadow">
            <StarRating value={place.rating} size="text-xs" />
            <span className="font-semibold text-navy">{place.rating}</span>
          </div>
        </div>

        <div className="px-4 pt-3 lg:px-0 lg:pt-5">
          <div className="flex items-center gap-1 text-xs text-muted">
            <i className="ti ti-map-pin text-sm" aria-hidden />
            {districtLoc(place.district, lang)}
            {craft && (
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-cream-200 px-2 py-0.5 text-gold-700">
                <i className={`ti ${craft.icon} text-xs`} aria-hidden />
                {loc(craft.name, lang)}
              </span>
            )}
          </div>
          <h1 className="mt-1 text-xl font-bold text-navy">{loc(place.name, lang)}</h1>
          <p className="mt-1 text-sm text-muted">{loc(place.summary, lang)}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {place.tags[lang === "th" ? "th" : "en"].map((tag) => (
              <span key={tag} className="rounded-full bg-cream-200 px-2.5 py-0.5 text-[11px] text-navy">
                #{textLoc(tag, lang)}
              </span>
            ))}
          </div>
        </div>

        {/* About & culture */}
        <Section icon="ti-book-2" title={t("place.about")}>
          <p className="text-sm leading-relaxed text-ink">{loc(place.about, lang)}</p>
        </Section>

        {/* Experiences */}
        {place.experiences.length > 0 && (
          <Section icon="ti-compass" title={t("place.experiences")}>
            <div className="flex flex-col gap-2">
              {place.experiences.map((ex, i) => (
                <div key={i} className="rounded-xl border border-line bg-white p-3">
                  <div className="font-medium text-navy">{loc(ex.title, lang)}</div>
                  <p className="text-[12.5px] text-muted">{loc(ex.detail, lang)}</p>
                  <div className="mt-1.5 flex gap-3 text-[11px] text-gold-700">
                    {ex.duration ? (
                      <span className="inline-flex items-center gap-1">
                        <i className="ti ti-clock text-xs" aria-hidden />
                        {ex.duration} {t("common.minutes")}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1">
                      <i className="ti ti-tag text-xs" aria-hidden />
                      {ex.price ? `${ex.price} ${t("common.baht")}` : t("place.admission") + ": 0"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Shopping */}
        {place.shopping.length > 0 && (
          <Section icon="ti-shopping-bag" title={t("place.shopping")}>
            <div className="flex flex-col gap-2">
              {place.shopping.map((s, i) => (
                <div key={i} className="rounded-xl border border-line bg-white p-3">
                  <div className="font-medium text-navy">{loc(s.title, lang)}</div>
                  <p className="text-[12.5px] text-muted">{loc(s.detail, lang)}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Visit & services */}
        <Section icon="ti-info-circle" title={t("place.visit")}>
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <InfoRow icon="ti-clock" label={t("place.openingHours")} value={loc(place.visit.hours, lang)} />
            <InfoRow icon="ti-ticket" label={t("place.admission")} value={loc(place.visit.admission, lang)} />
            <InfoRow icon="ti-route" label={t("place.location")} value={loc(place.visit.howToGet, lang)} />
            {place.visit.contact && place.visit.contact !== "-" && (
              <InfoRow
                icon="ti-phone"
                label={t("place.contact")}
                value={place.visit.contact}
                href={`tel:${place.visit.contact}`}
              />
            )}
          </div>

          {/* Mini map */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-3 flex h-28 items-center justify-center overflow-hidden rounded-xl border border-line bg-cream-200"
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, #cfc8ad 1px, transparent 1px), linear-gradient(90deg, #cfc8ad 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="z-10 flex flex-col items-center text-navy">
              <i className="ti ti-map-pin-filled text-3xl text-[#d85a30]" aria-hidden />
              <span className="mt-1 rounded-full bg-white px-3 py-1 text-xs font-medium shadow">
                {place.lat.toFixed(4)}, {place.lon.toFixed(4)} · {t("common.openMap")}
              </span>
            </div>
          </a>
        </Section>

        {/* News & events */}
        {place.news.length > 0 && (
          <Section icon="ti-calendar-event" title={t("place.news")}>
            <div className="flex flex-col gap-2">
              {place.news.map((n, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-line bg-white p-3">
                  <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-indigo text-cream">
                    <i className="ti ti-calendar text-base text-gold" aria-hidden />
                    <span className="text-[10px]">{textLoc(n.month, lang)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-navy">{loc(n.title, lang)}</div>
                    <p className="text-[12.5px] text-muted">{loc(n.detail, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      {/* Floating actions (sit above the global bottom nav) */}
      <div className="sticky bottom-0 z-10 mx-auto flex w-full max-w-5xl gap-2 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:mb-6 lg:rounded-2xl lg:border lg:px-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy py-2.5 text-sm font-medium text-cream"
        >
          <i className="ti ti-navigation text-base text-gold" aria-hidden />
          {t("common.directions")}
        </a>
        <button
          onClick={() => setShowFeedback(true)}
          className="flex items-center justify-center gap-1.5 rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy"
        >
          <i className="ti ti-star text-base text-gold" aria-hidden />
          {t("common.rate")}
        </button>
      </div>

      {showFeedback && (
        <FeedbackModal placeName={loc(place.name, lang)} onClose={() => setShowFeedback(false)} />
      )}
    </>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 pt-5">
      <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-navy">
        <i className={`ti ${icon} text-lg text-gold`} aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoRow({
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
