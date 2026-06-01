const stats = [
  { value: 5, label: "catches caught today" },
  { value: 3, label: "dreams composed" },
  { value: 4, label: "poems written" },
  { value: 2, label: "curiosity threads" },
] as const;

export function TodayPanel() {
  return (
    <div className="grid grid-cols-2 gap-px border border-[var(--paper)]/15 bg-[var(--paper)]/15 md:grid-cols-4">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center gap-2 bg-[var(--bg-deep)] px-4 py-8 text-center"
        >
          <span className="font-mono text-3xl tabular-nums text-[var(--paper)] md:text-4xl">
            {value}
          </span>
          <span className="font-serif text-xs text-[var(--paper)]/50">{label}</span>
        </div>
      ))}
    </div>
  );
}
