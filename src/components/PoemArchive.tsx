"use client";

import { useState, useMemo, useEffect } from "react";

type Poem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  context: string;
  preview: string;
  url: string;
  byte_size: number;
};

export function PoemArchive({ poems }: { poems: Poem[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return poems;
    return poems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.context.toLowerCase().includes(q) ||
        p.preview.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q),
    );
  }, [poems, query]);

  useEffect(() => {
    if (!selectedSlug) return;
    const poem = poems.find((p) => p.slug === selectedSlug);
    if (!poem) return;
    setLoading(true);
    setContent("");
    fetch(poem.url)
      .then((r) => r.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent("could not load");
        setLoading(false);
      });
  }, [selectedSlug, poems]);

  function getPoemByYear(year: string) {
    return filtered.filter((p) => p.date.startsWith(year));
  }

  const years = Array.from(new Set(filtered.map((p) => p.date.slice(0, 4)).filter(Boolean))).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`search ${poems.length} poems · title · context · slug`}
          className="w-full rounded-sm border border-[var(--paper)]/15 bg-[var(--bg-deep)] px-4 py-2.5 font-serif text-sm text-[var(--paper)]/95 placeholder:text-[var(--paper)]/35 focus:border-[var(--pulse-warm)]/60 focus:outline-none transition-colors"
        />
        <p className="mt-2 font-mono text-[10px] tracking-wider text-[var(--paper)]/40">
          {filtered.length} {filtered.length === 1 ? "match" : "matches"} · click any to read
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {years.length === 0 && (
            <div className="space-y-2">
              {filtered.slice(0, 30).map((p) => (
                <PoemRow
                  key={p.slug}
                  poem={p}
                  active={p.slug === selectedSlug}
                  onClick={() => setSelectedSlug(p.slug)}
                />
              ))}
            </div>
          )}

          {years.map((year) => (
            <div key={year}>
              <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--pulse-warm)]/80 mb-3">
                {year}
              </h3>
              <ul className="space-y-2">
                {getPoemByYear(year).map((p) => (
                  <PoemRow
                    key={p.slug}
                    poem={p}
                    active={p.slug === selectedSlug}
                    onClick={() => setSelectedSlug(p.slug)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 p-5 md:sticky md:top-4 md:self-start md:max-h-[70vh] overflow-y-auto">
          {!selectedSlug && (
            <div className="text-center py-10">
              <p className="font-serif text-base italic text-[var(--paper)]/55 mb-2">
                select a poem
              </p>
              <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/40">
                content streams from Mac mini source
              </p>
            </div>
          )}
          {selectedSlug && loading && (
            <p className="font-serif italic text-[var(--paper)]/50">loading…</p>
          )}
          {selectedSlug && !loading && content && (
            <article className="font-serif text-[14px] leading-relaxed text-[var(--paper)]/90 whitespace-pre-wrap">
              {content}
            </article>
          )}
        </aside>
      </div>
    </div>
  );
}

function PoemRow({
  poem,
  active,
  onClick,
}: {
  poem: Poem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={`w-full text-left rounded-sm border px-4 py-3 transition-all ${
          active
            ? "border-[var(--pulse-warm)]/50 bg-[var(--pulse-warm)]/10"
            : "border-[var(--paper)]/12 bg-transparent hover:bg-[var(--paper)]/3 hover:border-[var(--paper)]/25"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h4 className="font-serif text-[15px] italic text-[var(--paper)]/95 truncate">
            {poem.title}
          </h4>
          {poem.time && (
            <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45 shrink-0">
              {poem.time}
            </span>
          )}
        </div>
        {poem.preview && (
          <p className="font-serif text-[12px] italic text-[var(--paper)]/55 line-clamp-1">
            {poem.preview}
          </p>
        )}
      </button>
    </li>
  );
}
