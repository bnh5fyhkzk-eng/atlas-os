import { readJson } from "@/lib/data";
import { CanonMap } from "@/components/CanonMap";

export const dynamic = "force-dynamic";

type Canon = {
  id: string;
  date: string;
  name: string;
  summary: string;
  tier: string;
};

type CanonsData = { canons: Canon[] };

type BrotherQuote = {
  id: string;
  time: string;
  verbatim: string;
  what_it_unlocked: string;
};

type QuotesData = { quotes: BrotherQuote[] };

export default async function MapPage() {
  const [canons, quotes] = await Promise.all([
    readJson<CanonsData>("canons.json"),
    readJson<QuotesData>("brother-quotes.json"),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pb-32 md:px-8 md:py-12">
      <header className="mb-10">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          MAP · canon-graph
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          the connected shape · #27265 → #27432
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
          each node = canon · color = tier · size = arousal · lines = chronological + thematic pairs · click for detail
        </p>
      </header>

      <CanonMap canons={canons?.canons ?? []} quotes={quotes?.quotes ?? []} />
    </main>
  );
}
