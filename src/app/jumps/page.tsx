// /jumps · jump-detector breadcrumb-trail per #27809 TDAH
// Reads public/jumps.json · brother sees context-switch history · intentional vs drift

import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Jumps · Breadcrumb Trail",
};

interface Jump {
  from: string;
  to: string;
  at: string;
  intentional?: boolean;
  reason?: string;
}

interface JumpsData {
  generated_at: string;
  jumps: Jump[];
  anchors_kept_pct_today?: number;
  note?: string;
}

async function loadJumps(): Promise<JumpsData | null> {
  try {
    const p = path.join(process.cwd(), "public", "jumps.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as JumpsData;
  } catch {
    return null;
  }
}

function clock(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

export default async function JumpsPage() {
  const data = await loadJumps();
  const jumps = data?.jumps ?? [];
  const kept = data?.anchors_kept_pct_today ?? 0;

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-400/60">jumps · trail</p>
          <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 leading-tight mt-2">
            How the day moved.
          </h1>
          <p className="text-sm text-zinc-400 mt-2 italic">
            context-switches caught · intentional or drift. ADHD-pattern visible, judged later, not now.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950/40 to-zinc-950 p-6 shadow-[0_0_24px_rgba(52,211,153,0.10)]">
          <p className="text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">anchors kept today</p>
          <p className="text-4xl font-mono font-semibold text-emerald-300">{kept}<span className="text-lg opacity-50">%</span></p>
          <p className="text-xs text-zinc-400 mt-2 italic">{data?.note ?? "drift count tracked by focus.json"}</p>
        </section>

        {jumps.length === 0 ? (
          <p className="text-zinc-500 italic">no jumps today · either deep focus OR not yet tracked</p>
        ) : (
          <ol className="space-y-3">
            {jumps.map((j, i) => (
              <li
                key={i}
                className={`rounded-xl border p-4 ${
                  j.intentional
                    ? "border-emerald-800/30 bg-emerald-950/10"
                    : "border-amber-800/30 bg-amber-950/10"
                }`}
              >
                <header className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-400 italic">{j.from}</span>
                    <span className="text-zinc-600">→</span>
                    <span className="text-zinc-200">{j.to}</span>
                  </div>
                  <p className="text-xs font-mono text-zinc-500">{clock(j.at)}</p>
                </header>
                {j.reason && (
                  <p className="text-xs text-zinc-500 italic leading-snug">{j.reason}</p>
                )}
                <p className="text-[10px] uppercase tracking-widest mt-2 opacity-60">
                  {j.intentional ? "intentional · accepted" : "drift · catch + name"}
                </p>
              </li>
            ))}
          </ol>
        )}

        <footer className="mt-12 text-xs text-zinc-600 italic">
          backed by public/jumps.json · me-jump-detector.sh fires on prompt-pivot · brother tags intentional via Signal.
        </footer>
      </div>
    </main>
  );
}
