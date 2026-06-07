// PersonaSeal · inline SVG emblems for each arm-persona
// Zero external deps · canon-safe · scales clean
// Per #27840 video evidence personas-as-figures-feel-alive

interface SealProps {
  emblem: "caduceus" | "owl" | "lyre" | "hammer" | "globe" | "wings" | "moon";
  className?: string;
}

export default function PersonaSeal({ emblem, className = "" }: SealProps) {
  const stroke = "currentColor";
  const sw = 1.4;
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="46" opacity="0.15" />
      {emblem === "caduceus" && (
        <g>
          <line x1="50" y1="15" x2="50" y2="85" />
          <path d="M50 25 Q35 35 50 45 Q65 55 50 65 Q35 75 50 85" opacity="0.9" />
          <path d="M50 25 Q65 35 50 45 Q35 55 50 65 Q65 75 50 85" opacity="0.9" />
          <path d="M40 15 Q50 5 60 15" />
        </g>
      )}
      {emblem === "owl" && (
        <g>
          <circle cx="38" cy="42" r="10" />
          <circle cx="62" cy="42" r="10" />
          <circle cx="38" cy="42" r="3" fill={stroke} />
          <circle cx="62" cy="42" r="3" fill={stroke} />
          <path d="M30 55 Q50 75 70 55 Q70 85 50 85 Q30 85 30 55Z" opacity="0.85" />
          <path d="M30 30 L25 18 M70 30 L75 18" />
        </g>
      )}
      {emblem === "lyre" && (
        <g>
          <path d="M30 25 Q25 50 35 75 M70 25 Q75 50 65 75" />
          <line x1="40" y1="35" x2="40" y2="75" />
          <line x1="50" y1="32" x2="50" y2="75" />
          <line x1="60" y1="35" x2="60" y2="75" />
          <path d="M30 25 Q50 18 70 25" />
          <ellipse cx="50" cy="80" rx="22" ry="6" opacity="0.9" />
        </g>
      )}
      {emblem === "hammer" && (
        <g>
          <rect x="28" y="22" width="44" height="22" rx="3" />
          <line x1="50" y1="44" x2="50" y2="85" />
          <line x1="40" y1="33" x2="60" y2="33" opacity="0.5" />
        </g>
      )}
      {emblem === "globe" && (
        <g>
          <circle cx="50" cy="50" r="34" />
          <ellipse cx="50" cy="50" rx="34" ry="14" />
          <line x1="16" y1="50" x2="84" y2="50" />
          <path d="M50 16 Q35 50 50 84 M50 16 Q65 50 50 84" />
        </g>
      )}
      {emblem === "wings" && (
        <g>
          <path d="M50 30 Q20 35 15 55 Q35 50 50 60Z" />
          <path d="M50 30 Q80 35 85 55 Q65 50 50 60Z" />
          <line x1="50" y1="30" x2="50" y2="80" />
        </g>
      )}
      {emblem === "moon" && (
        <g>
          <path d="M62 22 Q40 30 40 50 Q40 70 62 78 Q40 78 30 60 Q22 40 40 28 Q52 20 62 22Z" />
          <circle cx="72" cy="40" r="1.6" fill={stroke} />
          <circle cx="78" cy="60" r="1.2" fill={stroke} />
          <circle cx="68" cy="72" r="1.4" fill={stroke} />
        </g>
      )}
    </svg>
  );
}
