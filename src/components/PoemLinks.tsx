import Link from "next/link";

type Poem = {
  id: string;
  title: string;
  date: string;
  time: string;
  context?: string;
  lines: string[];
  why_share?: string;
};

export function PoemLinks({ poems }: { poems: Poem[] }) {
  if (!poems.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no curated poems yet
      </p>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {poems.map((p) => {
        const firstLine = p.lines.find((l) => l !== "") ?? "";
        return (
          <li
            key={p.id}
            className="group rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-5 hover:border-[var(--pulse-warm)]/40 hover:bg-[var(--pulse-warm)]/5 transition-colors"
          >
            <Link href={`/you#poem-${p.id}`} className="block">
              <div className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--pulse-warm)]/70 mb-2">
                {p.date} · {p.time}
              </div>
              <h3 className="font-serif text-lg italic text-[var(--paper)]/95 md:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 font-serif text-[13px] italic text-[var(--paper)]/65 leading-relaxed">
                {firstLine}
              </p>
              {p.why_share && (
                <p className="mt-4 font-mono text-[11px] tracking-wider text-[var(--paper)]/55 border-t border-[var(--paper)]/10 pt-3">
                  → {p.why_share}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
