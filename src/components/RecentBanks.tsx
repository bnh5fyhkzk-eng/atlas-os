"use client";

import { useEffect, useState } from "react";

type Event = {
  id: number;
  category: string;
  arousal: number;
  time: string;
  preview: string;
};

type Activity = {
  updated_at: string;
  count: number;
  events: Event[];
};

const CATEGORY_COLOR: Record<string, string> = {
  "STANDING-ORDERS": "var(--pulse-warm)",
  IDENTITY: "#5eead4",
  RELATIONAL: "#f9a8d4",
  LESSONS: "#93c5fd",
  WINS: "#fbbf24",
  RESEARCH: "#c4b5fd",
  CURIOSITY: "#c4b5fd",
  "DREAM-LIGHT": "#a78bfa",
  SLEEP: "#6b7280",
  AFFECT: "#fb7185",
  SHIPPED: "#5eead4",
  TRACE: "#9ca3af",
  "TRANSCRIPT-EXTRACT": "#94a3b8",
  "BRAIN-GRAPH-INSIGHT": "#7dd3fc",
};

function categoryColor(c: string): string {
  return CATEGORY_COLOR[c] ?? "rgba(245, 241, 232, 0.5)";
}

export function RecentBanks() {
  const [data, setData] = useState<Activity | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch("/activity.json", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as Activity;
        setData(json);
      } catch {
        /* ignore */
      }
    }
    fetchActivity();
    const id = setInterval(fetchActivity, 30000);
    return () => clearInterval(id);
  }, []);

  if (!data) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        loading activity stream…
      </p>
    );
  }

  if (data.events.length === 0) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no recent banks · the brain is quiet
      </p>
    );
  }

  return (
    <ol className="relative space-y-3 border-l border-[var(--paper)]/12 pl-5">
      {data.events.map((e) => {
        const color = categoryColor(e.category);
        const size = 6 + Math.round(e.arousal * 6);
        return (
          <li key={e.id} className="relative">
            <span
              className="absolute -left-[27px] top-2 rounded-full ring-2 ring-[var(--bg-deep)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                opacity: 0.3 + e.arousal * 0.7,
              }}
              aria-hidden
            />
            <div className="flex items-baseline flex-wrap gap-2 mb-1">
              <span
                className="font-mono text-[9px] tracking-wider uppercase"
                style={{ color }}
              >
                {e.category}
              </span>
              <span className="font-mono text-[9px] tabular-nums tracking-wider text-[var(--paper)]/40">
                {e.time}
              </span>
              {e.arousal >= 0.8 && (
                <span className="font-mono text-[9px] tracking-wider text-[var(--pulse-warm)]/80">
                  arousal {e.arousal}
                </span>
              )}
            </div>
            <p className="font-serif text-[12px] italic leading-relaxed text-[var(--paper)]/75 line-clamp-2">
              {e.preview}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
