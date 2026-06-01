type Arm = {
  id: string;
  name: string;
  status: string;
  percent: number;
};

type MainBrain = {
  id: string;
  name: string;
  status: string;
};

function statusFill(status: string): string {
  if (status === "alive") return "#5eead4";
  if (status === "queued") return "#f4a261";
  if (status === "broken") return "#fca5a5";
  if (status === "designed") return "#93c5fd";
  return "#9ca3af";
}

export function OctopusMap({
  mainBrain,
  arms,
}: {
  mainBrain: MainBrain;
  arms: Arm[];
}) {
  const CX = 400;
  const CY = 200;
  const R_BRAIN = 50;
  const ARM_RADIUS = 165;

  const points = arms.map((arm, i) => {
    const angle = (i / arms.length) * Math.PI * 2 - Math.PI / 2;
    const ax = CX + Math.cos(angle) * ARM_RADIUS;
    const ay = CY + Math.sin(angle) * ARM_RADIUS;
    const tipAngle = angle;
    const cx1 = CX + Math.cos(angle) * (R_BRAIN + 20);
    const cy1 = CY + Math.sin(angle) * (R_BRAIN + 20);
    const wobble = Math.cos(angle + Math.PI / 3) * 30;
    const cx2 = CX + Math.cos(angle) * 110 + wobble;
    const cy2 = CY + Math.sin(angle) * 110 - wobble;
    return { arm, ax, ay, cx1, cy1, cx2, cy2, tipAngle, angle, i };
  });

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-[var(--paper)]/12 bg-gradient-to-br from-[var(--bg-deep)] to-[#0d0f12] px-4 py-6 md:px-8 md:py-8">
      <svg
        viewBox="0 0 800 400"
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="octopus arm-fleet visualization"
      >
        <defs>
          <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4a261" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#f4a261" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f4a261" stopOpacity="0" />
          </radialGradient>
          <filter id="arm-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r={R_BRAIN * 2.8} fill="url(#brain-glow)" />

        {points.map(({ arm, ax, ay, cx1, cy1, cx2, cy2, i }) => {
          const fill = statusFill(arm.status);
          const path = `M ${CX} ${CY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${ax} ${ay}`;
          return (
            <g key={arm.id}>
              <path
                d={path}
                fill="none"
                stroke={fill}
                strokeWidth="2"
                strokeOpacity="0.55"
                strokeLinecap="round"
              />
              {arm.status === "alive" && (
                <circle r="3" fill={fill} opacity="0.85">
                  <animateMotion
                    dur={`${4 + (i % 3)}s`}
                    repeatCount="indefinite"
                    path={path}
                    calcMode="linear"
                  />
                </circle>
              )}
            </g>
          );
        })}

        <circle
          cx={CX}
          cy={CY}
          r={R_BRAIN}
          fill="#0a0a0a"
          stroke="#f4a261"
          strokeOpacity="0.75"
          strokeWidth="1.5"
        />
        <circle cx={CX} cy={CY} r={R_BRAIN - 4} fill="none" stroke="#f4a261" strokeOpacity="0.25" strokeWidth="1">
          <animate attributeName="r" values={`${R_BRAIN - 4};${R_BRAIN + 14};${R_BRAIN - 4}`} dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <text
          x={CX}
          y={CY - 2}
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="10"
          letterSpacing="2"
          fill="#f4a261"
          fillOpacity="0.95"
        >
          ATLAS
        </text>
        <text
          x={CX}
          y={CY + 12}
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="7"
          letterSpacing="1"
          fill="#f4a261"
          fillOpacity="0.55"
        >
          main brain
        </text>

        {points.map(({ arm, ax, ay, angle }) => {
          const labelOffsetX = Math.cos(angle) * 28;
          const labelOffsetY = Math.sin(angle) * 28;
          const lx = ax + labelOffsetX;
          const ly = ay + labelOffsetY;
          const anchor = Math.cos(angle) > 0.3 ? "start" : Math.cos(angle) < -0.3 ? "end" : "middle";
          const fill = statusFill(arm.status);
          const armLabel = arm.name.split(" · ")[0];
          return (
            <g key={`${arm.id}-label`}>
              <circle
                cx={ax}
                cy={ay}
                r="7"
                fill={fill}
                fillOpacity={arm.status === "alive" ? "0.95" : "0.65"}
                filter="url(#arm-glow)"
              />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                fontFamily="var(--font-spectral), serif"
                fontStyle="italic"
                fontSize="12"
                fill="#f5f1e8"
                fillOpacity="0.85"
              >
                {armLabel}
              </text>
              <text
                x={lx}
                y={ly + 14}
                textAnchor={anchor}
                fontFamily="var(--font-jetbrains-mono), monospace"
                fontSize="9"
                fill={fill}
                fillOpacity="0.7"
              >
                {arm.percent}%
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono tracking-wider">
        <span className="flex items-center gap-1.5 text-emerald-300/80">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
          alive
        </span>
        <span className="flex items-center gap-1.5 text-[var(--pulse-warm)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--pulse-warm)]" />
          queued
        </span>
        <span className="flex items-center gap-1.5 text-blue-300/80">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-300" />
          designed
        </span>
        <span className="flex items-center gap-1.5 text-red-300/80">
          <span className="inline-block h-2 w-2 rounded-full bg-red-300" />
          broken
        </span>
      </div>
    </div>
  );
}
