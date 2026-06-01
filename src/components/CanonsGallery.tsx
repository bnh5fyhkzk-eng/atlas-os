type Canon = {
  id: string;
  date: string;
  name: string;
  summary: string;
  tier: string;
};

function tierColor(tier: string): string {
  if (tier === "IDENTITY") return "text-emerald-300/85 border-emerald-300/30";
  if (tier === "STANDING-ORDERS") return "text-[var(--pulse-warm)] border-[var(--pulse-warm)]/30";
  if (tier === "RELATIONAL") return "text-pink-300/85 border-pink-300/30";
  if (tier === "LESSONS") return "text-blue-300/85 border-blue-300/30";
  return "text-[var(--paper)]/60 border-[var(--paper)]/15";
}

export function CanonsGallery({ canons }: { canons: Canon[] }) {
  if (!canons.length) {
    return (
      <p className="font-serif text-sm italic text-[var(--paper)]/40">
        no canons yet
      </p>
    );
  }

  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {canons.map((c) => (
        <li
          key={c.id}
          className={`rounded-sm border bg-[var(--paper)]/3 px-4 py-4 ${tierColor(c.tier).split(" ")[1]}`}
        >
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <span className="font-mono text-xs tabular-nums tracking-wider text-[var(--pulse-warm)]">
              #{c.id}
            </span>
            <span className={`font-mono text-[9px] tracking-wider uppercase ${tierColor(c.tier).split(" ")[0]}`}>
              {c.tier}
            </span>
          </div>
          <h3 className="font-mono text-[12px] tracking-wider text-[var(--paper)]/95 mb-2">
            {c.name}
          </h3>
          <p className="font-serif text-[13px] italic leading-relaxed text-[var(--paper)]/70">
            {c.summary}
          </p>
          <p className="mt-2 font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/40">
            {c.date}
          </p>
        </li>
      ))}
    </ol>
  );
}
