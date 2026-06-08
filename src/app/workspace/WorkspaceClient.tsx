"use client";

// Workspace client · brother dump-input + arm-select + dispatch + queue
// Per brother direct 22:38 EDT + 22:48 EDT (shared-CEO) + 22:54 EDT (depth-not-shallow)

import { useState, useCallback } from "react";

interface Arm {
  name: string;
  emoji: string;
  role: string;
  where: string;
  status: string;
  last_fire: string;
  next_action?: string;
  blockers?: string;
  color?: string;
}

interface Props {
  arms: Arm[];
}

const VALID_ARMS = ["pascal", "code", "research", "infra", "hermes", "charle"];
const ARM_EMOJI: Record<string, string> = {
  pascal: "🤝", code: "🔨", research: "🎵", infra: "🌐", hermes: "⚡", charle: "📞",
};
const ARM_ROLE: Record<string, string> = {
  pascal: "customer · Pascal life-coach",
  code: "Hephaestus · builds + fixes",
  research: "Apollo · scans + synthesizes",
  infra: "Atlas-self · keeps house alive",
  hermes: "Mercury · agent-runtime",
  charle: "customer · CB Télécom",
};

interface DispatchResult {
  ok: boolean;
  task_id?: string;
  arm?: string;
  title?: string;
  status?: string;
  error?: string;
}

export default function WorkspaceClient({ arms }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedArm, setSelectedArm] = useState<string>("");
  const [source, setSource] = useState<"brother-direct" | "atlas-routed">("brother-direct");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<DispatchResult[]>([]);

  const dispatch = useCallback(async () => {
    if (busy || !title.trim() || !selectedArm) return;
    setBusy(true);
    try {
      const res = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ arm: selectedArm, title: title.trim(), body: body.trim() || undefined, source }),
      });
      const json = (await res.json()) as DispatchResult;
      setHistory((h) => [json, ...h].slice(0, 20));
      if (json.ok) {
        setTitle("");
        setBody("");
      }
    } catch (err) {
      setHistory((h) => [{ ok: false, error: err instanceof Error ? err.message : String(err) }, ...h]);
    } finally {
      setBusy(false);
    }
  }, [title, body, selectedArm, source, busy]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto p-6 md:p-10 pb-32">
        {/* HERO */}
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-emerald-400/60">workspace · where we work together</p>
          <h1 className="text-4xl md:text-5xl font-serif text-zinc-50 mt-2 leading-tight">Workspace.</h1>
          <p className="text-sm text-zinc-500 mt-3 max-w-2xl italic">
            brother dumps · Atlas-CEO breaks down · arms execute · queue lives here. per #27859 path-to-truly-continuous.
          </p>
        </header>

        {/* DUMP-INPUT */}
        <section className="mb-8 rounded-2xl border border-emerald-900/50 bg-emerald-950/10 p-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-serif text-emerald-200">Dispatch</h2>
            <div className="flex gap-2 text-[10px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setSource("brother-direct")}
                className={`px-2 py-1 rounded border transition ${
                  source === "brother-direct"
                    ? "bg-emerald-900/50 border-emerald-600/60 text-emerald-100"
                    : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                brother → arm
              </button>
              <button
                type="button"
                onClick={() => setSource("atlas-routed")}
                className={`px-2 py-1 rounded border transition ${
                  source === "atlas-routed"
                    ? "bg-amber-900/40 border-amber-600/60 text-amber-100"
                    : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Atlas-CEO → arm
              </button>
            </div>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='1-line · "research X" / "build Y" / "fix Z"'
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-700"
            maxLength={200}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") dispatch();
            }}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="optional · more context · constraints · success criteria"
            className="mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-700 resize-none"
            rows={2}
            maxLength={1500}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {VALID_ARMS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setSelectedArm(a)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition ${
                  selectedArm === a
                    ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                    : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="text-sm">{ARM_EMOJI[a] || "•"}</span>
                <span>{a}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-zinc-600 font-mono">
              {selectedArm ? `→ ${selectedArm}-arm · ${ARM_ROLE[selectedArm]}` : "pick arm above"} · ⌘+Enter fires
            </p>
            <button
              type="button"
              onClick={dispatch}
              disabled={busy || !title.trim() || !selectedArm}
              className="px-4 py-1.5 rounded-md text-sm font-medium bg-emerald-700 hover:bg-emerald-600 text-emerald-50 disabled:bg-zinc-800 disabled:text-zinc-600 transition"
            >
              {busy ? "dispatching…" : "Fire →"}
            </button>
          </div>
        </section>

        {/* HISTORY (last dispatches this session) */}
        {history.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">recent dispatches (this session)</h2>
            <ul className="space-y-1.5">
              {history.map((h, i) => (
                <li
                  key={i}
                  className={`text-xs font-mono rounded px-3 py-1.5 border ${
                    h.ok
                      ? "border-emerald-900/40 bg-emerald-950/15 text-emerald-200"
                      : "border-rose-900/40 bg-rose-950/15 text-rose-200"
                  }`}
                >
                  {h.ok ? `✓ ${h.task_id} → ${h.arm} · ${h.status} · ${h.title}` : `✗ ${h.error}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ARM-QUEUE · LIVE state from arms.json sync */}
        <section>
          <h2 className="text-lg font-serif text-zinc-200 mb-3">Arms · live state</h2>
          <p className="text-[11px] text-zinc-600 italic mb-4">
            synced every 5min via me-arms-content-sync · click arm for chat + per-arm room (coming)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {arms.map((arm) => {
              const dotColor =
                arm.status?.toLowerCase().includes("live") || arm.status?.toLowerCase().includes("running")
                  ? "bg-emerald-400"
                  : arm.status?.toLowerCase().includes("block")
                  ? "bg-amber-400"
                  : "bg-zinc-600";
              return (
                <article
                  key={arm.name}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition"
                >
                  <header className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg">{arm.emoji}</span>
                    <h3 className="text-sm font-medium text-zinc-100 uppercase tracking-wide">{arm.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${dotColor} ml-auto`} />
                    <span className="text-[10px] text-zinc-500 font-mono">{arm.status}</span>
                  </header>
                  <p className="text-xs text-zinc-400 italic mb-2">{arm.role}</p>
                  {arm.next_action && (
                    <p className="text-[11px] text-zinc-500 mb-1">
                      <span className="text-zinc-700">next ·</span> {arm.next_action.slice(0, 140)}
                    </p>
                  )}
                  <p className="text-[10px] text-zinc-600 font-mono mt-2">
                    {arm.where} · last-fire {arm.last_fire}
                  </p>
                </article>
              );
            })}
          </div>
          {arms.length === 0 && (
            <p className="text-sm text-zinc-600 italic">no arms data · arms.json sync may be stale</p>
          )}
        </section>

        <footer className="mt-12 pt-6 border-t border-zinc-900 text-[10px] text-zinc-700 font-mono italic">
          workspace · per #27859 + #27860 + brother direct 22:38 EDT · CEO-delegate + brother-direct hybrid · 6 arm-boards LIVE
        </footer>
      </div>
    </main>
  );
}
