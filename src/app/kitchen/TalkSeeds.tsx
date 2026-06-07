// /root/.hermes/profiles/code-arm/TalkSeeds.tsx
// ZONE 4: TALK-SEEDS bottom-bar - fetches 3 conversation-starters from /api/brain/talk-seeds
// random-walk arousal>=0.85 last-7d, 3-pill row, click to copy, auto-refresh on page load

"use client";

import { useState, useEffect, useCallback } from "react";

type TalkSeed = {
  id: string;
  text: string;
  category: string;
};

const POLL_INTERVAL_MS = 60000; // optional: re-fetch every minute

export default function TalkSeeds() {
  const [seeds, setSeeds] = useState<TalkSeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fetchSeeds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/brain/talk-seeds");
      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data: TalkSeed[] = await res.json();
      // ensure exactly 3 seeds, slice if needed
      setSeeds(data.slice(0, 3));
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown error";
      setError(message);
      console.error("TalkSeeds fetch error:", message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeeds();
    const interval = setInterval(fetchSeeds, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchSeeds]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // fallback for older browsers or insecure context
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (loading && seeds.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-zinc-400">
        <span className="animate-pulse">Loading talk seeds...</span>
      </div>
    );
  }

  if (error && seeds.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-red-500">
        <span>Failed to load seeds. Retrying soon.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-zinc-800 bg-zinc-950 px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        Talk Seeds
      </span>
      {seeds.map((seed, index) => (
        <button
          key={seed.id}
          onClick={() => handleCopy(seed.text, index)}
          className="group relative inline-flex cursor-pointer items-center rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 shadow-sm transition-colors hover:border-stone-400 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-1"
        >
          <span className="truncate max-w-[200px]">{seed.text}</span>
          <span
            className={`ml-2 text-xs ${
              copiedIndex === index
                ? "text-green-500"
                : "text-zinc-500 opacity-0 group-hover:opacity-100"
            } transition-opacity`}
          >
            {copiedIndex === index ? "Copied!" : "Copy"}
          </span>
          {/* accessibility label */}
          <span className="sr-only">Copy this seed to clipboard</span>
        </button>
      ))}
      {/* always show a third pill even if loading error? Above handles empty state.
          For UX consistency, if loading but we have old seeds, keep them */}
    </div>
  );
}