'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

type Arm = {
  name: string;
  emoji?: string;
  role: string;
  where?: string;
  status: string;
  last_fire?: string;
  next_action?: string;
  blockers?: string[];
  color?: string;
  last_brain_bank?: string;
  deal_state?: string;
  open_questions?: string;
  bug?: string;
};

type ArmsData = {
  generated_at?: string;
  castle_canon?: string;
  arms: Arm[];
};

function statusTone(status: string): { dot: string; text: string } {
  const s = status.toLowerCase();
  if (s.includes('live') || s.includes('healthy') || s.includes('producing')) {
    return { dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]', text: 'text-emerald-300' };
  }
  if (s.includes('crash') || s.includes('error') || s.includes('paused')) {
    return { dot: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]', text: 'text-rose-300' };
  }
  if (s.includes('idle') || s.includes('sleep')) {
    return { dot: 'bg-zinc-500', text: 'text-zinc-400' };
  }
  return { dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]', text: 'text-amber-300' };
}

export default function ArmsDock() {
  const pathname = usePathname();
  // Hide on /workspace + /agents/[arm] · they have their own arm panels per brother direct 2026-06-07 23:38 EDT (noise)
  const hideOnRoute = pathname === '/workspace' || pathname?.startsWith('/agents/');
  const [data, setData] = useState<ArmsData | null>(null);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchArms = useCallback(async () => {
    try {
      const res = await fetch('/arms.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as ArmsData;
      setData(json);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'fetch failed');
    }
  }, []);

  useEffect(() => {
    fetchArms();
    const id = setInterval(fetchArms, 30_000);
    return () => clearInterval(id);
  }, [fetchArms]);

  if (!data && !error) {
    return null;
  }

  const arms = data?.arms ?? [];
  const lastSync = data?.generated_at
    ? new Date(data.generated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  if (hideOnRoute) return null;

  return (
    <aside
      aria-label="Arms dock"
      className={`fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] flex-col border-r border-zinc-800 bg-zinc-950/95 text-zinc-100 backdrop-blur transition-[width] duration-300 md:flex ${
        open ? 'w-80' : 'w-12'
      }`}
    >
      {/* toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 items-center justify-between border-b border-zinc-800 px-3 text-sm font-medium hover:bg-zinc-900"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-base">⛬</span>
          {open && <span className="tracking-wide text-zinc-300">arms · {arms.length}</span>}
        </span>
        {open && <span className="text-xs text-zinc-500">{lastSync}</span>}
        {!open && <span className="sr-only">expand arms dock</span>}
      </button>

      {/* arm list */}
      {open && (
        <div className="flex-1 overflow-y-auto">
          {error && (
            <p className="px-3 py-4 text-xs text-rose-400">arms.json · {error}</p>
          )}
          {arms.map((arm) => {
            const tone = statusTone(arm.status);
            const isOpen = expanded === arm.name;
            return (
              <div key={arm.name} className="border-b border-zinc-900">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : arm.name)}
                  className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-zinc-900/60"
                  aria-expanded={isOpen}
                >
                  <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-100">
                        <span aria-hidden>{arm.emoji ?? '◇'}</span>
                        <span className="truncate">{arm.name}</span>
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider ${tone.text}`}>
                        {arm.last_fire ?? '–'}
                      </span>
                    </span>
                    <span className={`mt-0.5 block truncate text-xs ${tone.text}`}>
                      {arm.status}
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="space-y-2 border-t border-zinc-900 bg-zinc-900/40 px-3 py-3 text-xs text-zinc-300">
                    <p className="text-zinc-400">{arm.role}</p>
                    {arm.next_action && (
                      <p>
                        <span className="text-zinc-500">next · </span>
                        {arm.next_action}
                      </p>
                    )}
                    {arm.blockers && arm.blockers.length > 0 && (
                      <p className="text-rose-300">
                        <span className="text-zinc-500">blocked · </span>
                        {arm.blockers.join(' · ')}
                      </p>
                    )}
                    {arm.last_brain_bank && (
                      <p className="text-zinc-500">brain · {arm.last_brain_bank}</p>
                    )}
                    {arm.bug && (
                      <p className="text-amber-300">
                        <span className="text-zinc-500">bug · </span>
                        {arm.bug}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* footer */}
      {open && (
        <div className="border-t border-zinc-800 px-3 py-2 text-[10px] uppercase tracking-widest text-zinc-600">
          synced · {lastSync}
        </div>
      )}
    </aside>
  );
}
