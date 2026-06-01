const HEARTBEAT_PATH =
  "M0 6 H280 L292 6 L298 2 L304 10 L310 3 L316 9 L322 6 H800";

export function Heartbeat() {
  return (
    <div className="h-3 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 800 12"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d={HEARTBEAT_PATH}
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1"
          strokeOpacity={0.3}
          vectorEffect="non-scaling-stroke"
        />
        <circle r="1.5" fill="var(--pulse-warm)" opacity={0.65}>
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path={HEARTBEAT_PATH}
            calcMode="linear"
          />
        </circle>
      </svg>
    </div>
  );
}
