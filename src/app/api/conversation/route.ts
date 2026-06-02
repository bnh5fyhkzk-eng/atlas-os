import { NextRequest, NextResponse } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

// /api/conversation · proxies to atlas-server /conversation
// Layer 2 working-memory across all channels (terminal/browser/signal/voice)
// Per canon #27462 server-side-memory architecture

export async function POST(request: NextRequest) {
  const body = await request.text();
  const upstream = await proxyToAtlasApi("/conversation", { method: "POST", body });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const since = url.searchParams.get("since") ?? "0";
  const limit = url.searchParams.get("limit") ?? "50";
  const channel = url.searchParams.get("channel");
  const qs = new URLSearchParams({ since, limit });
  if (channel) qs.set("channel", channel);
  const upstream = await proxyToAtlasApi(`/conversation?${qs.toString()}`, { method: "GET" });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
