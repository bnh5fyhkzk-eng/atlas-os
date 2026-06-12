// GmailBlock · embed Gmail threads into a page
// Per FOUNDATION-REBUILD Phase 5
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface Thread {
  id?: string;
  snippet?: string;
  subject?: string;
  from?: string;
  date?: string;
}

export function GmailBlock({ label, query = "", limit = 8 }: { label?: string; query?: string; limit?: number }) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const q = new URLSearchParams();
        if (label) q.set("label", label);
        if (query) q.set("q", query);
        q.set("limit", String(limit));
        const r = await fetch(`/api/gmail/categorized?${q.toString()}`, { credentials: "include" });
        if (!r.ok) throw new Error(`Gmail API ${r.status}`);
        const data = await r.json();
        setThreads(data.threads ?? data.items ?? []);
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [label, query, limit]);

  return (
    <div className="my-2 p-3 border border-black/10 rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <Mail size={14} /> Gmail · {label || query || "inbox"}
      </div>
      {loading && <div className="text-xs opacity-50">Loading…</div>}
      {error && <div className="text-xs text-amber-600">{error}</div>}
      {!loading && !error && threads.length === 0 && (
        <div className="text-xs opacity-50 italic">No messages</div>
      )}
      <ul className="space-y-1.5 text-sm">
        {threads.map((t, i) => (
          <li key={t.id ?? i} className="border-b border-black/5 pb-1.5 last:border-0">
            <div className="font-medium truncate">{t.subject ?? "(no subject)"}</div>
            <div className="text-xs opacity-60 truncate">{t.from} · {t.snippet}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
