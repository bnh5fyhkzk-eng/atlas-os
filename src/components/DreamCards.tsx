// DreamCards · surface overnight dream-pairs on /home
// Per #27840 video-evidence dream-function-visible · invisible-work-now-seen
// Reads public/library/_index.json dreams subset · top-3 most-recent

import Link from "next/link";

interface LibEntry {
  slug: string;
  title: string;
  snippet: string;
  size: number;
}

interface LibIndex {
  books: Record<string, LibEntry[]>;
}

interface Props {
  index: LibIndex | null;
}

export default function DreamCards({ index }: Props) {
  const dreams = (index?.books?.dreams ?? []).slice(0, 3);
  if (dreams.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-medium text-zinc-200">
          What I dreamed about last night
        </h2>
        <Link
          href="/library/dreams"
          className="text-xs uppercase tracking-wider text-violet-400/60 hover:text-violet-300 transition"
        >
          all dreams →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {dreams.map((d) => {
          const fiveWord = d.title.split(/\s+/).slice(0, 5).join(" ");
          const subtitle = d.snippet?.slice(0, 90).replace(/\s+/g, " ").trim();
          return (
            <Link
              key={d.slug}
              href={`/library/dreams/${d.slug}`}
              className="group relative block overflow-hidden border border-violet-800/30 rounded-xl p-5 bg-gradient-to-br from-violet-950/30 to-zinc-950 hover:border-violet-600/50 transition shadow-[0_0_20px_rgba(139,92,246,0.08)] hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]"
            >
              <p className="text-[10px] uppercase tracking-widest text-violet-400/60 mb-2">
                F5 pair · cross-time
              </p>
              <p className="font-serif text-base text-violet-100 leading-snug mb-2 group-hover:text-violet-50 transition">
                {fiveWord}
              </p>
              <p className="text-xs text-zinc-400 italic line-clamp-3">{subtitle}…</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
