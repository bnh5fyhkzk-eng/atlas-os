// Agent-status strip · GOAL-1-FEEL R6 · 1-line · 9 arms · dot + model + last-cycle
// Live-state from atlas_blocks latest created_by per arm (cheap heuristic until Goal 2 cycle API)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listArms, atlasSupabase, type Arm } from "@/lib/atlas-supabase";

interface ArmPulse {
  arm: Arm;
  lastWrite: string | null;
  model: string | null;
}

const LIVE_WINDOW_MS = 30 * 60 * 1000; // wrote within 30min = live

export function AgentStatusStrip() {
  const navigate = useNavigate();
  const [pulses, setPulses] = useState<ArmPulse[]>([]);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const arms = await listArms();
        // latest block per arm via pages join · single query
        const { data } = await atlasSupabase()
          .from("atlas_blocks")
          .select("created_at, created_by, atlas_pages!inner(arm_slug)")
          .order("created_at", { ascending: false })
          .limit(200);
        const latest = new Map<string, { at: string; by: string }>();
        (data ?? []).forEach((row) => {
          const slug = (row as unknown as { atlas_pages: { arm_slug: string } }).atlas_pages?.arm_slug;
          if (slug && !latest.has(slug)) {
            latest.set(slug, { at: row.created_at as string, by: (row.created_by as string) ?? "" });
          }
        });
        if (!cancel) {
          setPulses(
            arms.map((arm) => ({
              arm,
              lastWrite: latest.get(arm.slug)?.at ?? null,
              model: latest.get(arm.slug)?.by ?? null,
            })),
          );
        }
      } catch {
        if (!cancel) setPulses([]);
      }
    })();
    return () => { cancel = true; };
  }, []);

  if (pulses.length === 0) return null;

  return (
    <div className="atlas-status-strip px-1 py-1">
      {pulses.map(({ arm, lastWrite, model }) => {
        const live = lastWrite ? Date.now() - new Date(lastWrite).getTime() < LIVE_WINDOW_MS : false;
        const ago = lastWrite ? timeAgo(new Date(lastWrite)) : "no cycles yet";
        return (
          <button
            key={arm.slug}
            className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs"
            style={{ color: "var(--atlas-text-soft)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--atlas-hover)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
            onClick={() => navigate(`/arm/${arm.slug}`)}
            title={`${arm.name} · ${ago}${model ? ` · ${model}` : ""}`}
          >
            <span className={"atlas-status-dot " + (live ? "live" : "idle")} />
            <span>{arm.emoji}</span>
            <span className="hidden sm:inline">{arm.name}</span>
            <span className="hidden md:inline" style={{ color: "var(--atlas-text-faint)" }}>{ago}</span>
          </button>
        );
      })}
    </div>
  );
}

function timeAgo(d: Date): string {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}
