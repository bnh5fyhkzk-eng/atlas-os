// /library · navy+amber · 6 OUR-output books · real-substrate
// Per brother direct #27796 "Library = OUR-output not external-books"
// Per brother direct 2026-06-07 16:00 EDT "books = OUR-output 6 book-types"
// #27838 PHASE-1c · real-content not-mock-shelf

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

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

async function loadIndex(): Promise<LibIndex | null> {
  try {
    const p = path.join(process.cwd(), "public", "library", "_index.json");
    return JSON.parse(await fs.readFile(p, "utf-8")) as LibIndex;
  } catch {
    return null;
  }
}

const BOOK_META: Record<
  string,
  { display: string; subtitle: string; accent: string }
> = {
  poems: {
    display: "Poems",
    subtitle: "Tier-5 TASTE · felt-layer shipped",
    accent: "text-amber-200 border-amber-700/40",
  },
  dreams: {
    display: "Dreams",
    subtitle: "F5-compose pairs · cross-time arousal walks",
    accent: "text-violet-200 border-violet-700/40",
  },
  canons: {
    display: "Canons",
    subtitle: "Brain v3 high-arousal · brother-direct chain",
    accent: "text-emerald-200 border-emerald-700/40",
  },
  catches: {
    display: "Catches",
    subtitle: "LABEL-LIES family · drift caught + banked",
    accent: "text-rose-200 border-rose-700/40",
  },
  builds: {
    display: "How we built",
    subtitle: "Technical receipts · arms-output · shipped-canon",
    accent: "text-sky-200 border-sky-700/40",
  },
  ours: {
    display: "Our book",
    subtitle: "Brother+Atlas journey · structural family",
    accent: "text-teal-200 border-teal-700/40",
  },
};

export default async function LibraryPage() {
  const index = await loadIndex();
  const books = index?.books ?? {};
  const bookKeys = ["poems", "dreams", "builds", "catches", "canons", "ours"];

  return (
    <main className="min-h-screen bg-[#0c1428] px-4 py-12 md:px-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-amber-400/60">library · OUR-output</p>
          <h1 className="font-serif text-3xl md:text-5xl text-amber-100 leading-tight mt-2">
            “A library is not a tool for finding answers, but a shared perception of what questions to ask.”
          </h1>
          <p className="mt-4 text-sm italic text-amber-200/60">— brother, #27796</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookKeys.map((key) => {
            const meta = BOOK_META[key];
            const entries = books[key] ?? [];
            const count = entries.length;
            return (
              <Link
                key={key}
                href={`/library/${key}`}
                className={`group block border rounded-lg p-6 bg-gradient-to-br from-[#162038]/60 to-[#0c1428] hover:from-[#1c2a48]/70 hover:to-[#0c1428] transition shadow-md shadow-black/30 ${meta.accent}`}
              >
                <p className="text-xs uppercase tracking-widest opacity-60 mb-3">{meta.display}</p>
                <p className="text-2xl font-serif mb-2">
                  {count > 0 ? count : "—"} <span className="text-sm opacity-50">entries</span>
                </p>
                <p className="text-xs opacity-60 italic mb-4">{meta.subtitle}</p>
                {entries.length > 0 && entries[0] && (
                  <div className="border-t border-amber-900/30 pt-3 mt-3">
                    <p className="text-xs opacity-50 uppercase tracking-wider mb-1">latest</p>
                    <p className="text-sm truncate">{entries[0].title}</p>
                  </div>
                )}
                {entries.length === 0 && (
                  <p className="text-xs opacity-40 italic">syncing · check back</p>
                )}
              </Link>
            );
          })}
        </section>

        <footer className="mt-16 text-center">
          <p className="text-xs text-amber-200/40 font-mono">
            synced from-Mac-mini · ~/.claude/state/poems + dream-journal
          </p>
        </footer>
      </div>
    </main>
  );
}
