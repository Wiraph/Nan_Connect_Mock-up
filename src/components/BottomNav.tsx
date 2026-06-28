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
            className={`flex flex-col items-center gap-0.5 py-2 text-[11px] transition ${
              active ? "text-navy" : "text-muted"
            }`}
          >
            <i className={`ti ${it.icon} text-xl`} aria-hidden />
            <span>{t(it.key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
