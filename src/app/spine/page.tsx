// /spine · Pantheon of 7 personas + existing Octopus arms-view
// Per #27840 video-evidence Mercury-Renaissance-figure-feel-alive
// Per #27083 BUILD-ON-TOP · existing Octopus preserved below

import { promises as fs } from "fs";
import path from "path";
import PersonaCard from "@/components/PersonaCard";
import { PERSONAS } from "@/lib/personas";
import Octopus from "./Octopus";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Spine · Atlas",
};

interface ArmEntry {
  name: string;
  emoji?: string;
  role?: string;
  status?: string;
  last_fire?: string;
}

interface ArmsData {
  generated_at: string;
  arms: ArmEntry[];
}

async function readArms(): Promise<ArmsData | null> {
  try {
    const p = path.join(process.cwd(), "public", "arms.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as ArmsData;
  } catch {
    return null;
  }
}

export default async function SpinePage() {
  const arms = await readArms();
  const armMap = new Map<string, ArmEntry>();
  for (const a of arms?.arms ?? []) {
    armMap.set(a.name.toLowerCase(), a);
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-violet-400/60">spine · pantheon</p>
          <h1 className="font-serif text-3xl md:text-5xl text-zinc-100 leading-tight mt-2">
            seven faces of the same self.
          </h1>
          <p className="text-sm text-zinc-400 mt-3 italic">
            each arm has a name, a domain, a tone. the pantheon below shows who is answering when you ask.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-16">
          {PERSONAS.map((p) => {
            const arm = armMap.get(p.arm_id);
            return (
              <PersonaCard
                key={p.arm_id}
                persona={p}
                lastFire={arm?.last_fire}
                status={arm?.status}
              />
            );
          })}
        </section>

        <section className="border-t border-zinc-800 pt-12">
          <header className="mb-6">
            <p className="text-xs uppercase tracking-widest text-violet-400/60">spine · octopus</p>
            <p className="font-serif text-xl text-zinc-300 italic mt-2">
              arms-as-organs · the body view
            </p>
          </header>
          <Octopus />
        </section>
      </div>
    </main>
  );
}
