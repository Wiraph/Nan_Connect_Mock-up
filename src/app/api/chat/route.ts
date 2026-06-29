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

// Compact ground-truth list of Nan places injected into the system prompt.
const PLACE_CONTEXT = places
  .map(
    (p) =>
      `- ${p.name.en} (${p.name.th}) | ${p.district} | ${p.craftType} | ${p.summary.en}`
  )
  .join("\n");

type ChatMessage = { role: "user" | "assistant"; content: string };

function fallback(reason: string) {
  return Response.json({ fallback: true, reason }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return fallback("no-key");

  let body: { messages?: ChatMessage[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return fallback("bad-request");
  }

  const lang = body.lang ?? "th";
  const langName = LANG_NAME[lang] ?? "Thai";
  const history = (body.messages ?? [])
    .filter((m) => m && typeof m.content === "string" && m.content.trim())
    .slice(-8);

  const system = `You are the Nan Connect AI travel guide for Nan province, Northern Thailand.
Rules:
- Only help with travelling in Nan (places, food, stays, crafts, routes, culture).
- Treat the list below as ground truth. Recommend real places by name from the list. Do not invent places that are not in the list.
- Be warm and friendly. For simple questions, answer in 2-4 sentences.
- When the user asks for an itinerary, a multi-day plan, or "a week", give a clear day-by-day plan: label each day (Day 1, Day 2, …), list real place names grouped sensibly by area, and add a one-line reason each. Put each day and each item on its own line.
- Always reply in ${langName}, regardless of the language of the question.

Places in Nan:
${PLACE_CONTEXT}`;

  // Try several free models in order — free endpoints are often rate-limited
  // (HTTP 429), so fall through to the next until one returns 200.
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
          "HTTP-Referer":
            process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
          "X-Title": process.env.OPENROUTER_APP_NAME ?? "Nan Connect",
        },
        body: JSON.stringify({
          model,
          stream: true,
          temperature: 0.6,
          max_tokens: 900,
          messages: [{ role: "system", content: system }, ...history],
        }),
      });
    } catch {
      continue; // network hiccup — try next model
    }

    if (upstream.ok && upstream.body) {
      // Proxy the OpenAI-compatible SSE stream straight to the client.
      return new Response(upstream.body, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "x-nc-model": model,
        },
      });
    }
    // 429 / other error → try the next candidate
  }

  return fallback("all-models-busy");
}
