import type { RadarScores } from "@/lib/watches";

const AXES = [
  "Diseño",
  "Construcción",
  "Precio-calidad",
  "Precisión",
  "Comodidad",
  "Prestigio",
  "Versatilidad",
] as const;

const CENTER = 300;
const SCALE = 22; // px per point (max score 10 -> radius 220)

function axisPoint(index: number, radius: number) {
  const angle = (-90 + index * (360 / AXES.length)) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

export function outerGridPolygon(fraction: number): string {
  return AXES.map((_, i) => {
    const p = axisPoint(i, 220 * fraction);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
}

export function axisLines(): { x1: number; y1: number; x2: number; y2: number }[] {
  return AXES.map((_, i) => {
    const p = axisPoint(i, 220);
    return { x1: CENTER, y1: CENTER, x2: p.x, y2: p.y };
  });
}

export function dataPolygon(radar: RadarScores): string {
  return AXES.map((axis, i) => {
    const score = radar[axis] ?? 0;
    const p = axisPoint(i, score * SCALE);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
}

export function axisLabels(radar: RadarScores): { x: number; y: number; anchor: string; text: string }[] {
  return AXES.map((axis, i) => {
    const p = axisPoint(i, 255);
    let anchor = "middle";
    if (p.x > CENTER + 5) anchor = "start";
    else if (p.x < CENTER - 5) anchor = "end";
    return { x: p.x, y: p.y, anchor, text: `${axis} ${(radar[axis] ?? 0).toFixed(1)}` };
  });
}

export function axisLabelsGeneric(): { x: number; y: number; anchor: string; text: string }[] {
  return AXES.map((axis, i) => {
    const p = axisPoint(i, 255);
    let anchor = "middle";
    if (p.x > CENTER + 5) anchor = "start";
    else if (p.x < CENTER - 5) anchor = "end";
    return { x: p.x, y: p.y, anchor, text: axis };
  });
}

export { AXES };
