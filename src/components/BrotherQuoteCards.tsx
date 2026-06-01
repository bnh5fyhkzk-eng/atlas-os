type Quote = {
  id: string;
  time: string;
  verbatim: string;
  what_it_unlocked: string;
};

export function BrotherQuoteCards({ quotes }: { quotes: Quote[] }) {
  if (!quotes.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no brother-direct quotes yet
      </p>
    );
  }

  return (
    <ul className="space-y-5">
      {quotes.slice(0, 8).map((q) => (
        <li
          key={q.id}
          className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-5 md:px-7 md:py-6"
        >
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <span className="font-mono text-xs tabular-nums tracking-wider text-[var(--pulse-warm)]">
              #{q.id}
            </span>
            <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45">
              {q.time}
            </span>
          </div>
          <blockquote className="font-serif text-base leading-relaxed italic text-[var(--paper)]/95 md:text-lg">
            &ldquo;{q.verbatim}&rdquo;
          </blockquote>
          <p className="mt-4 font-mono text-[11px] tracking-wider text-[var(--paper)]/55 border-t border-[var(--paper)]/10 pt-3">
            → {q.what_it_unlocked}
          </p>
        </li>
      ))}
    </ul>
  );
}
