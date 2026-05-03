const NEON = "#67e8f9";

const LEO_STARS = [
  // bottom left → right
  { name: "A", x: 10, y: 150, r: 3.5 },
  { name: "B", x: 70, y: 135, r: 2.2 },
  { name: "C", x: 190, y: 130, r: 3.5 },

  // upper structure
  { name: "D", x: 60, y: 90, r: 2.2 },
  { name: "E", x: 145, y: 75, r: 2.4 },

  // right vertical
  { name: "F", x: 178, y: 95, r: 2.8 },

  // top triangle
  { name: "G", x: 140, y: 50, r: 2.2 },
  { name: "H", x: 185, y: 32, r: 3.5 },
  { name: "I", x: 170, y: 20, r: 2.0 },
];

const LEO_LINES: [string, string][] = [
  ["A", "B"],
  ["B", "C"],
  ["A", "D"],
  ["D", "E"],
  ["E", "F"],
  ["F", "C"],
  ["E", "G"],
  ["G", "I"],
  ["I", "H"],
];

type Props = {
  svgWidth: number;
  svgHeight: number;
  onClick?: (cx: number, cy: number) => void;
};

export function LeoConstellation({ svgWidth, svgHeight, onClick }: Props) {
  const isMobile = svgWidth < 768;
  const ox = isMobile ? svgWidth - 300 : svgWidth - 230;
  const oy = isMobile ? svgHeight - 250 : 120;

  const centerX = ox + 100;
  const centerY = oy + 85;

  const sm = Object.fromEntries(LEO_STARS.map((s) => [s.name, s]));

  return (
    <g
      transform={`translate(${ox}, ${oy})`}
      opacity="0.9"
      className={onClick ? "cursor-pointer" : undefined}
      onClick={onClick ? () => onClick(centerX, centerY) : undefined}
    >
      {/* Invisible hit area */}
      {onClick && (
        <rect x={0} y={0} width={210} height={170} fill="transparent" />
      )}

      {/* lines */}
      {LEO_LINES.map(([a, b], i) => (
        <line
          key={i}
          x1={sm[a].x} y1={sm[a].y}
          x2={sm[b].x} y2={sm[b].y}
          stroke={NEON}
          strokeWidth="0.8"
          strokeOpacity="0.35"
        />
      ))}

      {/* stars */}
      {LEO_STARS.map((s, i) => (
        <g key={i} filter="url(#leoGlow)">
          <circle cx={s.x} cy={s.y} r={s.r * 2.5} fill={NEON} opacity="0.08" />
          <circle cx={s.x} cy={s.y} r={s.r * 1.4} fill={NEON} opacity="0.25" />
          <circle cx={s.x} cy={s.y} r={s.r} fill={NEON} />
        </g>
      ))}
    </g>
  );
}
