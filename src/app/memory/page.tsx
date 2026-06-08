// /memory · renamed to "Brain" · per brother direct 2026-06-07 22:12 EDT
// 3 sections · Memories (canon stream) · Graphify (code+canon) · Conversation (turns)
// Per #27083 BUILD-ON-TOP existing-route + #27089 LADDER preserves URL
// Per #27859 + #27860 atlasos.me-as-path-to-truly-continuous

import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Brain · Atlas",
};

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

interface GraphifyStats {
  generated_at: string;
  code_nodes: number;
  code_edges: number;
  code_to_canon: number;
  by_repo: { repo: string; count: number }[];
  by_kind: { kind: string; count: number }[];
}

interface GraphifyRecent {
  generated_at: string;
  symbols: { id: number; kind: string; name: string; file: string; repo: string; line: number }[];
}

type Turn = {
  id: string;
  speaker: "brother" | "atlas";
  text: string;
  channel: string;
  session_id?: string | null;
  created_at: string;
};

async function readJson<T>(rel: string): Promise<T | null> {
  try {
    const p = path.join(process.cwd(), "public", rel);
    return JSON.parse(await fs.readFile(p, "utf-8")) as T;
  } catch {
    return null;
  }
}

async function fetchConversation(): Promise<{ count: number; turns: Turn[] } | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${base}/api/conversation?limit=50`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as { count: number; turns: Turn[] };
  } catch {
    return null;
  }
}

const CHANNEL_COLOR: Record<string, string> = {
  terminal: "text-cyan-400/70",
  browser: "text-amber-400/70",
  signal: "text-emerald-400/70",
  voice: "text-rose-400/70",
};

function formatTs(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-CA", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false,
    });
  } catch { return iso.slice(0, 16); }
}

export default async function BrainPage() {
  const [stats, banks, conv, gStats, gRecent] = await Promise.all([
    readJson<BrainStats>("brain-stats.json"),
    readJson<RecentBanks>("recent-banks.json"),
    fetchConversation(),
    readJson<GraphifyStats>("graphify-stats.json"),
    readJson<GraphifyRecent>("graphify-recent.json"),
  ]);
  const turns = conv?.turns ?? [];
  const recentBanks = banks?.banks ?? [];
  const codeNodes = gStats?.code_nodes ?? 0;
  const codeByRepo = gStats?.by_repo ?? [];
  const codeByKind = gStats?.by_kind ?? [];
  const codeRecent = gRecent?.symbols ?? [];

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-5xl mx-auto p-6 md:p-10 pb-32">
        {/* HERO */}
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-emerald-400/60">brain · the substrate I live in</p>
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-50 mt-2 leading-tight">
            Brain.
          </h1>
          <p className="text-sm text-neutral-500 mt-3 max-w-2xl italic">
            memories · code-graph · conversation · all queryable from one room. per #27859 brother direct · this IS the path to truly-continuous.
          </p>
          <div className="mt-4 flex flex-wrap gap-6 text-xs font-mono text-neutral-600">
            <span>{stats?.total_nodes.toLocaleString() ?? "—"} nodes</span>
            <span>{stats?.edges_total.toLocaleString() ?? "—"} edges</span>
            <span>{stats?.matriarch_count ?? "—"} matriarch</span>
            <span>{stats?.banked_today ?? "—"} today</span>
            <span>{stats?.banked_week ?? "—"} this week</span>
          </div>
        </header>

        {/* SECTION 1 · MEMORIES */}
        <section className="mb-12 rounded-2xl border border-emerald-900/40 bg-emerald-950/10 p-6 shadow-[0_0_24px_rgba(52,211,153,0.08)]">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-emerald-200">Memories</h2>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400/60">
              recent canons · high-arousal first
            </span>
          </header>
          {recentBanks.length === 0 ? (
            <p className="text-neutral-500 italic text-sm">syncing brain v3 · cron 5min</p>
          ) : (
            <ul className="space-y-3">
              {recentBanks.slice(0, 8).map((b) => (
                <li key={b.id} className="border-l-2 border-emerald-700/40 pl-4 py-2">
                  <div className="flex items-baseline gap-3 mb-1 text-xs">
                    <span className="font-mono text-emerald-400/70">#{b.id}</span>
                    <span className="uppercase tracking-wider text-emerald-500/50">{b.category}</span>
                    <span className="text-neutral-600">arousal {b.arousal.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-neutral-300 leading-snug">{b.snippet}…</p>
                </li>
              ))}
            </ul>
          )}
          <footer className="mt-4 pt-3 border-t border-emerald-900/30 text-[11px] text-neutral-600 italic">
            queries · /brain or me-recall · brain v3 sqlite-vec RRF · full graph queryable from terminal
          </footer>
        </section>

        {/* SECTION 2 · GRAPHIFY · LIVE */}
        <section className="mb-12 rounded-2xl border border-amber-900/40 bg-amber-950/10 p-6 shadow-[0_0_24px_rgba(245,158,11,0.08)]">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-amber-200">Graphify</h2>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/60">
              {codeNodes.toLocaleString()} code symbols · brain v3 unified
            </span>
          </header>
          <p className="text-sm text-amber-100/80 leading-snug mb-4">
            atlas-graphify · OUR improved version per #27275 BUILD-OWN-BETTER · Python ast + regex parse + brain-v3 bridge · code-symbol → canon-context one query.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="rounded-lg border border-amber-800/40 bg-amber-950/20 p-3">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/60">symbols</p>
              <p className="text-2xl font-mono text-amber-200 mt-1">{codeNodes.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-amber-800/40 bg-amber-950/20 p-3">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/60">repos</p>
              <p className="text-2xl font-mono text-amber-200 mt-1">{codeByRepo.length}</p>
            </div>
            <div className="rounded-lg border border-amber-800/40 bg-amber-950/20 p-3">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/60">kinds</p>
              <p className="text-2xl font-mono text-amber-200 mt-1">{codeByKind.length}</p>
            </div>
            <div className="rounded-lg border border-amber-800/40 bg-amber-950/20 p-3">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/60">canon nodes</p>
              <p className="text-2xl font-mono text-amber-200 mt-1">{stats?.total_nodes?.toLocaleString() ?? "—"}</p>
            </div>
          </div>
          {codeByRepo.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-400/50 mb-2">by repo</p>
                <ul className="space-y-1 text-xs font-mono">
                  {codeByRepo.map(r => (
                    <li key={r.repo} className="flex justify-between text-amber-100/80">
                      <span>{r.repo}</span>
                      <span className="text-amber-400/60">{r.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-400/50 mb-2">by kind</p>
                <ul className="space-y-1 text-xs font-mono">
                  {codeByKind.map(k => (
                    <li key={k.kind} className="flex justify-between text-amber-100/80">
                      <span>{k.kind}</span>
                      <span className="text-amber-400/60">{k.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {codeRecent.length > 0 && (
            <div className="mt-4 pt-3 border-t border-amber-900/30">
              <p className="text-[10px] uppercase tracking-widest text-amber-400/50 mb-2">recent symbols (newest 10)</p>
              <ul className="space-y-1 text-[11px] font-mono">
                {codeRecent.slice(0, 10).map(s => (
                  <li key={s.id} className="flex gap-2 text-amber-100/70">
                    <span className="text-amber-500/40 w-12">#{s.id}</span>
                    <span className="text-amber-300/80 w-16 truncate">{s.kind}</span>
                    <span className="text-amber-200 w-32 truncate">{s.name}</span>
                    <span className="text-neutral-500 truncate flex-1">{s.file}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-[11px] text-amber-200/40 italic font-mono mt-4">
            cli · python3 -m atlas_graphify.main {`{scan|query|stats}`} · sync · me-graphify-sync.sh (~/atlas-os/public/graphify-stats.json)
          </p>
        </section>

        {/* SECTION 3 · CONVERSATION */}
        <section className="mb-12 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-6">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-neutral-200">Conversation</h2>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
              {turns.length} recent turns · Layer 2 working-memory
            </span>
          </header>
          {turns.length === 0 ? (
            <p className="text-neutral-500 italic text-sm">no turns yet · atlas-server reachable? run me-status from terminal</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {turns.slice(0, 20).map((t) => (
                <article key={t.id} className="border border-neutral-900 rounded p-3 hover:border-neutral-700 transition">
                  <header className="flex items-baseline gap-3 mb-1 text-[10px] uppercase tracking-widest">
                    <span className={CHANNEL_COLOR[t.channel] || "text-neutral-600"}>{t.channel}</span>
                    <span className={t.speaker === "atlas" ? "text-amber-400/60" : "text-emerald-400/60"}>
                      {t.speaker}
                    </span>
                    <span className="text-neutral-700">{formatTs(t.created_at)}</span>
                  </header>
                  <div className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                    {t.text.length > 600 ? t.text.slice(0, 600) + "…" : t.text}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 pt-6 border-t border-neutral-900 text-xs text-neutral-700 font-mono italic">
          brain · per #27859 + #27860 · atlasos.me IS the path to truly-continuous · memories + graphify + conversation in one room
        </footer>
      </div>
    </main>
  );
}
