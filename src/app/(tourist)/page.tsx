"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlaceCard from "@/components/PlaceCard";
import { useI18n } from "@/i18n/I18nProvider";
import { contentCategories, craftTypes } from "@/lib/data";
import { useDataStore } from "@/lib/DataStore";
import { loc, textLoc } from "@/lib/types";

export default function Home() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const { places } = useDataStore();
  const [query, setQuery] = useState("");
  const [craft, setCraft] = useState<string | null>(null);

  const featured = useMemo(
    () => (craft ? places.filter((p) => p.craftType === craft) : places),
    [craft, places]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  const heroText = (th: string, en: string) => (lang === "th" ? th : textLoc(en, lang));

  return (
    <>
      <AppHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy text-cream">
          <div className="lanna-watermark pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-7 pt-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
            <div className="anim-rise max-w-3xl">
              <h1 className="font-lanna text-2xl leading-snug lg:text-5xl">
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

            <div className="hidden min-h-[328px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-navy-600/60 p-5 shadow-xl lg:flex">
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
              <div className="mt-5 flex flex-1 flex-col rounded-xl border border-cream/10 bg-navy/55 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-cream">
                    {heroText("ตัวอย่างเส้นทาง AI", "AI journey preview")}
                  </div>
                  <div className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-medium text-gold">
                    {heroText("8 ภาษา", "8 languages")}
                  </div>
                </div>

                <div className="relative mt-4 h-28 overflow-hidden rounded-lg border border-cream/10 bg-navy-600/70">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, rgba(245,241,230,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,230,.18) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute left-7 right-7 top-[50px] border-t border-dashed border-gold/60" />
                  <div className="absolute left-[18%] top-4 flex -translate-x-1/2 flex-col items-center gap-1">
                    <JourneyPoint icon="ti-qrcode" />
                    <span className="text-[10px] font-medium text-cream/80">{heroText("สแกน QR", "Scan QR")}</span>
                  </div>
                  <div className="absolute left-1/2 top-4 flex -translate-x-1/2 flex-col items-center gap-1">
                    <JourneyPoint icon="ti-message-chatbot" active />
                    <span className="text-[10px] font-medium text-cream/80">{t("common.askAI")}</span>
                  </div>
                  <div className="absolute left-[82%] top-4 flex -translate-x-1/2 flex-col items-center gap-1">
                    <JourneyPoint icon="ti-route" />
                    <span className="text-[10px] font-medium text-cream/80">{heroText("เปิดเส้นทาง", "Open route")}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-cream/10 px-2 py-1 text-[10px] text-cream/75">
                    <i className="ti ti-map-pin-filled text-gold" aria-hidden />
                    Wat Phumin
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-cream/10 px-2 py-1 text-[10px] text-cream/75">
                    <i className="ti ti-sparkles text-gold" aria-hidden />
                    {heroText("เหมาะกับคุณ", "Personalized")}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-cream/70">
                  <span className="inline-flex items-center gap-1">
                    <i className="ti ti-clock text-gold" aria-hidden />
                    {heroText("แนะนำทันที", "Instant guide")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <i className="ti ti-chart-dots-2 text-gold" aria-hidden />
                    {heroText("ส่งเข้าแดชบอร์ด", "Dashboard signal")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto w-full max-w-7xl px-4 pt-5 lg:px-8 lg:pt-8">
          <SectionTitle>{t("home.categories")}</SectionTitle>
          <div className="stagger mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
            {contentCategories.map((c) => (
              <Link
                key={c.key}
                href={`/posts/${c.key}`}
                className="hover-lift flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl border border-line bg-white py-3 text-center hover:border-navy-300 lg:min-h-24"
              >
                <i className={`ti ${c.icon} text-2xl text-navy`} aria-hidden />
                <span className="px-1 text-[11px] leading-tight text-ink lg:text-xs">{t(c.labelKey)}</span>
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
          <div className="stagger mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
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

function JourneyPoint({ icon, active = false }: { icon: string; active?: boolean }) {
  return (
    <div
      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${
        active
          ? "border-gold bg-gold text-navy shadow-lg shadow-gold/20"
          : "border-gold/45 bg-navy text-gold"
      }`}
    >
      <i className={`ti ${icon} text-lg`} aria-hidden />
    </div>
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
