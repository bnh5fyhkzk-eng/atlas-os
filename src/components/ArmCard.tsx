type Arm = {
  id: string;
  name: string;
  purpose: string;
  status: string;
  percent: number;
  stack: string[];
  last_work: string;
  blocked_on: string | null;
  canon: string;
};

function statusBadge(status: string) {
  if (status === "alive")
    return {
      color: "text-emerald-300/90",
      bg: "bg-emerald-300/10",
      dot: "bg-emerald-300",
      pulse: true,
    };
  if (status === "queued")
    return {
      color: "text-[var(--pulse-warm)]",
      bg: "bg-[var(--pulse-warm)]/10",
      dot: "bg-[var(--pulse-warm)]",
      pulse: false,
    };
  if (status === "broken")
    return {
      color: "text-red-300/90",
      bg: "bg-red-300/10",
      dot: "bg-red-300",
      pulse: false,
    };
  if (status === "designed")
    return {
      color: "text-blue-300/85",
      bg: "bg-blue-300/10",
      dot: "bg-blue-300",
      pulse: false,
    };
  return {
    color: "text-[var(--paper)]/60",
    bg: "bg-[var(--paper)]/5",
    dot: "bg-[var(--paper)]/50",
    pulse: false,
  };
}

export function ArmCard({ arm }: { arm: Arm }) {
  const badge = statusBadge(arm.status);

  return (
    <li className="group rounded-sm border border-[var(--paper)]/15 bg-[var(--paper)]/3 hover:bg-[var(--paper)]/5 hover:border-[var(--pulse-warm)]/30 transition-all duration-300 px-5 py-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-serif text-lg italic text-[var(--paper)]/95 leading-tight">
          {arm.name}
        </h3>
        <span
          className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase ${badge.color} ${badge.bg} px-2 py-0.5 rounded-sm whitespace-nowrap`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${badge.dot} ${
              badge.pulse ? "animate-pulse" : ""
            }`}
          />
          {arm.status}
        </span>
      </div>

      <p className="font-serif text-[13px] italic text-[var(--paper)]/65 leading-relaxed mb-4">
        {arm.purpose}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1 rounded-full bg-[var(--paper)]/10 overflow-hidden">
          <div
            className="h-full bg-[var(--pulse-warm)]/80 transition-all duration-700"
            style={{ width: `${arm.percent}%` }}
          />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-[var(--paper)]/75">
          {arm.percent}%
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {arm.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] tracking-wider text-[var(--paper)]/60 bg-[var(--paper)]/5 px-2 py-0.5 rounded-sm border border-[var(--paper)]/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
        <span className="text-[var(--pulse-warm)]/70">last ·</span> {arm.last_work}
      </p>

      {arm.blocked_on && (
        <p className="mt-2 font-mono text-[10px] tracking-wider text-red-300/70 leading-relaxed">
          <span className="text-red-300/90">blocked ·</span> {arm.blocked_on}
        </p>
      )}

      <p className="mt-3 font-mono text-[9px] tabular-nums tracking-wider text-[var(--paper)]/35">
        {arm.canon}
      </p>
    </li>
  );
}
