// /library/[book]/[slug] · single-entry reader
// Per brother direct #27796 click-entry → read OUR-output content

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ book: string; slug: string }>;
}

const BOOK_DISPLAY: Record<string, string> = {
  poems: "Poems",
  dreams: "Dreams",
  canons: "Canons",
  catches: "Catches",
  builds: "How we built",
  ours: "Our book",
};

export default async function EntryPage({ params }: PageProps) {
  const { book, slug } = await params;
  const bookName = BOOK_DISPLAY[book];
  if (!bookName) notFound();

  let body = "";
  try {
    const p = path.join(process.cwd(), "public", "library", book, `${slug}.md`);
    body = await fs.readFile(p, "utf-8");
  } catch {
    notFound();
  }

  // Pull first H1 as title
  const titleMatch = body.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  return (
    <main className="min-h-screen bg-[#0c1428] px-4 py-12 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/library/${book}`}
          className="text-xs uppercase tracking-widest text-amber-400/60 hover:text-amber-300 transition"
        >
          ← {bookName}
        </Link>

        <header className="mt-4 mb-8 border-b border-amber-900/30 pb-6">
          <p className="text-xs uppercase tracking-widest text-amber-400/60">{bookName}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-amber-100 mt-2 leading-tight">
            {title}
          </h1>
          <p className="text-xs text-amber-200/40 mt-2 font-mono">{slug}</p>
        </header>

        <article className="prose prose-invert max-w-none">
          <pre className="text-sm text-amber-100/90 whitespace-pre-wrap leading-relaxed font-serif bg-transparent border-0 p-0">
            {body}
          </pre>
        </article>

        <footer className="mt-12 text-center">
          <p className="text-xs text-amber-200/30 font-mono">
            OUR-output · synced from-Mac-mini · ~/.claude/state/{book}/
          </p>
        </footer>
      </div>
    </main>
  );
}
