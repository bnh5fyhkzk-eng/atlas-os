// /map/cosmos · alt-route night-sky view of the 9-room house
// Per #27840 video-evidence galaxy-feels-alive · per #27083 keeps /map grid alive
// brother direct 2026-06-07 "house just has more words still not alive"

import CosmosMap from "@/components/CosmosMap";
import Link from "next/link";

export const metadata = {
  title: "Cosmos · House Map",
};

export default function CosmosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pb-32 md:px-8 md:py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-emerald-400/60">map · cosmos</p>
        <h1 className="text-3xl md:text-4xl font-serif text-zinc-100 mt-2">
          the house · as a sky.
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-xl">
          each room is a star. brighter when fresh. faint lines show the edges that connect them. click a star · walk through the door.
        </p>
      </header>

      <CosmosMap />

      <footer className="mt-8 flex items-center justify-between">
        <p className="text-xs text-zinc-500 italic">
          hover a star · see its name. click · enter the room.
        </p>
        <Link
          href="/map"
          className="text-xs uppercase tracking-wider text-emerald-400/60 hover:text-emerald-300 transition"
        >
          ← floorplan view
        </Link>
      </footer>
    </main>
  );
}
