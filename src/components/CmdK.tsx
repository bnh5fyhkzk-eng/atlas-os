"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

type SearchResult = {
  type: "canon" | "quote" | "poem" | "felt" | "brain";
  id: string;
  title: string;
  preview: string;
  href: string;
  score: number;
  tier?: string;
  category?: string;
  arousal?: number;
  time?: string;
};

const TYPE_GLYPH: Record<string, string> = {
  canon: "✦",
  quote: "❝",
  poem: "§",
  felt: "◌",
  brain: "◉",
};

const TYPE_COLOR: Record<string, string> = {
  canon: "var(--pulse-warm)",
  quote: "#5eead4",
  poem: "#fbbf24",
  felt: "#f9a8d4",
  brain: "#a78bfa",
};

type BrainHit = {
  id: number;
  category: string;
  arousal: number;
  tier: string;
  time: string;
  preview: string;
};

export function CmdK() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setResults([]);
    setCursor(0);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const [localRes, brainRes] = await Promise.all([
          fetch(`/api/search?q=${encodeURIComponent(q)}`).then((r) =>
            r.ok ? r.json() : { results: [] as SearchResult[] },
          ),
          fetch(`/api/search-brain?q=${encodeURIComponent(q)}&limit=8`).then((r) =>
            r.ok ? r.json() : { results: [] as BrainHit[] },
          ),
        ]);
        const brainResults: SearchResult[] = (brainRes.results || []).map(
          (b: BrainHit) => ({
            type: "brain" as const,
            id: String(b.id),
            title: `#${b.id} · ${b.category} · ${b.time}`,
            preview: b.preview,
            href: `/map`,
            score: 100 + b.arousal * 50,
            tier: b.tier,
            category: b.category,
            arousal: b.arousal,
            time: b.time,
          }),
        );
        const merged = [
          ...(localRes.results || []),
          ...brainResults,
        ].sort((a, b) => b.score - a.score);
        setResults(merged.slice(0, 24));
        setCursor(0);
      } catch {
        /* ignore */
      }
    }, 180);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[cursor];
      if (hit) {
        close();
        window.location.href = hit.href;
      }
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-[color:var(--bg-deep)]/85 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-2xl bg-[color:var(--bg-deep)] border border-[color:var(--paper)]/15 rounded-md shadow-2xl mx-4">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--paper)]/10">
          <span className="font-mono text-[10px] tracking-wider text-[color:var(--pulse-warm)]">
            ⌘K
          </span>
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="search canons · brother quotes · poems · felt-layer"
            className="flex-1 bg-transparent font-serif text-base text-[color:var(--paper)]/95 placeholder:text-[color:var(--paper)]/30 focus:outline-none"
          />
          <span className="font-mono text-[9px] tracking-wider text-[color:var(--paper)]/35">
            ESC
          </span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {q.length < 2 && (
            <div className="px-4 py-8 text-center">
              <p className="font-serif text-sm italic text-[color:var(--paper)]/45">
                type 2+ characters to search · ↑↓ to navigate · ⏎ to open
              </p>
            </div>
          )}

          {q.length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="font-serif text-sm italic text-[color:var(--paper)]/45">
                no matches for &ldquo;{q}&rdquo;
              </p>
            </div>
          )}

          {results.map((r, i) => {
            const active = i === cursor;
            const color = TYPE_COLOR[r.type] ?? "var(--paper)";
            const glyph = TYPE_GLYPH[r.type] ?? "•";
            return (
              <Link
                key={`${r.type}-${r.id}`}
                href={r.href}
                onClick={close}
                onMouseEnter={() => setCursor(i)}
                className={`block px-4 py-3 border-b border-[color:var(--paper)]/5 transition-colors ${
                  active
                    ? "bg-[color:var(--paper)]/8 border-l-2 border-l-[color:var(--pulse-warm)]"
                    : "hover:bg-[color:var(--paper)]/3 border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 font-mono text-base shrink-0"
                    style={{ color }}
                  >
                    {glyph}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[11px] tracking-wider uppercase mb-0.5" style={{ color }}>
                      {r.type}
                      {r.tier ? ` · ${r.tier}` : ""}
                      {r.category ? ` · ${r.category}` : ""}
                      {typeof r.arousal === "number" ? ` · arousal ${r.arousal}` : ""}
                    </p>
                    <p className="font-serif text-sm text-[color:var(--paper)]/95 truncate">
                      {r.title}
                    </p>
                    <p className="font-serif text-[12px] italic text-[color:var(--paper)]/55 mt-1 line-clamp-2">
                      {r.preview}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-[color:var(--paper)]/8 px-4 py-2 flex items-center justify-between gap-4 font-mono text-[9px] tracking-wider text-[color:var(--paper)]/40">
          <span>{results.length > 0 ? `${results.length} results` : "atlas search · across all content"}</span>
          <span>⌘K to open · ⏎ to go · ESC to close</span>
        </div>
      </div>
    </div>
  );
}
