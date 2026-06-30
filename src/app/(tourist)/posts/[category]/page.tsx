"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { usePostStore } from "@/lib/PostStore";
import { isPostCategory, POST_CATEGORY_META, Post } from "@/lib/posts";
import { TINT_HEX } from "@/lib/data";
import { loc } from "@/lib/types";
import { LangCode } from "@/i18n/dictionaries";

export default function PostFeedPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const { t, lang } = useI18n();
  const { postsByCategory, hydrated } = usePostStore();

  if (!isPostCategory(category)) return notFound();

  const meta = POST_CATEGORY_META[category];
  const posts = postsByCategory(category);
  const tint = TINT_HEX[meta.tint] ?? TINT_HEX.navy;

  return (
    <>
      <AppHeader title={t(meta.labelKey)} showBack />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-4 lg:px-8 lg:pt-6">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-navy px-4 py-3 text-cream">
          <i className={`ti ${meta.icon} text-2xl text-gold`} aria-hidden />
          <div>
            <div className="font-semibold">{t(meta.labelKey)}</div>
            <div className="text-xs text-cream/70">{posts.length} {t("posts.count")}</div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-muted">
            <i className="ti ti-news-off text-4xl" aria-hidden />
            <p className="text-sm">{hydrated ? t("posts.empty") : "…"}</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} lang={lang as LangCode} t={t} tintBg={tint.bg} tintFg={tint.fg} icon={meta.icon} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function PostCard({
  post,
  lang,
  t,
  tintBg,
  tintFg,
  icon,
}: {
  post: Post;
  lang: LangCode;
  t: (k: string) => string;
  tintBg: string;
  tintFg: string;
  icon: string;
}) {
  const metaBits: string[] = [];
  if (post.duration) metaBits.push(`${post.duration} ${t("common.minutes")}`);
  if (post.capacity) metaBits.push(`${t("place.capacity")} ${post.capacity}`);
  if (post.price && loc(post.price, lang)) metaBits.push(loc(post.price, lang));
  if (post.month) metaBits.push(post.month);

  return (
    <Link
      href={`/posts/${post.category}/${post.id}`}
      className="hover-lift flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative h-32 w-full">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={loc(post.title, lang)} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: tintBg }}>
            <i className={`ti ${icon} text-4xl`} style={{ color: tintFg }} aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="font-semibold text-navy">{loc(post.title, lang)}</div>
        <p className="mt-0.5 line-clamp-2 text-[12.5px] text-muted">{loc(post.detail, lang)}</p>
        {metaBits.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {metaBits.map((m, i) => (
              <span key={i} className="rounded-full bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-gold-700">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
