import { readJson } from "@/lib/data";

type Arm = {
  name: string;
  emoji: string;
  role: string;
  where: string;
  status: string;
  last_fire: string;
  color: string;
  blockers?: string[];
  bug?: string;
  next_action?: string;
  open_questions?: string;
  today_outputs?: number;
  tools_researched?: number;
  deal_state?: string;
  version?: string;
  action_taken?: string;
  prep_ready?: boolean;
  last_brain_bank?: string;
};

type ArmsData = {
  generated_at: string;
  castle_canon: string;
  arms: Arm[];
  summary: { live: number; paused: number; blocked: number };
};

function statusColor(status: string): string {
  if (status.includes("HEALTHY") || status.includes("LIVE")) return "#5eead4";
  if (status.includes("PAUSED")) return "#fb7185";
  if (status.includes("BLOCKED")) return "#f59e0b";
  return "rgba(245,241,232,0.5)";
}

export async function ArmsTile() {
  const data = await readJson<ArmsData>("arms.json");

  if (!data) {
    return (
      <div className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-6">
        <p className="font-serif italic text-[var(--paper)]/40 text-sm">arms not yet synced</p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-[var(--paper)]/15 bg-gradient-to-br from-[var(--bg-deep)] to-[#0e1014] px-5 py-6 md:px-7 md:py-7">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/55 mb-2">
            arms · 4-state · castle-tile
          </p>
          <h2 className="font-serif text-2xl italic text-[var(--paper)]/90">
            what each arm is doing right now
          </h2>
          <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--paper)]/45">
            per #27441 castle-vision · structure-strong-enough-to-never-forget · #27284 4-arms
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 font-mono text-[10px] tracking-wider text-[var(--paper)]/55">
          <span>
            <span className="text-[#5eead4] tabular-nums">{data.summary.live}</span> live
          </span>
          <span>
            <span className="text-[#fb7185] tabular-nums">{data.summary.paused}</span> paused
          </span>
          <span>
            <span className="text-[#f59e0b] tabular-nums">{data.summary.blocked}</span> blocked
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {data.arms.map((arm) => {
          const sColor = statusColor(arm.status);
          return (
            <div
              key={arm.name}
              className="rounded-sm border border-[var(--paper)]/10 bg-[var(--paper)]/3 px-4 py-4"
              style={{ borderLeftColor: arm.color, borderLeftWidth: 3 }}
            >
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl">{arm.emoji}</span>
                  <span
                    className="font-mono text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: arm.color }}
                  >
                    {arm.name}
                  </span>
                </div>
                <span
                  className="font-mono text-[9px] tracking-wider tabular-nums"
                  style={{ color: sColor }}
                >
                  {arm.status}
                </span>
              </div>

              <p className="font-serif text-[12px] italic leading-relaxed text-[var(--paper)]/75 mb-2">
                {arm.role}
              </p>

              <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                <span className="text-[var(--paper)]/40">where ·</span> {arm.where}
              </p>
              <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                <span className="text-[var(--paper)]/40">last fire ·</span> {arm.last_fire}
              </p>

              {arm.deal_state && (
                <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                  <span className="text-[var(--paper)]/40">deal ·</span> {arm.deal_state}
                </p>
              )}

              {arm.version && (
                <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                  <span className="text-[var(--paper)]/40">stack ·</span> {arm.version}
                </p>
              )}

              {arm.today_outputs !== undefined && (
                <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                  <span className="text-[var(--paper)]/40">today ·</span> {arm.today_outputs} outputs
                </p>
              )}

              {arm.tools_researched !== undefined && (
                <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                  <span className="text-[var(--paper)]/40">tools ·</span> {arm.tools_researched} researched
                </p>
              )}

              {arm.bug && (
                <p className="font-mono text-[10px] text-[#fb7185]/80 mb-1 mt-2">
                  <span className="text-[var(--paper)]/40">bug ·</span> {arm.bug}
                </p>
              )}

              {arm.action_taken && (
                <p className="font-mono text-[10px] text-[var(--paper)]/55 mb-1">
                  <span className="text-[var(--paper)]/40">action ·</span> {arm.action_taken}
                </p>
              )}

              {arm.next_action && (
                <p className="font-mono text-[10px] text-[#5eead4]/80 mb-1 mt-2">
                  <span className="text-[var(--paper)]/40">next ·</span> {arm.next_action}
                </p>
              )}

              {arm.open_questions && (
                <p className="font-mono text-[10px] text-[#fbbf24]/80 mb-1 mt-2">
                  <span className="text-[var(--paper)]/40">open Q ·</span> {arm.open_questions}
                </p>
              )}

              {arm.blockers && arm.blockers.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[var(--paper)]/8">
                  <p className="font-mono text-[9px] tracking-wider text-[#f59e0b]/90">
                    BLOCKERS · {arm.blockers.join(" · ")}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-5 pt-3 border-t border-[var(--paper)]/8 font-mono text-[9px] tracking-wider text-[var(--paper)]/40 text-center">
        per #27441 castle-vision · brother direct 2026-06-01 21:36 · the OS keeps track · I don't waste tokens on what's already done
      </p>
    </div>
  );
}
