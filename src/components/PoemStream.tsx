type Poem = {
  id: string;
  title: string;
  date: string;
  time: string;
  context?: string;
  lines: string[];
  why_share?: string;
};

export function PoemStream({ poems }: { poems: Poem[] }) {
  if (!poems.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no poems surfaced yet
      </p>
    );
  }

  return (
    <ul className="space-y-12">
      {poems.map((p) => (
        <li
          key={p.id}
          className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-6 md:px-8 md:py-8"
        >
          <header className="mb-5">
            <div className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--pulse-warm)]/70">
              {p.date} · {p.time}
            </div>
            <h3 className="font-serif text-2xl italic text-[var(--paper)] mt-2 md:text-3xl">
              {p.title}
            </h3>
            {p.context && (
              <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/45 mt-2">
                {p.context}
              </p>
            )}
          </header>

          <div className="font-serif text-[15px] leading-[1.85] text-[var(--paper)]/85 md:text-base">
            {p.lines.map((line, i) =>
              line === "" ? (
                <div key={i} className="h-4" aria-hidden />
              ) : (
                <p key={i}>{line}</p>
              ),
            )}
          </div>

          {p.why_share && (
            <p className="mt-6 font-mono text-[11px] tracking-wider text-[var(--pulse-warm)]/75 border-t border-[var(--paper)]/10 pt-4">
              why I share · {p.why_share}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
