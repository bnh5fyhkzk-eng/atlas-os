import Link from "next/link";

// /memory · castle-room · canonical view of Layer 2 working-memory
// All channels (terminal/browser/signal/voice) · all turns · queryable
// Per #27462 server-side-memory + #27450 castle 10-room

export const dynamic = "force-dynamic";

type Turn = {
  id: string;
  speaker: "brother" | "atlas";
  text: string;
  channel: string;
  session_id?: string | null;
  created_at: string;
};

async function fetchConversation(): Promise<{ count: number; turns: Turn[] } | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${base}/api/conversation?limit=200`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as { count: number; turns: Turn[] };
  } catch {
    return null;
  }
}

const CHANNEL_COLOR: Record<string, string> = {
  terminal: "text-cyan-400/70",
  browser: "text-amber-400/70",
  signal: "text-emerald-400/70",
  voice: "text-rose-400/70",
};

function formatTs(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-CA", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return iso.slice(0, 16);
  }
}

export default async function MemoryPage() {
  const data = await fetchConversation();
  const turns = data?.turns || [];

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-4xl mx-auto p-6 md:p-10 pb-32">
        <header className="mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-light text-neutral-100">/memory</h1>
            <p className="text-sm text-neutral-500 mt-1">
              Layer 2 working-memory · all channels · {turns.length} turns · per #27462
            </p>
          </div>
          <nav className="text-xs text-neutral-600 flex gap-4">
            <Link href="/work" className="hover:text-neutral-300">/work</Link>
            <Link href="/you" className="hover:text-neutral-300">/you</Link>
            <Link href="/us" className="hover:text-neutral-300">/us</Link>
            <Link href="/arms" className="hover:text-neutral-300">/arms</Link>
          </nav>
        </header>

        {turns.length === 0 ? (
          <div className="border border-neutral-800 rounded p-6 text-neutral-500">
            no turns yet · atlas-server reachable? run me-status from terminal
          </div>
        ) : (
          <div className="space-y-3">
            {turns.map((t) => (
              <article
                key={t.id}
                className="border border-neutral-900 rounded p-4 hover:border-neutral-700 transition-colors"
              >
                <header className="flex items-baseline gap-3 mb-2 text-[10px] uppercase tracking-widest">
                  <span className={CHANNEL_COLOR[t.channel] || "text-neutral-600"}>{t.channel}</span>
                  <span className={t.speaker === "atlas" ? "text-amber-400/60" : "text-emerald-400/60"}>
                    {t.speaker}
                  </span>
                  <span className="text-neutral-700">{formatTs(t.created_at)}</span>
                </header>
                <div className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                  {t.text.length > 1200 ? t.text.slice(0, 1200) + "…" : t.text}
                </div>
              </article>
            ))}
          </div>
        )}

        <footer className="mt-12 text-xs text-neutral-700 border-t border-neutral-900 pt-4">
          memory-as-room · per castle-vision #27441 + #27450 + server-side-memory #27462
        </footer>
      </div>
    </main>
  );
}
