"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { usePostStore } from "@/lib/PostStore";
import { POST_CATEGORY_META, isPostCategory } from "@/lib/posts";
import { getCraft, TINT_HEX } from "@/lib/data";
import { loc } from "@/lib/types";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = use(params);
  const { t, lang } = useI18n();
  const { getPost, hydrated } = usePostStore();

  if (!isPostCategory(category)) return notFound();
  const post = getPost(id);
  if (!post) {
    if (hydrated) return notFound();
    return <main className="flex-1 p-6 text-center text-muted">…</main>;
  }

  const meta = POST_CATEGORY_META[post.category];
  const tint = TINT_HEX[meta.tint] ?? TINT_HEX.navy;
  const craft = post.craftType ? getCraft(post.craftType) : undefined;
  const mapsUrl =
    post.lat && post.lon
      ? `https://www.google.com/maps/search/?api=1&query=${post.lat},${post.lon}`
      : null;

  return (
    <>
      <AppHeader title={loc(post.title, lang)} showBack />
      <main className="mx-auto w-full max-w-3xl flex-1 pb-16 lg:px-8 lg:pt-6">
        {/* Hero */}
        <div className="relative h-44 overflow-hidden lg:h-64 lg:rounded-2xl lg:border lg:border-line">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={loc(post.title, lang)} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: tint.bg }}>
              <i className={`ti ${meta.icon} text-6xl`} style={{ color: tint.fg }} aria-hidden />
            </div>
          )}
        </div>

        <div className="px-4 pt-4 lg:px-0">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-2 py-0.5 text-gold-700">
              <i className={`ti ${meta.icon} text-xs`} aria-hidden /> {t(meta.labelKey)}
            </span>
            {craft && <span>{loc(craft.name, lang)}</span>}
          </div>
          <h1 className="mt-2 text-xl font-bold text-navy lg:text-2xl">{loc(post.title, lang)}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink">{loc(post.detail, lang)}</p>

          {/* Meta rows */}
          <div className="mt-4 flex flex-col gap-2">
            {post.source && loc(post.source, lang) && (
              <MetaRow icon="ti-bookmark" label={t("place.source")} value={loc(post.source, lang)} />
            )}
            {post.directory && loc(post.directory, lang) && (
              <MetaRow icon="ti-list-details" label={t("place.directory")} value={loc(post.directory, lang)} />
            )}
            {post.duration ? (
              <MetaRow icon="ti-clock" label={t("place.openingHours")} value={`${post.duration} ${t("common.minutes")}`} />
            ) : null}
            {post.capacity ? (
              <MetaRow icon="ti-users" label={t("place.capacity")} value={String(post.capacity)} />
            ) : null}
            {post.price && loc(post.price, lang) && (
              <MetaRow icon="ti-cash" label={t("place.price")} value={loc(post.price, lang)} />
            )}
            {post.contact && (
              <MetaRow icon="ti-phone" label={t("place.contact")} value={post.contact} href={`tel:${post.contact}`} />
            )}
            {post.rentalCar && loc(post.rentalCar, lang) && (
              <MetaRow icon="ti-car" label={t("place.rentalCar")} value={loc(post.rentalCar, lang)} />
            )}
            {post.timeframe && loc(post.timeframe, lang) && (
              <MetaRow icon="ti-clock-hour-4" label={t("place.timeframe")} value={loc(post.timeframe, lang)} />
            )}
            {post.month && <MetaRow icon="ti-calendar" label={t("place.news")} value={post.month} />}
            {post.weather && loc(post.weather, lang) && (
              <MetaRow icon="ti-cloud" label={t("place.weather")} value={loc(post.weather, lang)} />
            )}
            {mapsUrl && (
              <MetaRow icon="ti-map-pin" label={t("place.location")} value={t("common.openMap")} href={mapsUrl} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function MetaRow({
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
    <div className="flex items-start gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
      <i className={`ti ${icon} mt-0.5 text-base text-navy-300`} aria-hidden />
      <div className="min-w-0">
        <div className="text-[11px] text-muted">{label}</div>
        <div className={`text-sm ${href ? "text-navy underline" : "text-ink"}`}>{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
