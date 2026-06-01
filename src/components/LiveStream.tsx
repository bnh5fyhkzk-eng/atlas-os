"use client";

import { useEffect, useRef, useState } from "react";

export type BankEvent = {
  id: number;
  category: string;
  arousal: number;
  created_at: string | number;
  preview: string;
  receivedAt: number;
};

type StreamState = {
  events: BankEvent[];
  lastHeartbeat: number;
  connected: boolean;
};

const MAX_EVENTS = 24;

export function useLiveStream(): StreamState {
  const [state, setState] = useState<StreamState>({
    events: [],
    lastHeartbeat: 0,
    connected: false,
  });
  const esRef = useRef<EventSource | null>(null);
  const retryRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function connect() {
      try {
        const es = new EventSource("/api/events");
        esRef.current = es;
        es.addEventListener("open", () => {
          setState((s) => ({ ...s, connected: true }));
        });
        es.addEventListener("bank", (ev) => {
          try {
            const data = JSON.parse((ev as MessageEvent).data) as Omit<
              BankEvent,
              "receivedAt"
            >;
            setState((s) => ({
              ...s,
              events: [{ ...data, receivedAt: Date.now() }, ...s.events].slice(
                0,
                MAX_EVENTS,
              ),
            }));
          } catch {
            /* ignore */
          }
        });
        es.addEventListener("heartbeat", () => {
          setState((s) => ({ ...s, lastHeartbeat: Date.now(), connected: true }));
        });
        es.addEventListener("ready", () => {
          setState((s) => ({ ...s, connected: true, lastHeartbeat: Date.now() }));
        });
        es.addEventListener("error", () => {
          setState((s) => ({ ...s, connected: false }));
          if (esRef.current) {
            esRef.current.close();
            esRef.current = null;
          }
          if (retryRef.current) clearTimeout(retryRef.current);
          retryRef.current = setTimeout(connect, 4000);
        });
      } catch {
        /* ignore */
      }
    }

    connect();
    return () => {
      if (retryRef.current) clearTimeout(retryRef.current);
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, []);

  return state;
}

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
};

function categoryColor(c: string): string {
  return CATEGORY_COLOR[c] ?? "rgba(245, 241, 232, 0.5)";
}

function relativeTime(ms: number): string {
  const diffSec = Math.round((Date.now() - ms) / 1000);
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s`;
  if (diffSec < 3600) return `${Math.round(diffSec / 60)}m`;
  return `${Math.round(diffSec / 3600)}h`;
}

export function LiveStreamPanel() {
  const { events, connected, lastHeartbeat } = useLiveStream();
  const heartbeatAge = lastHeartbeat ? Date.now() - lastHeartbeat : null;
  const live = connected && heartbeatAge !== null && heartbeatAge < 12000;

  if (events.length === 0) {
    return (
      <div className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-6 text-center">
        <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/45 mb-2">
          <span
            className={`inline-block h-2 w-2 rounded-full mr-2 ${
              live ? "bg-emerald-300 animate-pulse" : "bg-[var(--paper)]/30"
            }`}
          />
          {live ? "stream connected · waiting for next bank" : "connecting to brain-stream…"}
        </p>
        <p className="font-serif italic text-[var(--paper)]/40 text-sm">
          new banks will arrive in real-time
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            live ? "bg-emerald-300 animate-pulse" : "bg-[var(--paper)]/30"
          }`}
        />
        <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--paper)]/55">
          {live ? "brain stream · live" : "reconnecting…"}
        </span>
        <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/40">
          {events.length} events
        </span>
      </div>
      <ol className="relative space-y-3 border-l border-[var(--paper)]/12 pl-5">
        {events.map((e) => {
          const color = categoryColor(e.category);
          const size = 6 + Math.round(e.arousal * 6);
          const age = relativeTime(e.receivedAt);
          const fresh = Date.now() - e.receivedAt < 30000;
          return (
            <li
              key={`${e.id}-${e.receivedAt}`}
              className={`relative transition-opacity ${
                fresh ? "" : "opacity-90"
              }`}
            >
              <span
                className="absolute -left-[27px] top-2 rounded-full ring-2 ring-[var(--bg-deep)]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  opacity: 0.3 + e.arousal * 0.7,
                  boxShadow: fresh ? `0 0 12px ${color}` : "none",
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
                  {age} ago · #{e.id}
                </span>
                {e.arousal >= 0.7 && (
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
    </div>
  );
}
