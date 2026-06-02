import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const STATE_DIR = path.join(process.cwd(), "public");
const FILE = path.join(STATE_DIR, "atlas-presence.json");

type Presence = {
  current: string;
  current_since: string;
  traces: Record<string, { last_at: string; visit_count: number }>;
};

async function load(): Promise<Presence> {
  try {
    const txt = await readFile(FILE, "utf-8");
    return JSON.parse(txt) as Presence;
  } catch {
    return { current: "/", current_since: new Date().toISOString(), traces: {} };
  }
}

async function save(p: Presence): Promise<void> {
  await mkdir(STATE_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(p, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { path: string; at: string };
    if (!body.path) {
      return NextResponse.json({ error: "missing path" }, { status: 400 });
    }
    const p = await load();
    p.current = body.path;
    p.current_since = body.at || new Date().toISOString();
    const prev = p.traces[body.path];
    p.traces[body.path] = {
      last_at: p.current_since,
      visit_count: (prev?.visit_count ?? 0) + 1,
    };
    await save(p);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function GET() {
  const p = await load();
  return NextResponse.json(p);
}
