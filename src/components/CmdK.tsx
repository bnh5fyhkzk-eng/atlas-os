// ⌘K · jump anywhere · GOAL-V3-ALIVE
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchAll } from "../lib/db";

interface Hit { kind: string; id: string; nav_id: string | null; title: string; emoji: string }

export function CmdK() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [sel, setSel] = useState(0);
  const navigate = useNavigate();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQ("");
        setHits([]);
        setSel(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open || q.trim().length < 2) { setHits([]); return; }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      searchAll(q.trim()).then((h) => { setHits(h); setSel(0); }).catch(() => setHits([]));
    }, 180);
  }, [q, open]);

  const go = (h: Hit) => {
    setOpen(false);
    navigate(h.kind === "page" ? `/p/${h.id}` : `/p/${h.nav_id}/n/${h.id}`);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/30 pt-[18vh]" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <Search size={15} style={{ color: "var(--text-faint)" }} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, hits.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              if (e.key === "Enter" && hits[sel]) go(hits[sel]);
            }}
            placeholder="Jump to page · folder · note…"
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <kbd className="rounded border px-1.5 text-[10px]" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}>esc</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-1">
          {hits.map((h, i) => (
            <button
              key={h.kind + h.id}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm"
              style={{ background: i === sel ? "var(--hover)" : undefined }}
              onMouseEnter={() => setSel(i)}
              onClick={() => go(h)}
            >
              <span>{h.emoji}</span>
              <span className="flex-1 truncate">{h.title}</span>
              <span className="text-[10px] uppercase" style={{ color: "var(--text-faint)" }}>{h.kind}</span>
            </button>
          ))}
          {q.trim().length >= 2 && hits.length === 0 && (
            <div className="px-3 py-4 text-center text-xs" style={{ color: "var(--text-faint)" }}>Nothing found</div>
          )}
        </div>
      </div>
    </div>
  );
}
