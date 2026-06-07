// /agents · index · 7 personas as cards → click into /agents/[arm]
// Per TIER-B3 · companion to /spine pantheon · explicit agents-index

import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { PERSONAS } from "@/lib/personas";
import PersonaCard from "@/components/PersonaCard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Agents · Atlas" };

interface ArmEntry {
  name: string;
  status?: string;
  last_fire?: string;
}

async function loadArms(): Promise<{ arms?: ArmEntry[] } | null> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "public", "arms.json"), "utf-8"));
  } catch {
    return null;
  }
}

export default async function AgentsIndex() {
  const arms = await loadArms();
  const armMap = new Map<string, ArmEntry>();
  for (const a of arms?.arms ?? []) armMap.set(a.name.toLowerCase(), a);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-emerald-400/60">agents · index</p>
          <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 leading-tight mt-2">
            Seven faces · click into one.
          </h1>
          <p className="text-sm text-zinc-400 mt-2 italic">
            each agent has a deep-page · system-prompt · model · status · recent tasks · per-arm workspace.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PERSONAS.map((p) => {
            const arm = armMap.get(p.arm_id);
            return (
              <Link key={p.arm_id} href={`/agents/${p.arm_id}`} className="block transition hover:scale-[1.01]">
                <PersonaCard persona={p} lastFire={arm?.last_fire} status={arm?.status} />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
