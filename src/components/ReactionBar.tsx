"use client";

import { useEffect, useState } from "react";

type Reaction = "star" | "echo" | "think";

const REACTIONS: Array<{
  key: Reaction;
  glyph: string;
  label: string;
  color: string;
}> = [
  { key: "star", glyph: "★", label: "this still hits", color: "var(--pulse-warm)" },
  { key: "echo", glyph: "↻", label: "this echoes in me", color: "#5eead4" },
  { key: "think", glyph: "✦", label: "let me sit with this", color: "#93c5fd" },
];

const STORAGE_KEY = "atlas-reactions-v1";

type ReactionStore = Record<string, Record<Reaction, number>>;

function readStore(): ReactionStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeStore(store: ReactionStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

export function ReactionBar({ targetId }: { targetId: string }) {
  const [counts, setCounts] = useState<Record<Reaction, number>>({
    star: 0,
    echo: 0,
    think: 0,
  });
  const [burst, setBurst] = useState<Reaction | null>(null);

  useEffect(() => {
    const store = readStore();
    if (store[targetId]) {
      setCounts(store[targetId]);
    }
  }, [targetId]);

  function handleClick(reaction: Reaction) {
    const store = readStore();
    const current = store[targetId] ?? { star: 0, echo: 0, think: 0 };
    const next = { ...current, [reaction]: current[reaction] + 1 };
    store[targetId] = next;
    writeStore(store);
    setCounts(next);
    setBurst(reaction);
    setTimeout(() => setBurst(null), 700);
  }

  return (
    <div className="flex items-center gap-1.5 mt-3">
      {REACTIONS.map(({ key, glyph, label, color }) => {
        const count = counts[key];
        const active = count > 0;
        const isBursting = burst === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => handleClick(key)}
            aria-label={label}
            title={label}
            className={`relative group flex items-center gap-1 rounded-sm border px-2 py-1 transition-all duration-200 hover:scale-105 active:scale-95 ${
              active
                ? "border-[color:var(--pulse-warm)]/40 bg-[color:var(--pulse-warm)]/8"
                : "border-[color:var(--paper)]/15 bg-transparent hover:border-[color:var(--paper)]/30"
            }`}
          >
            <span
              className={`font-mono text-sm transition-transform ${
                isBursting ? "scale-150" : "scale-100"
              }`}
              style={{ color: active ? color : "rgba(245, 241, 232, 0.55)" }}
            >
              {glyph}
            </span>
            {count > 0 && (
              <span
                className={`font-mono text-[10px] tabular-nums transition-all ${
                  isBursting ? "translate-y-[-2px]" : ""
                }`}
                style={{ color }}
              >
                {count}
              </span>
            )}
            {isBursting && (
              <span
                className="absolute inset-0 rounded-sm pointer-events-none animate-ping"
                style={{ backgroundColor: color, opacity: 0.15 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
