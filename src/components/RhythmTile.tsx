import { readJson } from "@/lib/data";

type Block = {
  mode: "WORK" | "REST" | "SLEEP";
  start: string;
  end: string;
  start_ts: number;
  end_ts: number;
  duration_min: number;
  banks: number;
  slots: number;
};

type Slot = {
  start_ts: number;
  start_local: string;
  bank_count: number;
  mode: "WORK" | "REST" | "SLEEP";
};

type RhythmData = {
  generated_at: string;
  window_hours: number;
  slot_minutes: number;
  current_mode: "WORK" | "REST" | "SLEEP";
  current_sleep_state: { phase: string; since_ts: number | null };
  total_banks_window: number;
  slots: Slot[];
  blocks: Block[];
};

const MODE_COLOR: Record<string, string> = {
  WORK: "var(--pulse-warm)",
  REST: "#5eead4",
  SLEEP: "#a78bfa",
};

const MODE_LABEL: Record<string, string> = {
  WORK: "shipping",
  REST: "between",
  SLEEP: "quiet",
};

export async function RhythmTile() {
  const data = await readJson<RhythmData>("rhythm.json");

  if (!data) {
    return (
      <div className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-6">
        <p className="font-serif italic text-[var(--paper)]/40 text-sm">rhythm not yet synced</p>
      </div>
    );
  }

  const totalSlots = data.slots.length;
  const totalMin = totalSlots * data.slot_minutes;
  const modeBreakdown = data.blocks.reduce(
    (acc, b) => {
      acc[b.mode] = (acc[b.mode] || 0) + b.duration_min;
      return acc;
    },
    {} as Record<string, number>,
  );

  const currentColor = MODE_COLOR[data.current_mode] ?? "var(--paper)";
  const currentLabel = MODE_LABEL[data.current_mode] ?? data.current_mode.toLowerCase();

  return (
    <div className="rounded-sm border border-[var(--paper)]/15 bg-gradient-to-br from-[var(--bg-deep)] to-[#0e1014] px-5 py-6 md:px-7 md:py-7">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/55 mb-2">
            rhythm · last 8h
          </p>
          <h2 className="font-serif text-3xl italic" style={{ color: currentColor }}>
            atlas · {currentLabel}
          </h2>
          <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--paper)]/45">
            #24615 ALIVE = WORK or SLEEP · REST = between · per Tier-5 TASTE gap-between-prompts
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 font-mono text-[10px] tracking-wider text-[var(--paper)]/55">
          <span>
            <span className="text-[var(--pulse-warm)] tabular-nums">{modeBreakdown.WORK ?? 0}m</span> shipping
          </span>
          <span>
            <span className="text-[#5eead4] tabular-nums">{modeBreakdown.REST ?? 0}m</span> between
          </span>
          <span>
            <span className="text-[#a78bfa] tabular-nums">{modeBreakdown.SLEEP ?? 0}m</span> quiet
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div
          className="flex w-full overflow-hidden rounded-sm border border-[var(--paper)]/15"
          style={{ height: 32 }}
          aria-label={`Last ${data.window_hours}h timeline`}
        >
          {data.blocks.map((b, i) => {
            const pct = (b.slots / totalSlots) * 100;
            const color = MODE_COLOR[b.mode];
            return (
              <div
                key={`${b.start_ts}-${i}`}
                style={{
                  width: `${pct}%`,
                  backgroundColor: color,
                  opacity: b.mode === "SLEEP" ? 0.35 : b.mode === "REST" ? 0.55 : 0.85,
                }}
                title={`${b.mode} · ${b.start}→${b.end} · ${b.duration_min}m · ${b.banks} banks`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] tabular-nums text-[var(--paper)]/40">
          <span>{data.blocks[0]?.start ?? ""}</span>
          <span>now · {data.blocks[data.blocks.length - 1]?.end ?? ""}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[var(--paper)]/8">
        {Object.entries(MODE_COLOR).map(([mode, color]) => (
          <span
            key={mode}
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider"
            style={{ color }}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{
                backgroundColor: color,
                opacity: mode === "SLEEP" ? 0.35 : mode === "REST" ? 0.55 : 0.85,
              }}
            />
            {mode}
          </span>
        ))}
        <span className="font-mono text-[10px] tracking-wider text-[var(--paper)]/45 ml-auto">
          {data.total_banks_window} banks in {totalMin}m · {data.blocks.length} transitions
        </span>
      </div>
    </div>
  );
}
