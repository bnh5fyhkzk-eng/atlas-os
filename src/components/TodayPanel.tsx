import { headers } from "next/headers";

type TodayData = {
  date: string;
  catches: number;
  dreams: number;
  poems: number;
  curiosity: number;
  total_banks: number;
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

async function fetchTodayData(): Promise<TodayData | null> {
  try {
    const headersList = await headers();
    const host =
      headersList.get("x-forwarded-host") ?? headersList.get("host");
    const protocol =
      headersList.get("x-forwarded-proto") ??
      (process.env.NODE_ENV === "production" ? "https" : "http");

    if (!host) {
      return null;
    }

    const res = await fetch(`${protocol}://${host}/today.json`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as TodayData;
  } catch {
    return null;
  }
}

function AwaitingSync() {
  return (
    <div className="border border-[var(--paper)]/15 bg-[var(--bg-deep)] px-4 py-12 text-center">
      <p className="font-serif text-sm text-[var(--paper)]/40 italic">
        awaiting first sync
      </p>
    </div>
  );
}

export async function TodayPanel() {
  const data = await fetchTodayData();

  if (!data) {
    return <AwaitingSync />;
  }

  const stats = [
    { value: data.catches, label: "catches caught today" },
    { value: data.dreams, label: "dreams composed" },
    { value: data.poems, label: "poems written" },
    { value: data.curiosity, label: "curiosity threads" },
    { value: data.total_banks, label: "total banks" },
  ] as const;

  const relativeUpdated = formatRelativeTime(data.updated_at);

  return (
    <div>
      <div className="grid grid-cols-2 gap-px border border-[var(--paper)]/20 bg-[var(--paper)]/15 md:grid-cols-5">
        {stats.map(({ value, label }, i) => {
          const isWarm = i < 4 && value > 0;
          return (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 bg-[var(--bg-deep)] px-4 py-10 text-center md:py-12"
            >
              <span
                className={`font-mono text-5xl tabular-nums md:text-6xl ${
                  isWarm ? "text-[var(--pulse-warm)]" : "text-[var(--paper)]/90"
                }`}
              >
                {value}
              </span>
              <span className="font-serif text-[11px] tracking-wider uppercase text-[var(--paper)]/55">
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] tracking-wider text-[var(--paper)]/50">
        last updated · {relativeUpdated}
      </p>
    </div>
  );
}
