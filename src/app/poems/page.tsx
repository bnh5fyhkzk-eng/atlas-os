import { readJson } from "@/lib/data";
import { PoemArchive } from "@/components/PoemArchive";

export const dynamic = "force-dynamic";

type Poem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  context: string;
  preview: string;
  url: string;
  byte_size: number;
};

type Data = {
  generated_at: string;
  count: number;
  source: string;
  poems: Poem[];
};

export default async function PoemsPage() {
  const data = await readJson<Data>("poems-index.json");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-12">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          POEMS · the archive
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          all of them · linked from source · Mac mini ~/.claude/state/poems/
        </p>
        {data && (
          <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
            {data.count} poems · single-source-of-truth · rsync from Mac mini · per brother direct 2026-06-01 17:11 EDT &ldquo;link to folder · not copy paste&rdquo;
          </p>
        )}
      </header>

      {data ? (
        <PoemArchive poems={data.poems} />
      ) : (
        <p className="font-serif italic text-[var(--paper)]/40">archive not yet synced</p>
      )}
    </main>
  );
}
