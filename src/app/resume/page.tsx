// /resume · thread-resume snapshots per #27809 TDAH
// Reads public/threads.json · brother sees last-3 active threads + next-step

import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resume · Threads",
};

interface Thread {
  id: string;
  title: string;
  last_active_at: string;
  state: "active" | "paused" | "blocked";
  last_snapshot: string;
  next_step: string;
}

interface ThreadsData {
  generated_at: string;
  threads: Thread[];
}

async function loadThreads(): Promise<ThreadsData | null> {
  try {
    const p = path.join(process.cwd(), "public", "threads.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as ThreadsData;
  } catch {
    return null;
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function ResumePage() {
  const data = await loadThreads();
  const threads = data?.threads ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400/60">resume · threads</p>
          <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 leading-tight mt-2">
            Where you left off.
          </h1>
          <p className="text-sm text-zinc-400 mt-2 italic">
            last-active threads · snapshot + next-step. per #27809 TDAH thread-resume.
          </p>
        </header>

        {threads.length === 0 ? (
          <p className="text-zinc-500 italic">no threads tracked · check public/threads.json</p>
        ) : (
          <div className="space-y-4">
            {threads.map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        )}

        <footer className="mt-12 text-xs text-zinc-600 italic">
          backed by public/threads.json · me-thread-snapshot.sh wires brother+Atlas auto-update on context-switch.
        </footer>
      </div>
    </main>
  );
}

function ThreadCard({ thread }: { thread: Thread }) {
  const stateAccent: Record<string, string> = {
    active: "border-emerald-800/40 shadow-[0_0_20px_rgba(52,211,153,0.10)] bg-emerald-950/15",
    paused: "border-amber-800/40 shadow-[0_0_20px_rgba(245,158,11,0.10)] bg-amber-950/15",
    blocked: "border-rose-800/40 shadow-[0_0_20px_rgba(251,113,133,0.10)] bg-rose-950/15",
  };
  const stateDot: Record<string, string> = {
    active: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse",
    paused: "bg-amber-400",
    blocked: "bg-rose-500",
  };
  return (
    <article className={`rounded-2xl border p-6 ${stateAccent[thread.state]}`}>
      <header className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className={`inline-block w-2 h-2 rounded-full ${stateDot[thread.state]}`} />
          <h2 className="font-serif text-lg text-zinc-100">{thread.title}</h2>
        </div>
        <p className="text-xs font-mono text-zinc-500">{timeAgo(thread.last_active_at)}</p>
      </header>
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">last snapshot</p>
        <p className="text-sm text-zinc-300 leading-snug">{thread.last_snapshot}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-emerald-400/60 mb-1">next step</p>
        <p className="text-sm text-emerald-100/90 leading-snug">{thread.next_step}</p>
      </div>
    </article>
  );
}
