"use client";

import { useEffect, useState } from "react";

type KanbanData = {
  generated_at: string;
  ok: boolean;
  error: string | null;
  by_assignee: Record<string, Record<string, number>>;
  running: { task_id: string; profile: string; title: string }[];
  worker_count_live: number;
  recent_events: string[];
  daemon_alive: boolean;
};

const PROFILE_COLOR: Record<string, string> = {
  "pascal-arm": "text-teal-300 border-teal-500/40",
  "charle-arm": "text-amber-300 border-amber-500/40",
  "curiosity-arm": "text-violet-300 border-violet-500/40",
  "hermes-arm": "text-rose-300 border-rose-500/40",
};

export function KanbanLive() {
  const [data, setData] = useState<KanbanData | null>(null);
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const res = await fetch(`/arms-kanban.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
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

  if (!data) {
    return (
      <section className="mt-12 border-t border-neutral-800 pt-8">
        <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500">live · kanban</h2>
        <p className="text-xs text-neutral-600 mt-2">loading…</p>
      </section>
    );
  }

  const ageStr = age < 60 ? `${age}s` : `${Math.floor(age / 60)}min`;
  const profiles = Object.keys(data.by_assignee).sort();

  return (
    <section className="mt-12 border-t border-neutral-800 pt-8">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500">live · kanban</h2>
        <div className="text-xs text-neutral-600">
          {data.ok ? (
            <>
              <span className={data.daemon_alive ? "text-emerald-500" : "text-rose-500"}>●</span> daemon{" "}
              <span className="text-neutral-500">· refreshed {ageStr} ago</span>
            </>
          ) : (
            <span className="text-rose-500">● ssh-failed</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {profiles.map(p => {
          const c = data.by_assignee[p];
          const cls = PROFILE_COLOR[p] || "text-neutral-300 border-neutral-600";
          return (
            <div key={p} className={`rounded border p-3 ${cls.split(" ")[1]}`}>
              <div className={`text-xs uppercase tracking-wider ${cls.split(" ")[0]}`}>{p}</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-neutral-500">ready</div>
                  <div className="text-neutral-200 text-lg">{c.ready ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">run</div>
                  <div className="text-emerald-400 text-lg">{c.running ?? 0}</div>
                </div>
                <div>
                  <div className="text-neutral-500">done</div>
                  <div className="text-neutral-400 text-lg">{c.done ?? 0}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {data.running.length > 0 && (
        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
            running ({data.running.length})
          </div>
          <div className="space-y-1">
            {data.running.map(r => {
              const cls = PROFILE_COLOR[r.profile] || "text-neutral-300";
              return (
                <div key={r.task_id} className="flex gap-3 text-xs">
                  <span className="text-emerald-500">●</span>
                  <span className="font-mono text-neutral-500">{r.task_id}</span>
                  <span className={cls.split(" ")[0]}>{r.profile}</span>
                  <span className="text-neutral-300 truncate">{r.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {data.recent_events.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">events · last 10</div>
          <pre className="text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 rounded p-3 overflow-x-auto leading-relaxed">
            {data.recent_events.join("\n")}
          </pre>
        </div>
      )}
    </section>
  );
}
