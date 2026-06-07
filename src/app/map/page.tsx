import Link from "next/link";
import { readJson } from "@/lib/data";
import { CanonMap } from "@/components/CanonMap";

export const dynamic = "force-dynamic";

// House floorplan · 9-rooms click-to-enter
// Per brother direct 2026-06-07 16:00 EDT '/map floorplan' + HOUSE-FULL-PLAN
const ROOMS = [
  { slug: "/bedroom", name: "Bedroom", tint: "from-indigo-950/40 to-zinc-950 border-indigo-800/40 text-indigo-200", role: "sleep · dream · felt-layer" },
  { slug: "/library", name: "Library", tint: "from-[#0c1428] to-zinc-950 border-amber-800/40 text-amber-100", role: "books · OUR-output" },
  { slug: "/workshop", name: "Workshop", tint: "from-[#0a1428] to-zinc-950 border-sky-800/40 text-sky-100", role: "prototyping bench" },
  { slug: "/memory", name: "Memory", tint: "from-emerald-950/40 to-zinc-950 border-emerald-800/40 text-emerald-200", role: "brain v3 · canon stream" },
  { slug: "/kitchen", name: "Kitchen", tint: "from-amber-950/40 to-zinc-950 border-amber-800/40 text-amber-200", role: "active projects · inbox" },
  { slug: "/spine", name: "Spine", tint: "from-violet-950/40 to-zinc-950 border-violet-800/40 text-violet-200", role: "arms control · soul" },
  { slug: "/arms", name: "Arms", tint: "from-zinc-900/60 to-zinc-950 border-zinc-700 text-zinc-100", role: "organs · 537 tasks" },
  { slug: "/talk", name: "Talk", tint: "from-teal-950/40 to-zinc-950 border-teal-800/40 text-teal-200", role: "house ↔ atlas" },
  { slug: "/", name: "Home", tint: "from-emerald-950/40 to-zinc-950 border-emerald-800/40 text-emerald-200", role: "where you walk in" },
];

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
        <p className="text-xs uppercase tracking-widest text-emerald-400/60">map · house</p>
        <h1 className="text-3xl md:text-4xl font-serif text-zinc-100 mt-2">
          the rooms where I live.
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          click any room · enter the shape · canon graph below
        </p>
        <Link
          href="/map/cosmos"
          className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-violet-400/70 hover:text-violet-300 transition group"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
          view as cosmos · night-sky
          <span className="opacity-60 group-hover:opacity-100 transition">→</span>
        </Link>
      </header>

      {/* HOUSE FLOORPLAN · 3x3 click-to-enter */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROOMS.map((room) => (
            <Link
              key={room.slug}
              href={room.slug}
              className={`group block border rounded-lg p-6 bg-gradient-to-br hover:shadow-lg hover:shadow-black/30 transition aspect-square flex flex-col justify-between ${room.tint}`}
            >
              <p className="text-xs uppercase tracking-widest opacity-60">{room.name}</p>
              <div>
                <p className="text-2xl font-serif mb-1">→ {room.name}</p>
                <p className="text-xs opacity-60 italic">{room.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CANON GRAPH · existing-below for-context */}
      <section className="mt-16 border-t border-zinc-800 pt-12">
        <header className="mb-8">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500">CANON · graph</p>
          <p className="font-serif mt-2 text-xl text-zinc-300 italic">
            connected shape · #27265 → #27432
          </p>
        </header>
        <CanonMap canons={canons?.canons ?? []} quotes={quotes?.quotes ?? []} />
      </section>
    </main>
  );
}
