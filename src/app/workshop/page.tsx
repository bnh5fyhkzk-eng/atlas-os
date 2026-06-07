// src/app/workshop/page.tsx
// workshop dashboard: tool count + daily cost + click-to-fire cards

'use client';

import { useState, useEffect } from 'react';

interface Arm {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'error';
  costToday: number;
  lastFired: string | null;
}

export default function WorkshopPage() {
  const [arms, setArms] = useState<Arm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate arm data – replace with real API call
    const mock: Arm[] = [
      { id: 'code-arm', name: 'Code Arm', status: 'idle', costToday: 0.12, lastFired: '2025-06-05T10:30' },
      { id: 'youtube-arm', name: 'YouTube Arm', status: 'running', costToday: 0.45, lastFired: '2025-06-05T11:00' },
      { id: 'brain-arm', name: 'Brain Arm', status: 'idle', costToday: 0.08, lastFired: null },
    ];
    setArms(mock);
    setLoading(false);
  }, []);

  const totalCostToday = arms.reduce((sum, a) => sum + a.costToday, 0);
  const activeCount = arms.filter(a => a.status === 'running').length;

  const handleFire = (id: string) => {
    // placeholder click-to-fire – dispatch to arm-control API
    console.log(`Firing arm: ${id}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sky-300/60">
        Loading workshop...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* header with counts */}
      <header className="mb-8 flex flex-col gap-2 border-b border-sky-900/40 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sky-100">Workshop</h1>
          <p className="text-sm text-sky-300/70">
            {arms.length} tools registered · {activeCount} active
          </p>
        </div>
        <div className="rounded-lg bg-sky-950/60 px-4 py-2 text-sm font-medium text-sky-100">
          Cost today: ${totalCostToday.toFixed(2)}
        </div>
      </header>

      {/* arm grid: 1 col mobile, 2 col lg */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {arms.map((arm) => (
          <div
            key={arm.id}
            className="flex flex-col rounded-lg border border-sky-900/40 bg-[#0a1428] p-4 shadow-sm transition hover:shadow-md hover:border-sky-700/60"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-sky-100">{arm.name}</h2>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  arm.status === 'running' ? 'bg-emerald-400' : arm.status === 'error' ? 'bg-rose-500' : 'bg-sky-700'
                }`}
              />
            </div>
            <p className="mb-1 text-sm text-sky-300/70">
              Status: <span className="capitalize">{arm.status}</span>
            </p>
            <p className="mb-3 text-sm text-sky-300/70">
              Cost today: ${arm.costToday.toFixed(2)}
              {arm.lastFired && (
                <span className="ml-3">
                  Last fired: {new Date(arm.lastFired).toLocaleString()}
                </span>
              )}
            </p>
            <button
              onClick={() => handleFire(arm.id)}
              disabled={arm.status === 'running'}
              className="mt-auto w-full rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {arm.status === 'running' ? 'Running...' : 'Fire Now'}
            </button>
          </div>
        ))}
      </div>

      {/* empty state if no arms – unlikely but safe */}
      {arms.length === 0 && (
        <div className="mt-12 text-center text-sky-300/60">
          No tools registered yet. Add an arm from the control panel.
        </div>
      )}
    </main>
  );
}