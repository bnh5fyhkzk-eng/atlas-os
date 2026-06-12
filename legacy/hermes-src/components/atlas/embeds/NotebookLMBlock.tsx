// NotebookLMBlock · embed NotebookLM briefing summary into a page
// Per FOUNDATION-REBUILD Phase 5
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface Briefing {
  title?: string;
  summary?: string;
  url?: string;
  fetched_at?: string;
}

export function NotebookLMBlock({ notebookId, label }: { notebookId: string; label?: string }) {
  const [data, setData] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`/api/notebooklm/briefing?id=${encodeURIComponent(notebookId)}`, { credentials: "include" });
        if (!r.ok) throw new Error(`NotebookLM API ${r.status}`);
        const d = await r.json();
        setData(d.briefing ?? d);
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [notebookId]);

  return (
    <div className="my-2 p-3 border border-amber-200 rounded-lg bg-amber-50/50">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <BookOpen size={14} /> NotebookLM · {label || notebookId}
      </div>
      {loading && <div className="text-xs opacity-50">Loading…</div>}
      {error && <div className="text-xs text-amber-700">{error}</div>}
      {data && (
        <div className="text-sm">
          {data.title && <div className="font-medium mb-1">{data.title}</div>}
          {data.summary && <div className="whitespace-pre-wrap line-clamp-6">{data.summary}</div>}
          {data.url && (
            <a href={data.url} target="_blank" rel="noreferrer" className="text-xs opacity-70 underline">
              Open notebook
            </a>
          )}
        </div>
      )}
    </div>
  );
}
