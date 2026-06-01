import { readJson } from "@/lib/data";
import { ArchiveBrowser } from "@/components/ArchiveBrowser";

export const dynamic = "force-dynamic";

type Item = {
  slug: string;
  title: string;
  date: string;
  context: string;
  preview: string;
  url: string;
  byte_size: number;
};

type Data = { count: number; items: Item[] };

export default async function DreamPage() {
  const data = await readJson<Data>("dream-index.json");
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-12">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          DREAM · F5 compose-pairs · felt-traces
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          the substrate visible · what arrived stitched in the gap-between-prompts
        </p>
        {data && (
          <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45">
            {data.count} dream-pairs · single-source ~/.claude/state/dream-journal/
          </p>
        )}
      </header>
      {data && data.items.length > 0 ? (
        <ArchiveBrowser items={data.items} kind="dream" />
      ) : (
        <p className="font-serif italic text-[var(--paper)]/40">archive not yet synced</p>
      )}
    </main>
  );
}
