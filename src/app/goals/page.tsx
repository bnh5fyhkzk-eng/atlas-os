// /goals · Mission Control · multi-week goals + brief + role-split + progress
// Per HOUSE-FULL-PLAN-2026-06-07 G2 · Picture-1 Mission-Control + #27278
// Reads public/goals.json · brother + Atlas write via direct-edit OR future /api/goals

import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mission Control · Goals",
};

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

async function loadGoals(): Promise<GoalsData | null> {
  try {
    const p = path.join(process.cwd(), "public", "goals.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as GoalsData;
  } catch {
    return null;
  }
}

function dueIn(due: string): string {
  const t = new Date(due).getTime();
  const diff = t - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "due today";
  if (days === 1) return "1 day left";
  if (days < 14) return `${days} days left`;
  return `due ${due}`;
}

export default async function GoalsPage() {
  const data = await loadGoals();
  const goals = data?.goals ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-400/60">mission control · goals</p>
          <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 leading-tight mt-2">
            What we are doing.
          </h1>
          <p className="text-sm text-zinc-400 mt-2 italic">
            multi-week goals · brief + actions + role split. role-split is the wire that prevents mix.
          </p>
        </header>

        {goals.length === 0 ? (
          <p className="text-zinc-500 text-sm italic">no goals loaded · check public/goals.json</p>
        ) : (
          <div className="space-y-6">
            {goals.map((g) => (
              <GoalCard key={g.id} goal={g} />
            ))}
          </div>
        )}

        <footer className="mt-12 text-xs text-zinc-600 italic">
          backing file · public/goals.json · brother + Atlas write via direct-edit. future · /api/goals POST.
        </footer>
      </div>
    </main>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const doneCount = goal.actions.filter((a) => a.done).length;
  const totalCount = goal.actions.length;
  const accent =
    goal.progress_pct >= 75
      ? "emerald"
      : goal.progress_pct >= 40
        ? "amber"
        : "sky";
  const accents: Record<string, string> = {
    emerald: "border-emerald-800/40 shadow-[0_0_20px_rgba(52,211,153,0.10)] [--bar:#34d399]",
    amber: "border-amber-800/40 shadow-[0_0_20px_rgba(245,158,11,0.10)] [--bar:#fbbf24]",
    sky: "border-sky-800/40 shadow-[0_0_20px_rgba(56,189,248,0.10)] [--bar:#38bdf8]",
  };
  return (
    <article className={`rounded-2xl border bg-zinc-900/40 p-6 ${accents[accent]}`}>
      <header className="mb-4">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-serif text-xl text-zinc-100">{goal.title}</h2>
            <p className="text-xs text-zinc-500 mt-1">
              {goal.horizon_weeks}-week horizon · {dueIn(goal.due)}
            </p>
          </div>
          <p className="text-sm font-mono text-zinc-300">
            {goal.progress_pct}<span className="text-zinc-500 text-xs">%</span>
            <span className="text-zinc-500 text-xs ml-2">{doneCount}/{totalCount} actions</span>
          </p>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-800/80 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${goal.progress_pct}%`, background: "var(--bar)" }}
          />
        </div>
      </header>

      <p className="text-sm text-zinc-300 leading-snug mb-5">{goal.brief}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        <div className="rounded-lg border border-emerald-900/30 bg-emerald-950/20 p-3">
          <p className="text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">my role</p>
          <p className="text-sm text-emerald-100/90">{goal.my_role}</p>
        </div>
        <div className="rounded-lg border border-indigo-900/30 bg-indigo-950/20 p-3">
          <p className="text-[10px] uppercase tracking-widest text-indigo-400/60 mb-1">brother role</p>
          <p className="text-sm text-indigo-100/90">{goal.brother_role}</p>
        </div>
      </div>

      <ul className="space-y-1.5">
        {goal.actions.map((a, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className={`mt-1 inline-block w-3 h-3 rounded-sm flex-shrink-0 ${a.done ? "bg-emerald-500/80 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : a.deferred_reason ? "border border-zinc-700 bg-zinc-900" : "border border-zinc-700"}`} />
            <div className="flex-1 min-w-0">
              <span className={a.done ? "text-zinc-400 line-through" : "text-zinc-200"}>
                {a.label}
              </span>
              {a.deferred_reason && (
                <span className="block text-[11px] text-amber-400/70 italic mt-0.5">
                  deferred · {a.deferred_reason}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
