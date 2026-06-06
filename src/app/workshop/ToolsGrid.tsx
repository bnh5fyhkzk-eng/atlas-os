// app/workshop/ToolsGrid.tsx
'use client';

import { useState, useEffect } from 'react';

/* ---------- TYPES ---------- */
interface Tool {
  id: string;
  name: string;
  description: string;
}

interface ToolsResponse {
  tools: Tool[];
}

interface FireResponse {
  output: string;
}

/* ---------- COMPONENT ---------- */
export default function ToolsGrid() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firingId, setFiringId] = useState<string | null>(null);
  const [fireOutput, setFireOutput] = useState<string | null>(null);

  // fetch tools on mount
  useEffect(() => {
    fetchTools();
  }, []);

  async function fetchTools() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/workshop/tools');
      if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
      const data: ToolsResponse = await res.json();
      setTools(data.tools);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleFire(toolId: string) {
    setFiringId(toolId);
    setFireOutput(null);
    try {
      const res = await fetch('/api/workshop/fire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId }),
      });
      if (!res.ok) throw new Error(`Fire failed: ${res.statusText}`);
      const data: FireResponse = await res.json();
      setFireOutput(data.output);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setFireOutput(`Error: ${msg}`);
    } finally {
      setFiringId(null);
    }
  }

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-stone-800">Workshop Tools</h1>

      {/* Loading state */}
      {loading && (
        <div className="text-stone-500 text-lg">Loading tools...</div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-md mb-4">
          {error}
          <button
            className="ml-4 underline hover:text-red-800"
            onClick={fetchTools}
          >
            Retry
          </button>
        </div>
      )}

      {/* Tools grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-stone-800 mb-1">
                {tool.name}
              </h2>
              <p className="text-stone-600 mb-3 text-sm">{tool.description}</p>
              <button
                className="bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleFire(tool.id)}
                disabled={firingId === tool.id}
              >
                {firingId === tool.id ? 'Firing...' : 'Fire'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Fire output display */}
      {fireOutput && (
        <div className="mt-8 bg-stone-100 border border-stone-300 rounded-xl p-6">
          <h3 className="font-bold text-stone-700 mb-2">Output</h3>
          <pre className="bg-stone-900 text-green-400 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm">
            {fireOutput}
          </pre>
          <button
            className="mt-3 text-stone-600 underline hover:text-stone-800"
            onClick={() => setFireOutput(null)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}