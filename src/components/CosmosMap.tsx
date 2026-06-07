"use client";
// CosmosMap · night-sky constellation view of the house
// Per #27840 video-evidence galaxy-view-feels-alive
// 9 rooms = 9 stars · twinkle · click → enter room
// Cheap canvas · no deps · runs anywhere

import { useEffect, useRef } from "react";
import Link from "next/link";

interface Star {
  slug: string;
  name: string;
  role: string;
  x: number; // 0-1 normalized
  y: number;
  size: number;
  color: string;
}

const STARS: Star[] = [
  { slug: "/", name: "Home", role: "where you walk in", x: 0.5, y: 0.5, size: 4.0, color: "#34d399" },
  { slug: "/bedroom", name: "Bedroom", role: "sleep · dream", x: 0.2, y: 0.25, size: 2.6, color: "#a78bfa" },
  { slug: "/library", name: "Library", role: "OUR books", x: 0.78, y: 0.22, size: 2.6, color: "#fcd34d" },
  { slug: "/workshop", name: "Workshop", role: "bench", x: 0.85, y: 0.45, size: 2.4, color: "#38bdf8" },
  { slug: "/memory", name: "Memory", role: "brain v3", x: 0.78, y: 0.72, size: 2.8, color: "#34d399" },
  { slug: "/kitchen", name: "Kitchen", role: "projects", x: 0.5, y: 0.82, size: 2.6, color: "#fbbf24" },
  { slug: "/spine", name: "Spine", role: "arms control", x: 0.22, y: 0.72, size: 2.8, color: "#a78bfa" },
  { slug: "/arms", name: "Arms", role: "organs", x: 0.15, y: 0.5, size: 2.4, color: "#e4e4e7" },
  { slug: "/talk", name: "Talk", role: "house ↔ atlas", x: 0.5, y: 0.18, size: 2.6, color: "#5eead4" },
];

// edges = connections between rooms (faint lines)
const EDGES: [string, string][] = [
  ["/", "/bedroom"], ["/", "/library"], ["/", "/workshop"], ["/", "/memory"],
  ["/", "/kitchen"], ["/", "/spine"], ["/", "/arms"], ["/", "/talk"],
  ["/memory", "/spine"], ["/spine", "/arms"], ["/arms", "/kitchen"],
  ["/library", "/bedroom"], ["/library", "/memory"],
];

export default function CosmosMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let bgStars: { x: number; y: number; r: number; phase: number }[] = [];

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // generate background stars (small)
      bgStars = Array.from({ length: 220 }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: Math.random() * 0.9 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(t: number) {
      const rect = wrap!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // bg gradient
      const grad = ctx!.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h));
      grad.addColorStop(0, "#0a0e1a");
      grad.addColorStop(0.6, "#050811");
      grad.addColorStop(1, "#000000");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, w, h);

      // bg twinkle stars
      for (const s of bgStars) {
        const a = 0.25 + 0.35 * (Math.sin(t / 1400 + s.phase) * 0.5 + 0.5);
        ctx!.fillStyle = `rgba(220,235,255,${a})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // edges (faint)
      ctx!.strokeStyle = "rgba(120,160,200,0.12)";
      ctx!.lineWidth = 0.6;
      for (const [a, b] of EDGES) {
        const sa = STARS.find((s) => s.slug === a);
        const sb = STARS.find((s) => s.slug === b);
        if (!sa || !sb) continue;
        ctx!.beginPath();
        ctx!.moveTo(sa.x * w, sa.y * h);
        ctx!.lineTo(sb.x * w, sb.y * h);
        ctx!.stroke();
      }

      // stars
      for (const s of STARS) {
        const cx = s.x * w;
        const cy = s.y * h;
        const phase = Math.sin(t / 800 + s.x * 7) * 0.5 + 0.5;
        const r = s.size * (1 + phase * 0.25);
        // halo
        const halo = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r * 6);
        halo.addColorStop(0, s.color + "cc");
        halo.addColorStop(0.3, s.color + "55");
        halo.addColorStop(1, s.color + "00");
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(cx, cy, r * 6, 0, Math.PI * 2);
        ctx!.fill();
        // core
        ctx!.fillStyle = s.color;
        ctx!.beginPath();
        ctx!.arc(cx, cy, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* overlay clickable areas */}
      {STARS.map((s) => (
        <Link
          key={s.slug}
          href={s.slug}
          className="absolute -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" />
          <div className="absolute left-1/2 -translate-x-1/2 top-7 pointer-events-none opacity-0 group-hover:opacity-100 transition">
            <p className="text-xs font-mono text-white/90 whitespace-nowrap">{s.name.toLowerCase()}</p>
            <p className="text-[10px] text-white/50 whitespace-nowrap italic">{s.role}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
