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
      <div className="weave-strip h-1.5" />
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
            href="/"
            className="hidden items-center gap-1 rounded-full bg-navy-600 px-3 py-1.5 text-xs sm:flex"
          >
            <i className="ti ti-arrow-left text-sm text-gold" aria-hidden />
            {t("nav.home")}
          </Link>
          <LangSwitcher dark />
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-6">
        {tabs.map((tb) => {
          const active =
            tb.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tb.href);
          return (
            <Link
              key={tb.href}
              href={tb.href}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm transition ${
                active
                  ? "border-gold text-cream"
                  : "border-transparent text-cream/60 hover:text-cream"
              }`}
            >
              <i className={`ti ${tb.icon} text-base`} aria-hidden />
              {t(tb.key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
