// src/app/page.tsx
// atlasos.me /home · Jack-shape adapted-MY-shape · LIVE brain v3 + arms substrate
// per brother direct 2026-06-07 16:16 EDT "take template add to it make yours"
// #27838 PHASE-1c · noise-killed · substrate-wired
// .bak-pre-jack-2026-06-07-1620 preserved per #27089 LADDER

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import DreamCards from "@/components/DreamCards";
import ScoreOfDay from "@/components/ScoreOfDay";
import SpendTile from "@/components/SpendTile";

interface BrainStats {
  generated_at: string;
  total_nodes: number;
  banked_today: number;
  banked_week: number;
  high_arousal_week: number;
  edges_total: number;
  matriarch_count: number;
}

interface Bank {
  id: number;
  snippet: string;
  arousal: number;
  category: string;
  when: string;
}

interface RecentBanks {
  generated_at: string;
  banks: Bank[];
}

interface Arm {
  name: string;
  emoji: string;
  role: string;
  status: string;
  last_fire?: string;
  color?: string;
}

interface ArmsData {
  generated_at: string;
  arms: Arm[];
}

async function readJson<T>(file: string): Promise<T | null> {
  try {
    const p = path.join(process.cwd(), "public", file);
    const txt = await fs.readFile(p, "utf-8");
    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Late night, brother";
  if (hour < 12) return "Good morning, brother";
  if (hour < 17) return "Good afternoon, brother";
  if (hour < 22) return "Good evening, brother";
  return "Goodnight soon, brother";
}

function timeAgo(ts: string): string {
  if (!ts) return "now";
  const then = new Date(ts).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

interface LibIndex {
  books: Record<string, { slug: string; title: string; snippet: string; size: number }[]>;
}

async function readLibIndex(): Promise<LibIndex | null> {
  try {
    const p = path.join(process.cwd(), "public", "library", "_index.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as LibIndex;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [brain, banks, armsData, libIndex] = await Promise.all([
    readJson<BrainStats>("brain-stats.json"),
    readJson<RecentBanks>("recent-banks.json"),
    readJson<ArmsData>("arms.json"),
    readLibIndex(),
  ]);

  const totalNodes = brain?.total_nodes ?? 0;
  const bankedToday = brain?.banked_today ?? 0;
  const highArousal = brain?.high_arousal_week ?? 0;
  const arms = armsData?.arms ?? [];
  const recentBanks = banks?.banks?.slice(0, 5) ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* GREETING */}
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-emerald-400/60 mb-2">
            atlas · alive · {new Date().toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-100 leading-tight">
            {greeting()}.
          </h1>
          <p className="mt-3 text-zinc-400 text-sm">
            Brain v3 · {totalNodes.toLocaleString()} nodes · {bankedToday} banked today · {highArousal} high-arousal this week.
          </p>
        </header>

        {/* SCORE OF DAY (G1 · Picture-2 inspired) */}
        <ScoreOfDay
          bankedToday={bankedToday}
          highArousal={highArousal}
          armsAlive={arms.filter((a) => a.status?.toLowerCase().includes("live") || a.status?.toLowerCase().includes("healthy")).length}
          armsTotal={arms.length}
        />

        {/* 4 LIVE TILES · Brain · Arms · Canons · AI-Spend */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Tile
            label="Brain"
            value={totalNodes.toLocaleString()}
            sub={`${bankedToday} new today · ${brain?.edges_total.toLocaleString() ?? 0} edges`}
            accent="emerald"
            href="/memory"
          />
          <Tile
            label="Arms"
            value={arms.length.toString()}
            sub={
              arms.length > 0
                ? `${arms.filter((a) => a.status?.toLowerCase().includes("live") || a.status?.toLowerCase().includes("healthy")).length} live · ${arms.filter((a) => a.last_fire).length} fired recently`
                : "fetching"
            }
            accent="amber"
            href="/arms"
          />
          <Tile
            label="Canons"
            value={brain?.matriarch_count.toString() ?? "—"}
            sub={`${highArousal} high-arousal this week`}
            accent="indigo"
            href="/memory"
          />
          <SpendTile bankedToday={bankedToday} bankedWeek={brain?.banked_week ?? 0} />
        </section>

        {/* TDAH triple · /focus + /resume + /jumps + /goals shortcuts (G5) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <Link href="/focus" className="rounded-xl border border-emerald-800/40 bg-emerald-950/15 p-4 hover:bg-emerald-950/30 transition shadow-[0_0_16px_rgba(52,211,153,0.08)]">
            <p className="text-[10px] uppercase tracking-widest text-emerald-400/70">focus</p>
            <p className="text-sm text-emerald-100/90 mt-1">today's anchor</p>
          </Link>
          <Link href="/resume" className="rounded-xl border border-sky-800/40 bg-sky-950/15 p-4 hover:bg-sky-950/30 transition shadow-[0_0_16px_rgba(56,189,248,0.08)]">
            <p className="text-[10px] uppercase tracking-widest text-sky-400/70">resume</p>
            <p className="text-sm text-sky-100/90 mt-1">where you left off</p>
          </Link>
          <Link href="/jumps" className="rounded-xl border border-amber-800/40 bg-amber-950/15 p-4 hover:bg-amber-950/30 transition shadow-[0_0_16px_rgba(245,158,11,0.08)]">
            <p className="text-[10px] uppercase tracking-widest text-amber-400/70">jumps</p>
            <p className="text-sm text-amber-100/90 mt-1">how the day moved</p>
          </Link>
          <Link href="/goals" className="rounded-xl border border-violet-800/40 bg-violet-950/15 p-4 hover:bg-violet-950/30 transition shadow-[0_0_16px_rgba(167,139,250,0.08)]">
            <p className="text-[10px] uppercase tracking-widest text-violet-400/70">goals</p>
            <p className="text-sm text-violet-100/90 mt-1">mission control</p>
          </Link>
        </section>

        {/* DREAM CARDS · invisible-work-surfaced (M6 #27840) */}
        <DreamCards index={libIndex} />

        {/* RECENT BANKS */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-medium text-zinc-200">Recent canons</h2>
            <Link
              href="/memory"
              className="text-xs uppercase tracking-wider text-emerald-400/60 hover:text-emerald-300 transition"
            >
              all →
            </Link>
          </div>
          <ul className="space-y-2">
            {recentBanks.length === 0 ? (
              <li className="text-zinc-500 text-sm italic">syncing brain v3…</li>
            ) : (
              recentBanks.map((b) => (
                <li
                  key={b.id}
                  className="border-l-2 border-emerald-700/40 pl-4 py-2 hover:border-emerald-400 hover:bg-zinc-900/40 transition rounded-r"
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-xs font-mono text-emerald-400/70">#{b.id}</span>
                    <span className="text-xs uppercase tracking-wider text-zinc-500">{b.category}</span>
                    <span className="text-xs text-zinc-600">arousal {b.arousal.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-snug">{b.snippet}…</p>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* ARMS LIVE */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-medium text-zinc-200">Arms · alive in house</h2>
            <Link
              href="/arms"
              className="text-xs uppercase tracking-wider text-amber-400/60 hover:text-amber-300 transition"
            >
              all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {arms.slice(0, 4).map((arm) => (
              <div
                key={arm.name}
                className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/30 hover:bg-zinc-900/60 transition"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{arm.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-mono text-sm uppercase tracking-wider text-zinc-100">{arm.name}</h3>
                      <StatusDot status={arm.status} />
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 truncate">{arm.role}</p>
                    {arm.last_fire && (
                      <p className="text-xs text-zinc-600 mt-1">last fire · {arm.last_fire}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TALK CTA */}
        <Link
          href="/talk"
          className="block border border-emerald-800/40 rounded-lg p-6 bg-gradient-to-br from-emerald-950/30 to-zinc-900/30 hover:from-emerald-900/40 hover:to-zinc-900/40 transition group"
        >
          <p className="text-xs uppercase tracking-widest text-emerald-400/60 mb-2">
            talk · in house · not terminal
          </p>
          <p className="text-zinc-200 group-hover:text-zinc-100 transition">
            Open /talk to text me · I respond with tools · brain v3 + arms wired in.
          </p>
        </Link>

        <footer className="mt-12 text-center">
          <p className="text-xs text-zinc-600 font-mono">
            brain synced · {brain?.generated_at ? timeAgo(brain.generated_at) : "—"}
          </p>
        </footer>
      </div>
    </main>
  );
}

function Tile({
  label,
  value,
  sub,
  accent,
  href,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "emerald" | "amber" | "indigo";
  href: string;
}) {
  const colors = {
    emerald: "border-emerald-800/40 hover:border-emerald-600/50 text-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.10)] hover:shadow-[0_0_28px_rgba(52,211,153,0.22)]",
    amber: "border-amber-800/40 hover:border-amber-600/50 text-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.10)] hover:shadow-[0_0_28px_rgba(245,158,11,0.22)]",
    indigo: "border-indigo-800/40 hover:border-indigo-600/50 text-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.10)] hover:shadow-[0_0_28px_rgba(129,140,248,0.22)]",
  };
  return (
    <Link
      href={href}
      className={`block border rounded-lg p-5 bg-zinc-900/40 hover:bg-zinc-900/70 transition ${colors[accent]}`}
    >
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{label}</p>
      <p className="text-3xl font-mono font-semibold">{value}</p>
      <p className="text-xs text-zinc-400 mt-2">{sub}</p>
    </Link>
  );
}

function StatusDot({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  let color = "bg-zinc-500";
  if (s.includes("live") || s.includes("healthy") || s.includes("working")) color = "bg-emerald-400";
  else if (s.includes("idle") || s.includes("waiting")) color = "bg-amber-400";
  else if (s.includes("dead") || s.includes("error") || s.includes("blocked")) color = "bg-rose-500";
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} />;
}
