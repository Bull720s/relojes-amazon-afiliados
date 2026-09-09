import type { RadarScores } from "@/lib/watches";

const CENTER = 300;
const SCALE = 22; // px per point (max score 10 -> radius 220)

function axisPoint(index: number, total: number, radius: number) {
  const angle = (-90 + index * (360 / total)) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

export function outerGridPolygon(fraction: number, axesCount: number): string {
  return Array.from({ length: axesCount }, (_, i) => {
    const p = axisPoint(i, axesCount, 220 * fraction);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
}

export function axisLines(axesCount: number): { x1: number; y1: number; x2: number; y2: number }[] {
  return Array.from({ length: axesCount }, (_, i) => {
    const p = axisPoint(i, axesCount, 220);
    return { x1: CENTER, y1: CENTER, x2: p.x, y2: p.y };
  });
}

export function dataPolygon(radar: RadarScores, axes: string[]): string {
  return axes
    .map((axis, i) => {
      const score = radar[axis] ?? 0;
      const p = axisPoint(i, axes.length, score * SCALE);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

export function axisLabels(radar: RadarScores, axes: string[]): { x: number; y: number; anchor: string; text: string }[] {
  return axes.map((axis, i) => {
    const p = axisPoint(i, axes.length, 255);
    let anchor = "middle";
    if (p.x > CENTER + 5) anchor = "start";
    else if (p.x < CENTER - 5) anchor = "end";
    return { x: p.x, y: p.y, anchor, text: `${axis} ${(radar[axis] ?? 0).toFixed(1)}` };
  });
}

export function axisLabelsGeneric(axes: string[]): { x: number; y: number; anchor: string; text: string }[] {
  return axes.map((axis, i) => {
    const p = axisPoint(i, axes.length, 255);
    let anchor = "middle";
    if (p.x > CENTER + 5) anchor = "start";
    else if (p.x < CENTER - 5) anchor = "end";
    return { x: p.x, y: p.y, anchor, text: axis };
  });
}
