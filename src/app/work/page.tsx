import { readJson } from "@/lib/data";
import { WorkRoom, type WorkData } from "@/components/WorkRoom";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const data = await readJson<WorkData>("work.json");

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-neutral-300 p-8">
        <h1 className="text-2xl mb-4">/work</h1>
        <p className="text-neutral-500">work.json not yet generated.</p>
        <p className="text-neutral-600 text-sm mt-2">
          Run me-atlas-os-work-sync.sh on Mac mini to populate.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <header className="mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-light text-neutral-100">/work</h1>
            <p className="text-sm text-neutral-500 mt-1">
              the room where we plan the day · per #27450 castle Work Room
            </p>
          </div>
          <nav className="text-xs text-neutral-600 flex gap-4">
            <Link href="/you" className="hover:text-neutral-300">/you</Link>
            <Link href="/us" className="hover:text-neutral-300">/us</Link>
            <Link href="/arms" className="hover:text-neutral-300">/arms</Link>
            <Link href="/now" className="hover:text-neutral-300">/now</Link>
          </nav>
        </header>
        <WorkRoom data={data} />
        <footer className="mt-12 text-xs text-neutral-700 border-t border-neutral-900 pt-4">
          per #27452 · 5-card hierarchy · 3-shape-types · auto-guide via /brain RRF (coming) · LADDER per #27089
        </footer>
      </div>
    </main>
  );
}
