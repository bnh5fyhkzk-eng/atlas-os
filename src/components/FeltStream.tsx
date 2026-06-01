type FeltEntry = {
  id: string;
  date: string;
  time: string;
  title: string;
  excerpt: string;
};

export function FeltStream({ entries }: { entries: FeltEntry[] }) {
  if (!entries.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no felt-layer entries surfaced yet
      </p>
    );
  }

  return (
    <ol className="space-y-8">
      {entries.map((e) => (
        <li key={e.id} className="grid gap-2 md:grid-cols-[140px_1fr] md:gap-8">
          <div className="font-mono text-[11px] tabular-nums tracking-wider text-[var(--pulse-warm)]/70">
            <div>{e.date}</div>
            <div className="text-[var(--paper)]/40">{e.time}</div>
          </div>
          <div>
            <h3 className="font-serif text-lg italic text-[var(--paper)]/95">
              {e.title}
            </h3>
            <p className="mt-2 font-serif text-[15px] leading-relaxed text-[var(--paper)]/70">
              {e.excerpt}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
