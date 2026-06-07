// /api/presence/ping · cheap liveness · returns last brain-sync + arm-pulse mtimes
// Used by LivePulse top-right tick to confirm house substrate alive
// Per #27840 alive-not-noise · every-page-tick

import { NextResponse } from "next/server";
import { stat } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const root = process.cwd();
  const targets = [
    "public/brain-stats.json",
    "public/arms.json",
    "public/recent-banks.json",
  ];
  const out: Record<string, number> = {};
  for (const rel of targets) {
    try {
      const s = await stat(path.join(root, rel));
      out[rel] = s.mtimeMs;
    } catch {
      out[rel] = 0;
    }
  }
  const newest = Math.max(...Object.values(out));
  return NextResponse.json(
    {
      ok: true,
      now: Date.now(),
      newest_substrate_mtime: newest,
      sources: out,
    },
    { headers: { "cache-control": "no-store" } }
  );
}
