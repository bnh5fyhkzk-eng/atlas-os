export function Heartbeat() {
  return (
    <div className="h-3 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 800 12"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 6 H280 L292 6 L298 2 L304 10 L310 3 L316 9 L322 6 H800"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1"
          strokeOpacity={0.3}
          vectorEffect="non-scaling-stroke"
          className="animate-pulse-warm"
        />
      </svg>
    </div>
  );
}
