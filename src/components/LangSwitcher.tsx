"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { languages } from "@/i18n/dictionaries";

export default function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
          dark
            ? "bg-navy-600 text-cream hover:bg-navy-300/40"
            : "bg-cream-200 text-navy hover:bg-line"
        }`}
      >
        <i className="ti ti-world text-base text-gold" aria-hidden />
        <span>{current.label}</span>
        <i className="ti ti-chevron-down text-sm" aria-hidden />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="anim-pop absolute right-0 z-40 mt-2 w-44 origin-top overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-cream ${
                  l.code === lang ? "font-semibold text-navy" : "text-ink"
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span>{l.label}</span>
                {l.code === lang && (
                  <i className="ti ti-check ml-auto text-gold" aria-hidden />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
