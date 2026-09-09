"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CompareRadarChart from "@/components/CompareRadarChart";
import type { Watch } from "@/lib/watches";

const COLORS = ["#8B1D16", "#111111", "#6F6F6F"];
const EMPTY = "__none__";

export default function ComparadorClient({
  watches,
  basePath = "/relojes",
  itemLabel = "Reloj",
}: {
  watches: Watch[];
  basePath?: string;
  itemLabel?: string;
}) {
  const [ids, setIds] = useState<string[]>([watches[0]?.id ?? EMPTY, watches[1]?.id ?? EMPTY, EMPTY]);

  const selected = ids.map((id) => watches.find((w) => w.id === id)).filter(Boolean) as Watch[];

  const specKeys = useMemo(() => {
    const keys = new Set<string>();
    selected.forEach((w) => Object.keys(w.specs).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [selected]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-16 pt-10 pb-4">
        {[0, 1, 2].map((slot) => (
          <div key={slot}>
            <label className="block text-[12px] tracking-[0.12em] uppercase text-ink-soft mb-2">
              {itemLabel} {slot + 1} {slot === 2 && "(opcional)"}
            </label>
            <select
              className="w-full border border-line px-4 py-3 text-[14px] bg-white"
              value={ids[slot]}
              onChange={(e) => {
                const next = [...ids];
                next[slot] = e.target.value;
                setIds(next);
              }}
            >
              {slot === 2 && <option value={EMPTY}>Sin seleccionar</option>}
              {watches.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.nombre}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {selected.length < 2 ? (
        <div className="text-center py-24 px-8 text-ink-soft">
          Selecciona al menos dos {itemLabel === "Reloj" ? "relojes" : "piezas"} para comparar.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto px-6 md:px-16 pb-16">
            <table className="w-full border-collapse text-[15px] min-w-[600px]">
              <thead>
                <tr>
                  <td className="py-4 px-2 w-[24%]" />
                  {selected.map((w, i) => (
                    <td key={w.id} className="py-4 px-2 text-center align-bottom">
                      <Link href={`${basePath}/${w.id}`} className="group">
                        <div
                          className="text-[11px] tracking-[0.12em] uppercase mb-2"
                          style={{ color: COLORS[i % COLORS.length] }}
                        >
                          {w.marca}
                        </div>
                        <div className="font-sans font-semibold uppercase tracking-[0.03em] text-[14px] group-hover:underline">
                          {w.nombre}
                        </div>
                      </Link>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-b border-ink">
                  <td className="py-3.5 px-2 text-ink-soft font-medium">Precio</td>
                  {selected.map((w) => (
                    <td key={w.id} className="py-3.5 px-2 text-center font-semibold">
                      {w.precio_mxn}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-line">
                  <td className="py-3.5 px-2 text-ink-soft">Valoración editorial</td>
                  {selected.map((w) => (
                    <td key={w.id} className="py-3.5 px-2 text-center">
                      {w.puntaje_global.toFixed(1)} / 10
                    </td>
                  ))}
                </tr>
                {specKeys.map((key) => (
                  <tr key={key} className="border-b border-line">
                    <td className="py-3.5 px-2 text-ink-soft">{key}</td>
                    {selected.map((w) => (
                      <td key={w.id} className="py-3.5 px-2 text-center">
                        {w.specs[key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 md:px-16 pb-24 max-w-2xl mx-auto">
            <div className="font-serif text-[26px] text-center mb-8">Valoración por aspecto</div>
            <CompareRadarChart series={selected.map((w) => ({ radar: w.radar, label: w.nombre }))} />
          </div>
        </>
      )}
    </div>
  );
}
