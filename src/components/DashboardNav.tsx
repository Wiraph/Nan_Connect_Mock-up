"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LangSwitcher from "./LangSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

const tabs = [
  { href: "/dashboard", key: "dashboard.overview", icon: "ti-layout-dashboard" },
  { href: "/dashboard/heatmap", key: "dashboard.heatmap", icon: "ti-map-pin" },
  { href: "/dashboard/intent", key: "dashboard.intent", icon: "ti-chart-donut" },
  { href: "/dashboard/feedback", key: "dashboard.feedback", icon: "ti-star" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-navy text-cream">
      <div className="lanna-strip h-2.5 bg-navy" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <i className="ti ti-chart-pie text-xl text-gold" aria-hidden />
          <div className="leading-tight">
            <div className="text-[15px] font-semibold">{t("dashboard.title")}</div>
            <div className="hidden text-[11px] text-cream/70 sm:block">
              {t("dashboard.subtitle")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            aria-label="Admin"
            className="flex items-center gap-1 rounded-full bg-navy-600 px-2.5 py-1.5 text-xs hover:bg-navy-300/40 sm:px-3"
          >
            <i className="ti ti-shield-cog text-base text-gold" aria-hidden />
            <span className="hidden sm:inline">หลังบ้าน</span>
          </Link>
          <Link
            href="/"
            aria-label={t("nav.home")}
            className="flex items-center gap-1 rounded-full bg-navy-600 px-2.5 py-1.5 text-xs hover:bg-navy-300/40 sm:px-3"
          >
            <i className="ti ti-home text-base text-gold" aria-hidden />
            <span className="hidden sm:inline">{t("nav.home")}</span>
          </Link>
          <LangSwitcher dark />
        </div>
      </div>

      <div className="lanna-subnav-surface border-t border-gold/20 shadow-inner shadow-navy/20">
        <nav className="mx-auto grid max-w-6xl grid-cols-4 px-1 sm:flex sm:gap-1 sm:px-6">
          {tabs.map((tb) => {
            const active =
              tb.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(tb.href);
            return (
              <Link
                key={tb.href}
                href={tb.href}
                aria-current={active ? "page" : undefined}
                className={`lanna-subnav-link flex flex-col items-center gap-1 border-b-2 px-1 py-2 text-center text-[11px] leading-tight transition sm:flex-row sm:gap-1.5 sm:px-3 sm:py-2.5 sm:text-sm ${
                  active
                    ? "border-gold bg-gold/10 text-cream"
                    : "border-transparent text-cream/60 hover:bg-navy-600/35 hover:text-cream"
                }`}
              >
                <i className={`ti ${tb.icon} text-lg sm:text-base`} aria-hidden />
                {t(tb.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
