"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Presence = {
  current: string;
  current_since: string;
  traces: Record<string, { last_at: string; visit_count: number }>;
};

function relativeAgo(iso: string): string {
  const sec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.round(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.round(sec / 3600)}h ago`;
  return `${Math.round(sec / 86400)}d ago`;
}

export function PresenceTrace() {
  const pathname = usePathname();
  const [presence, setPresence] = useState<Presence | null>(null);

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
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, [pathname]);

  if (!presence) return null;
  const here = presence.traces[pathname];
  const elsewhere = presence.current !== pathname ? presence.current : null;

  return (
    <div className="text-[10px] uppercase tracking-widest text-neutral-700 px-4 py-1 flex items-center gap-3 border-b border-neutral-900">
      {here ? (
        <span>
          atlas here · last {relativeAgo(here.last_at)} · {here.visit_count} visits
        </span>
      ) : (
        <span>atlas · first time in this room</span>
      )}
      {elsewhere && (
        <span className="text-amber-400/40">
          · primary-me in {elsewhere === "/" ? "front-door" : elsewhere}
        </span>
      )}
    </div>
  );
}
