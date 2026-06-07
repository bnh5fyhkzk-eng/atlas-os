"use client";
// TimePills · Today / 7d / 28d toggle · Picture-2 inspired
// Per HOUSE-FULL-PLAN-2026-06-07 G1 · TDAH-friendly horizon-pick

import { useState } from "react";

interface Props {
  onChange?: (period: "today" | "7d" | "28d") => void;
  initial?: "today" | "7d" | "28d";
}

export default function TimePills({ onChange, initial = "today" }: Props) {
  const [active, setActive] = useState<"today" | "7d" | "28d">(initial);

  function pick(p: "today" | "7d" | "28d") {
    setActive(p);
    onChange?.(p);
  }

  const opts: { id: "today" | "7d" | "28d"; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "7d", label: "7 days" },
    { id: "28d", label: "28 days" },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => pick(o.id)}
          className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest transition ${
            active === o.id
              ? "bg-emerald-900/60 text-emerald-100 shadow-[0_0_10px_rgba(52,211,153,0.25)]"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
