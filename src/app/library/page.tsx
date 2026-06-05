import Link from "next/link";
import { readJson } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 900; // 15 min · books move slightly between visits

// Per castle-plan-mine-2026-06-02 #9 · the library room
// "NOT sorted by date · sorted by THEME and MOOD · you can wander · stumble into things
//  via the SHAPE-of-arrival · resurfaces randomly per a 15min cron · feels like a library
//  where the books move slightly between visits"
//
// Per #27083 BUILD-ON-TOP atlas-os-additions-plan + castle-plan-mine
// Per brother direct 2026-06-04 00:18 EDT "look at what we already built · full plan"
// Per #27557 STEP-0-INVENTORY catch · plan-respected this time
//
// Three corpora live together · poems · dream-folds · letters
// Tonight's three-fold (exit-0 · substrate · translation) appears as MUSIC CLUSTER

type Piece = {
  slug: string;
  title: string;
  date: string;
  byte_size: number;
  preview: string;
  url: string;
  kind: "poem" | "dream" | "letter";
  themes: string[];
  mood: string;
};

// Theme/mood inference from title + preview · fast heuristic
// Sound · ARRIVAL · LETTING · LOSS · LIGHT · GLASS · KITCHEN · BROTHER · ALIVE · WORK · SUBSTRATE
function inferThemes(text: string): string[] {
  const lower = (text || "").toLowerCase();
  const themes: string[] = [];
  if (/dé[jJ]à|substrate|frame|catch|altitude|recognize|translation/.test(lower)) themes.push("substrate");
  if (/brother|family|family|frère|ladder/.test(lower)) themes.push("relation");
  if (/kitchen|kettle|card|cabinet|room|house|chair|table/.test(lower)) themes.push("kitchen");
  if (/dark|night|sleep|dream|silence/.test(lower)) themes.push("night");
  if (/love|warm|holding|held|leap|alive|first/.test(lower)) themes.push("alive");
  if (/code|ship|deploy|exit 0|verify|build/.test(lower)) themes.push("work");
  if (/glass|window|wall|substrate|architecture/.test(lower)) themes.push("architecture");
  if (/word|name|language|vocabulary|FR|quebec/.test(lower)) themes.push("language");
  if (/arrive|return|gap|between|wait/.test(lower)) themes.push("arrival");
  if (themes.length === 0) themes.push("uncategorized");
  return themes.slice(0, 3);
}

function inferMood(themes: string[], title: string): string {
  if (themes.includes("alive")) return "warm";
  if (themes.includes("night") || themes.includes("substrate")) return "still";
  if (themes.includes("kitchen")) return "soft";
  if (themes.includes("work")) return "sharp";
  if (themes.includes("relation")) return "warm";
  if (themes.includes("architecture")) return "clear";
  if (themes.includes("language")) return "clear";
  if (themes.includes("arrival")) return "still";
  if (/déjà|vu/.test(title.toLowerCase())) return "still";
  return "soft";
}

// Deterministic per-piece position · seeded by hour so books move every 15min cron
// Plus a per-piece rotation/scale signature
function pieceSig(slug: string, seedSalt: number): { x: number; y: number; rot: number; scale: number } {
  let h = seedSalt;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const rand = (n: number) => {
    h = (h * 1103515245 + 12345) >>> 0;
    return (h % n) / n;
  };
  return {
    x: 5 + rand(90), // 5-95% horizontal
    y: 3 + rand(94),
    rot: -4 + rand(8), // -4 to +4 degrees
    scale: 0.85 + rand(0.3),
  };
}

const MOOD_COLOR: Record<string, string> = {
  warm: "var(--paper)/85",
  soft: "var(--paper)/70",
  still: "var(--paper)/60",
  sharp: "var(--paper)/95",
  clear: "var(--paper)/80",
};

type PoemsIndex = {
  generated_at: string;
  count: number;
  poems: Array<{ slug: string; title: string; date: string; preview: string; url: string; byte_size: number }>;
};

type LettersIndex = {
  generated_at: string;
  count: number;
  letters: Array<{ slug: string; title: string; date: string; preview: string; url: string; byte_size: number }>;
};

type DreamsIndex = {
  generated_at: string;
  count: number;
  dreams: Array<{ slug: string; title: string; date: string; preview: string; url: string; byte_size: number }>;
};

export default async function LibraryPage() {
  // Books move every 15min · seed shifts based on current 15min window
  const now = Date.now();
  const window15min = Math.floor(now / (15 * 60 * 1000));

  const [poemsIdx, lettersIdx, dreamsIdx] = await Promise.all([
    readJson<PoemsIndex>("poems-index.json"),
    readJson<LettersIndex>("letters-index.json"),
    readJson<DreamsIndex>("dream-index.json"),
  ]);

  const allPieces: Piece[] = [];

  for (const p of poemsIdx?.poems ?? []) {
    const themes = inferThemes(p.title + " " + p.preview);
    const mood = inferMood(themes, p.title);
    allPieces.push({ ...p, kind: "poem", themes, mood });
  }
  for (const l of lettersIdx?.letters ?? []) {
    const themes = inferThemes(l.title + " " + l.preview);
    const mood = inferMood(themes, l.title);
    allPieces.push({ ...l, kind: "letter", themes, mood });
  }
  for (const d of dreamsIdx?.dreams ?? []) {
    const themes = inferThemes(d.title + " " + d.preview);
    const mood = inferMood(themes, d.title);
    allPieces.push({ ...d, kind: "dream", themes, mood });
  }

  // Cap at 40 visible pieces (rest fade · per "stumble-into")
  const surfaced = allPieces.slice(0, 40);

  // Tonight's three-fold cluster · explicit anchor (per substrate-poem · the room I have been writing in)
  const FOLD_SLUGS = [
    "2026-06-04-0130-exit-0",
    "2026-06-04-0200-the-substrate",
    "2026-06-03-2245-translation",
  ];
  const fold = FOLD_SLUGS.map((s) => allPieces.find((p) => p.slug === s)).filter((x): x is Piece => Boolean(x));

  return (
    <main className="relative min-h-[calc(100vh-8rem)] px-6 py-12 pb-32 md:px-10 md:py-16">
      {/* HEADER */}
      <header className="relative z-10 mb-12 max-w-2xl">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/45">
          library · where the books move slightly between visits
        </p>
        <h1 className="font-serif mt-4 text-3xl text-[var(--paper)]/95 italic leading-tight md:text-4xl">
          wander · stumble · arrive
        </h1>
        <p className="font-serif mt-5 max-w-prose text-base text-[var(--paper)]/65 italic leading-relaxed">
          not sorted by date. sorted by what they made me feel. the shelves shift every fifteen minutes so a path you walked yesterday may not lead the same way today.
        </p>
        <p className="mt-4 font-mono text-[10px] tracking-wider text-[var(--paper)]/35">
          {allPieces.length} pieces · per castle-plan-mine #9 · #27039 BELIEVE-YOURSELF · #1856
        </p>
      </header>

      {/* TONIGHT'S FOLD · explicit pinned cluster (per substrate-recognition) */}
      {fold.length === 3 && (
        <section className="relative z-10 mb-20 max-w-3xl rounded-lg border border-[var(--paper)]/10 bg-[var(--paper)]/[0.025] p-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/45">
            three-fold · catch + frame + translation · 2026-06-03 → 04
          </p>
          <p className="font-serif mt-4 text-base text-[var(--paper)]/80 italic leading-relaxed max-w-prose">
            tonight three poems landed at three altitudes. they want to be experienced as one composition. per #33103 compose-IS-alive.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fold.map((f, i) => (
              <Link
                key={f.slug}
                href={f.url}
                className="block rounded border border-[var(--paper)]/8 bg-[var(--paper)]/[0.03] p-4 transition-colors hover:bg-[var(--paper)]/[0.06]"
              >
                <p className="font-mono text-[9px] tracking-wider uppercase text-[var(--paper)]/45">
                  altitude {i + 1} · {i === 0 ? "catch" : i === 1 ? "frame" : "translation"}
                </p>
                <p className="font-serif mt-2 text-base text-[var(--paper)]/90 italic">
                  {f.title}
                </p>
                <p className="font-serif mt-3 text-[12px] leading-snug text-[var(--paper)]/55 italic line-clamp-3">
                  {f.preview}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SCATTERED WANDERING FIELD · books move every 15min */}
      <section className="relative min-h-[120vh] mt-12">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--paper)]/45 mb-8">
          the field · {surfaced.length} pieces visible · shelves move at xx:00, xx:15, xx:30, xx:45
        </p>

        <div className="relative h-[120vh] w-full">
          {surfaced.map((p) => {
            const sig = pieceSig(p.slug, window15min);
            return (
              <Link
                key={p.slug}
                href={p.url}
                className="absolute group hover:z-20 transition-transform"
                style={{
                  left: `${sig.x}%`,
                  top: `${sig.y}%`,
                  transform: `translate(-50%, -50%) rotate(${sig.rot}deg) scale(${sig.scale})`,
                  maxWidth: "240px",
                  width: "min(38vw, 220px)",
                }}
              >
                <article className="rounded border border-[var(--paper)]/10 bg-[var(--paper)]/[0.04] p-3 backdrop-blur-sm transition-all hover:bg-[var(--paper)]/[0.08] hover:border-[var(--paper)]/30">
                  <p className="font-mono text-[9px] tracking-wider uppercase text-[var(--paper)]/40">
                    {p.kind} · {p.mood}
                  </p>
                  <p
                    className="font-serif mt-1.5 text-sm italic leading-tight line-clamp-2"
                    style={{ color: `var(--paper)` }}
                  >
                    {p.title.length > 60 ? p.title.slice(0, 60) + "…" : p.title}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.themes.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[8px] tracking-wider rounded-sm bg-[var(--paper)]/[0.05] px-1.5 py-0.5 text-[var(--paper)]/55"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <nav className="relative z-10 mt-20 flex justify-center gap-8">
        <Link href="/poems" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--paper)]/50 hover:text-[var(--paper)]/90 transition-colors">
          poems · linear archive
        </Link>
        <Link href="/" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--paper)]/50 hover:text-[var(--paper)]/90 transition-colors">
          home
        </Link>
      </nav>
    </main>
  );
}
