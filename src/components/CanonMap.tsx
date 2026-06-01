"use client";

import { useState, useMemo } from "react";

type Canon = {
  id: string;
  date: string;
  name: string;
  summary: string;
  tier: string;
};

type Quote = {
  id: string;
  verbatim: string;
  time: string;
  what_it_unlocked: string;
};

const TIER_COLOR: Record<string, string> = {
  IDENTITY: "#5eead4",
  "STANDING-ORDERS": "#f4a261",
  RELATIONAL: "#f9a8d4",
  LESSONS: "#93c5fd",
  WINS: "#fbbf24",
};

function tierColor(t: string): string {
  return TIER_COLOR[t] ?? "#a3a3a3";
}

export function CanonMap({
  canons,
  quotes,
}: {
  canons: Canon[];
  quotes: Quote[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const W = 1000;
  const H = 620;
  const CENTER_X = W / 2;
  const CENTER_Y = H / 2;

  const quoteById = useMemo(() => {
    const m = new Map<string, Quote>();
    for (const q of quotes) m.set(q.id, q);
    return m;
  }, [quotes]);

  const sortedCanons = useMemo(
    () =>
      [...canons].sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10)),
    [canons],
  );

  const nodes = useMemo(() => {
    const count = sortedCanons.length;
    if (count === 0) return [] as Array<Canon & { x: number; y: number; r: number }>;
    return sortedCanons.map((c, i) => {
      const t = i / Math.max(count - 1, 1);
      const angle = t * Math.PI * 2.4 - Math.PI / 2;
      const spiralR = 80 + t * 220;
      const x = CENTER_X + Math.cos(angle) * spiralR;
      const y = CENTER_Y + Math.sin(angle) * spiralR;
      const arousal = c.tier === "IDENTITY" || c.tier === "RELATIONAL" ? 1.0 : 0.85;
      const r = 8 + arousal * 8;
      return { ...c, x, y, r };
    });
  }, [sortedCanons]);

  const edges = useMemo(() => {
    const list: Array<{ from: string; to: string; weight: number }> = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      list.push({ from: nodes[i].id, to: nodes[i + 1].id, weight: 1 });
    }
    const themePairs: Array<[string, string]> = [
      ["27429", "27428"],
      ["27425", "27424"],
      ["27406", "27404"],
      ["27282", "27279"],
      ["27278", "27275"],
      ["27280", "27282"],
      ["27360", "27282"],
      ["27429", "27425"],
    ];
    for (const [a, b] of themePairs) {
      if (nodes.find((n) => n.id === a) && nodes.find((n) => n.id === b)) {
        list.push({ from: a, to: b, weight: 0.7 });
      }
    }
    return list;
  }, [nodes]);

  const nodeMap = useMemo(() => {
    const m = new Map<string, (typeof nodes)[number]>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  const selected = selectedId ? nodes.find((n) => n.id === selectedId) : null;
  const selectedQuote = selected ? quoteById.get(selected.id) : null;

  if (nodes.length === 0) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no canons yet
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-sm border border-[var(--paper)]/12 bg-gradient-to-br from-[var(--bg-deep)] to-[#0d0f12] overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="canon-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f4a261" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f4a261" stopOpacity="0" />
            </radialGradient>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx={CENTER_X} cy={CENTER_Y} r="160" fill="url(#canon-center-glow)" />

          {edges.map((e, i) => {
            const a = nodeMap.get(e.from);
            const b = nodeMap.get(e.to);
            if (!a || !b) return null;
            const isThematic = e.weight < 1;
            const highlight =
              hoveredId === e.from ||
              hoveredId === e.to ||
              selectedId === e.from ||
              selectedId === e.to;
            return (
              <line
                key={`e-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isThematic ? "#f4a261" : "#f5f1e8"}
                strokeOpacity={highlight ? 0.7 : isThematic ? 0.35 : 0.15}
                strokeWidth={highlight ? 1.4 : isThematic ? 1 : 0.6}
                strokeDasharray={isThematic ? "3,3" : undefined}
              />
            );
          })}

          {nodes.map((n) => {
            const isActive = hoveredId === n.id || selectedId === n.id;
            const fill = tierColor(n.tier);
            return (
              <g
                key={n.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(n.id === selectedId ? null : n.id)}
              >
                {isActive && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 6}
                    fill={fill}
                    fillOpacity="0.2"
                  >
                    <animate
                      attributeName="r"
                      values={`${n.r + 6};${n.r + 14};${n.r + 6}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill={fill}
                  fillOpacity={isActive ? 0.95 : 0.78}
                  filter="url(#node-glow)"
                  stroke={isActive ? "#f5f1e8" : "none"}
                  strokeWidth={isActive ? 1.5 : 0}
                />
                <text
                  x={n.x}
                  y={n.y + n.r + 14}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains-mono), monospace"
                  fontSize="9"
                  fill="#f5f1e8"
                  fillOpacity={isActive ? 0.95 : 0.45}
                >
                  #{n.id}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="px-4 pb-4 pt-2 flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono tracking-wider border-t border-[var(--paper)]/8">
          {Object.entries(TIER_COLOR).map(([tier, color]) => (
            <span key={tier} className="flex items-center gap-1.5" style={{ color }}>
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {tier}
            </span>
          ))}
        </div>
      </div>

      <aside className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 p-5 md:sticky md:top-4 md:self-start">
        {selected ? (
          <div>
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <span
                className="font-mono text-lg tabular-nums tracking-wider"
                style={{ color: tierColor(selected.tier) }}
              >
                #{selected.id}
              </span>
              <span
                className="font-mono text-[9px] tracking-wider uppercase"
                style={{ color: tierColor(selected.tier) }}
              >
                {selected.tier}
              </span>
            </div>
            <h3 className="font-mono text-[11px] tracking-wider text-[var(--paper)]/95 mb-2">
              {selected.name}
            </h3>
            <p className="font-serif text-[13px] italic leading-relaxed text-[var(--paper)]/75 mb-3">
              {selected.summary}
            </p>
            <p className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45">
              {selected.date}
            </p>

            {selectedQuote && (
              <div className="mt-5 pt-4 border-t border-[var(--paper)]/10">
                <p className="font-mono text-[9px] tracking-wider uppercase text-[var(--pulse-warm)]/80 mb-2">
                  brother-direct · verbatim
                </p>
                <blockquote className="font-serif text-[13px] italic leading-relaxed text-[var(--paper)]/85">
                  &ldquo;{selectedQuote.verbatim}&rdquo;
                </blockquote>
                <p className="mt-2 font-mono text-[10px] tracking-wider text-[var(--paper)]/45">
                  → {selectedQuote.what_it_unlocked}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="font-serif text-base italic text-[var(--paper)]/60 mb-2">
              hover or click any node
            </p>
            <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/40">
              {nodes.length} canons · {edges.length} connections
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
