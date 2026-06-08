"use client";

// ArmChatPanel · per-arm chat + board view · embedded in /agents/[arm] page
// Per brother direct 2026-06-07 23:35 EDT · "each arms should have its dedicated page like the picture"

import { useEffect, useState, useRef, useCallback } from "react";

const API = "https://atlas-api.upliftai.app";

interface ArmBoardTask {
  id: string;
  title: string;
  status: string;
  body?: string;
}

interface FeedItem {
  id: string;
  from: string;
  text: string;
  ts: number;
}

interface Props {
  arm: string;
  emoji: string;
  persona: string;
}

export default function ArmChatPanel({ arm, emoji, persona }: Props) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<ArmBoardTask[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef(0);

  // Poll arm-board every 5s
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const r = await fetch(`${API}/public/arm-board/${arm}`, { cache: "no-store" });
        const j = await r.json();
        if (!cancelled && j.ok) setTasks(j.tasks);
      } catch {/* keep going */}
    };
    tick();
    const id = setInterval(tick, 5000);
    return () => { cancelled = true; clearInterval(id); };
  }, [arm]);

  // Poll unified feed · filter to this arm later
  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const r = await fetch(`${API}/public/feed?since=${sinceRef.current}&limit=50`, { cache: "no-store" });
        const j = await r.json();
        if (cancelled) return;
        if (j.items && j.items.length) {
          setFeed((prev) => {
            const seen = new Set(prev.map((x) => x.id));
            const fresh = (j.items as FeedItem[]).filter((x) => !seen.has(x.id));
            return [...prev, ...fresh].slice(-50);
          });
          const maxTs = Math.max(...(j.items as FeedItem[]).map((x) => x.ts || 0));
          if (maxTs > sinceRef.current) sinceRef.current = maxTs;
        }
      } catch {/* keep going */}
    };
    tick();
    const id = setInterval(tick, 3000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [feed]);

  const dispatch = useCallback(async () => {
    if (busy || !input.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch(`${API}/public/dispatch`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ arm, title: input.trim().slice(0, 200), body: input.trim(), source: "brother-direct" }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "dispatch failed");
      setInput("");
      // Refresh tasks immediately
      setTimeout(async () => {
        const r2 = await fetch(`${API}/public/arm-board/${arm}`, { cache: "no-store" });
        const j2 = await r2.json();
        if (j2.ok) setTasks(j2.tasks);
      }, 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [arm, input, busy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      {/* LEFT · chat input + recent feed */}
      <section className="border border-zinc-800 rounded-2xl bg-zinc-950/40 p-4 flex flex-col h-[500px]">
        <header className="flex items-baseline justify-between mb-3">
          <h3 className="text-sm font-serif text-zinc-200">talk to {emoji} {arm}</h3>
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{persona}</span>
        </header>
        <div ref={feedRef} className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1">
          {feed.length === 0 && <p className="text-zinc-600 italic text-xs">feed empty · send a message below</p>}
          {feed.slice(-12).map((m) => (
            <div key={m.id} className={`text-xs rounded px-2 py-1.5 ${m.from === "brother" ? "bg-emerald-950/30 border border-emerald-900/40 text-emerald-100 ml-6" : "bg-zinc-900/40 border border-zinc-800 text-zinc-300 mr-6"}`}>
              <div className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">{m.from} · {new Date(m.ts).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}</div>
              <div className="whitespace-pre-wrap leading-snug">{m.text}</div>
            </div>
          ))}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`task title for ${arm}-arm · ⌘+Enter fires`}
          rows={2}
          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-700 resize-none"
          onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") dispatch(); }}
          maxLength={2000}
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[10px] text-zinc-600 italic">brother direct → {arm}-arm board on Hostinger</p>
          <button
            type="button"
            onClick={dispatch}
            disabled={busy || !input.trim()}
            className="px-3 py-1 rounded text-xs bg-emerald-700 hover:bg-emerald-600 text-emerald-50 disabled:bg-zinc-800 disabled:text-zinc-600 transition"
          >
            {busy ? "..." : "Fire →"}
          </button>
        </div>
        {error && <p className="text-[10px] text-rose-400 mt-1 font-mono">{error}</p>}
      </section>

      {/* RIGHT · live kanban board */}
      <section className="border border-zinc-800 rounded-2xl bg-zinc-950/40 p-4 h-[500px] overflow-y-auto">
        <header className="flex items-baseline justify-between mb-3">
          <h3 className="text-sm font-serif text-zinc-200">{arm} · kanban</h3>
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{tasks.length} tasks · 5s poll</span>
        </header>
        {tasks.length === 0 ? (
          <p className="text-zinc-600 italic text-xs">no tasks · dispatch one ←</p>
        ) : (
          <ul className="space-y-2">
            {tasks.slice(0, 20).map((t) => {
              const statusDot = t.status === "done" ? "bg-emerald-500" :
                                t.status === "running" ? "bg-amber-400 animate-pulse" :
                                t.status === "blocked" ? "bg-rose-500" :
                                t.status === "ready" ? "bg-cyan-400" :
                                "bg-zinc-600";
              return (
                <li key={t.id} className="border border-zinc-800 rounded p-2 text-xs hover:border-zinc-700 transition">
                  <header className="flex items-baseline gap-2 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                    <span className="font-mono text-zinc-500 text-[10px]">{t.id.slice(0, 10)}</span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 ml-auto">{t.status}</span>
                  </header>
                  <p className="text-zinc-200 leading-snug">{t.title.slice(0, 100)}{t.title.length > 100 ? "…" : ""}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
