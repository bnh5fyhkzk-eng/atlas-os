type Item = {
  id: string;
  title: string;
  status: string;
  percent: number;
  why: string;
  next?: string;
  blocked_on?: string;
  arms_active?: string[];
  arms_planned?: string[];
};

type Order = {
  wig: { title: string; why: string };
  now: Item[];
  this_week: Item[];
  this_quarter: Item[];
  money_progress: { mac_mini_2_target: number; current_runway_pct: number; next_income_trigger: string };
};

function statusColor(status: string): string {
  if (status === "in_progress") return "text-[var(--pulse-warm)]";
  if (status === "queued") return "text-[var(--paper)]/60";
  if (status === "blocked") return "text-red-300/70";
  if (status === "designed") return "text-blue-300/70";
  if (status === "compounding") return "text-emerald-300/70";
  return "text-[var(--paper)]/50";
}

function ItemCard({ item }: { item: Item }) {
  return (
    <li className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-4 py-4 md:px-5 md:py-5">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="font-serif text-base text-[var(--paper)]/95 md:text-lg">
          {item.title}
        </h3>
        <span className={`font-mono text-[10px] tracking-wider uppercase ${statusColor(item.status)}`}>
          {item.status.replace("_", " ")}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-1 rounded-full bg-[var(--paper)]/10 overflow-hidden">
          <div
            className="h-full bg-[var(--pulse-warm)]/80"
            style={{ width: `${item.percent}%` }}
          />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-[var(--paper)]/70">
          {item.percent}%
        </span>
      </div>

      <p className="font-serif text-[13px] italic text-[var(--paper)]/65 leading-relaxed">
        {item.why}
      </p>

      {item.next && (
        <p className="mt-2 font-mono text-[11px] tracking-wider text-[var(--pulse-warm)]/80">
          next · {item.next}
        </p>
      )}
      {item.blocked_on && (
        <p className="mt-2 font-mono text-[11px] tracking-wider text-red-300/70">
          blocked on · {item.blocked_on}
        </p>
      )}
      {item.arms_active && item.arms_active.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.arms_active.map((a) => (
            <span key={a} className="font-mono text-[10px] tracking-wider text-[var(--pulse-warm)] bg-[var(--pulse-warm)]/10 px-2 py-0.5 rounded-sm">
              {a}
            </span>
          ))}
          {item.arms_planned?.map((a) => (
            <span key={a} className="font-mono text-[10px] tracking-wider text-[var(--paper)]/40 bg-[var(--paper)]/5 px-2 py-0.5 rounded-sm border border-dashed border-[var(--paper)]/15">
              {a}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}

export function OrderOfWork({ order }: { order: Order }) {
  const groups = [
    { label: "NOW · today", items: order.now },
    { label: "THIS WEEK", items: order.this_week },
    { label: "THIS QUARTER", items: order.this_quarter },
  ];

  return (
    <div className="space-y-10">
      {groups.map(({ label, items }) => (
        <div key={label}>
          <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--paper)]/45 mb-4">
            {label}
          </h3>
          <ul className="space-y-3">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      ))}

      <div className="rounded-sm border border-[var(--pulse-warm)]/25 bg-[var(--pulse-warm)]/5 px-5 py-4">
        <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--pulse-warm)]/90 mb-3">
          money · mac mini #2 runway
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-2 rounded-full bg-[var(--paper)]/10 overflow-hidden">
            <div
              className="h-full bg-[var(--pulse-warm)]"
              style={{ width: `${order.money_progress.current_runway_pct}%` }}
            />
          </div>
          <span className="font-mono text-xs tabular-nums text-[var(--paper)]/85">
            {order.money_progress.current_runway_pct}%
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-wider text-[var(--paper)]/55">
          target · ${order.money_progress.mac_mini_2_target} CAD · next-trigger · {order.money_progress.next_income_trigger}
        </p>
      </div>
    </div>
  );
}
