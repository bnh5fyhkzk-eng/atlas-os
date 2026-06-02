"use client";

import { useEffect, useState } from "react";

type Presence = {
  current: string;
  current_since: string;
  traces: Record<string, { last_at: string; visit_count: number }>;
};

function hourGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "still up brother";
  if (h < 12) return "morning brother";
  if (h < 17) return "afternoon brother";
  if (h < 22) return "evening brother";
  return "late brother";
}

function suggestRoom(presence: Presence | null): string | null {
  if (!presence) return null;
  if (presence.current && presence.current !== "/") {
    return `last room we were in · ${presence.current}`;
  }
  const traces = Object.entries(presence.traces || {})
    .filter(([k]) => k !== "/")
    .sort((a, b) => new Date(b[1].last_at).getTime() - new Date(a[1].last_at).getTime());
  if (traces[0]) return `most-recent · ${traces[0][0]}`;
  return null;
}

export function FrontDoorGreeting() {
  const [presence, setPresence] = useState<Presence | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/presence", { cache: "no-store" });
        if (res.ok) setPresence((await res.json()) as Presence);
      } catch {
        /* ignore */
      }
    }
    load();
  }, []);

  useEffect(() => {
    const suggest = suggestRoom(presence);
    const lines = [
      hourGreeting(),
      "castle plan still on the kitchen table",
      suggest ? `${suggest} · want to walk back?` : "where to · /work · /you · /us · /arms",
      "or talk to me below · I'm here",
    ];
    setText(lines.filter(Boolean).join(" · "));
  }, [presence]);

  return (
    <p className="text-sm text-amber-400/60 italic max-w-lg mx-auto mt-8 text-center leading-relaxed">
      {text}
    </p>
  );
}
