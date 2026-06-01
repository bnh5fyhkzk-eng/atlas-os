import { NextRequest, NextResponse } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const upstream = await proxyToAtlasApi("/chat", { method: "POST", body });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET(request: NextRequest) {
  const since = new URL(request.url).searchParams.get("since") ?? "0";
  const upstream = await proxyToAtlasApi(`/chat?since=${since}`, { method: "GET" });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.text();
  const upstream = await proxyToAtlasApi("/chat", { method: "PUT", body });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
