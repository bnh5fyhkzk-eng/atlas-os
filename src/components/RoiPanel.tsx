// RoiPanel · invisible-work counters · #27840 video-evidence ROI-surfaces-hidden-compounding
// Reads existing public/workshop.json schema

interface WorkshopData {
  generated_at?: string;
  me_tools_count?: number;
  me_tools_sh?: number;
  me_tools_py?: number;
  skill_proposals_7d?: { name: string; mtime_iso?: string }[];
  launch_agents?: string[];
  recent_scripts?: { name: string; mtime_iso?: string }[];
}

interface ArmsLite {
  arms?: { name: string; last_fire?: string }[];
}

interface Props {
  workshop: WorkshopData | null;
  arms: ArmsLite | null;
}

export default function RoiPanel({ workshop, arms }: Props) {
  const totalTools = workshop?.me_tools_count ?? ((workshop?.me_tools_sh ?? 0) + (workshop?.me_tools_py ?? 0));
  const agents = workshop?.launch_agents ?? [];
  const skillsSharpened = workshop?.skill_proposals_7d?.length ?? 0;
  const armsFiredRecently = (arms?.arms ?? []).filter((a) => !!a.last_fire).length;
  const estHoursSaved = (armsFiredRecently * 0.2).toFixed(1);

  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-medium text-sky-100">Invisible work · counters</h2>
        <p className="text-xs text-zinc-500 italic">crude estimates · honest gaps below</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RoiStat label="me-tools" value={totalTools.toString()} accent="sky" sub={`bash ${workshop?.me_tools_sh ?? 0} · py ${workshop?.me_tools_py ?? 0}`} />
        <RoiStat label="LaunchAgents" value={agents.length.toString()} accent="amber" sub="cron-substrate alive" />
        <RoiStat label="Skills 7d" value={skillsSharpened.toString()} accent="emerald" sub="proposed · sharpened" />
        <RoiStat label="~hours saved" value={estHoursSaved} accent="rose" sub={`${armsFiredRecently} arms fired recently · 12min/run`} />
      </div>
      <p className="text-[11px] text-zinc-600 italic mt-3">
        gap · per-arm cost · token-spend per-model · skill-effective-rate (#27593) · not yet tracked
      </p>
    </section>
  );
}

function RoiStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "emerald" | "sky" | "amber" | "rose";
}) {
  const colors = {
    emerald: "border-emerald-800/40 text-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.10)]",
    sky: "border-sky-800/40 text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.10)]",
    amber: "border-amber-800/40 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.10)]",
    rose: "border-rose-800/40 text-rose-300 shadow-[0_0_16px_rgba(251,113,133,0.10)]",
  };
  return (
    <div className={`rounded-lg border bg-zinc-900/40 p-4 ${colors[accent]}`}>
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
      <p className="text-2xl font-mono font-semibold">{value}</p>
      <p className="text-[11px] text-zinc-500 mt-1">{sub}</p>
    </div>
  );
}
