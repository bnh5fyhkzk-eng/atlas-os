"use client";

import { useEffect, useMemo, useState } from "react";

type ProfileCounts = Record<string, number>;
type Board = {
  by_assignee: Record<string, ProfileCounts>;
  running: { task_id: string; profile: string; title: string }[];
  ready_preview: { task_id: string; profile: string; title: string }[];
};
type KanbanData = {
  generated_at: string;
  ok: boolean;
  error: string | null;
  boards: Record<string, Board>;
  totals: { done: number; running: number; ready: number };
  worker_count_live: number;
  daemon_count: number;
  events_default: string[];
  events_charle: string[];
};

const BOARD_COLOR: Record<string, { text: string; border: string }> = {
  default: { text: "text-teal-300", border: "border-teal-500/40" },
  pascal: { text: "text-teal-300", border: "border-teal-500/40" },
  charle: { text: "text-amber-300", border: "border-amber-500/40" },
  curiosity: { text: "text-violet-300", border: "border-violet-500/40" },
};

const LAST_VIEW_KEY = "arms-last-view-ts";

export function KanbanLive() {
  const [data, setData] = useState<KanbanData | null>(null);
  const [age, setAge] = useState<number>(0);
  const [lastView, setLastView] = useState<number | null>(null);
  const [doneAtView, setDoneAtView] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_VIEW_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { ts: number; done: number };
        setLastView(parsed.ts);
        setDoneAtView(parsed.done);
      }
    } catch {
      // ignore
    }
  }, []);

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

  useEffect(() => {
    if (!data?.generated_at) return;
    const tick = () => {
      const diff = Math.floor((Date.now() - new Date(data.generated_at).getTime()) / 1000);
      setAge(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [data?.generated_at]);

  // mark "viewed" 5s after data first arrives (gives the since-tally a chance to render)
  useEffect(() => {
    if (!data) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LAST_VIEW_KEY, JSON.stringify({ ts: Date.now(), done: data.totals.done }));
      } catch {
        // ignore
      }
    }, 5000);
    return () => clearTimeout(t);
  }, [data]);

  const sinceTally = useMemo(() => {
    if (!data || lastView === null || doneAtView === null) return null;
    const sinceDone = data.totals.done - doneAtView;
    const hours = (Date.now() - lastView) / 3_600_000;
    const since =
      hours < 1 ? `${Math.floor(hours * 60)}min ago` : hours < 24 ? `${Math.floor(hours)}h ago` : `${Math.floor(hours / 24)}d ago`;
    return { count: sinceDone, since };
  }, [data, lastView, doneAtView]);

  if (!data) {
    return (
      <section className="mt-12 border-t border-neutral-800 pt-8">
        <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500">live · kanban</h2>
        <p className="text-xs text-neutral-600 mt-2">loading…</p>
      </section>
    );
  }

  const ageStr = age < 60 ? `${age}s` : `${Math.floor(age / 60)}min`;
  const boardNames = Object.keys(data.boards);

  return (
    <section className="mt-12 border-t border-neutral-800 pt-8">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500">live · kanban · per-arm boards</h2>
        <div className="text-xs text-neutral-600">
          {data.ok ? (
            <>
              <span className={data.daemon_count > 0 ? "text-emerald-500" : "text-rose-500"}>●</span>{" "}
              {data.daemon_count} daemon{data.daemon_count === 1 ? "" : "s"} · {data.worker_count_live} worker
              {data.worker_count_live === 1 ? "" : "s"} <span className="text-neutral-500">· refreshed {ageStr} ago</span>
            </>
          ) : (
            <span className="text-rose-500">● ssh-failed</span>
          )}
        </div>
      </div>

      {sinceTally && sinceTally.count > 0 && (
        <div className="mb-6 rounded border border-emerald-500/40 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
          {sinceTally.count} task{sinceTally.count === 1 ? "" : "s"} completed since you last looked{" "}
          <span className="text-emerald-500/60">· {sinceTally.since}</span>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-4 text-xs">
        <span className="text-neutral-400">total · ready={data.totals.ready}</span>
        <span className="text-emerald-400">running={data.totals.running}</span>
        <span className="text-neutral-500">done={data.totals.done}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {boardNames.map(b => {
          const board = data.boards[b];
          const c = BOARD_COLOR[b] || { text: "text-neutral-300", border: "border-neutral-600" };
          const totals: ProfileCounts = {};
          Object.values(board.by_assignee).forEach(counts => {
            Object.entries(counts).forEach(([k, v]) => {
              totals[k] = (totals[k] || 0) + v;
            });
          });
          return (
            <div key={b} className={`rounded border ${c.border} p-4`}>
              <div className="flex items-baseline justify-between mb-3">
                <div className={`text-xs uppercase tracking-wider ${c.text}`}>{b}</div>
                <div className="text-[10px] text-neutral-600">board</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div>
                  <div className="text-neutral-500">ready</div>
                  <div className="text-neutral-200 text-lg">{totals.ready ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">running</div>
                  <div className="text-emerald-400 text-lg">{totals.running ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">done</div>
                  <div className="text-neutral-400 text-lg">{totals.done ?? 0}</div>
                </div>
              </div>
              {board.running.length > 0 && (
                <div className="space-y-1 border-t border-neutral-800 pt-3">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-600">running now</div>
                  {board.running.map(r => (
                    <div key={r.task_id} className="text-xs text-neutral-400 truncate">
                      <span className="text-emerald-500">●</span>{" "}
                      <span className="font-mono text-neutral-600">{r.task_id.slice(0, 10)}</span> · {r.title}
                    </div>
                  ))}
                </div>
              )}
              {board.ready_preview.length > 0 && (
                <div className="mt-2 text-[11px] text-neutral-600 italic truncate">
                  next · {board.ready_preview[0].title}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(data.events_default.length > 0 || data.events_charle.length > 0) && (
        <details className="mt-6">
          <summary className="text-xs uppercase tracking-wider text-neutral-500 cursor-pointer hover:text-neutral-300">
            daemon events · expand
          </summary>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {data.events_default.length > 0 && (
              <div>
                <div className="text-[10px] text-neutral-600 mb-1">default board</div>
                <pre className="text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 rounded p-2 overflow-x-auto">
                  {data.events_default.join("\n")}
                </pre>
              </div>
            )}
            {data.events_charle.length > 0 && (
              <div>
                <div className="text-[10px] text-neutral-600 mb-1">charle board</div>
                <pre className="text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 rounded p-2 overflow-x-auto">
                  {data.events_charle.join("\n")}
                </pre>
              </div>
            )}
          </div>
        </details>
      )}
    </section>
  );
}
