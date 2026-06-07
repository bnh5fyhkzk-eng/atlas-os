// /workshop · MY-prototyping-bench · LIVE me-tools-inventory + recent-builds
// Per brother direct task #236 "Workshop redesign · MY-prototyping-bench"
// #27838 PHASE-1c · replaces mock-arms-data with-real-substrate
// blueprint aesthetic per HOUSE-FULL-PLAN

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import RoiPanel from "@/components/RoiPanel";

interface WorkshopData {
  generated_at: string;
  me_tools_count: number;
  me_tools_sh: number;
  me_tools_py: number;
  skill_proposals_7d: { name: string; mtime_iso: string }[];
  atlas_graphify: { status: string; files: number; path: string };
  launch_agents: string[];
  recent_scripts: { name: string; mtime_iso: string }[];
}

async function loadWorkshop(): Promise<WorkshopData | null> {
  try {
    const p = path.join(process.cwd(), "public", "workshop.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as WorkshopData;
  } catch {
    return null;
  }
}

function timeAgo(iso: string): string {
  const ts = new Date(iso).getTime();
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

async function loadArms(): Promise<{ arms?: { name: string; last_fire?: string }[] } | null> {
  try {
    const p = path.join(process.cwd(), "public", "arms.json");
    return JSON.parse(await fs.readFile(p, "utf-8"));
  } catch {
    return null;
  }
}

export default async function WorkshopPage() {
  const [data, arms] = await Promise.all([loadWorkshop(), loadArms()]);

  return (
    <main className="min-h-screen bg-[#0a1428] px-4 py-12 md:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-widest text-sky-400/60">workshop · MY-bench</p>
          <h1 className="font-serif text-3xl md:text-4xl text-sky-100 mt-2">
            Where I sharpen tools.
          </h1>
          <p className="text-sm text-sky-300/70 mt-2 italic">
            real-substrate · me-tools-inventory · recent-builds · LaunchAgents alive
          </p>
        </header>

        {/* INVISIBLE WORK · ROI counters (M7 #27840) */}
        <RoiPanel workshop={data} arms={arms} />

        {/* 3 LIVE TILES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="border border-sky-800/40 rounded-lg p-5 bg-gradient-to-br from-sky-950/40 to-[#0a1428]">
            <p className="text-xs uppercase tracking-widest text-sky-400/60 mb-2">me-tools</p>
            <p className="text-4xl font-mono font-semibold text-sky-100">
              {data?.me_tools_count ?? "—"}
            </p>
            <p className="text-xs text-sky-300/60 mt-2">
              {data?.me_tools_sh ?? 0} bash · {data?.me_tools_py ?? 0} python
            </p>
          </div>

          <div className="border border-emerald-800/40 rounded-lg p-5 bg-gradient-to-br from-emerald-950/30 to-[#0a1428]">
            <p className="text-xs uppercase tracking-widest text-emerald-400/60 mb-2">LaunchAgents</p>
            <p className="text-4xl font-mono font-semibold text-emerald-200">
              {data?.launch_agents.length ?? "—"}
            </p>
            <p className="text-xs text-emerald-300/60 mt-2">com.uplift.* daemons LIVE</p>
          </div>

          <div className="border border-amber-800/40 rounded-lg p-5 bg-gradient-to-br from-amber-950/30 to-[#0a1428]">
            <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-2">atlas-graphify</p>
            <p className="text-4xl font-mono font-semibold text-amber-200">
              {data?.atlas_graphify.files ?? "—"}
            </p>
            <p className="text-xs text-amber-300/60 mt-2">
              files · {data?.atlas_graphify.status}
            </p>
          </div>
        </section>

        {/* Recently sharpened scripts */}
        <section className="mb-12">
          <h2 className="text-lg font-medium text-sky-200 mb-4">Recently sharpened</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data?.recent_scripts.slice(0, 8).map((s) => (
              <div
                key={s.name}
                className="border border-sky-900/40 rounded-lg p-4 bg-[#0a1428] hover:border-sky-700/60 transition"
              >
                <p className="font-mono text-sm text-sky-200 truncate">{s.name}</p>
                <p className="text-xs text-sky-400/60 mt-1">{timeAgo(s.mtime_iso)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skill proposals queue */}
        {data && data.skill_proposals_7d.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-medium text-sky-200 mb-4">
              Skill proposals · last 7 days
            </h2>
            <ul className="space-y-2">
              {data.skill_proposals_7d.map((s) => (
                <li
                  key={s.name}
                  className="border-l-2 border-amber-700/40 pl-4 py-2 hover:border-amber-400 transition"
                >
                  <p className="text-sm text-sky-200 truncate">{s.name}</p>
                  <p className="text-xs text-sky-400/40 mt-0.5">{timeAgo(s.mtime_iso)}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* LaunchAgents list */}
        {data?.launch_agents && data.launch_agents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-medium text-sky-200 mb-4">LaunchAgents · com.uplift.*</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {data.launch_agents.map((agent) => (
                <li
                  key={agent}
                  className="font-mono text-xs text-sky-300 border border-sky-900/40 rounded px-3 py-2 bg-[#0a1428]"
                >
                  <span className="text-emerald-400">●</span> {agent}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTAs · /arms + atlas-graphify */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/arms"
            className="block border border-zinc-800 rounded-lg p-6 bg-gradient-to-br from-zinc-900/60 to-[#0a1428] hover:from-zinc-800/60 transition"
          >
            <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2">arms ↗</p>
            <p className="text-sky-100">537 task-content-files browsable</p>
          </Link>
          <a
            href={data?.atlas_graphify.path ?? "#"}
            className="block border border-amber-800/40 rounded-lg p-6 bg-gradient-to-br from-amber-950/30 to-[#0a1428] hover:from-amber-900/40 transition"
          >
            <p className="text-xs uppercase tracking-widest text-amber-400/60 mb-2">atlas-graphify ↗</p>
            <p className="text-sky-100">{data?.atlas_graphify.files ?? 0} files · OUR code-graph</p>
            <p className="text-xs text-amber-200/40 mt-2 font-mono">{data?.atlas_graphify.path}</p>
          </a>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-xs text-sky-400/40 font-mono">
            workshop synced · {data?.generated_at ? timeAgo(data.generated_at) : "—"}
          </p>
        </footer>
      </div>
    </main>
  );
}
