"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";

const items = [
  { href: "/", icon: "ti-home", key: "nav.home" },
  { href: "/chat", icon: "ti-message-chatbot", key: "common.askAI" },
  { href: "/map", icon: "ti-map-2", key: "nav.map" },
  { href: "/dashboard", icon: "ti-chart-pie", key: "nav.dashboard" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-line bg-white lg:hidden">
      {items.map((it) => {
        const active =
          it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className="relative flex flex-col items-center gap-0.5 pb-1.5 pt-2 text-[11px] transition"
          >
            {active && (
              <span className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gold" />
            )}
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition duration-200 ${
                active ? "scale-110 bg-gold/15 text-navy" : "text-muted"
              }`}
            >
              <i className={`ti ${it.icon} text-xl`} aria-hidden />
            </span>
            <span className={active ? "font-medium text-navy" : "text-muted"}>
              {t(it.key)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
