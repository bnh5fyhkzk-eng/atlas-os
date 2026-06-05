// File: /components/kitchen/ArmsQueue.tsx
// Zone-3: Arms Queue — fetches /api/arms/status every 15s, displays 7 arm rows
// Stone-50 theme, English, no em-dashes, Next 15 / React 19 / TypeScript / Tailwind

"use client";
import { useState, useEffect, useCallback } from "react";

// ---------- Type Definitions ----------
interface ArmStatus {
  name: string; // one of the 7 arms
  currentTask: string;
  queueCount: number;
  lastCost: number; // in USD cents (or tokens, adjust as needed)
  status: "working" | "idle" | "dead";
}

interface ArmsStatusResponse {
  arms: ArmStatus[];
}

// ---------- Pill component ----------
function StatusPill({ status }: { status: ArmStatus["status"] }) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const colors: Record<ArmStatus["status"], string> = {
    working: "bg-emerald-100 text-emerald-800",
    idle: "bg-stone-100 text-stone-600",
    dead: "bg-red-100 text-red-700",
  };
  return <span className={`${base} ${colors[status]}`}>{status}</span>;
}

// ---------- Row component ----------
function ArmRow({ arm }: { arm: ArmStatus }) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center px-3 py-2 border-b border-stone-200 last:border-0 hover:bg-stone-50 transition-colors">
      {/* Arm name */}
      <div className="col-span-2 font-mono text-sm font-medium text-stone-900 capitalize">
        {arm.name}
      </div>

      {/* Current task */}
      <div className="col-span-4 text-sm text-stone-700 truncate" title={arm.currentTask}>
        {arm.currentTask || "—"}
      </div>

      {/* Queue count */}
      <div className="col-span-2 text-sm text-stone-600 text-center">
        {arm.queueCount}
      </div>

      {/* Last cost */}
      <div className="col-span-2 text-sm text-stone-500 text-center">
        {arm.lastCost.toFixed(2)}¢
      </div>

      {/* Status pill */}
      <div className="col-span-2 text-right">
        <StatusPill status={arm.status} />
      </div>
    </div>
  );
}

// ---------- Main component ----------
export default function ArmsQueue() {
  const [arms, setArms] = useState<ArmStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/arms/status");
      if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
      const data: ArmsStatusResponse = await res.json();
      setArms(data.arms);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus(); // initial fetch
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // ---------- Header row ----------
  const header = (
    <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-500 border-b border-stone-300 bg-stone-50">
      <div className="col-span-2">Arm</div>
      <div className="col-span-4">Current Task</div>
      <div className="col-span-2 text-center">Queue</div>
      <div className="col-span-2 text-center">Last Cost</div>
      <div className="col-span-2 text-right">Status</div>
    </div>
  );

  // ---------- Body ----------
  const body = loading ? (
    <div className="flex justify-center py-6 text-stone-400">Loading...</div>
  ) : error ? (
    <div className="flex justify-center py-6 text-red-500 text-sm">{error}</div>
  ) : arms.length === 0 ? (
    <div className="flex justify-center py-6 text-stone-400">No arm data</div>
  ) : (
    arms.map((arm) => <ArmRow key={arm.name} arm={arm} />)
  );

  // ---------- Render ----------
  return (
    <div className="rounded-lg border border-stone-200 bg-white shadow-sm">
      <div className="px-4 py-3 border-b border-stone-200">
        <h2 className="text-base font-semibold text-stone-900">Arms Queue</h2>
        <p className="text-xs text-stone-500 mt-0.5">Auto-refresh every 15s</p>
      </div>
      {header}
      <div className="max-h-[400px] overflow-y-auto">{body}</div>
    </div>
  );
}