const HEARTBEAT_PATH =
  "M0 12 H280 L292 12 L298 4 L304 20 L310 6 L316 18 L322 12 H800";

export function Heartbeat() {
  return (
    <div className="h-6 w-full overflow-hidden md:h-8" aria-hidden="true">
      <svg
        viewBox="0 0 800 24"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d={HEARTBEAT_PATH}
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.5"
          strokeOpacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
        <circle r="3" fill="var(--pulse-warm)" opacity={0.9}>
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path={HEARTBEAT_PATH}
            calcMode="linear"
          />
        </circle>
        <circle r="6" fill="var(--pulse-warm)" opacity={0.25}>
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path={HEARTBEAT_PATH}
            calcMode="linear"
          />
        </circle>
      </svg>
    </div>
  );
}
