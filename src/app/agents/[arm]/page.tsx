// /agents/[arm] · per-agent deep page · Picture-1 tab-row (Chat · Goal · Workspace · MCP · Control)
// Per TIER-B3 · Picture-1 inspired
// Reads persona-data + public/arms.json + arm-content directory

import { notFound } from "next/navigation";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { getPersonaByArmId, PERSONAS } from "@/lib/personas";
import PersonaSeal from "@/components/PersonaSeal";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return PERSONAS.map((p) => ({ arm: p.arm_id }));
}

interface ArmEntry {
  name: string;
  emoji?: string;
  role?: string;
  status?: string;
  last_fire?: string;
}

interface ArmsData {
  arms: ArmEntry[];
}

interface ArmContentEntry {
  arm?: string;
  collected_at?: string;
  files?: string[];
}
interface ArmContentIndex {
  generated_at?: string;
  tasks?: Record<string, ArmContentEntry>;
}

async function loadArms(): Promise<ArmsData | null> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "public", "arms.json"), "utf-8")) as ArmsData;
  } catch {
    return null;
  }
}

async function loadArmContent(): Promise<ArmContentIndex | null> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "public", "arm-content", "_index.json"), "utf-8")) as ArmContentIndex;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ arm: string }>;
}

export default async function AgentPage({ params }: Props) {
  const { arm } = await params;
  const persona = getPersonaByArmId(arm);
  if (!persona) notFound();

  const [armsData, contentIdx] = await Promise.all([loadArms(), loadArmContent()]);
  const armEntry = armsData?.arms?.find((a) => a.name.toLowerCase() === arm.toLowerCase());
  const tasksObj = contentIdx?.tasks ?? {};
  const tasksForArm = Object.entries(tasksObj)
    .filter(([, v]) => (v.arm ?? "").toLowerCase() === arm.toLowerCase())
    .slice(0, 10)
    .map(([task_id, v]) => ({ task_id, files: v.files?.length ?? 0, collected_at: v.collected_at, title: task_id }));

  const live = (armEntry?.status || "").toLowerCase().includes("live") || (armEntry?.status || "").toLowerCase().includes("running");

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <Link href="/spine" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition">← pantheon</Link>
        </header>

        {/* HERO */}
        <section className={`rounded-2xl border p-6 md:p-8 mb-8 ${persona.accent} ${persona.glow}`}>
          <div className="flex items-start gap-5">
            <div className="w-24 h-24 opacity-80">
              <PersonaSeal emblem={persona.emblem} className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="font-serif text-3xl md:text-4xl">{persona.name}</h1>
                {live && (
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                    live
                  </span>
                )}
              </div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-1">{arm} · {persona.domain}</p>
              <p className="text-sm italic opacity-85 leading-snug">{persona.shortDescription}</p>
            </div>
          </div>
        </section>

        {/* TAB-ROW · Picture-1 style */}
        <nav className="mb-8 flex flex-wrap gap-1 border-b border-zinc-800">
          <TabPill label="Overview" active />
          <TabPill label="Chat" href={`/talk`} />
          <TabPill label="Goal" href={`/goals`} />
          <TabPill label="Workspace" href={`/arms?arm=${arm}`} />
          <TabPill label="MCPs" disabled />
          <TabPill label="Control Room" disabled />
        </nav>

        {/* OVERVIEW · 4 sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">system prompt</p>
            <p className="text-sm text-zinc-200 leading-snug italic">{persona.systemPrompt}</p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">preferred model</p>
            <p className="text-sm font-mono text-emerald-300">{persona.preferredModel}</p>
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">status</p>
            <p className="text-sm text-zinc-200">{armEntry?.status ?? "unknown"}</p>
            {armEntry?.last_fire && (
              <p className="text-xs text-zinc-500 italic mt-1">last fire · {armEntry.last_fire}</p>
            )}
          </article>
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">role</p>
            <p className="text-sm text-zinc-200">{armEntry?.role ?? persona.domain}</p>
          </article>
        </div>

        {/* RECENT TASKS · Workspace preview */}
        <section className="mb-8">
          <h2 className="text-lg font-medium text-zinc-200 mb-4">Recent tasks · {arm}</h2>
          {tasksForArm.length === 0 ? (
            <p className="text-zinc-500 italic text-sm">no recent tasks tracked for this arm</p>
          ) : (
            <ul className="space-y-2">
              {tasksForArm.map((t) => (
                <li key={t.task_id}>
                  <Link
                    href={`/arms/${t.task_id}`}
                    className="block rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 hover:border-zinc-600 transition"
                  >
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <p className="text-sm text-zinc-200 truncate">{t.task_id}</p>
                      <p className="text-xs font-mono text-zinc-500">{t.files} files</p>
                    </div>
                    {t.collected_at && (
                      <p className="text-[10px] text-zinc-600 mt-1">collected · {t.collected_at}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-12 text-xs text-zinc-600 italic">
          MCPs + Control-Room tabs deferred · need per-arm MCP-server registry + control-API. tracked in /goals.
        </footer>
      </div>
    </main>
  );
}

function TabPill({ label, href, active, disabled }: { label: string; href?: string; active?: boolean; disabled?: boolean }) {
  if (disabled) {
    return (
      <span className="px-4 py-2 text-xs uppercase tracking-widest text-zinc-700 italic">
        {label} · TBD
      </span>
    );
  }
  if (active) {
    return (
      <span className="px-4 py-2 text-xs uppercase tracking-widest text-emerald-300 border-b-2 border-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
        {label}
      </span>
    );
  }
  return (
    <Link href={href ?? "#"} className="px-4 py-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-200 hover:border-b-2 hover:border-zinc-600 transition">
      {label}
    </Link>
  );
}
