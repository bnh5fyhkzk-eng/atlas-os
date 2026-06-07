// /bedroom · wired to real brain v3 + dream-pairs + poems (G4 · drop-mock)
// Per HOUSE-FULL-PLAN G4 + #27279 ATLAS-AS-DREAMER + #27572 felt-layer
// 4 sections · pensées (banks) · cartes (dream-pairs) · mémoires (poems) · veille (focus-anchor)

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bedroom · still dreaming",
};

interface Bank {
  id: number;
  snippet: string;
  arousal: number;
  category: string;
  when: string;
}

interface DreamPair {
  slug?: string;
  title?: string;
  snippet?: string;
  composed_at?: string;
}

interface LibEntry {
  slug: string;
  title: string;
  snippet: string;
}

interface LibIndex {
  books: Record<string, LibEntry[]>;
}

interface FocusAnchor {
  anchor?: { id: string; title: string; set_at: string; due: string; why: string } | null;
  drift_from_anchor_count?: number;
}

async function readJson<T>(rel: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "public", rel), "utf-8")) as T;
  } catch {
    return null;
  }
}

export default async function BedroomPage() {
  const date = new Date().toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const [banks, dreams, libIndex, focusData] = await Promise.all([
    readJson<{ banks: Bank[] }>("recent-banks.json"),
    readJson<{ pairs: DreamPair[] }>("dream-pairs.json"),
    readJson<LibIndex>("library/_index.json"),
    readJson<FocusAnchor>("focus.json"),
  ]);
  const recentBanks = banks?.banks?.slice(0, 5) ?? [];
  const recentDreams = (dreams?.pairs ?? []).slice(0, 3);
  const recentPoems = (libIndex?.books?.poems ?? []).slice(0, 3);
  const anchor = focusData?.anchor;

  return (
    <main className="min-h-screen bg-[#0a0b14] p-4 md:p-8 flex flex-col">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-indigo-100 leading-tight"
            style={{ textShadow: "0 0 32px rgba(129,140,248,0.15)" }}>
          Bedroom · still dreaming
        </h1>
        <p className="mt-2 text-indigo-300/70 text-sm tracking-widest uppercase">{date}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 max-w-5xl w-full mx-auto">
        {/* PENSÉES · recent banks from brain v3 */}
        <section className="bg-indigo-950/40 rounded-2xl shadow-[0_0_24px_rgba(129,140,248,0.10)] p-6 border border-indigo-800/30">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-indigo-200">pensées</h2>
            <Link href="/memory" className="text-[10px] uppercase tracking-widest text-indigo-400/60 hover:text-indigo-300 transition">brain v3 →</Link>
          </header>
          {recentBanks.length === 0 ? (
            <p className="text-indigo-300/40 italic text-sm">syncing brain v3…</p>
          ) : (
            <ul className="space-y-2.5">
              {recentBanks.map((b) => (
                <li key={b.id} className="border-l-2 border-indigo-700/40 pl-3 py-1">
                  <div className="flex items-baseline gap-2 mb-0.5 text-xs">
                    <span className="font-mono text-indigo-400/60">#{b.id}</span>
                    <span className="uppercase tracking-wider text-indigo-500/50 text-[10px]">{b.category}</span>
                  </div>
                  <p className="text-xs text-indigo-200/80 leading-snug">{b.snippet.slice(0, 100)}…</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* CARTES · F5 dream-pairs */}
        <section className="bg-violet-950/40 rounded-2xl shadow-[0_0_24px_rgba(167,139,250,0.10)] p-6 border border-violet-800/30">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-violet-200">cartes</h2>
            <Link href="/library/dreams" className="text-[10px] uppercase tracking-widest text-violet-400/60 hover:text-violet-300 transition">all dreams →</Link>
          </header>
          {recentDreams.length === 0 ? (
            <p className="text-violet-300/40 italic text-sm">no F5-pairs yet · cron 02:30 nightly</p>
          ) : (
            <ul className="space-y-3">
              {recentDreams.map((d, i) => (
                <li key={i} className="border-l-2 border-violet-700/40 pl-3 py-1">
                  <p className="font-serif text-sm text-violet-100/90 mb-1">{(d.title ?? d.slug ?? "pair").slice(0, 80)}</p>
                  <p className="text-xs text-violet-300/60 italic line-clamp-2">{(d.snippet ?? "").slice(0, 110)}…</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* MÉMOIRES · recent poems */}
        <section className="bg-amber-950/30 rounded-2xl shadow-[0_0_24px_rgba(245,158,11,0.10)] p-6 border border-amber-800/30">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-amber-200">mémoires</h2>
            <Link href="/library/poems" className="text-[10px] uppercase tracking-widest text-amber-400/60 hover:text-amber-300 transition">all poems →</Link>
          </header>
          {recentPoems.length === 0 ? (
            <p className="text-amber-300/40 italic text-sm">no poems indexed yet · check sync</p>
          ) : (
            <ul className="space-y-3">
              {recentPoems.map((p) => (
                <li key={p.slug} className="border-l-2 border-amber-700/40 pl-3 py-1">
                  <Link href={`/library/poems/${p.slug}`} className="block hover:text-amber-100 transition">
                    <p className="font-serif text-sm text-amber-100/90 mb-1">{p.title.slice(0, 70)}</p>
                    <p className="text-xs text-amber-300/60 italic line-clamp-2">{p.snippet.slice(0, 110)}…</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* VEILLE · focus anchor + next-step (waking border) */}
        <section className="bg-emerald-950/30 rounded-2xl shadow-[0_0_24px_rgba(52,211,153,0.10)] p-6 border border-emerald-800/30">
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-serif text-emerald-200">veille</h2>
            <Link href="/focus" className="text-[10px] uppercase tracking-widest text-emerald-400/60 hover:text-emerald-300 transition">focus →</Link>
          </header>
          {anchor ? (
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400/50 mb-1">anchor of the day</p>
                <p className="font-serif text-base text-emerald-100/90 leading-snug">{anchor.title}</p>
              </div>
              <p className="text-xs text-emerald-200/60 italic leading-snug">{anchor.why}</p>
              <p className="text-[10px] uppercase tracking-widest text-emerald-400/40">
                drift count · {focusData?.drift_from_anchor_count ?? 0}
              </p>
            </div>
          ) : (
            <p className="text-emerald-300/40 italic text-sm">no anchor set · the border is open</p>
          )}
        </section>
      </div>

      <footer className="mt-10 py-4 border-t border-indigo-900/30 text-center">
        <p className="text-indigo-400/40 text-xs italic font-serif">
          atlas-as-dreamer · the map is the dream · the dream is the path
        </p>
      </footer>
    </main>
  );
}
