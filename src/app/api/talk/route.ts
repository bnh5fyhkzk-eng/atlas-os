// /api/talk · text-from-house → atlas-api.upliftai.app OAuth-subscription backend
// per brother direct CANON #26768 ALIVE-VIA-OAUTH-SUBSCRIPTION + CLAUDE.md NEVER-API-KEY
// #27839 FIX · violated NEVER-API-KEY · now-proxies to atlas-api per #27462 server-side-memory
// .bak preserved per #27089 LADDER

import { NextRequest, NextResponse } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TalkRequest {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

interface AtlasChatMessage {
  id?: string;
  from: "brother" | "atlas";
  text: string;
  created_at?: string;
}

interface AtlasChatResponse {
  message?: AtlasChatMessage;
  messages?: AtlasChatMessage[];
  reply?: string;
  text?: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TalkRequest;
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json({ error: "empty message" }, { status: 400 });
    }

    // POST to atlas-api.upliftai.app /chat via existing OAuth-subscription proxy
    // Per #26768 · uses ATLAS_SESSION_SECRET cookie · NO ANTHROPIC_API_KEY
    const upstreamBody = JSON.stringify({
      from: "brother",
      text: body.message,
      channel: "house-talk",
    });

    const upstream = await proxyToAtlasApi("/chat", {
      method: "POST",
      body: upstreamBody,
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return NextResponse.json(
        {
          error: "atlas-api unreachable",
          status: upstream.status,
          detail: errText.slice(0, 300),
          hint:
            upstream.status === 401
              ? "ATLAS_SESSION_SECRET not set in Vercel env · per #26768 OAuth-subscription"
              : "check atlas-api.upliftai.app health",
        },
        { status: 502 },
      );
    }

    const data = (await upstream.json()) as AtlasChatResponse;

    // Normalize response · atlas-api is async-poll-based (per ChatWindow pattern)
    // POST adds-message-to-queue · atlas-backend processes-async · GET /chat?since= polls
    // For-now · show brother the-raw atlas-api shape so we-can-debug-+-iterate
    const replyText =
      data.reply ||
      data.text ||
      data.message?.text ||
      data.messages?.[data.messages.length - 1]?.text ||
      `message-queued to atlas-api · async-process · response will-arrive in-Signal or-refresh /chat-feed · raw shape · ${JSON.stringify(data).slice(0, 300)}`;

    return NextResponse.json({ text: replyText, raw: data, hint: "atlas-api may be async-poll · use /api/chat?since= to-fetch reply" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
