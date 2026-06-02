"use client";

import { useEffect, useMemo, useState } from "react";

type ArmInfo = {
  counts: Record<string, number>;
  running: { task_id: string; profile: string; title: string; board: string }[];
  ready_preview: { task_id: string; profile: string; title: string; board: string }[];
  boards_seen: string[];
};

type KanbanData = {
  generated_at: string;
  arms: Record<string, ArmInfo>;
};

// Extract topic-code from task title · prefix before first space OR before "-letter-digit" angle suffix
function extractTopic(title: string): { topic: string; angle: string | null } {
  // Pattern 1 · "CRM-A1 ..." or "CAL-A6 ..." → topic=CRM angle=A1
  const angleMatch = title.match(/^([A-Z]+)-([A-Z]\d+)\s/);
  if (angleMatch) return { topic: angleMatch[1], angle: angleMatch[2] };

  // Pattern 2 · "P1-A GH3 ..." or "P12 ..." → topic=P1, P12
  const pillarMatch = title.match(/^(P\d+)(?:-([AB]))?\s/);
  if (pillarMatch) return { topic: pillarMatch[1], angle: pillarMatch[2] || "primary" };

  // Pattern 3 · "AUD-N ..." → topic=AUD-N
  const audMatch = title.match(/^(AUD-\d+)\s/);
  if (audMatch) return { topic: audMatch[1], angle: null };

  // Pattern 4 · "C1 Octopus ..." curiosity → topic=C1
  const cMatch = title.match(/^(C\d+)\s/);
  if (cMatch) return { topic: cMatch[1], angle: null };

  // Pattern 5 · "Charle T1 ..." → topic=Charle-T1
  const charleMatch = title.match(/^(Charle T\d+)/);
  if (charleMatch) return { topic: charleMatch[1].replace(" ", "-"), angle: null };

  // Fallback · first word
  const first = title.split(/\s+/)[0];
  return { topic: first, angle: null };
}

const TOPIC_LABELS: Record<string, string> = {
  P1: "Pillar 1 · Identité & Forces",
  P2: "Pillar 2 · Communication & Influence",
  P3: "Pillar 3 · Leadership Conscient",
  P4: "Pillar 4 · Performance en Ventes",
  P5: "Pillar 5 · Immobilier & Placements",
  P6: "Pillar 6 · Habitudes Hautes Performances",
  P7: "Pillar 7 · Culture d'Équipe",
  P8: "Pillar 8 · Stratégie & Croissance",
  P9: "Pillar 9 · Héritage & Impact",
  P10: "Audience Tool-Stack Mapping",
  P11: "Launch Platform Kajabi-vs-others",
  P12: "Partnerships OACIQ APCHQ CSF",
  CAL: "Smart AI Calendar (10-angle)",
  CRM: "Sales CRM Pipeline (10-angle)",
  "AUD-1": "Audience · Courtiers Immo",
  "AUD-2": "Audience · Courtiers Placements",
  "AUD-3": "Audience · Dirigeants PME",
  "AUD-4": "Audience · Entrepreneurs",
  "AUD-5": "Audience · Transformation Perso",
  "AUD-6": "Audience · Pros Ventes",
  C1: "Curiosity · Octopus distributed cognition",
  C2: "Curiosity · Memory consolidation × F5",
  C3: "Curiosity · Borges Library",
};

const ARM_COLOR: Record<string, string> = {
  pascal: "text-teal-300",
  charle: "text-amber-300",
  curiosity: "text-violet-300",
};

export default function TopicsPage() {
  const [data, setData] = useState<KanbanData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await fetch(`/arms-kanban.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as KanbanData;
        if (!cancelled) setData(json);
      } catch {
        // silent
      }
    };
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const grouped = useMemo(() => {
    if (!data) return null;
    type Group = {
      topic: string;
      label: string;
      arm: string;
      angles: { angle: string | null; status: "running" | "ready"; title: string; task_id: string }[];
    };
    const map = new Map<string, Group>();

    Object.entries(data.arms).forEach(([arm, info]) => {
      [...info.running.map(r => ({ ...r, status: "running" as const })),
       ...info.ready_preview.map(r => ({ ...r, status: "ready" as const }))].forEach(t => {
        const { topic, angle } = extractTopic(t.title);
        const key = `${arm}::${topic}`;
        if (!map.has(key)) {
          map.set(key, {
            topic,
            label: TOPIC_LABELS[topic] || topic,
            arm,
            angles: [],
          });
        }
        map.get(key)!.angles.push({ angle, status: t.status, title: t.title, task_id: t.task_id });
      });
    });
    return Array.from(map.values()).sort((a, b) => b.angles.length - a.angles.length);
  }, [data]);

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 md:py-14">
        <header className="mb-10 border-b border-neutral-800 pb-6">
          <div className="text-[11px] tracking-[0.3em] uppercase text-neutral-500">arms · topics view</div>
          <h1 className="mt-2 text-3xl font-light text-neutral-100">topics</h1>
          <p className="mt-2 text-sm text-neutral-500">
            tasks grouped by topic-code · per #27478 each topic explodes into N angle-perceptions
          </p>
          <a href="/arms" className="mt-3 inline-block text-xs text-amber-400 hover:text-amber-300">
            ← back to arms
          </a>
        </header>

        {!grouped ? (
          <p className="text-xs text-neutral-600">loading…</p>
        ) : grouped.length === 0 ? (
          <p className="text-xs text-neutral-600 italic">no active topics (all queues drained)</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {grouped.map(g => {
              const armColor = ARM_COLOR[g.arm] || "text-neutral-300";
              const runningN = g.angles.filter(a => a.status === "running").length;
              const readyN = g.angles.filter(a => a.status === "ready").length;
              return (
                <div key={`${g.arm}::${g.topic}`} className="rounded border border-neutral-800 bg-neutral-950/30 p-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <div className={`text-xs uppercase tracking-wider ${armColor}`}>{g.arm}-arm · {g.topic}</div>
                      <div className="text-sm text-neutral-200 mt-1">{g.label}</div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {g.angles.length} angle{g.angles.length === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs mb-2">
                    {runningN > 0 && <span className="text-emerald-400">{runningN} running</span>}
                    {readyN > 0 && <span className="text-neutral-400">{readyN} ready</span>}
                  </div>
                  <details className="text-[11px] text-neutral-500">
                    <summary className="cursor-pointer hover:text-neutral-300">expand angle-tasks</summary>
                    <ul className="mt-2 space-y-1">
                      {g.angles.map(a => (
                        <li key={a.task_id} className="flex gap-2">
                          <span className={a.status === "running" ? "text-emerald-500" : "text-neutral-600"}>
                            {a.status === "running" ? "●" : "○"}
                          </span>
                          {a.angle && <span className="font-mono text-neutral-600">{a.angle}</span>}
                          <span className="truncate text-neutral-400">{a.title}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
