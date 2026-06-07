"use client";
// LivePulse · top-right corner live-tick · "alive · Xs ago" + 440Hz easter-egg click
// Per #27840 alive-not-noise · video evidence Hermes-OS live-counters tick
// Polls /api/presence/ping every 5s · pulses emerald-dot

import { useEffect, useState } from "react";

export default function LivePulse() {
  const [lastTick, setLastTick] = useState<number>(Date.now());
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function poll() {
      try {
        const r = await fetch("/api/presence/ping", { cache: "no-store" });
        if (!mounted) return;
        if (r.ok) {
          setLastTick(Date.now());
          setAlive(true);
        } else {
          setAlive(false);
        }
      } catch {
        if (mounted) setAlive(false);
      }
    }
    poll();
    const id = setInterval(poll, 5000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const secAgo = Math.max(0, Math.floor((now - lastTick) / 1000));

  function beat() {
    try {
      const AnyWindow = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
      const Ctx = AnyWindow.AudioContext || AnyWindow.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 440;
      osc.type = "sine";
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 50);
    } catch {}
  }

  return (
    <button
      onClick={beat}
      title="click for a tone · house alive"
      className="fixed top-3 right-4 z-[60] flex items-center gap-2 rounded-full border border-emerald-700/40 bg-zinc-950/80 px-3 py-1.5 backdrop-blur-sm hover:border-emerald-500/60 transition"
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          alive
            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
            : "bg-rose-500"
        }`}
      />
      <span className="text-xs font-mono text-emerald-200/80">
        {alive ? `alive · ${secAgo}s` : "off · check arms"}
      </span>
    </button>
  );
}
