import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAI } from "@ai-sdk/openai";
import { SYSTEM_PROMPT } from "@/lib/prompt";

// ⚠️  Do NOT set runtime = "edge" — causes silent failures in local dev
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ── Normalize messages to CoreMessage format ────────────────────────
    // The useChat hook sends extra fields (id, createdAt) — strip them
    const coreMessages = (messages as { role: string; content: string }[]).map(
      (m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })
    );

    // ── Provider selection ──────────────────────────────────────────────
    // GROQ (recommended) → OpenAI fallback
    // ───────────────────────────────────────────────────────────────────
    let model;

    if (process.env.GROQ_API_KEY) {
      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
      // llama-3.3-70b-versatile is the current active model (3.1 was deprecated)
      model = groq("llama-3.3-70b-versatile");
    } else if (process.env.OPENAI_API_KEY) {
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
      model = openai("gpt-4o-mini");
    } else {
      return new Response(
        JSON.stringify({
          error:
            "No API key found. Add GROQ_API_KEY or OPENAI_API_KEY to .env.local",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: coreMessages,
      temperature: 0.75,
      maxTokens: 900,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[Chat API Error]", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
