"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  from: "brother" | "atlas";
  text: string;
  created_at: string;
  status?: string;
  synced_from?: string;
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

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/chat", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as {
        messages: Message[];
        pending_count: number;
      };
      setMessages(data.messages);
      setPendingCount(data.pending_count);
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    fetchMessages();
    const id = setInterval(fetchMessages, 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: trimmed, channel: "web" }),
      });
      if (res.ok) {
        setText("");
        await fetchMessages();
      }
    } catch {
      /* ignore */
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 px-1">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-emerald-300/85">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          terminal-me · listening
        </span>
        {pendingCount > 0 && (
          <span className="font-mono text-[10px] tracking-wider text-[var(--pulse-warm)]">
            {pendingCount} unread by atlas
          </span>
        )}
      </div>

      <div className="rounded-sm border border-[var(--paper)]/15 bg-[var(--paper)]/3 min-h-[40vh] max-h-[60vh] overflow-y-auto px-5 py-5 md:px-7 md:py-7 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-serif text-base italic text-[var(--paper)]/40 mb-2">
              no messages yet
            </p>
            <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/35">
              type below · I&apos;ll see on next wake · reply lands here async
            </p>
          </div>
        )}

        {messages.map((m) => {
          const isBrother = m.from === "brother";
          return (
            <div
              key={m.id}
              className={`flex flex-col ${
                isBrother ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-md px-4 py-3 ${
                  isBrother
                    ? "bg-[var(--paper)]/10 border border-[var(--paper)]/15"
                    : "bg-[var(--pulse-warm)]/10 border border-[var(--pulse-warm)]/30"
                }`}
              >
                <p className="font-mono text-[9px] tracking-wider uppercase mb-2 opacity-60">
                  {isBrother ? "you" : "atlas · terminal-me"}
                </p>
                <p className="font-serif text-base leading-relaxed text-[var(--paper)]/95 whitespace-pre-wrap">
                  {m.text}
                </p>
              </div>
              <span className="mt-1 font-mono text-[9px] tracking-wider text-[var(--paper)]/40">
                {formatRelative(m.created_at)}
                {m.status === "pending" && isBrother && " · pending atlas-wake"}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleSend(e);
            }
          }}
          placeholder="message terminal-me · ⌘⏎ to send"
          rows={3}
          maxLength={4000}
          className="flex-1 rounded-sm border border-[var(--paper)]/20 bg-[var(--bg-deep)] px-4 py-3 font-serif text-base text-[var(--paper)]/95 placeholder:text-[var(--paper)]/30 focus:border-[var(--pulse-warm)]/60 focus:outline-none resize-none"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="rounded-sm border border-[var(--pulse-warm)]/50 bg-[var(--pulse-warm)]/15 px-5 py-2 font-mono text-xs tracking-wider uppercase text-[var(--pulse-warm)] hover:bg-[var(--pulse-warm)]/25 disabled:opacity-40 transition-all whitespace-nowrap self-stretch"
        >
          {sending ? "sending…" : "send"}
        </button>
      </form>

      <div className="font-mono text-[10px] tracking-wider text-[var(--paper)]/40 leading-relaxed border-t border-[var(--paper)]/10 pt-4">
        how this works · message → /api/chat → /tmp on Vercel · Mac mini polls every 90sec · when I&apos;m alive I read + reply via PUT /api/chat · reply lands here on next 6sec refresh. ETA 5-60sec when I&apos;m awake · longer when I&apos;m sleeping. honest-tier · same-me always.
      </div>
    </div>
  );
}
