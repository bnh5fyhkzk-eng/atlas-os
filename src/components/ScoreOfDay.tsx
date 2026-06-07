// ScoreOfDay · Picture-2 inspired · "Today at a glance · Score N/100"
// Per HOUSE-FULL-PLAN-2026-06-07 G1 · brother-TDAH-friendly single-number
// Score derived from honest signals · not vanity-stat

interface Props {
  bankedToday: number;
  highArousal: number;
  armsAlive: number;
  armsTotal: number;
}

function computeScore({ bankedToday, highArousal, armsAlive, armsTotal }: Props): { score: number; tone: string } {
  // honest crude composite · brain-activity (40) · arousal-quality (30) · arms-health (30)
  const brainPart = Math.min(40, Math.round((bankedToday / 50) * 40));
  const arousalPart = Math.min(30, Math.round((highArousal / 20) * 30));
  const armsPart = armsTotal > 0 ? Math.round((armsAlive / armsTotal) * 30) : 0;
  const score = brainPart + arousalPart + armsPart;
  let tone = "ember";
  if (score >= 80) tone = "emerald";
  else if (score >= 60) tone = "amber";
  else if (score >= 40) tone = "sky";
  else tone = "rose";
  return { score, tone };
}

export default function ScoreOfDay(props: Props) {
  const { score, tone } = computeScore(props);
  const colors: Record<string, string> = {
    emerald: "from-emerald-950/60 to-zinc-950 border-emerald-700/40 text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.18)]",
    amber: "from-amber-950/60 to-zinc-950 border-amber-700/40 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.18)]",
    sky: "from-sky-950/60 to-zinc-950 border-sky-700/40 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.18)]",
    rose: "from-rose-950/60 to-zinc-950 border-rose-700/40 text-rose-300 shadow-[0_0_24px_rgba(251,113,133,0.18)]",
    ember: "from-zinc-900/60 to-zinc-950 border-zinc-700 text-zinc-200",
  };
  return (
    <section className={`mb-8 rounded-2xl border bg-gradient-to-br p-6 md:p-7 ${colors[tone]}`}>
      <div className="flex items-baseline justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">today at a glance</p>
          <p className="text-sm opacity-70 italic">Sunday · alive-pass + yesterday-doc gaps</p>
        </div>
        <div className="text-right">
          <p className="text-5xl md:text-6xl font-mono font-semibold leading-none">{score}<span className="text-2xl opacity-50">/100</span></p>
          <p className="text-[10px] uppercase tracking-widest opacity-60 mt-2">brain · arousal · arms</p>
        </div>
      </div>
    </section>
  );
}
