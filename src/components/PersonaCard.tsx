// PersonaCard · hero-card per arm (Mercury/Hephaestus/Athena style)
// Per #27840 video-evidence Renaissance-figure-cards-feel-alive
// Renders SVG seal + name + domain + glow accent

import PersonaSeal from "./PersonaSeal";
import type { Persona } from "@/lib/personas";

interface Props {
  persona: Persona;
  lastFire?: string;
  status?: string;
}

export default function PersonaCard({ persona, lastFire, status }: Props) {
  const live = (status || "").toLowerCase().includes("live") || (status || "").toLowerCase().includes("running");
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-6 ${persona.accent} ${persona.glow} transition hover:scale-[1.02]`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-20 h-20 opacity-80 group-hover:opacity-100 transition">
          <PersonaSeal emblem={persona.emblem} className="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-serif text-2xl">{persona.name}</h3>
            {live && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            )}
          </div>
          <p className="text-xs uppercase tracking-widest opacity-60 mb-3">
            {persona.arm_id} · {persona.domain}
          </p>
          <p className="text-sm italic opacity-80 leading-snug mb-4">
            {persona.shortDescription}
          </p>
          <div className="space-y-1 text-xs font-mono opacity-50 group-hover:opacity-80 transition">
            <p>model · {persona.preferredModel}</p>
            <p>prompt · {persona.systemPrompt}</p>
            {lastFire && <p>last fire · {lastFire}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
