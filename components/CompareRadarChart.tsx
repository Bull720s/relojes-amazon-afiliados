import { outerGridPolygon, axisLines, dataPolygon, axisLabelsGeneric } from "@/lib/radar";
import type { RadarScores } from "@/lib/watches";

const COLORS = ["#8B1D16", "#111111", "#6F6F6F"];

export default function CompareRadarChart({
  series,
}: {
  series: { radar: RadarScores; label: string }[];
}) {
  const lines = axisLines();
  const labels = axisLabelsGeneric();

  return (
    <div>
      <svg viewBox="0 0 600 600" width="100%" height="auto">
        <polygon points={outerGridPolygon(1)} fill="none" stroke="#E5E5E5" strokeWidth={1.5} />
        <polygon points={outerGridPolygon(0.5)} fill="none" stroke="#E5E5E5" strokeWidth={1} />
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#E5E5E5" />
        ))}
        {series.map((s, i) => (
          <polygon
            key={i}
            points={dataPolygon(s.radar)}
            fill={COLORS[i % COLORS.length]}
            fillOpacity={0.08}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2.5}
          />
        ))}
        {labels.map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor as "start" | "middle" | "end"}
            fontFamily="var(--font-worksans)"
            fontSize={17}
            letterSpacing="0.02em"
            fill="#6F6F6F"
          >
            {l.text}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[13px] tracking-wide">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
