"use client";

// Workspace chat-stream client · talks to atlas-api Mac mini via tunnel
// Per brother direct 23:13 EDT · chat-style, see what each arm is doing
// Per #27859 path-to-truly-continuous + #1775 flip-switch

import { useEffect, useState, useRef, useCallback } from "react";

const API = "https://atlas-api.upliftai.app";

const ARMS = ["pascal", "code", "research", "infra", "hermes", "charle"] as const;
type Arm = typeof ARMS[number];

const ARM_META: Record<Arm, { emoji: string; persona: string }> = {
  pascal: { emoji: "🤝", persona: "Pythia" },
  code: { emoji: "🔨", persona: "Hephaestus" },
  research: { emoji: "🎵", persona: "Apollo" },
  infra: { emoji: "🌐", persona: "Atlas" },
  hermes: { emoji: "⚡", persona: "Mercury" },
  charle: { emoji: "📞", persona: "Charle" },
};

interface FeedItem {
  id: string;
  from: string;
  text: string;
  channel?: string;
  created_at: string;
  status?: string;
  ts: number;
  kind: "chat" | "dispatch" | "arm-event";
  arm?: string;
}

interface ArmCard {
  name: string;
  emoji: string;
  role: string;
  status: string;
  last_fire: string;
  next_action?: string;
}

interface ArmsResponse {
  arms: ArmCard[];
}

interface DispatchResult {
  ok: boolean;
  task_id?: string;
  arm?: string;
  title?: string;
  error?: string;
}

interface ArmBoardTask {
  id: string;
  title: string;
  status: string;
}

interface ArmBoardResponse {
  ok: boolean;
  arm: string;
  tasks: ArmBoardTask[];
}

export default function WorkspaceChatClient() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [input, setInput] = useState("");
  const [armPick, setArmPick] = useState<Arm | "">("");
  const [armCards, setArmCards] = useState<ArmCard[]>([]);
  const [boardFocus, setBoardFocus] = useState<Arm | "">("");
  const [boardTasks, setBoardTasks] = useState<ArmBoardTask[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef(0);

  // Load arms snapshot
  useEffect(() => {
    fetch(`${API}/public/arms`, { cache: "no-store" })
      .then((r) => r.json())
      .then((j: ArmsResponse) => setArmCards(j.arms || []))
      .catch(() => setArmCards([]));
  }, []);

  // Poll feed every 3s
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
            return [...prev, ...fresh].slice(-200);
          });
          const maxTs = Math.max(...(j.items as FeedItem[]).map((x) => x.ts || 0));
          if (maxTs > sinceRef.current) sinceRef.current = maxTs;
        }
      } catch {
        // network blip · keep going
      }
    };
    tick();
    const id = setInterval(tick, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Poll focused arm-board every 5s
  useEffect(() => {
    if (!boardFocus) {
      setBoardTasks([]);
      return;
    }
    let cancelled = false;
    const tick = async () => {
      try {
        const r = await fetch(`${API}/public/arm-board/${boardFocus}`, { cache: "no-store" });
        const j = (await r.json()) as ArmBoardResponse;
        if (!cancelled && j.ok) setBoardTasks(j.tasks);
      } catch {
        /* keep going */
      }
    };
    tick();
    const id = setInterval(tick, 5000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [boardFocus]);

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [feed]);

  const fire = useCallback(async () => {
    if (busy || !input.trim()) return;
    setBusy(true);
    setError(null);
    try {
      if (armPick) {
        // Direct dispatch to arm
        const r = await fetch(`${API}/public/dispatch`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ arm: armPick, title: input.trim().slice(0, 200), body: input.trim(), source: "brother-direct" }),
        });
        const j = (await r.json()) as DispatchResult;
        if (!j.ok) throw new Error(j.error || "dispatch failed");
        setFeed((prev) => [
          ...prev,
          {
            id: `dispatch-${Date.now()}`,
            from: "brother",
            text: `→ ${armPick} · ${input.trim()}  →  task ${j.task_id}`,
            kind: "dispatch",
            arm: armPick,
            ts: Date.now(),
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        // Chat to Atlas (no arm yet · just log)
        const r = await fetch(`${API}/public/chat`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text: input.trim(), channel: "workspace" }),
        });
        const j = await r.json();
        if (!j.ok) throw new Error("chat failed");
      }
      setInput("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [input, armPick, busy]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="px-6 py-3 border-b border-zinc-900 flex items-baseline justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-emerald-400/60">workspace · chat</p>
          <h1 className="text-xl font-serif text-zinc-50">brother + Atlas + arms</h1>
        </div>
        <p className="text-[10px] text-zinc-600 font-mono">{armCards.length} arms · live</p>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT · arms rail */}
        <aside className="w-60 border-r border-zinc-900 p-3 overflow-y-auto bg-zinc-950">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">arms · click to see board</p>
          <ul className="space-y-1.5">
            {ARMS.map((a) => {
              const card = armCards.find((c) => c.name.toLowerCase() === a);
              const isActive = boardFocus === a;
              return (
                <li key={a}>
                  <button
                    type="button"
                    onClick={() => setBoardFocus(isActive ? "" : a)}
                    className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-xs transition ${
                      isActive ? "bg-emerald-900/30 text-emerald-100" : "text-zinc-400 hover:bg-zinc-900"
                    }`}
                  >
                    <span className="text-base">{ARM_META[a].emoji}</span>
                    <span className="font-medium">{a}</span>
                    <span className="ml-auto text-[10px] text-zinc-500 truncate">
                      {card?.status?.toLowerCase().includes("live") ? "●" : "○"}
                    </span>
                  </button>
                  {isActive && boardTasks.length > 0 && (
                    <ul className="ml-3 mt-1 mb-2 space-y-0.5">
                      {boardTasks.slice(0, 6).map((t) => (
                        <li key={t.id} className="text-[10px] font-mono text-zinc-500 truncate">
                          {t.status === "done" ? "✓" : t.status === "blocked" ? "⊘" : "•"} {t.title.slice(0, 30)}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* CENTER · chat-stream */}
        <section className="flex-1 flex flex-col">
          <div ref={feedRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {feed.length === 0 && (
              <p className="text-zinc-600 italic text-sm">stream empty · type below to dispatch a task or chat</p>
            )}
            {feed.map((m) => (
              <article
                key={m.id}
                className={`max-w-2xl ${
                  m.from === "brother" ? "ml-auto" : "mr-auto"
                }`}
              >
                <header className="flex items-baseline gap-2 text-[10px] uppercase tracking-widest mb-1">
                  <span
                    className={
                      m.from === "brother"
                        ? "text-emerald-400/70"
                        : m.kind === "dispatch"
                        ? "text-amber-400/70"
                        : "text-cyan-400/70"
                    }
                  >
                    {m.from === "brother" ? "brother" : m.from}
                    {m.arm && ` → ${m.arm}`}
                  </span>
                  <span className="text-zinc-700">{new Date(m.ts).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}</span>
                </header>
                <div
                  className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.from === "brother"
                      ? "bg-emerald-950/30 border border-emerald-900/40 text-emerald-50"
                      : m.kind === "dispatch"
                      ? "bg-amber-950/20 border border-amber-900/40 text-amber-100 font-mono text-xs"
                      : "bg-zinc-900/50 border border-zinc-800 text-zinc-200"
                  }`}
                >
                  {m.text}
                </div>
              </article>
            ))}
          </div>

          {/* Input bar */}
          <div className="border-t border-zinc-900 p-4 bg-zinc-950/80 backdrop-blur">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {ARMS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setArmPick(armPick === a ? "" : a)}
                  className={`px-2 py-0.5 rounded text-[11px] border transition ${
                    armPick === a
                      ? "bg-amber-900/40 border-amber-600/60 text-amber-100"
                      : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {ARM_META[a].emoji} {a}
                </button>
              ))}
              <span className="text-[10px] text-zinc-600 self-center ml-2 italic">
                {armPick ? `→ dispatch to ${armPick}` : "no arm picked = chat to Atlas (logs only · no arm fired)"}
              </span>
            </div>
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={armPick ? `task title for ${armPick}-arm · ⌘+Enter fires` : "type to Atlas · pick arm above to dispatch"}
                rows={2}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-700 resize-none"
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") fire();
                }}
                maxLength={2000}
              />
              <button
                type="button"
                onClick={fire}
                disabled={busy || !input.trim()}
                className="px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-emerald-50 text-sm font-medium disabled:bg-zinc-800 disabled:text-zinc-600 transition"
              >
                {busy ? "..." : armPick ? "Fire →" : "Send"}
              </button>
            </div>
            {error && <p className="text-[11px] text-rose-400 mt-2 font-mono">{error}</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
