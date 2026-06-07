// /api/goals · GET/POST goals · brother edits via web
// Per TIER-B1 · move-fast-organized
// POST body · { goal_id, action: {label, done?, deferred_reason?} } to add
//        OR · { goal_id, action_index, done: bool } to toggle
//        OR · { goal_id, progress_pct: number } to update progress

import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "public", "goals.json");

interface Action {
  label: string;
  done?: boolean;
  deferred_reason?: string;
}

interface Goal {
  id: string;
  title: string;
  horizon_weeks: number;
  due: string;
  progress_pct: number;
  brief: string;
  my_role: string;
  brother_role: string;
  actions: Action[];
}

interface GoalsData {
  generated_at: string;
  goals: Goal[];
}

async function load(): Promise<GoalsData> {
  try {
    return JSON.parse(await readFile(FILE, "utf-8")) as GoalsData;
  } catch {
    return { generated_at: new Date().toISOString(), goals: [] };
  }
}

async function save(d: GoalsData): Promise<void> {
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
    if (!body.goal_id) return NextResponse.json({ error: "missing goal_id" }, { status: 400 });
    const d = await load();
    const g = d.goals.find((g) => g.id === body.goal_id);
    if (!g) return NextResponse.json({ error: "goal not found" }, { status: 404 });

    if (typeof body.progress_pct === "number") {
      g.progress_pct = Math.max(0, Math.min(100, Math.round(body.progress_pct)));
    }
    if (body.action) {
      g.actions.push({
        label: String(body.action.label ?? ""),
        done: body.action.done === true,
        ...(body.action.deferred_reason ? { deferred_reason: String(body.action.deferred_reason) } : {}),
      });
    }
    if (typeof body.action_index === "number" && typeof body.done === "boolean") {
      const idx = body.action_index;
      if (idx >= 0 && idx < g.actions.length) {
        g.actions[idx].done = body.done;
      }
    }

    // auto-compute progress from action done-ratio if not explicitly set this turn
    if (typeof body.progress_pct !== "number" && g.actions.length > 0) {
      const done = g.actions.filter((a) => a.done).length;
      g.progress_pct = Math.round((done / g.actions.length) * 100);
    }

    await save(d);
    return NextResponse.json({ ok: true, goal: g });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
