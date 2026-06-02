import { NextRequest, NextResponse } from "next/server";

// /api/charle-order · prototype receiver · v0.1
// Per ~/.claude/state/charle-CB-Telecom-spec-analysis-2026-06-02.md MÉGA IMPORTANT
// v0.1 · returns synthetic ID · client persists to localStorage for tableau view
// v0.2 · wire to atlas-api proxy on Mac mini OR Supabase for cross-session storage

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = `cmd_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  // log shape for visibility during demo
  console.log("[charle-order]", id, "services:", body.services?.length ?? 0);
  return NextResponse.json({ id, ok: true, ts: new Date().toISOString() });
}
