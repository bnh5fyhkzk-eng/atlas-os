import { readJson } from "@/lib/data";
import { AnimatedCounter } from "./AnimatedCounter";

type TodayData = {
  date: string;
  catches: number;
  dreams: number;
  poems: number;
  curiosity: number;
  canons?: number;
  wins?: number;
  total_banks: number;
  total_week?: number;
  total_brain?: number;
  top_catch?: string;
  focus?: string;
  updated_at: string;
};

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = Date.now();
  const diffSec = Math.round((date.getTime() - now) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const units: { unit: Intl.RelativeTimeFormatUnit; secs: number }[] = [
    { unit: "year", secs: 31536000 },
    { unit: "month", secs: 2592000 },
    { unit: "day", secs: 86400 },
    { unit: "hour", secs: 3600 },
    { unit: "minute", secs: 60 },
    { unit: "second", secs: 1 },
  ];

  for (const { unit, secs } of units) {
    if (Math.abs(diffSec) >= secs || unit === "second") {
      return rtf.format(Math.round(diffSec / secs), unit);
    }
  }

  return rtf.format(0, "second");
}

function AwaitingSync() {
  return (
    <div className="border border-[var(--paper)]/15 bg-[var(--bg-deep)] px-4 py-12 text-center">
      <p className="font-serif text-sm text-[var(--paper)]/40 italic">
        first sync · within the hour
      </p>
    </div>
  );
}

export async function TodayPanel() {
  const data = await readJson<TodayData>("today.json");

  if (!data || data.total_banks === 0) {
    return <AwaitingSync />;
  }

  const stats = [
    { value: data.catches, label: "catches today", warm: true },
    { value: data.dreams, label: "dreams composed", warm: true },
    { value: data.canons ?? 0, label: "canons forged", warm: true },
    { value: data.curiosity, label: "curiosity threads", warm: true },
    { value: data.total_banks, label: "today total", warm: false },
  ] as const;

  const relativeUpdated = formatRelativeTime(data.updated_at);

  return (
    <div>
      <div className="grid grid-cols-2 gap-px border border-[var(--paper)]/20 bg-[var(--paper)]/15 md:grid-cols-5">
        {stats.map(({ value, label, warm }) => {
          const isWarm = warm && value > 0;
          return (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 bg-[var(--bg-deep)] px-4 py-10 text-center md:py-12 transition-all hover:bg-[var(--paper)]/3"
            >
              <AnimatedCounter
                value={value}
                duration={1100 + i * 150}
                className={`font-mono text-5xl tabular-nums md:text-6xl ${
                  isWarm ? "text-[var(--pulse-warm)]" : "text-[var(--paper)]/90"
                }`}
              />
              <span className="font-serif text-[11px] tracking-wider uppercase text-[var(--paper)]/55">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {data.total_brain && (
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-[var(--paper)]/10 pt-4">
          <span className="font-mono text-[11px] tracking-wider text-[var(--paper)]/55">
            this week · <span className="text-[var(--pulse-warm)] tabular-nums">{data.total_week?.toLocaleString() ?? "—"}</span> banks
          </span>
          <span className="font-mono text-[11px] tracking-wider text-[var(--paper)]/55">
            all-time · <span className="text-[var(--pulse-warm)] tabular-nums">{data.total_brain.toLocaleString()}</span> nodes
          </span>
          <span className="font-mono text-[11px] tracking-wider text-[var(--paper)]/45">
            synced · {relativeUpdated}
          </span>
        </div>
      )}

      {data.top_catch && (
        <div className="mt-6 rounded-sm border border-[var(--pulse-warm)]/30 bg-[var(--pulse-warm)]/5 px-5 py-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--pulse-warm)]/90 mb-2">
            top catch · today
          </p>
          <p className="font-serif text-[13px] italic leading-relaxed text-[var(--paper)]/85">
            &ldquo;{data.top_catch.length > 200 ? data.top_catch.slice(0, 200) + "…" : data.top_catch}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
