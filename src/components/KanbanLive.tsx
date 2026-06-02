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
  ok: boolean;
  error: string | null;
  arms: Record<string, ArmInfo>;
  totals: { done: number; running: number; ready: number };
  worker_count_live: number;
  daemon_count: number;
  events_default: string[];
  events_charle: string[];
  events_curiosity: string[];
};

const ARM_COLOR: Record<string, { text: string; border: string }> = {
  pascal: { text: "text-teal-300", border: "border-teal-500/40" },
  charle: { text: "text-amber-300", border: "border-amber-500/40" },
  curiosity: { text: "text-violet-300", border: "border-violet-500/40" },
};

const LAST_VIEW_KEY = "arms-last-view-ts";
const STALE_THRESHOLD_SEC = 600; // 10min

function fmtAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
  return `${Math.floor(seconds / 3600)}h`;
}

type CollectedEntry = { arm: string; collected_at: string; local_path: string };
type Collected = Record<string, CollectedEntry>;

export function KanbanLive() {
  const [data, setData] = useState<KanbanData | null>(null);
  const [age, setAge] = useState<number>(0);
  const [lastView, setLastView] = useState<number | null>(null);
  const [doneAtView, setDoneAtView] = useState<number | null>(null);
  const [collected, setCollected] = useState<Collected | null>(null);

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
    let cancelled = false;
    const fetchCollected = async () => {
      try {
        const res = await fetch(`/arms-collected.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as Collected;
        if (!cancelled) setCollected(json);
      } catch {
        // silent
      }
    };
    fetchCollected();
    const id = setInterval(fetchCollected, 60_000);
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
    if (sinceDone <= 0) return null;
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

  const ageStr = fmtAge(age);
  const isStale = age > STALE_THRESHOLD_SEC;
  const armNames = Object.keys(data.arms).sort();

  return (
    <section className="mt-12 border-t border-neutral-800 pt-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500">live · kanban · per-arm</h2>
        <div className="text-xs text-neutral-600">
          {data.ok ? (
            <>
              <span className={data.daemon_count > 0 ? "text-emerald-500" : "text-rose-500"}>●</span>{" "}
              {data.daemon_count} daemon{data.daemon_count === 1 ? "" : "s"} · {data.worker_count_live} worker
              {data.worker_count_live === 1 ? "" : "s"}{" "}
              <span className={isStale ? "text-amber-400" : "text-neutral-500"}>· refreshed {ageStr} ago</span>
            </>
          ) : (
            <span className="text-rose-500">● ssh-failed</span>
          )}
        </div>
      </div>

      {isStale && (
        <div className="mb-4 rounded border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs text-amber-300">
          ⚠ arm data stale · sync may be down · last refresh {ageStr} ago (threshold {STALE_THRESHOLD_SEC}s)
        </div>
      )}

      {sinceTally && (
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
        {armNames.map(name => {
          const arm = data.arms[name];
          const c = ARM_COLOR[name] || { text: "text-neutral-300", border: "border-neutral-700" };
          const counts = arm.counts;
          const blocked = counts.blocked || 0;
          return (
            <div key={name} className={`rounded border ${c.border} p-4`}>
              <div className="flex items-baseline justify-between mb-3">
                <div className={`text-xs uppercase tracking-wider ${c.text}`}>{name}-arm</div>
                <div className="text-[10px] text-neutral-600">
                  {arm.boards_seen.length === 1
                    ? `board · ${arm.boards_seen[0]}`
                    : `boards · ${arm.boards_seen.join(" + ")}`}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                <div>
                  <div className="text-neutral-500">ready</div>
                  <div className="text-neutral-200 text-lg">{counts.ready ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">run</div>
                  <div className="text-emerald-400 text-lg">{counts.running ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">done</div>
                  <div className="text-neutral-400 text-lg">{counts.done ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">block</div>
                  <div className={`text-lg ${blocked > 0 ? "text-rose-400" : "text-neutral-600"}`}>{blocked}</div>
                </div>
              </div>
              {arm.running.length > 0 && (
                <div className="space-y-1 border-t border-neutral-800 pt-3">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-600">running now</div>
                  {arm.running.map(r => (
                    <div key={r.task_id} className="text-xs text-neutral-400 truncate">
                      <span className="text-emerald-500">●</span>{" "}
                      <span className="font-mono text-neutral-600">{r.task_id.slice(0, 10)}</span> · {r.title}
                    </div>
                  ))}
                </div>
              )}
              {arm.running.length === 0 && arm.ready_preview.length > 0 && (
                <div className="mt-2 text-[11px] text-neutral-600 italic truncate">
                  next · {arm.ready_preview[0].title}
                </div>
              )}
              {arm.running.length === 0 && arm.ready_preview.length === 0 && (
                <div className="mt-2 text-[11px] text-neutral-700 italic">queue empty</div>
              )}
            </div>
          );
        })}
      </div>

      {collected && Object.keys(collected).length > 0 && (() => {
        const entries = Object.entries(collected);
        const lastTs = entries.reduce((max, [, e]) => {
          const t = new Date(e.collected_at).getTime();
          return t > max ? t : max;
        }, 0);
        const sinceMin = Math.floor((Date.now() - lastTs) / 60_000);
        const sinceStr = sinceMin < 1 ? "just now" : sinceMin < 60 ? `${sinceMin}min ago` : `${Math.floor(sinceMin / 60)}h ago`;
        const byArm: Record<string, number> = {};
        entries.forEach(([, e]) => {
          byArm[e.arm] = (byArm[e.arm] || 0) + 1;
        });
        return (
          <div className="mt-6 rounded border border-neutral-800 bg-neutral-950/40 px-4 py-3 text-xs text-neutral-400">
            <span className="text-neutral-300">{entries.length}</span> briefs collected locally
            <span className="text-neutral-600"> · </span>
            {Object.entries(byArm).map(([arm, n], i) => (
              <span key={arm}>
                {i > 0 && <span className="text-neutral-700"> · </span>}
                <span className={ARM_COLOR[arm]?.text || "text-neutral-300"}>{arm}</span>={n}
              </span>
            ))}
            <span className="text-neutral-600"> · last {sinceStr}</span>
            <a href="/arms-collected.json" className="ml-3 text-amber-400 hover:text-amber-300 underline">
              browse
            </a>
          </div>
        );
      })()}

      {(data.events_default.length > 0 || data.events_charle.length > 0 || data.events_curiosity.length > 0) && (
        <details className="mt-6">
          <summary className="text-xs uppercase tracking-wider text-neutral-500 cursor-pointer hover:text-neutral-300">
            daemon events · expand
          </summary>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              { label: "default", events: data.events_default },
              { label: "charle", events: data.events_charle },
              { label: "curiosity", events: data.events_curiosity },
            ].map(({ label, events }) =>
              events.length > 0 ? (
                <div key={label}>
                  <div className="text-[10px] text-neutral-600 mb-1">{label} daemon</div>
                  <pre className="text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 rounded p-2 overflow-x-auto leading-relaxed">
                    {events.join("\n")}
                  </pre>
                </div>
              ) : null
            )}
          </div>
        </details>
      )}
    </section>
  );
}
