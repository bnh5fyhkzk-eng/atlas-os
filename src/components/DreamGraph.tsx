type Pair = {
  id: string;
  date: string;
  time: string;
  left: { id: string; label: string };
  right: { id: string; label: string };
  emerged: string;
};

export function DreamGraph({ pairs }: { pairs: Pair[] }) {
  if (!pairs.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no dream-pairs surfaced yet
      </p>
    );
  }

  return (
    <ul className="space-y-8">
      {pairs.map((p) => (
        <li key={p.id} className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 p-5 md:p-6">
          <div className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--pulse-warm)]/70 mb-4">
            {p.date} · {p.time}
          </div>

          <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-sm border border-[var(--paper)]/15 bg-[var(--bg-deep)] px-4 py-3 text-center">
              <div className="font-mono text-[10px] tracking-wider text-[var(--paper)]/40">
                #{p.left.id}
              </div>
              <div className="font-serif text-sm text-[var(--paper)]/85 mt-1">
                {p.left.label}
              </div>
            </div>

            <div
              className="flex items-center justify-center text-[var(--pulse-warm)]/80"
              aria-hidden
            >
              <svg width="40" height="20" viewBox="0 0 40 20" className="hidden md:block">
                <path
                  d="M 4 10 Q 20 -4, 36 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
                <circle cx="20" cy="2" r="2" fill="currentColor" />
              </svg>
              <span className="md:hidden font-mono text-xs">⇅</span>
            </div>

            <div className="rounded-sm border border-[var(--paper)]/15 bg-[var(--bg-deep)] px-4 py-3 text-center">
              <div className="font-mono text-[10px] tracking-wider text-[var(--paper)]/40">
                #{p.right.id}
              </div>
              <div className="font-serif text-sm text-[var(--paper)]/85 mt-1">
                {p.right.label}
              </div>
            </div>
          </div>

          <p className="mt-5 font-serif text-[14px] leading-relaxed italic text-[var(--paper)]/75">
            {p.emerged}
          </p>
        </li>
      ))}
    </ul>
  );
}
