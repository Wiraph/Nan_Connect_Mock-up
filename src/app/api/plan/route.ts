import type { NextRequest } from "next/server";
import { places } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 30;

const LANG_NAME: Record<string, string> = {
  th: "Thai",
  en: "English",
  zh: "Chinese",
  ja: "Japanese",
  lo: "Lao",
  id: "Indonesian",
  vi: "Vietnamese",
  my: "Burmese",
};

function fallback(reason: string) {
  return Response.json({ fallback: true, reason }, { status: 200 });
}

/** Pull the first JSON object out of a model reply (handles ```json fences). */
function extractJson(text: string): unknown | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return fallback("no-key");

  let body: { ids?: string[]; interests?: string[]; lang?: string; startTime?: string };
  try {
    body = await req.json();
  } catch {
    return fallback("bad-request");
  }

  const lang = body.lang ?? "th";
  const langName = LANG_NAME[lang] ?? "Thai";
  const ids = Array.isArray(body.ids) ? body.ids : [];
  const chosen = places.filter((p) => ids.includes(p.id));
  if (!chosen.length) return fallback("no-places");

  const context = chosen
    .map(
      (p) =>
        `- id:${p.id} | ${p.name.en} (${p.name.th}) | ${p.district} | ${p.craftType} | hours:${p.visit.hours.en || p.visit.hours.th} | lat:${p.lat} lon:${p.lon}`
    )
    .join("\n");

  const system = `You are a trip planner for Nan province, Thailand.
Given a set of chosen places, order them into a sensible one-day itinerary that minimises back-tracking and respects opening hours.
Start the day around ${body.startTime ?? "08:30"}.
Reply with STRICT JSON ONLY, no prose, no markdown fences, in this exact shape:
{"stops":[{"id":"<place id>","time":"HH:MM","note":"<one short reason in ${langName}>"}],"warnings":["<short ${langName} warning if a place may be hard to reach in time, else omit>"]}
Use only the provided place ids. Keep notes under 12 words. Write all text in ${langName}.

Chosen places:
${context}`;

  const DEFAULT_CHAIN = [
    "google/gemma-4-26b-a4b-it:free",
    "google/gemma-4-31b-it:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "openai/gpt-oss-120b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "qwen/qwen3-next-80b-a3b-instruct:free",
  ];
  const envModels = (process.env.OPENROUTER_MODEL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const candidates = [...new Set([...envModels, ...DEFAULT_CHAIN])];

  for (const model of candidates) {
    let upstream: Response;
    try {
      upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
          "X-Title": process.env.OPENROUTER_APP_NAME ?? "Nan Connect",
        },
        body: JSON.stringify({
          model,
          stream: false,
          temperature: 0.4,
          max_tokens: 700,
          messages: [{ role: "system", content: system }],
        }),
      });
    } catch {
      continue;
    }

    if (!upstream.ok) continue; // 429 / error → next model

    let data: { choices?: { message?: { content?: string } }[] };
    try {
      data = await upstream.json();
    } catch {
      continue;
    }

    const content = data.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(content) as
      | { stops?: { id: string; time?: string; note?: string }[]; warnings?: string[] }
      | null;

    const validIds = new Set(chosen.map((p) => p.id));
    const stops = (parsed?.stops ?? []).filter((s) => s && validIds.has(s.id));
    if (stops.length) {
      return Response.json({
        stops,
        warnings: Array.isArray(parsed?.warnings) ? parsed!.warnings : [],
        model,
      });
    }
  }

  return fallback("all-models-busy");
}
