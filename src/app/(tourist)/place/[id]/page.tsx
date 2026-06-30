"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlaceIllustration, { placeIllo } from "@/components/PlaceIllustration";
import StarRating from "@/components/StarRating";
import FeedbackModal from "@/components/FeedbackModal";
import { useI18n } from "@/i18n/I18nProvider";
import { useDataStore } from "@/lib/DataStore";
import { getCraft } from "@/lib/data";
import { districtLoc, loc, textLoc } from "@/lib/types";

export default function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, lang } = useI18n();
  const { getPlace, hydrated } = useDataStore();
  const [showFeedback, setShowFeedback] = useState(false);
  const place = getPlace(id);
  if (!place) {
    if (hydrated) return notFound();
    return <main className="flex-1 p-6 text-center text-muted">…</main>;
  }
  const craft = getCraft(place.craftType);

  const mapsQuery = `${place.name.th} ${place.district} จังหวัดน่าน`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`;

  return (
    <>
      <AppHeader title={loc(place.name, lang)} showBack />

      <main className="mx-auto w-full max-w-5xl flex-1 pb-24 lg:px-8 lg:pt-6">
        {/* Hero */}
        <div className="relative h-44 overflow-hidden lg:h-72 lg:rounded-2xl lg:border lg:border-line">
          {place.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={place.image}
              alt={loc(place.name, lang)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <PlaceIllustration
              kind={placeIllo(place.id)}
              tint={place.tint}
              className="absolute inset-0 h-full w-full"
            />
          )}
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
          {place.source && loc(place.source, lang) && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              <span className="font-medium text-navy">{t("place.source")}: </span>
              {loc(place.source, lang)}
            </p>
          )}
          {place.directory && loc(place.directory, lang) && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              <span className="font-medium text-navy">{t("place.directory")}: </span>
              {loc(place.directory, lang)}
            </p>
          )}
          {place.certDocs && place.certDocs.length > 0 && (
            <div className="mt-3">
              <div className="mb-1 text-xs font-medium text-navy">{t("place.documents")}</div>
              <div className="flex flex-col gap-1.5">
                {place.certDocs.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-[12.5px] text-navy underline"
                  >
                    <i className="ti ti-file-text text-base text-gold" aria-hidden />
                    {loc(doc.name, lang)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* Experiences */}
        {place.experiences.length > 0 && (
          <Section icon="ti-compass" title={t("place.experiences")}>
            <div className="flex flex-col gap-2">
              {place.experiences.map((ex, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-line bg-white">
                  {ex.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ex.image} alt={loc(ex.title, lang)} className="h-32 w-full object-cover" />
                  )}
                  <div className="p-3">
                    <div className="font-medium text-navy">{loc(ex.title, lang)}</div>
                    <p className="text-[12.5px] text-muted">{loc(ex.detail, lang)}</p>
                    <div className="mt-1.5 flex flex-wrap gap-3 text-[11px] text-gold-700">
                      {ex.duration ? (
                        <span className="inline-flex items-center gap-1">
                          <i className="ti ti-clock text-xs" aria-hidden />
                          {ex.duration} {t("common.minutes")}
                        </span>
                      ) : null}
                      {ex.capacity ? (
                        <span className="inline-flex items-center gap-1">
                          <i className="ti ti-users text-xs" aria-hidden />
                          {ex.capacity}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1">
                        <i className="ti ti-tag text-xs" aria-hidden />
                        {ex.price ? `${ex.price} ${t("common.baht")}` : t("place.admission") + ": 0"}
                      </span>
                    </div>
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
                <div key={i} className="overflow-hidden rounded-xl border border-line bg-white">
                  {s.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={loc(s.title, lang)} className="h-32 w-full object-cover" />
                  )}
                  <div className="p-3">
                    <div className="font-medium text-navy">{loc(s.title, lang)}</div>
                    <p className="text-[12.5px] text-muted">{loc(s.detail, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Visit & services */}
        <Section icon="ti-info-circle" title={t("place.visit")}>
          {place.visit.services && place.visit.services.length > 0 && (
            <div className="mb-3 flex flex-col gap-2">
              {place.visit.services.map((s, i) => (
                <div key={i} className="rounded-xl border border-line bg-white p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-navy">{loc(s.title, lang)}</div>
                    {s.price && loc(s.price, lang) && (
                      <span className="shrink-0 rounded-full bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-gold-700">
                        {loc(s.price, lang)}
                      </span>
                    )}
                  </div>
                  <p className="text-[12.5px] text-muted">{loc(s.detail, lang)}</p>
                </div>
              ))}
            </div>
          )}
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <InfoRow icon="ti-clock" label={t("place.openingHours")} value={loc(place.visit.hours, lang)} />
            <InfoRow icon="ti-ticket" label={t("place.admission")} value={loc(place.visit.admission, lang)} />
            {place.visit.price && loc(place.visit.price, lang) && (
              <InfoRow icon="ti-cash" label={t("place.price")} value={loc(place.visit.price, lang)} />
            )}
            {place.visit.rentalCar && loc(place.visit.rentalCar, lang) && (
              <InfoRow icon="ti-car" label={t("place.rentalCar")} value={loc(place.visit.rentalCar, lang)} />
            )}
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

          <MiniPlaceMap
            lat={place.lat}
            lon={place.lon}
            label={loc(place.name, lang)}
            mapsUrl={mapsUrl}
            openMapLabel={t("common.openMap")}
          />
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
                    <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-gold-700">
                      {n.timeframe && loc(n.timeframe, lang) && (
                        <span className="inline-flex items-center gap-1">
                          <i className="ti ti-clock-hour-4 text-xs" aria-hidden />
                          {loc(n.timeframe, lang)}
                        </span>
                      )}
                      {n.weather && loc(n.weather, lang) && (
                        <span className="inline-flex items-center gap-1">
                          <i className="ti ti-cloud text-xs" aria-hidden />
                          {loc(n.weather, lang)}
                        </span>
                      )}
                    </div>
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
          href={directionsUrl}
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

function MiniPlaceMap({
  lat,
  lon,
  label,
  mapsUrl,
  openMapLabel,
}: {
  lat: number;
  lon: number;
  label: string;
  mapsUrl: string;
  openMapLabel: string;
}) {
  const map = getStaticMapTiles(lat, lon);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} ${openMapLabel}`}
      className="group relative mt-3 block h-36 overflow-hidden rounded-xl border border-line bg-cream-200 shadow-sm lg:h-48"
    >
      <div
        className="absolute left-1/2 top-1/2 z-0 grid max-w-none"
        style={{
          gridTemplateColumns: `repeat(${map.columns}, 256px)`,
          height: map.rows * 256,
          transform: `translate(${-map.centerOffsetX}px, ${-map.centerOffsetY}px)`,
          width: map.columns * 256,
        }}
        aria-hidden
      >
        {map.tiles.map((tile) => (
          <span
            key={`${tile.x}-${tile.y}`}
            className="block h-64 w-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${tile.src})` }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-navy/15 via-transparent to-transparent" />
      <span className="place-mini-map-marker pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-full">
        <i className="ti ti-map-pin-filled" aria-hidden />
      </span>
      <div className="absolute inset-x-3 bottom-3 z-20 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-navy shadow transition group-hover:text-gold-700">
          <i className="ti ti-map-pin text-sm text-gold" aria-hidden />
          {label} · {openMapLabel}
        </span>
      </div>
      <span className="absolute bottom-2 right-2 z-20 rounded bg-white/80 px-1.5 py-0.5 text-[10px] text-muted shadow-sm">
        © OSM
      </span>
    </a>
  );
}

function getStaticMapTiles(lat: number, lon: number) {
  const zoom = 14;
  const tileSize = 256;
  const radiusX = 3;
  const radiusY = 2;
  const columns = radiusX * 2 + 1;
  const rows = radiusY * 2 + 1;
  const n = 2 ** zoom;
  const latRad = (lat * Math.PI) / 180;
  const xFloat = ((lon + 180) / 360) * n;
  const yFloat =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  const xTile = Math.floor(xFloat);
  const yTile = Math.floor(yFloat);
  const xFrac = xFloat - xTile;
  const yFrac = yFloat - yTile;
  const tiles: { src: string; x: number; y: number }[] = [];

  for (let dy = -radiusY; dy <= radiusY; dy += 1) {
    for (let dx = -radiusX; dx <= radiusX; dx += 1) {
      const x = (xTile + dx + n) % n;
      const y = yTile + dy;
      if (y < 0 || y >= n) continue;
      tiles.push({
        src: `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`,
        x,
        y,
      });
    }
  }

  return {
    centerOffsetX: (radiusX + xFrac) * tileSize,
    centerOffsetY: (radiusY + yFrac) * tileSize,
    columns,
    rows,
    tiles,
  };
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
