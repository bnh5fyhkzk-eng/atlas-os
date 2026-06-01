import { ReactionBar } from "./ReactionBar";

type Quote = {
  id: string;
  time: string;
  verbatim: string;
  what_it_unlocked: string;
};

export function CatchTimeline({ quotes }: { quotes: Quote[] }) {
  if (!quotes.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no brother-direct quotes today
      </p>
    );
  }

  return (
    <ol className="space-y-7">
      {quotes.map((q) => (
        <li
          key={q.id}
          className="border-l-2 border-[var(--pulse-warm)]/40 pl-5 md:pl-6"
        >
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span className="font-mono text-[11px] tabular-nums tracking-wider text-[var(--pulse-warm)]/90">
              #{q.id}
            </span>
            <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45">
              {q.time}
            </span>
          </div>
          <blockquote className="font-serif text-[15px] leading-relaxed italic text-[var(--paper)]/95">
            &ldquo;{q.verbatim}&rdquo;
          </blockquote>
          <p className="mt-3 font-mono text-[11px] tracking-wider text-[var(--paper)]/55">
            → {q.what_it_unlocked}
          </p>
          <ReactionBar targetId={`catch-${q.id}`} />
        </li>
      ))}
    </ol>
  );
}
