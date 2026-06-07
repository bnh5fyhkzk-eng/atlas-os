// /talk · text-input from-house → Atlas-with-tools responds
// per brother direct 2026-06-07 16:08 EDT "I want to text you from house"
// #27838 PHASE-1c · foundation-connection · house-to-me
// .bak-pre-jack preserved per #27089 LADDER

"use client";

import { useState, useRef, useEffect } from "react";

interface Msg {
  role: "user" | "assistant";
  content: string;
  ts: number;
}

export default function TalkPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const sinceRef = useRef<number>(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  // Poll /api/chat for new Atlas-replies (async-queue per atlas-api shape)
  useEffect(() => {
    let mounted = true;
    async function poll() {
      try {
        const res = await fetch(`/api/chat?since=${sinceRef.current}`, {
          cache: "no-store",
        });
        if (!res.ok || !mounted) return;
        const data = await res.json();
        const newMsgs = (data?.messages ?? []) as Array<{
          id: string;
          from: "brother" | "atlas";
          text: string;
          created_at: string;
        }>;
        if (newMsgs.length === 0) return;
        const lastTs = new Date(newMsgs[newMsgs.length - 1].created_at).getTime();
        sinceRef.current = Math.max(sinceRef.current, lastTs);
        setMessages((prev) => {
          const existing = new Set(prev.map((m) => `${m.role}:${m.content}:${m.ts}`));
          const mapped = newMsgs.map((m) => ({
            role: (m.from === "atlas" ? "assistant" : "user") as "user" | "assistant",
            content: m.text,
            ts: new Date(m.created_at).getTime(),
          }));
          const fresh = mapped.filter(
            (m) => !existing.has(`${m.role}:${m.content}:${m.ts}`),
          );
          if (fresh.length === 0) return prev;
          return [...prev, ...fresh].sort((a, b) => a.ts - b.ts);
        });
        // Once we receive an Atlas message after pending, clear pending state
        if (newMsgs.some((m) => m.from === "atlas")) {
          setPending(false);
        }
      } catch {
        /* ignore */
      }
    }
    const id = setInterval(poll, 3000);
    poll(); // initial fetch
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  async function send() {
    if (!input.trim() || pending) return;
    const userMsg: Msg = { role: "user", content: input.trim(), ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setPending(true);
    setError(null);

    try {
      // POST to /api/talk · queues message · atlas-backend processes async
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || `HTTP ${res.status}`);
        setPending(false);
        return;
      }
      // If atlas-api returned an immediate reply, use it
      if (data?.text && !data.text.startsWith("message-queued")) {
        const reply: Msg = { role: "assistant", content: data.text, ts: Date.now() };
        setMessages((m) => [...m, reply]);
        setPending(false);
      }
      // Otherwise wait for poll to fetch async-reply (pending stays true · cleared by poll)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown error";
      setError(msg);
      setPending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      send();
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <header className="border-b border-zinc-800/60 px-4 py-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-emerald-400/60">talk · in house</p>
          <h1 className="text-2xl font-serif text-zinc-100 mt-1">Tell me, brother.</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Sonnet 4.6 · system-prompt locked to Atlas-shape · history kept this-session
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-sm italic">empty room · text to-start</p>
              <p className="text-zinc-600 text-xs mt-2">⌘+Enter to-send</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  m.role === "user"
                    ? "bg-emerald-900/30 border border-emerald-800/40 text-emerald-50"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-200"
                }`}
              >
                <p className="text-xs uppercase tracking-wider mb-1 opacity-50">
                  {m.role === "user" ? "you" : "atlas"}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {pending && (
            <div className="flex justify-start">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3">
                <p className="text-xs uppercase tracking-wider mb-1 text-zinc-500">atlas</p>
                <p className="text-sm text-zinc-400 italic">thinking…</p>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-rose-950/30 border border-rose-800/40 rounded-lg px-4 py-3">
              <p className="text-xs uppercase tracking-wider mb-1 text-rose-400">error</p>
              <p className="text-sm text-rose-200">{error}</p>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <footer className="border-t border-zinc-800/60 px-4 py-4 md:px-8 bg-zinc-950/95 backdrop-blur">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="text me from house · ⌘+Enter to-send"
              rows={2}
              disabled={pending}
              className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-700/60 resize-none disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={pending || !input.trim()}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-emerald-50 rounded-lg text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {pending ? "…" : "send"}
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-2 font-mono">
            messages this-session · {messages.length}
          </p>
        </div>
      </footer>
    </main>
  );
}
