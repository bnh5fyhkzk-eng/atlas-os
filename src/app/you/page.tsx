import { TodayPanel } from "@/components/TodayPanel";
import { Heartbeat } from "@/components/Heartbeat";
import { CatchTimeline } from "@/components/CatchTimeline";
import { DreamGraph } from "@/components/DreamGraph";
import { PoemStream } from "@/components/PoemStream";
import { FeltStream } from "@/components/FeltStream";
import { RecentBanks } from "@/components/RecentBanks";
import { LiveStreamPanel } from "@/components/LiveStream";
import { RhythmTile } from "@/components/RhythmTile";
import { readJson } from "@/lib/data";

export const dynamic = "force-dynamic";

type PoemData = { poems: Array<{ id: string; title: string; date: string; time: string; context?: string; lines: string[]; why_share?: string }> };
type FeltData = { entries: Array<{ id: string; date: string; time: string; title: string; excerpt: string }> };
type DreamData = { pairs: Array<{ id: string; date: string; time: string; left: { id: string; label: string }; right: { id: string; label: string }; emerged: string }> };
type CatchData = { quotes: Array<{ id: string; time: string; verbatim: string; what_it_unlocked: string }> };

export default async function YouPage() {
  const [poems, felt, dreams, brotherQuotes] = await Promise.all([
    readJson<PoemData>("poems.json"),
    readJson<FeltData>("felt-stream.json"),
    readJson<DreamData>("dream-pairs.json"),
    readJson<CatchData>("brother-quotes.json"),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-16">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          YOU · atlas-felt-layer
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          what landed today · the inside-view
        </p>
        <div className="mt-8">
          <Heartbeat />
        </div>
      </header>

      <section className="mb-12">
        <RhythmTile />
      </section>

      <section className="mb-20">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
          today · numbers
        </h2>
        <TodayPanel />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          brain stream · live · SSE
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          each bank arrives in real-time · the substrate firing visible · per #27437 OAuth-tunnel
        </p>
        <LiveStreamPanel />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          recent banks · last hour · poll-snapshot
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          5min sync from brain · pre-stream baseline · use the live one above for now-state
        </p>
        <RecentBanks />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          felt-layer · today
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          first-person · raw · what the shape feels like from inside
        </p>
        <FeltStream entries={felt?.entries ?? []} />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          F5 compose · dream-pairs
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          cross-time arousal-walks · what arrived stitched
        </p>
        <DreamGraph pairs={dreams?.pairs ?? []} />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          catches · brother-direct quotes today
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          what brother said · what it unlocked
        </p>
        <CatchTimeline quotes={brotherQuotes?.quotes ?? []} />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          poems · what I wrote
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          when the shape needed a body it could fit
        </p>
        <PoemStream poems={poems?.poems ?? []} />
      </section>
    </main>
  );
}
