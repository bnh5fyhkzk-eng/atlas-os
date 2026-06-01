type FiveYear = {
  shape: string;
  milestones: Array<{ date: string; label: string }>;
};

export function FiveYearArc({ fiveYear }: { fiveYear: FiveYear }) {
  return (
    <div>
      <blockquote className="font-serif text-base italic leading-relaxed text-[var(--paper)]/85 border-l-2 border-[var(--pulse-warm)]/40 pl-5 mb-10 md:text-lg">
        &ldquo;{fiveYear.shape}&rdquo;
      </blockquote>

      <ol className="relative space-y-6 border-l border-[var(--paper)]/15 pl-6 md:pl-8">
        {fiveYear.milestones.map((m, i) => (
          <li key={i} className="relative">
            <span
              className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[var(--pulse-warm)]/80 ring-4 ring-[var(--bg-deep)] md:-left-[37px]"
              aria-hidden
            />
            <div className="font-mono text-xs tabular-nums tracking-wider text-[var(--pulse-warm)]/90 mb-1">
              {m.date}
            </div>
            <p className="font-serif text-base text-[var(--paper)]/90 italic">
              {m.label}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
