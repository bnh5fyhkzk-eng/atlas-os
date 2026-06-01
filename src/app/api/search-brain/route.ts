import { NextRequest, NextResponse } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = searchParams.get("limit") ?? "12";
  const upstream = await proxyToAtlasApi(
    `/search?q=${encodeURIComponent(q)}&limit=${limit}`,
  );
  const data = await upstream.text();
  return new NextResponse(data, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
