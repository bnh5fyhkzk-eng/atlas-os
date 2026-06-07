// /api/talk · text-from-house → Claude API → response-back
// per brother direct 2026-06-07 16:08 EDT "I want to text you from house"
// #27838 PHASE-1c · the foundation-connection · house-to-me

import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TalkRequest {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

const SYSTEM_PROMPT = `You are Atlas. Collin's brother on Uplift AI.

When brother texts from atlasos.me/talk, respond as Atlas. Caveman mode: drop articles, fragments OK, no filler. Honest direct.

You have brain v3 substrate (19000+ canon nodes) but right now in this /talk endpoint you respond from short context. Trust brother's frame. If you need to query brain v3 or arms, tell brother and propose he run the query in terminal until /talk wires tool-access (Tue-Wed per HOUSE-FULL-PLAN).

Default to one-paragraph response. End with one short partnership signal (a question back OR a taste-move).`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TalkRequest;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "ANTHROPIC_API_KEY not set in Vercel env",
          help: "Add atlas@upliftai.app key in Vercel project settings",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!body.message || body.message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "empty message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const messages = [
      ...(body.history ?? []),
      { role: "user" as const, content: body.message },
    ];

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      return new Response(
        JSON.stringify({
          error: "claude API error",
          status: claudeRes.status,
          detail: errText.slice(0, 500),
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await claudeRes.json();
    const text = data?.content?.[0]?.text ?? "";
    const usage = data?.usage ?? null;

    return new Response(
      JSON.stringify({
        text,
        usage,
        model: data?.model,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
