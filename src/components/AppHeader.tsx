"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LangSwitcher from "./LangSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

const desktopLinks = [
  { href: "/", key: "nav.home" },
  { href: "/chat", key: "common.askAI" },
  { href: "/plan", key: "common.planRoute" },
  { href: "/map", key: "nav.map" },
  { href: "/dashboard", key: "nav.dashboard" },
];

export default function AppHeader({
  title,
  showBack = false,
}: {
  title?: string;
  showBack?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useI18n();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-20">
      <div className="lanna-strip h-2.5 bg-navy" />
      <div className="bg-navy text-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2">
            {showBack ? (
              <button
                onClick={handleBack}
                aria-label={t("common.back")}
                className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full hover:bg-navy-600"
              >
                <i className="ti ti-chevron-left text-xl" aria-hidden />
              </button>
            ) : (
              <i className="ti ti-qrcode text-xl text-gold" aria-hidden />
            )}
            <Link href="/" className="flex flex-col leading-tight">
              <span className={title ? "text-[15px] font-semibold" : "font-lanna text-lg"}>
                {title ?? "Nan Connect"}
              </span>
              {!title && (
                <span className="text-[11px] text-cream/70">{t("app.tagline")}</span>
              )}
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {desktopLinks.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`lanna-mainnav-link rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-gold text-navy"
                      : "text-cream/75 hover:bg-navy-600 hover:text-cream"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <LangSwitcher dark />
        </div>
      </div>
    </header>
  );
}
