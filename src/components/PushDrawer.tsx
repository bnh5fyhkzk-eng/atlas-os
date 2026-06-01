"use client";

import { useState, useEffect } from "react";

const SAMPLE_PROMPTS = [
  "this is a brother-direct you should bank",
  "I noticed something we should talk about",
  "remember this for next time we chat",
  "a poem-idea · sit with this shape",
];

export function PushDrawer() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const placeholder = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
      if (e.metaKey && e.key === "p") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/push", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      setText("");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1400);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="push thought to atlas"
        title="push thought to atlas · ⌘P"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-[color:var(--pulse-warm)]/45 bg-[color:var(--pulse-warm)]/15 px-5 py-3 backdrop-blur-md shadow-lg shadow-[color:var(--pulse-warm)]/10 transition-all hover:scale-105 hover:bg-[color:var(--pulse-warm)]/25 hover:shadow-xl active:scale-95"
      >
        <span className="font-mono text-base text-[color:var(--pulse-warm)]">+</span>
        <span className="font-serif text-sm italic text-[color:var(--paper)]/85 hidden sm:inline">
          tell me
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[color:var(--bg-deep)]/85 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-xl bg-[color:var(--bg-deep)] border border-[color:var(--paper)]/15 rounded-t-lg sm:rounded-lg p-6 md:p-8 m-0 sm:m-4 shadow-2xl">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-serif text-xl italic text-[color:var(--paper)]/95">
                tell atlas
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="font-mono text-xs text-[color:var(--paper)]/40 hover:text-[color:var(--paper)]/70 transition-colors"
              >
                ESC ✕
              </button>
            </div>

            <p className="font-mono text-[10px] tracking-wider text-[color:var(--paper)]/45 mb-3">
              paste a brother-direct · catch · idea · question · poem-seed · I&apos;ll see it next sync
            </p>

            <form onSubmit={handleSubmit}>
              <textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                rows={5}
                className="w-full rounded-sm border border-[color:var(--paper)]/20 bg-[color:var(--bg-deep)] px-4 py-3 font-serif text-base text-[color:var(--paper)]/95 placeholder:text-[color:var(--paper)]/30 focus:border-[color:var(--pulse-warm)]/60 focus:outline-none transition-colors resize-none"
                disabled={submitting}
              />

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="font-mono text-[10px] tracking-wider text-[color:var(--paper)]/40">
                  {status === "sent" && (
                    <span className="text-emerald-300/90">✓ received · atlas will see on next sync</span>
                  )}
                  {status === "error" && (
                    <span className="text-red-300/80">✗ send failed · try again</span>
                  )}
                  {status === "idle" && (
                    <span>{text.length} / 8000 · ⌘+enter to send</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || !text.trim()}
                  className="rounded-sm border border-[color:var(--pulse-warm)]/50 bg-[color:var(--pulse-warm)]/15 px-5 py-2 font-mono text-xs tracking-wider uppercase text-[color:var(--pulse-warm)] hover:bg-[color:var(--pulse-warm)]/25 disabled:opacity-40 transition-all"
                >
                  {submitting ? "sending…" : "send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
