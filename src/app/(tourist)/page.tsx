"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlaceCard from "@/components/PlaceCard";
import { useI18n } from "@/i18n/I18nProvider";
import { categories, craftTypes, places } from "@/lib/data";
import { loc, textLoc } from "@/lib/types";

export default function Home() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [craft, setCraft] = useState<string | null>(null);

  const featured = useMemo(
    () => (craft ? places.filter((p) => p.craftType === craft) : places),
    [craft]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/chat${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <>
      <AppHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy text-cream">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-7 pt-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold leading-snug lg:text-5xl">
                {t("home.hero.title")}
              </h1>
              <p className="mt-1 text-sm text-cream/75 lg:mt-3 lg:text-lg">
                {t("home.hero.sub")}
              </p>

              <form
                onSubmit={submit}
                className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 lg:mt-7 lg:max-w-2xl lg:py-3"
              >
                <i className="ti ti-search text-lg text-muted" aria-hidden />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("home.search.placeholder")}
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted lg:text-base"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy lg:h-10 lg:w-10"
                  aria-label={t("common.send")}
                >
                  <i className="ti ti-arrow-right text-base" aria-hidden />
                </button>
              </form>

              <div className="mt-3 grid grid-cols-3 gap-2 lg:mt-4 lg:max-w-2xl">
                <QuickAction href="/chat" icon="ti-message-chatbot" label={t("common.askAI")} />
                <QuickAction href="/plan" icon="ti-route" label={t("common.planRoute")} />
                <QuickAction href="/map" icon="ti-map-2" label={t("common.viewMap")} />
              </div>

              <Link
                href="/s/42"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-dashed border-gold/60 py-2 text-xs text-gold lg:max-w-2xl lg:py-2.5 lg:text-sm"
              >
                <i className="ti ti-qrcode text-base" aria-hidden />
                {lang === "th"
                  ? "จำลองการสแกน QR · จุดที่ 042"
                  : textLoc("Simulate QR scan · Point 042", lang)}
              </Link>
            </div>

            <div className="hidden rounded-2xl border border-gold/30 bg-navy-600/60 p-5 shadow-xl lg:block">
              <div className="weave-strip h-1.5 rounded-full" />
              <div className="mt-5 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold text-navy">
                  <i className="ti ti-qrcode text-2xl" aria-hidden />
                </div>
                <div>
                  <div className="text-sm text-cream/60">
                    {lang === "th" ? "จุดสแกนตัวอย่าง" : textLoc("Sample scan point", lang)}
                  </div>
                  <div className="text-xl font-bold">{String(42).padStart(3, "0")}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-navy px-3 py-3">
                  <div className="text-2xl font-bold text-gold">15</div>
                  <div className="text-cream/70">
                    {lang === "th" ? "อำเภอ" : textLoc("districts", lang)}
                  </div>
                </div>
                <div className="rounded-xl bg-navy px-3 py-3">
                  <div className="text-2xl font-bold text-gold">{places.length}</div>
                  <div className="text-cream/70">
                    {lang === "th" ? "จุดแนะนำ" : textLoc("featured", lang)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto w-full max-w-7xl px-4 pt-5 lg:px-8 lg:pt-8">
          <SectionTitle>{t("home.categories")}</SectionTitle>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={`/category/${c.key}`}
                className="flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-line bg-white py-3 text-center transition hover:border-navy-300 lg:min-h-24"
              >
                <i className={`ti ${c.icon} text-2xl text-navy`} aria-hidden />
                <span className="px-1 text-[11px] leading-tight text-ink lg:text-xs">{loc(c.name, lang)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Craft filters */}
        <section className="mx-auto w-full max-w-7xl pt-5 lg:px-8 lg:pt-8">
          <div className="px-4 lg:px-0">
            <SectionTitle>{t("home.crafts")}</SectionTitle>
          </div>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4 pb-1 lg:flex-wrap lg:overflow-visible lg:px-0">
            <Chip active={craft === null} onClick={() => setCraft(null)} icon="ti-asterisk" label={t("common.viewAll")} />
            {craftTypes.map((ct) => (
              <Chip
                key={ct.key}
                active={craft === ct.key}
                onClick={() => setCraft((v) => (v === ct.key ? null : ct.key))}
                icon={ct.icon}
                label={loc(ct.name, lang)}
              />
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-5 lg:px-8 lg:pt-8">
          <SectionTitle>{t("home.featured")}</SectionTitle>
          <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {featured.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-semibold text-navy">
      <span className="h-4 w-1 rounded-full bg-gold" />
      {children}
    </h2>
  );
}

function QuickAction({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 rounded-xl bg-navy-600 py-2.5 text-cream transition hover:bg-navy-300/40"
    >
      <i className={`ti ${icon} text-xl text-gold`} aria-hidden />
      <span className="text-[11px]">{label}</span>
    </Link>
  );
}

function Chip({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] transition ${
        active
          ? "border-navy bg-navy text-cream"
          : "border-line bg-white text-ink hover:border-navy-300"
      }`}
    >
      <i className={`ti ${icon} text-sm ${active ? "text-gold" : "text-navy"}`} aria-hidden />
      {label}
    </button>
  );
}
