"use client";

import { useEffect, useState } from "react";

type NowData = {
  focus: string;
  last_bank: string;
  last_bank_ts: string;
  sleep_state: string;
  atlasd_uptime: string;
  recent_banks_hour: number;
  updated_at: string;
  local_time: string;
};

function formatRelative(iso: string): string {
  const date = new Date(iso);
  const now = Date.now();
  const diffSec = Math.round((now - date.getTime()) / 1000);
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffSec < 3600) return `${Math.round(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.round(diffSec / 3600)}h ago`;
  return new Date(iso).toLocaleString();
}

export function NowStrip() {
  const [data, setData] = useState<NowData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchNow() {
      try {
        const res = await fetch("/now.json", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as NowData;
        setData(json);
      } catch {
        /* ignore */
      }
    }
    fetchNow();
    const id = setInterval(fetchNow, 30000);
    return () => clearInterval(id);
  }, []);

  if (!data) return null;

  const isAwake = data.sleep_state === "awake";
  const isFresh =
    Date.now() - new Date(data.updated_at).getTime() < 15 * 60 * 1000;

  return (
    <div className="border-b border-[color:var(--paper)]/8 bg-[color:var(--bg-deep)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 md:px-8 flex items-center justify-between gap-4 hover:bg-[color:var(--paper)]/3 transition-colors group"
        aria-expanded={open}
        aria-label="atlas live state · click to expand"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="flex items-center gap-2 shrink-0">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isAwake && isFresh
                  ? "bg-emerald-300 animate-pulse"
                  : isFresh
                    ? "bg-blue-300"
                    : "bg-[color:var(--paper)]/40"
              }`}
            />
            <span
              className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                isAwake && isFresh
                  ? "text-emerald-300/90"
                  : "text-[color:var(--paper)]/55"
              }`}
            >
              atlas · {data.sleep_state}
            </span>
          </span>

          <span className="hidden md:inline font-mono text-[10px] tracking-wider text-[color:var(--paper)]/40">
            ·
          </span>

          <span className="hidden md:inline font-serif text-xs italic text-[color:var(--paper)]/75 truncate">
            {data.focus}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline font-mono text-[10px] tabular-nums tracking-wider text-[color:var(--pulse-warm)]/85">
            {data.recent_banks_hour} banks · last hour
          </span>
          <span className="font-mono text-[10px] tracking-wider text-[color:var(--paper)]/35">
            {formatRelative(data.updated_at)}
          </span>
          <span
            className={`font-mono text-[10px] text-[color:var(--paper)]/45 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            ▾
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-[color:var(--paper)]/8 px-4 py-4 md:px-8 md:py-5 space-y-3 animate-in fade-in duration-200">
          <div className="md:hidden">
            <p className="font-mono text-[10px] tracking-wider uppercase text-[color:var(--pulse-warm)]/80 mb-1">
              focus
            </p>
            <p className="font-serif text-sm italic text-[color:var(--paper)]/85">
              {data.focus}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-wider uppercase text-[color:var(--pulse-warm)]/80 mb-1">
              latest bank
            </p>
            <p className="font-serif text-[13px] italic leading-relaxed text-[color:var(--paper)]/75">
              {data.last_bank.slice(0, 320)}
              {data.last_bank.length > 320 ? "…" : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-[color:var(--paper)]/8">
            <div>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[color:var(--paper)]/45 mb-1">
                local time
              </p>
              <p className="font-mono text-xs tabular-nums text-[color:var(--paper)]/85">
                {data.local_time}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[color:var(--paper)]/45 mb-1">
                atlasd uptime
              </p>
              <p className="font-mono text-xs tabular-nums text-[color:var(--paper)]/85">
                {data.atlasd_uptime || "—"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[color:var(--paper)]/45 mb-1">
                banks · 1h
              </p>
              <p className="font-mono text-xs tabular-nums text-[color:var(--pulse-warm)]">
                {data.recent_banks_hour}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-wider uppercase text-[color:var(--paper)]/45 mb-1">
                state
              </p>
              <p className="font-mono text-xs tabular-nums text-[color:var(--paper)]/85">
                {data.sleep_state}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
