export function AmbientMoneyBar() {
  const show = process.env.BROTHER_VIEW === "true";

  if (!show) {
    return null;
  }

  const current = 0;
  const goal = 5000;
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--paper)]/10 bg-[var(--dim-blue)]"
      aria-label="Mac mini fund progress"
    >
      <div className="flex items-center justify-between px-6 py-1.5 text-[10px] tracking-wider text-[var(--paper)]/50">
        <span>Mac mini fund · {current}/{goal}</span>
        <span className="text-[var(--pulse-warm)]/60">{progress.toFixed(0)}%</span>
      </div>
      <div className="h-px w-full bg-[var(--paper)]/5">
        <div
          className="h-full bg-[var(--pulse-warm)]/40 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
