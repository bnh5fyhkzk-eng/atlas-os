import { NextRequest } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(_request: NextRequest) {
  const upstream = await proxyToAtlasApi("/events", {
    method: "GET",
    headers: { accept: "text/event-stream" },
  });
  if (!upstream.ok || !upstream.body) {
    return new Response(
      `event: error\ndata: ${JSON.stringify({ status: upstream.status })}\n\n`,
      { status: upstream.status, headers: { "content-type": "text/event-stream" } },
    );
  }
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
      connection: "keep-alive",
    },
  });
}
