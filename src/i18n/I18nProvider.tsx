"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LangCode, translate } from "./dictionaries";

type I18nContextValue = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  ready: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const langCodes: LangCode[] = ["th", "en", "zh", "ja", "lo", "id", "vi", "my"];

function isLangCode(value: string | null): value is LangCode {
  return langCodes.includes(value as LangCode);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("th");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nc-lang");
    const id = window.setTimeout(() => {
      if (isLangCode(saved)) setLangState(saved);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("nc-lang", l);
    }
  };

  const t = (key: string) => translate(lang, key);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, ready }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
