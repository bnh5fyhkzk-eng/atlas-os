import { NextRequest, NextResponse } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const upstream = await proxyToAtlasApi("/reactions", { method: "POST", body });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}

export async function GET() {
  const upstream = await proxyToAtlasApi("/reactions", { method: "GET" });
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
