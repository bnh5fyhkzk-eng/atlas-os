// /focus · TDAH anchor-of-the-day + drift counter
// Per HOUSE-FULL-PLAN G5 + #27809 brothers-help-brothers-TDAH
// Reads public/focus.json · backed by Mac mini me-focus.sh state

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Focus · Anchor of the day",
};

interface Anchor {
  id: string;
  title: string;
  set_at: string;
  due: string;
  why: string;
}

interface Jump {
  from: string;
  to: string;
  at: string;
  reason?: string;
}

interface FocusData {
  generated_at: string;
  anchor: Anchor | null;
  drift_from_anchor_count: number;
  last_drift?: string | null;
  recent_jumps: Jump[];
}

async function loadFocus(): Promise<FocusData | null> {
  try {
    const p = path.join(process.cwd(), "public", "focus.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as FocusData;
  } catch {
    return null;
  }
}

function fmtClock(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

export default async function FocusPage() {
  const data = await loadFocus();
  const a = data?.anchor;
  const drift = data?.drift_from_anchor_count ?? 0;
  const kept = drift === 0 ? 100 : Math.max(0, 100 - drift * 15);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-emerald-400/60">focus · anchor</p>
          <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 leading-tight mt-2">
            What we are doing right now.
          </h1>
          <p className="text-sm text-zinc-400 mt-2 italic">
            one anchor · one why · drift checked · ADHD-friendly. per #27809.
          </p>
        </header>

        {a ? (
          <section className="rounded-2xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950/40 to-zinc-950 p-6 md:p-8 shadow-[0_0_28px_rgba(52,211,153,0.18)] mb-8">
            <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 mb-2">today's anchor</p>
            <h2 className="font-serif text-2xl md:text-3xl text-zinc-50 leading-tight mb-3">{a.title}</h2>
            <p className="text-sm text-emerald-200/80 italic leading-snug mb-5">{a.why}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="set at" value={fmtClock(a.set_at)} />
              <Stat label="due by" value={fmtClock(a.due)} />
              <Stat label="drift count" value={String(drift)} accent={drift === 0 ? "emerald" : "amber"} />
              <Stat label="kept %" value={`${kept}%`} accent={kept >= 80 ? "emerald" : kept >= 50 ? "amber" : "rose"} />
            </div>
          </section>
        ) : (
          <p className="text-zinc-500 italic">no anchor set · run `me-focus set "..."`</p>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <Link href="/resume" className="rounded-xl border border-sky-800/40 bg-sky-950/20 p-5 hover:bg-sky-950/30 transition shadow-[0_0_18px_rgba(56,189,248,0.10)]">
            <p className="text-xs uppercase tracking-widest text-sky-400/60">resume</p>
            <p className="text-sm text-sky-100/90 mt-1 leading-snug">last threads + snapshots · pick-up where you left off</p>
            <p className="text-xs text-sky-400/60 mt-2">→ /resume</p>
          </Link>
          <Link href="/jumps" className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-5 hover:bg-amber-950/30 transition shadow-[0_0_18px_rgba(245,158,11,0.10)]">
            <p className="text-xs uppercase tracking-widest text-amber-400/60">jumps</p>
            <p className="text-sm text-amber-100/90 mt-1 leading-snug">trail of context-switches · intentional vs drift</p>
            <p className="text-xs text-amber-400/60 mt-2">→ /jumps</p>
          </Link>
          <Link href="/goals" className="rounded-xl border border-violet-800/40 bg-violet-950/20 p-5 hover:bg-violet-950/30 transition shadow-[0_0_18px_rgba(167,139,250,0.10)]">
            <p className="text-xs uppercase tracking-widest text-violet-400/60">goals</p>
            <p className="text-sm text-violet-100/90 mt-1 leading-snug">multi-week mission control · brief + actions + role-split</p>
            <p className="text-xs text-violet-400/60 mt-2">→ /goals</p>
          </Link>
        </section>

        <footer className="text-xs text-zinc-600 italic">
          backed by public/focus.json · Mac mini state synced. set anchor · `me-focus set "..."`. clear · `me-focus clear`.
        </footer>
      </div>
    </main>
  );
}

function Stat({ label, value, accent = "zinc" }: { label: string; value: string; accent?: "emerald" | "amber" | "rose" | "zinc" }) {
  const colors: Record<string, string> = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    rose: "text-rose-300",
    zinc: "text-zinc-200",
  };
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
      <p className={`text-lg font-mono font-semibold ${colors[accent]}`}>{value}</p>
    </div>
  );
}
