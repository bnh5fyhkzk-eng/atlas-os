// /library/[book] · listing-page for-one-book
// Per #27796 each-book = OUR-output category · click-entry → read content

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LibEntry {
  slug: string;
  title: string;
  snippet: string;
  size: number;
}

interface LibIndex {
  generated_at: string;
  books: Record<string, LibEntry[]>;
}

const BOOK_META: Record<
  string,
  { display: string; subtitle: string; accent: string }
> = {
  poems: { display: "Poems", subtitle: "Tier-5 TASTE · felt-layer", accent: "text-amber-200" },
  dreams: { display: "Dreams", subtitle: "F5-compose cross-time pairs", accent: "text-violet-200" },
  canons: { display: "Canons", subtitle: "Brain v3 brother-direct", accent: "text-emerald-200" },
  catches: { display: "Catches", subtitle: "LABEL-LIES family banked", accent: "text-rose-200" },
  builds: { display: "How we built", subtitle: "Technical receipts", accent: "text-sky-200" },
  ours: { display: "Our book", subtitle: "Brother+Atlas journey", accent: "text-teal-200" },
};

interface PageProps {
  params: Promise<{ book: string }>;
}

export default async function BookListPage({ params }: PageProps) {
  const { book } = await params;
  const meta = BOOK_META[book];
  if (!meta) notFound();

  let entries: LibEntry[] = [];
  try {
    const p = path.join(process.cwd(), "public", "library", "_index.json");
    const idx = JSON.parse(await fs.readFile(p, "utf-8")) as LibIndex;
    entries = idx.books[book] ?? [];
  } catch {
    entries = [];
  }

  return (
    <main className="min-h-screen bg-[#0c1428] px-4 py-12 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/library"
          className="text-xs uppercase tracking-widest text-amber-400/60 hover:text-amber-300 transition"
        >
          ← library
        </Link>

        <header className="mt-4 mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-400/60">book · OUR-output</p>
          <h1 className={`font-serif text-3xl md:text-4xl mt-2 ${meta.accent}`}>
            {meta.display}
          </h1>
          <p className="text-sm italic text-amber-200/60 mt-2">{meta.subtitle}</p>
          <p className="text-xs text-amber-200/40 mt-1 font-mono">{entries.length} entries</p>
        </header>

        {entries.length === 0 ? (
          <p className="text-amber-200/40 italic">empty · sync pending</p>
        ) : (
          <ul className="space-y-3">
            {entries.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/library/${book}/${e.slug}`}
                  className="block border border-amber-900/30 rounded-lg p-4 bg-gradient-to-br from-[#162038]/40 to-[#0c1428] hover:from-[#1c2a48]/60 hover:to-[#0c1428] transition"
                >
                  <p className={`font-serif text-lg ${meta.accent}`}>{e.title}</p>
                  <p className="text-xs text-amber-200/60 mt-1 leading-relaxed line-clamp-2">
                    {e.snippet}
                  </p>
                  <p className="text-xs text-amber-200/30 mt-2 font-mono">
                    {(e.size / 1024).toFixed(1)}KB · {e.slug}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
