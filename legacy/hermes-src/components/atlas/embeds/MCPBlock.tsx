// MCPBlock · invoke an MCP tool + render result
// Per FOUNDATION-REBUILD Phase 5
import { useEffect, useState } from "react";
import { Plug } from "lucide-react";

export function MCPBlock({ server, tool, args }: { server: string; tool: string; args?: Record<string, unknown> }) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`/api/mcp/${encodeURIComponent(server)}/${encodeURIComponent(tool)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(args ?? {}),
        });
        if (!r.ok) throw new Error(`MCP ${server}.${tool} ${r.status}`);
        setData(await r.json());
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [server, tool, args]);

  return (
    <div className="my-2 p-3 border border-slate-300 rounded-lg bg-slate-50/50">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <Plug size={14} /> MCP · {server}.{tool}
      </div>
      {loading && <div className="text-xs opacity-50">Invoking…</div>}
      {error && <div className="text-xs text-amber-600">{error}</div>}
      {data !== null && !error && (
        <pre className="text-xs whitespace-pre-wrap overflow-x-auto max-h-48">
          {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
