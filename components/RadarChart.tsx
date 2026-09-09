import { outerGridPolygon, axisLines, dataPolygon, axisLabels } from "@/lib/radar";
import type { RadarScores } from "@/lib/watches";

export default function RadarChart({ radar }: { radar: RadarScores }) {
  const axes = Object.keys(radar);
  const lines = axisLines(axes.length);
  const labels = axisLabels(radar, axes);

  return (
    <svg viewBox="0 0 600 600" width="100%" height="auto">
      <polygon points={outerGridPolygon(1, axes.length)} fill="none" stroke="#E5E5E5" strokeWidth={1.5} />
      <polygon points={outerGridPolygon(0.5, axes.length)} fill="none" stroke="#E5E5E5" strokeWidth={1} />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#E5E5E5" />
      ))}
      <polygon
        points={dataPolygon(radar, axes)}
        fill="#111111"
        fillOpacity={0.12}
        stroke="#8B1D16"
        strokeWidth={2.5}
      />
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
  );
}
