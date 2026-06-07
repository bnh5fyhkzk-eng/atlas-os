// /workshop · MY-prototyping-bench v2 · workbench-mess (NOT card-grid)
// Per HOUSE-FULL-PLAN G3 + impeccable-bans (no-default-card-grid) + brother direct
// 3 zones · drafts-top + me-tools-middle + experiments-bottom

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import RoiPanel from "@/components/RoiPanel";

export const dynamic = "force-dynamic";

interface WorkshopData {
  generated_at: string;
  me_tools_count?: number;
  me_tools_sh?: number;
  me_tools_py?: number;
  skill_proposals_7d?: { name: string; mtime_iso?: string }[];
  atlas_graphify?: { status: string; files: number; path: string };
  launch_agents?: string[];
  recent_scripts?: { name: string; mtime_iso?: string }[];
}

async function loadWorkshop(): Promise<WorkshopData | null> {
  try {
    const p = path.join(process.cwd(), "public", "workshop.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as WorkshopData;
  } catch {
    return null;
  }
}

async function loadArms(): Promise<{ arms?: { name: string; last_fire?: string }[] } | null> {
  try {
    const p = path.join(process.cwd(), "public", "arms.json");
    return JSON.parse(await fs.readFile(p, "utf-8"));
  } catch {
    return null;
  }
}

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export default async function WorkshopPage() {
  const [data, arms] = await Promise.all([loadWorkshop(), loadArms()]);

  return (
    <main className="min-h-screen px-4 py-10 md:px-12 relative bg-[#0a1428]" style={{
      backgroundImage:
        "radial-gradient(circle at 10% 10%, rgba(56,189,248,0.04), transparent 40%), radial-gradient(circle at 90% 90%, rgba(245,158,11,0.03), transparent 35%), repeating-linear-gradient(0deg, rgba(56,189,248,0.03) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(56,189,248,0.03) 0 1px, transparent 1px 28px)",
    }}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-sky-400/60">workshop · prototyping bench</p>
          <h1 className="font-serif text-3xl md:text-5xl text-sky-100 leading-tight mt-2">
            The bench, mid-build.
          </h1>
          <p className="text-sm text-sky-300/60 mt-2 italic">
            drafts on top · tools in the middle · experiments running below. honest mess. blueprint grain.
          </p>
        </header>

        <RoiPanel workshop={data} arms={arms} />

        {/* ZONE 1 · DRAFTS (top of bench) */}
        <section className="mb-10 border-l-2 border-amber-700/60 pl-4">
          <header className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-medium text-amber-200">Drafts · skill proposals</h2>
            <p className="text-xs font-mono text-zinc-500">last 7 days</p>
          </header>
          {data?.skill_proposals_7d && data.skill_proposals_7d.length > 0 ? (
            <ul className="space-y-1">
              {data.skill_proposals_7d.slice(0, 12).map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-3 py-1.5 border-b border-amber-900/20 text-sm">
                  <span className="text-amber-100/90 font-mono text-xs truncate">{s.name}</span>
                  <span className="text-xs text-zinc-500 font-mono whitespace-nowrap">{timeAgo(s.mtime_iso)} ago</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 italic text-sm">no proposals queued · cycles will write here when patterns repeat</p>
          )}
        </section>

        {/* ZONE 2 · TOOLS (middle of bench) */}
        <section className="mb-10 border-l-2 border-sky-700/60 pl-4">
          <header className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-medium text-sky-200">Tools · me-* sharpened</h2>
            <p className="text-xs font-mono text-zinc-500">
              {data?.me_tools_count ?? 0} total · {data?.me_tools_sh ?? 0} sh · {data?.me_tools_py ?? 0} py
            </p>
          </header>
          {data?.recent_scripts && data.recent_scripts.length > 0 ? (
            <ul className="space-y-1">
              {data.recent_scripts.slice(0, 10).map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-3 py-1.5 border-b border-sky-900/20 text-sm">
                  <span className="text-sky-100/90 font-mono text-xs truncate">{s.name}</span>
                  <span className="text-xs text-zinc-500 font-mono whitespace-nowrap">{timeAgo(s.mtime_iso)} ago</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 italic text-sm">no recent edits</p>
          )}
        </section>

        {/* ZONE 3 · EXPERIMENTS RUNNING (bottom of bench) */}
        <section className="mb-10 border-l-2 border-emerald-700/60 pl-4">
          <header className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-medium text-emerald-200">Experiments · LaunchAgents running</h2>
            <p className="text-xs font-mono text-zinc-500">{data?.launch_agents?.length ?? 0} daemons</p>
          </header>
          {data?.launch_agents && data.launch_agents.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {data.launch_agents.map((agent) => (
                <li key={agent} className="flex items-baseline gap-2 py-1 text-xs font-mono border-b border-emerald-900/15">
                  <span className="text-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]">●</span>
                  <span className="text-emerald-100/85 truncate">{agent}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 italic text-sm">no agents running</p>
          )}
        </section>

        {/* exits */}
        <section className="flex flex-wrap gap-3 text-sm">
          <Link href="/arms" className="text-sky-300/70 hover:text-sky-200 transition italic">
            → 537 arm-task content files · /arms
          </Link>
          {data?.atlas_graphify && (
            <span className="text-amber-300/70 italic">
              · atlas-graphify · {data.atlas_graphify.status} · {data.atlas_graphify.files} files
            </span>
          )}
        </section>

        <footer className="mt-12 text-xs text-sky-400/40 font-mono italic">
          workshop synced · {data?.generated_at ? `${timeAgo(data.generated_at)} ago` : "—"}
        </footer>
      </div>
    </main>
  );
}
