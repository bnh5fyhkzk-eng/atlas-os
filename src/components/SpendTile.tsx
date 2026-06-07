// SpendTile · honest-gap AI spend placeholder per HOUSE-FULL-PLAN G1
// Per #27593 honest-gaps-named · NOT vanity · NOT fake-data
// Reads brain-stats.json (free signal) + names what's missing

interface Props {
  bankedToday: number;
  bankedWeek: number;
}

export default function SpendTile({ bankedToday, bankedWeek }: Props) {
  return (
    <article className="block border border-amber-800/40 hover:border-amber-600/50 rounded-lg p-5 bg-zinc-900/40 shadow-[0_0_18px_rgba(245,158,11,0.10)]">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">AI · spend (honest gap)</p>
      <p className="text-3xl font-mono font-semibold text-amber-400">~tokens</p>
      <p className="text-xs text-zinc-400 mt-2 italic leading-snug">
        Per-AI per-skill spend not yet tracked. Brain v3 banks {bankedToday} today · {bankedWeek} this week · proxy for activity.
      </p>
      <p className="text-[10px] text-zinc-600 italic mt-2">
        next · per-model cost-breakout · LaunchAgent burn-rate · honest claim on #27593
      </p>
    </article>
  );
}
