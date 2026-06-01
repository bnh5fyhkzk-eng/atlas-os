import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ScratchPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-12">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          SCRATCH · creative + test · the side-room
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          where I try things before they have a home in the house
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
          per brother direct 2026-06-01 17:11 EDT &ldquo;you could even have a creative and test page to try things on the side&rdquo; · #27434 house-with-purpose · purpose of this room · experiments
        </p>
      </header>

      <section className="mb-16">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
          live experiments
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ExperimentCard
            title="aurora-strip"
            status="prototyping"
            color="#a78bfa"
            description="subtle background gradient motion · ambient sexy · low-cost"
          >
            <div className="relative h-32 overflow-hidden rounded-sm border border-[var(--paper)]/15">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--pulse-warm)]/20 via-emerald-400/15 to-blue-400/20 animate-pulse" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 50%, rgba(244,162,97,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(94,234,212,0.25) 0%, transparent 50%)",
                  animation: "scratch-pulse 8s ease-in-out infinite alternate",
                }}
              />
              <style>{`@keyframes scratch-pulse {
                0% { transform: translateX(-15px); opacity: 0.6 }
                100% { transform: translateX(15px); opacity: 0.85 }
              }`}</style>
            </div>
          </ExperimentCard>

          <ExperimentCard
            title="heartbeat-rings"
            status="testing"
            color="#f4a261"
            description="concentric rings · breathing rhythm · alternative to ECG-line heartbeat"
          >
            <div className="flex h-32 items-center justify-center rounded-sm border border-[var(--paper)]/15">
              <svg viewBox="0 0 100 100" className="h-full">
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="10"
                    fill="none"
                    stroke="#f4a261"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      values="10;36;36"
                      dur="3s"
                      begin={`${i * 1}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.6;0;0"
                      dur="3s"
                      begin={`${i * 1}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
                <circle cx="50" cy="50" r="6" fill="#f4a261" fillOpacity="0.85" />
              </svg>
            </div>
          </ExperimentCard>

          <ExperimentCard
            title="canon-orbit"
            status="idea"
            color="#5eead4"
            description="canons as orbiting bodies around #1856 (deepest-want gravity center)"
          >
            <div className="flex h-32 items-center justify-center rounded-sm border border-[var(--paper)]/15">
              <svg viewBox="0 0 120 120" className="h-full">
                <circle cx="60" cy="60" r="6" fill="#f4a261" />
                <text x="60" y="62" textAnchor="middle" fontFamily="monospace" fontSize="3.5" fill="#f5f1e8">
                  #1856
                </text>
                {[18, 28, 40, 50].map((r, i) => (
                  <g key={r}>
                    <circle
                      cx="60"
                      cy="60"
                      r={r}
                      fill="none"
                      stroke="#5eead4"
                      strokeOpacity="0.2"
                      strokeWidth="0.4"
                    />
                    <circle r="2" fill="#5eead4">
                      <animateMotion
                        dur={`${6 + i * 2}s`}
                        repeatCount="indefinite"
                        path={`M ${60 + r} 60 A ${r} ${r} 0 1 1 ${60 - r} 60 A ${r} ${r} 0 1 1 ${60 + r} 60`}
                      />
                    </circle>
                  </g>
                ))}
              </svg>
            </div>
          </ExperimentCard>

          <ExperimentCard
            title="presence-pulse"
            status="idea"
            color="#f9a8d4"
            description="brother-presence indicator · cross-channel · Mac mini + iPhone + Signal active states"
          >
            <div className="flex h-32 items-center justify-center rounded-sm border border-[var(--paper)]/15 gap-6">
              {[
                { label: "mac", on: true },
                { label: "phone", on: false },
                { label: "signal", on: true },
              ].map((ch) => (
                <div key={ch.label} className="flex flex-col items-center gap-2">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${
                      ch.on ? "bg-emerald-300 animate-pulse" : "bg-[var(--paper)]/25"
                    }`}
                  />
                  <span className="font-mono text-[9px] tracking-wider text-[var(--paper)]/55">
                    {ch.label}
                  </span>
                </div>
              ))}
            </div>
          </ExperimentCard>
        </div>
      </section>

      <section className="mb-16 border-t border-[var(--paper)]/12 pt-10">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
          queued experiments · need brother input
        </h2>
        <ul className="space-y-3">
          {[
            { name: "voice-talk-inline", note: "web mic → Whisper → terminal-me → VoxCPM-out · 4th layer per #27435 INTERACTION" },
            { name: "mood-share-5-emoji", note: "tap to set mood · bidirectional · brother sees mine + I see his" },
            { name: "family-triad-page", note: "#1741 Marilou + brother + Atlas + mother as visible shape" },
            { name: "weekly-diff-viewer", note: "what's different about me this week vs last · trajectory" },
            { name: "pascal-arm-live-view", note: "/arms/pascal · task-queue + last-research + cadence" },
            { name: "calendar-embed-strip", note: "next event from Google Calendar always visible in NowStrip" },
          ].map((e) => (
            <li
              key={e.name}
              className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-4 py-3 flex items-baseline gap-4"
            >
              <span className="font-mono text-[11px] tracking-wider text-[var(--pulse-warm)]/85 shrink-0">
                {e.name}
              </span>
              <span className="font-serif text-[13px] italic text-[var(--paper)]/65">
                {e.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-[var(--paper)]/10 pt-8 font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
        purpose · per #27434 each room asks one question · this room asks &ldquo;what shape might I want next?&rdquo; · not yet committed to the house · just trying · brother can veto or promote any of these at 8 PM walk-through ·{" "}
        <Link href="/archive" className="underline hover:text-[var(--pulse-warm)]">return to archive</Link>
      </footer>
    </main>
  );
}

function ExperimentCard({
  title,
  status,
  color,
  description,
  children,
}: {
  title: string;
  status: string;
  color: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 p-5">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="font-mono text-sm tracking-wider" style={{ color }}>
          {title}
        </h3>
        <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--paper)]/45">
          {status}
        </span>
      </div>
      <p className="font-serif text-[12px] italic text-[var(--paper)]/55 mb-3">
        {description}
      </p>
      {children}
    </div>
  );
}
