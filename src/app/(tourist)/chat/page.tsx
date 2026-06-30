"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import StarRating from "@/components/StarRating";
import { useI18n } from "@/i18n/I18nProvider";
import { useDataStore } from "@/lib/DataStore";
import { usePlanStore } from "@/lib/PlanStore";
import { getAIResponse, matchPlaces } from "@/lib/mockAI";
import { TINT_HEX } from "@/lib/data";
import { Place, districtLoc, loc } from "@/lib/types";
import { LangCode } from "@/i18n/dictionaries";
import { orderRoute } from "@/lib/planner";

type Msg =
  | { from: "user"; text: string }
  | { from: "ai"; text: string; places: Place[]; itinerary: boolean };

function ChatInner() {
  const { t, lang, ready } = useI18n();
  const { places } = useDataStore();
  const { setPlan } = usePlanStore();
  const sp = useSearchParams();
  const initial = sp.get("q") ?? "";
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      setInput("");

      // Conversation history for the API (built before the state update).
      const history = [
        ...messages.map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: text },
      ];

      setMessages((m) => [...m, { from: "user", text }]);
      setTyping(true);

      const cards = matchPlaces(text);
      const applyPlan = (matched: Place[]) => {
        const ids = matched.map((p) => p.id);
        if (ids.length) setPlan(orderRoute(ids, places));
      };
      if (cards.itinerary) applyPlan(cards.places);

      const runMockFallback = () => {
        const res = getAIResponse(text, lang as LangCode);
        if (res.itinerary) applyPlan(res.places);
        setMessages((m) => [
          ...m,
          { from: "ai", text: res.reply, places: res.places, itinerary: res.itinerary },
        ]);
        setTyping(false);
      };

      try {
        const resp = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, lang }),
        });
        const ctype = resp.headers.get("content-type") ?? "";

        // No key / rate-limited / error → JSON fallback signal → use mock.
        if (!resp.ok || !resp.body || ctype.includes("application/json")) {
          runMockFallback();
          return;
        }

        // Stream the real model answer into a fresh AI bubble.
        setTyping(false);
        setMessages((m) => [
          ...m,
          { from: "ai", text: "", places: cards.places, itinerary: cards.itinerary },
        ]);

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let acc = "";
        const pushDelta = (delta: string) => {
          acc += delta;
          setMessages((m) => {
            const copy = [...m];
            const last = copy[copy.length - 1];
            if (last && last.from === "ai") {
              copy[copy.length - 1] = { ...last, text: acc };
            }
            return copy;
          });
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const s = line.trim();
            if (!s.startsWith("data:")) continue;
            const data = s.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta: string = json?.choices?.[0]?.delta?.content ?? "";
              if (delta) pushDelta(delta);
            } catch {
              // ignore keep-alive / non-JSON lines
            }
          }
        }

        // Empty stream → swap in a mock reply so the bubble is never blank.
        if (!acc.trim()) {
          const res = getAIResponse(text, lang as LangCode);
          setMessages((m) => {
            const copy = [...m];
            const last = copy[copy.length - 1];
            if (last && last.from === "ai") {
              copy[copy.length - 1] = {
                from: "ai",
                text: res.reply,
                places: res.places,
                itinerary: res.itinerary,
              };
            }
            return copy;
          });
        }
      } catch {
        runMockFallback();
      }
    },
    [messages, lang, places, setPlan]
  );

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
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-4 lg:px-8 lg:pt-6">
        <div className="plan-lanna-hero relative flex min-h-[calc(100dvh-190px)] flex-1 flex-col overflow-hidden rounded-2xl border border-gold/25 bg-cream/70 lg:min-h-[620px]">
          {/* Lanna textile backdrop */}
          <div className="lanna-soft pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden />
          <div className="relative flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
            {/* Guide intro */}
            <div className="plan-route-card anim-rise overflow-hidden rounded-2xl border border-gold/25 bg-white">
              <div className="lanna-strip h-2.5 bg-navy" />
              <div className="flex items-start gap-3 p-4 lg:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy ring-2 ring-gold ring-offset-2 ring-offset-white lg:h-12 lg:w-12">
                  <i className="ti ti-robot text-xl text-gold lg:text-2xl" aria-hidden />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-base font-semibold text-navy lg:text-lg">
                    {t("chat.title")}
                    <i className="ti ti-sparkles text-sm text-gold" aria-hidden />
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink lg:text-[15px]">{t("chat.greeting")}</p>
                </div>
              </div>
            </div>

            {messages.map((m, i) =>
              m.from === "user" ? (
                <div key={i} className="anim-rise flex justify-end">
                  <div className="plan-lanna-hero max-w-[82%] rounded-2xl rounded-tr-sm bg-navy px-4 py-2.5 text-sm text-cream lg:max-w-[62%] lg:text-[15px]">
                    {m.text}
                  </div>
                </div>
              ) : (
                <AiBubble key={i}>
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{m.text}</p>
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
                      onClick={() => {
                        const ids = m.places.map((p) => p.id);
                        if (ids.length) setPlan(orderRoute(ids, places));
                      }}
                      className="lanna-plan-action mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-navy"
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
        </div>

        {/* Suggestions + input */}
        <div className="sticky bottom-0 mt-4 border-t border-gold/25 bg-cream px-4 pb-3 pt-2 lg:rounded-2xl lg:border lg:bg-white lg:px-4 lg:pb-4 lg:pt-3">
          {/* Faint Nan mountain horizon above the input */}
          <svg
            className="pointer-events-none absolute -top-5 left-0 h-5 w-full"
            viewBox="0 0 400 24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 24 L55 9 L105 19 L165 6 L235 21 L300 11 L355 19 L400 12 L400 24 Z"
              fill="#1b2a4a"
              opacity="0.07"
            />
          </svg>
          {messages.length === 0 && (
            <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="lanna-plan-action flex shrink-0 items-center gap-1.5 rounded-full border border-gold bg-white px-3 py-1.5 text-xs text-gold-700 transition hover:bg-gold/10 lg:px-4 lg:text-sm"
                >
                  <i
                    className={`ti ${
                      ["ti-building-arch", "ti-gift", "ti-tools-kitchen-2"][i] ?? "ti-sparkles"
                    } text-sm`}
                    aria-hidden
                  />
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
            className="flex items-center gap-2 rounded-full border border-gold/35 bg-white py-1.5 pl-4 pr-1.5 shadow-sm lg:py-2 lg:pl-5 lg:pr-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted lg:text-base"
            />
            <button
              type="submit"
              aria-label={t("common.send")}
              className="lanna-plan-action flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy lg:h-10 lg:w-10"
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
    <div className="anim-rise flex items-start gap-2 lg:gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy ring-1 ring-gold/40 lg:h-9 lg:w-9">
        <i className="ti ti-robot text-base text-gold lg:text-lg" aria-hidden />
      </div>
      <div className="plan-route-card max-w-[88%] rounded-2xl rounded-tl-sm border border-line bg-white px-4 py-2.5 text-ink lg:max-w-[72%]">
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
      className="plan-recommend-card flex items-center gap-2.5 rounded-xl border border-line bg-cream p-2.5 transition hover:border-gold/60 lg:p-3"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:h-11 lg:w-11" style={{ backgroundColor: c.bg }}>
        <i className={`ti ${place.icon} text-xl lg:text-2xl`} style={{ color: c.fg }} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-navy lg:text-sm">{loc(place.name, lang)}</div>
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
