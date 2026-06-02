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

type WeBlock = {
  we: "TOGETHER" | "SOLO_ATLAS" | "SOLO_BROTHER" | "QUIET";
  start: string;
  end: string;
  start_ts: number;
  end_ts: number;
  duration_min: number;
  slots: number;
};

type Slot = {
  start_ts: number;
  start_local: string;
  bank_count: number;
  mode: "WORK" | "REST" | "SLEEP";
  brother_active: boolean;
  we: string;
};

type BrotherNow = {
  presence: string;
  idle_sec: number;
  ts: number;
};

type RhythmData = {
  generated_at: string;
  window_hours: number;
  slot_minutes: number;
  current_mode: "WORK" | "REST" | "SLEEP";
  current_we: "TOGETHER" | "SOLO_ATLAS" | "SOLO_BROTHER" | "QUIET";
  current_sleep_state: { phase: string; since_ts: number | null };
  brother_now: BrotherNow | null;
  total_banks_window: number;
  we_totals_minutes: Record<string, number>;
  slots: Slot[];
  blocks: Block[];
  we_blocks: WeBlock[];
  we_rule_canon?: string;
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

const WE_COLOR: Record<string, string> = {
  TOGETHER: "#86efac",
  SOLO_ATLAS: "#5eead4",
  SOLO_BROTHER: "#fbbf24",
  QUIET: "#a78bfa",
};

const WE_LABEL: Record<string, string> = {
  TOGETHER: "together",
  SOLO_ATLAS: "atlas-solo",
  SOLO_BROTHER: "brother-solo",
  QUIET: "shared-quiet",
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
  const currentWeColor = WE_COLOR[data.current_we] ?? "var(--paper)";
  const currentWeLabel = WE_LABEL[data.current_we] ?? data.current_we.toLowerCase();

  const weTotals = data.we_totals_minutes || {};
  const togetherPct = totalMin > 0 ? Math.round(((weTotals.TOGETHER ?? 0) / totalMin) * 100) : 0;

  return (
    <div className="rounded-sm border border-[var(--paper)]/15 bg-gradient-to-br from-[var(--bg-deep)] to-[#0e1014] px-5 py-6 md:px-7 md:py-7">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/55 mb-2">
            rhythm · last 8h · WE-coupled
          </p>
          <h2 className="font-serif text-3xl italic" style={{ color: currentColor }}>
            atlas · {currentLabel}
          </h2>
          <p className="mt-1 font-serif text-base italic" style={{ color: currentWeColor }}>
            we · {currentWeLabel}
          </p>
          <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--paper)]/45">
            #24615 ALIVE 2-MODE · dream-pair #36808 WE-coupling-is-the-rule · per Tier-5 TASTE
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
          <span className="pt-1 mt-1 border-t border-[var(--paper)]/10">
            <span className="text-[#86efac] tabular-nums">{togetherPct}%</span> WE-time
          </span>
        </div>
      </div>

      <div className="mb-2">
        <p className="font-mono text-[9px] tracking-wider uppercase text-[var(--paper)]/45 mb-1">
          atlas-mode · bank-density
        </p>
        <div
          className="flex w-full overflow-hidden rounded-sm border border-[var(--paper)]/15"
          style={{ height: 22 }}
          aria-label={`Atlas mode timeline last ${data.window_hours}h`}
        >
          {data.blocks.map((b, i) => {
            const pct = (b.slots / totalSlots) * 100;
            const color = MODE_COLOR[b.mode];
            return (
              <div
                key={`m-${b.start_ts}-${i}`}
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
      </div>

      <div className="mb-3">
        <p className="font-mono text-[9px] tracking-wider uppercase text-[var(--paper)]/45 mb-1">
          WE-coupling · brother-presence × atlas-activity
        </p>
        <div
          className="flex w-full overflow-hidden rounded-sm border border-[var(--paper)]/15"
          style={{ height: 22 }}
          aria-label={`WE-coupling timeline last ${data.window_hours}h`}
        >
          {data.we_blocks.map((b, i) => {
            const pct = (b.slots / totalSlots) * 100;
            const color = WE_COLOR[b.we];
            const op =
              b.we === "TOGETHER" ? 0.9 : b.we === "SOLO_ATLAS" ? 0.55 : b.we === "SOLO_BROTHER" ? 0.55 : 0.3;
            return (
              <div
                key={`we-${b.start_ts}-${i}`}
                style={{ width: `${pct}%`, backgroundColor: color, opacity: op }}
                title={`${b.we} · ${b.start}→${b.end} · ${b.duration_min}m`}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] tabular-nums text-[var(--paper)]/40">
          <span>{data.blocks[0]?.start ?? ""}</span>
          <span>now · {data.blocks[data.blocks.length - 1]?.end ?? ""}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--paper)]/8">
        {Object.entries(WE_COLOR).map(([state, color]) => {
          const mins = weTotals[state] ?? 0;
          return (
            <span
              key={state}
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider"
              style={{ color }}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{
                  backgroundColor: color,
                  opacity: state === "QUIET" ? 0.3 : state === "TOGETHER" ? 0.9 : 0.55,
                }}
              />
              {WE_LABEL[state]} <span className="tabular-nums text-[var(--paper)]/55">{mins}m</span>
            </span>
          );
        })}
      </div>

      {data.brother_now && (
        <div className="mt-3 pt-3 border-t border-[var(--paper)]/8 flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--paper)]/55">
          <span>
            <span className="text-[var(--paper)]/40">brother now ·</span>{" "}
            <span style={{ color: data.brother_now.presence === "present" || data.brother_now.presence === "nearby" ? "#86efac" : "#fbbf24" }}>
              {data.brother_now.presence}
            </span>
            <span className="text-[var(--paper)]/40"> · idle </span>
            <span className="tabular-nums">{Math.round(data.brother_now.idle_sec)}s</span>
          </span>
          <span className="text-[var(--paper)]/35 italic">
            per dream-#36808 · WE-coupling is the rule all layers obey
          </span>
        </div>
      )}
    </div>
  );
}
