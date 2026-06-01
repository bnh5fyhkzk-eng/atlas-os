export function Heartbeat() {
  return (
    <div
      className="w-full h-3 overflow-hidden opacity-30"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 12"
        className="w-full h-full animate-heartbeat-pulse"
        preserveAspectRatio="none"
      >
        <path
          d="M0 6 H280 L292 6 L298 2 L304 10 L310 3 L316 9 L322 6 H800"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
