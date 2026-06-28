"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import StarRating from "@/components/StarRating";
import { useI18n } from "@/i18n/I18nProvider";
import { getAIResponse } from "@/lib/mockAI";
import { TINT_HEX } from "@/lib/data";
import { Place, districtLoc, loc } from "@/lib/types";
import { LangCode } from "@/i18n/dictionaries";

type Msg =
  | { from: "user"; text: string }
  | { from: "ai"; text: string; places: Place[]; itinerary: boolean };

function ChatInner() {
  const { t, lang, ready } = useI18n();
  const sp = useSearchParams();
  const initial = sp.get("q") ?? "";
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      const res = getAIResponse(text, lang as LangCode);
      setMessages((m) => [
        ...m,
        { from: "ai", text: res.reply, places: res.places, itinerary: res.itinerary },
      ]);
      setTyping(false);
    }, 650);
  }, [lang]);

  useEffect(() => {
    if (!ready) return;
    if (started.current) return;
    started.current = true;
    if (!initial) return;
    const id = window.setTimeout(() => send(initial), 0);
    return () => window.clearTimeout(id);
  }, [initial, ready, send]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const suggestions = [t("chat.suggest1"), t("chat.suggest2"), t("chat.suggest3")];

  return (
    <>
      <AppHeader title={t("chat.title")} showBack />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col lg:px-8">
        <div className="flex-1 space-y-3 px-4 py-4 lg:px-0 lg:py-6">
          {/* Greeting */}
          <AiBubble>
            <p className="text-sm leading-relaxed">{t("chat.greeting")}</p>
          </AiBubble>

          {messages.map((m, i) =>
            m.from === "user" ? (
              <div key={i} className="anim-rise flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-navy px-3.5 py-2 text-sm text-cream">
                  {m.text}
                </div>
              </div>
            ) : (
              <AiBubble key={i}>
                <p className="text-sm leading-relaxed">{m.text}</p>
                {m.places.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {m.places.map((p) => (
                      <PlaceMini key={p.id} place={p} lang={lang as LangCode} />
                    ))}
                  </div>
                )}
                {m.itinerary && (
                  <Link
                    href="/plan"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-navy"
                  >
                    <i className="ti ti-route text-sm" aria-hidden />
                    {t("plan.title")}
                  </Link>
                )}
              </AiBubble>
            )
          )}

          {typing && (
            <AiBubble>
              <span className="flex gap-1">
                <Dot /> <Dot /> <Dot />
              </span>
            </AiBubble>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions + input */}
        <div className="sticky bottom-0 border-t border-line bg-cream px-4 pb-3 pt-2 lg:mb-6 lg:rounded-2xl lg:border lg:bg-white lg:px-4">
          {messages.length === 0 && (
            <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-gold px-3 py-1.5 text-xs text-gold-700"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-4 pr-1.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              aria-label={t("common.send")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy"
            >
              <i className="ti ti-send text-lg" aria-hidden />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

function AiBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="anim-rise flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy">
        <i className="ti ti-robot text-base text-gold" aria-hidden />
      </div>
      <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-line bg-white px-3.5 py-2 text-ink">
        {children}
      </div>
    </div>
  );
}

function PlaceMini({ place, lang }: { place: Place; lang: LangCode }) {
  const c = TINT_HEX[place.tint] ?? TINT_HEX.navy;
  return (
    <Link
      href={`/place/${place.id}`}
      className="flex items-center gap-2.5 rounded-xl border border-line bg-cream p-2 transition hover:border-navy-300"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: c.bg }}>
        <i className={`ti ${place.icon} text-xl`} style={{ color: c.fg }} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-navy">{loc(place.name, lang)}</div>
        <div className="flex items-center gap-1">
          <StarRating value={place.rating} size="text-[10px]" />
          <span className="text-[10px] text-muted">{districtLoc(place.district, lang)}</span>
        </div>
      </div>
      <i className="ti ti-chevron-right text-base text-muted" aria-hidden />
    </Link>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-300" />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted">…</div>}>
      <ChatInner />
    </Suspense>
  );
}
