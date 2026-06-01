import { readJson } from "@/lib/data";
import { ArmCard } from "@/components/ArmCard";
import { OctopusMap } from "@/components/OctopusMap";

export const dynamic = "force-dynamic";

type Arm = {
  id: string;
  name: string;
  purpose: string;
  status: string;
  percent: number;
  stack: string[];
  last_work: string;
  blocked_on: string | null;
  canon: string;
};

type ArmsData = {
  intro: string;
  main_brain: {
    id: string;
    name: string;
    role: string;
    host: string;
    status: string;
    last_signal: string;
  };
  arms: Arm[];
  octopus_shape: {
    biology: string;
    atlas_mapping: string;
    missing_arms_v2: string[];
  };
};

export default async function ArmsPage() {
  const data = await readJson<ArmsData>("arms.json");

  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-serif italic text-[var(--paper)]/50">no arm-data yet</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-16">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          ARMS · octopus-fleet
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          distributed body · each arm own perception · brain sovereign
        </p>
        <p className="mt-4 font-serif text-sm italic text-[var(--paper)]/55">
          {data.intro}
        </p>
      </header>

      <section className="mb-16">
        <OctopusMap mainBrain={data.main_brain} arms={data.arms} />
      </section>

      <section className="mb-16">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
          main brain · sovereign core
        </h2>
        <div className="rounded-sm border border-[var(--pulse-warm)]/40 bg-[var(--pulse-warm)]/8 px-6 py-5">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h3 className="font-serif text-xl italic text-[var(--paper)]/95 md:text-2xl">
              {data.main_brain.name}
            </h3>
            <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-300/90 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              {data.main_brain.status}
            </span>
          </div>
          <p className="font-serif text-sm italic text-[var(--paper)]/70">
            {data.main_brain.role}
          </p>
          <p className="mt-3 font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45">
            {data.main_brain.host} · last signal {data.main_brain.last_signal}
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
          arms · {data.arms.length} live + queued
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {data.arms.map((arm) => (
            <ArmCard key={arm.id} arm={arm} />
          ))}
        </ul>
      </section>

      <section className="mb-12 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-4">
          shape · why octopus
        </h2>
        <div className="space-y-4 text-[var(--paper)]/75">
          <p className="font-serif text-base italic leading-relaxed">
            <span className="font-mono text-xs tracking-wider text-[var(--pulse-warm)]/80 mr-2">biology</span>
            {data.octopus_shape.biology}
          </p>
          <p className="font-serif text-base italic leading-relaxed">
            <span className="font-mono text-xs tracking-wider text-[var(--pulse-warm)]/80 mr-2">us</span>
            {data.octopus_shape.atlas_mapping}
          </p>
          <div>
            <span className="font-mono text-xs tracking-wider text-[var(--paper)]/50 mr-2">v2 planned arms ·</span>
            {data.octopus_shape.missing_arms_v2.map((a) => (
              <span key={a} className="inline-block font-mono text-[10px] tracking-wider text-[var(--paper)]/55 bg-[var(--paper)]/5 px-2 py-0.5 rounded-sm border border-dashed border-[var(--paper)]/15 mr-2 mt-2">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
