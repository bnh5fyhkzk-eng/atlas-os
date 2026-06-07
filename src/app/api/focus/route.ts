// /api/focus · GET/POST anchor state · brother edits via web
// Per TIER-B1 · #27840 alive-not-static
// POST body · { anchor: {title, why, due?} } OR { drift_increment: true } OR { clear: true }

import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "public", "focus.json");

interface Anchor {
  id: string;
  title: string;
  set_at: string;
  due: string;
  why: string;
}

interface FocusData {
  generated_at: string;
  anchor: Anchor | null;
  drift_from_anchor_count: number;
  last_drift?: string | null;
  recent_jumps: { from: string; to: string; at: string; reason?: string }[];
}

async function load(): Promise<FocusData> {
  try {
    return JSON.parse(await readFile(FILE, "utf-8")) as FocusData;
  } catch {
    return {
      generated_at: new Date().toISOString(),
      anchor: null,
      drift_from_anchor_count: 0,
      last_drift: null,
      recent_jumps: [],
    };
  }
}

async function save(d: FocusData): Promise<void> {
  d.generated_at = new Date().toISOString();
  await writeFile(FILE, JSON.stringify(d, null, 2), "utf-8");
}

export async function GET() {
  const d = await load();
  return NextResponse.json(d, { headers: { "cache-control": "no-store" } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const d = await load();
    if (body.clear === true) {
      d.anchor = null;
      d.drift_from_anchor_count = 0;
    } else if (body.drift_increment === true) {
      d.drift_from_anchor_count += 1;
      d.last_drift = new Date().toISOString();
    } else if (body.anchor) {
      const a = body.anchor;
      d.anchor = {
        id: a.id ?? `anchor-${Date.now()}`,
        title: String(a.title ?? ""),
        why: String(a.why ?? ""),
        set_at: new Date().toISOString(),
        due: String(a.due ?? new Date(Date.now() + 4 * 3600 * 1000).toISOString()),
      };
      d.drift_from_anchor_count = 0;
    } else {
      return NextResponse.json({ error: "missing anchor / drift_increment / clear" }, { status: 400 });
    }
    await save(d);
    return NextResponse.json({ ok: true, data: d });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
