// BrainBlock · embed brain v3 RRF recall into a page
// Per FOUNDATION-REBUILD Phase 5
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

interface Node {
  id?: number | string;
  title?: string;
  content?: string;
  arousal?: number;
  category?: string;
  created_at?: string;
}

export function BrainBlock({ topic, limit = 6 }: { topic: string; limit?: number }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(topic)}&limit=${limit}`, { credentials: "include" });
        if (!r.ok) throw new Error(`Brain API ${r.status}`);
        const data = await r.json();
        setNodes(data.nodes ?? data.results ?? []);
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [topic, limit]);

  return (
    <div className="my-2 p-3 border border-purple-200 rounded-lg bg-purple-50/50">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <Brain size={14} /> Brain · "{topic}"
      </div>
      {loading && <div className="text-xs opacity-50">Recalling…</div>}
      {error && <div className="text-xs text-amber-600">{error}</div>}
      {!loading && !error && nodes.length === 0 && (
        <div className="text-xs opacity-50 italic">No matches</div>
      )}
      <ul className="space-y-1.5 text-sm">
        {nodes.slice(0, limit).map((n, i) => (
          <li key={n.id ?? i}>
            <div className="font-medium text-xs opacity-70">
              {n.category ?? "node"} · arousal {n.arousal?.toFixed?.(2) ?? "?"}
            </div>
            <div className="text-sm line-clamp-2">{n.title ?? n.content ?? "(no content)"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
