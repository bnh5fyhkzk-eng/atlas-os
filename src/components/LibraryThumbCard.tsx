// LibraryThumbCard · artifact-card with first-lines preview rendered as paper-look
// Per #27840 video-evidence Jack-OS shows artifact-thumbnails not text-lists
// 5-word title + 13-word subtitle + paper preview

import Link from "next/link";

interface Props {
  book: string;
  slug: string;
  title: string;
  snippet: string;
  accent: string;
}

export default function LibraryThumbCard({ book, slug, title, snippet, accent }: Props) {
  const fiveWord = title.split(/\s+/).slice(0, 5).join(" ");
  const subtitle = snippet?.slice(0, 110).replace(/\s+/g, " ").trim();
  const preview = snippet?.slice(0, 280).replace(/\s+/g, " ").trim();
  return (
    <Link
      href={`/library/${book}/${slug}`}
      className={`group block rounded-xl border overflow-hidden bg-gradient-to-br from-[#162038]/70 to-[#0c1428] hover:from-[#1c2a48]/80 hover:to-[#0c1428] transition shadow-md hover:shadow-lg ${accent}`}
    >
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-amber-50/[0.04] to-zinc-950 border-b border-amber-900/20 p-3">
        <p className="font-serif text-[10px] text-amber-100/40 leading-[1.35] line-clamp-6 italic">
          {preview}…
        </p>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1428] via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1.5">{book}</p>
        <p className="font-serif text-base leading-snug mb-1.5">{fiveWord}</p>
        <p className="text-xs opacity-60 italic line-clamp-2">{subtitle}…</p>
      </div>
    </Link>
  );
}
