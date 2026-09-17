"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerGrid, StaggerItem } from "@/components/FadeIn";
import WatchCard from "@/components/WatchCard";
import { getShortDescription, type Watch } from "@/lib/watches";

type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "nombre";
type ViewMode = "cuadricula" | "catalogo";

const SORT_LABELS: Record<SortOption, string> = {
  relevancia: "Relevancia",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  nombre: "Nombre A-Z",
};

function parsePrice(precio_mxn: string): number | null {
  const num = parseFloat(precio_mxn.replace(/[^0-9.]/g, ""));
  return Number.isNaN(num) ? null : num;
}

function WatchListItem({ watch }: { watch: Watch }) {
  return (
    <Link href={`/relojes/${watch.id}`} className="group flex items-center gap-6 py-6 border-b border-line">
      <motion.div
        whileHover={{ opacity: 0.92 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 bg-brass-soft flex items-center justify-center overflow-hidden"
      >
        {watch.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={watch.imagen}
            alt={watch.nombre}
            className="max-h-[70%] max-w-[70%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth={0.9}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
            <path d="M9 2.5h6M9 21.5h6" />
          </svg>
        )}
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] tracking-[0.12em] uppercase text-ink-soft mb-1.5">{watch.tag}</div>
        <div className="font-sans uppercase font-semibold text-[15px] tracking-[0.06em] leading-snug mb-1.5">
          {watch.nombre}
        </div>
        <div className="font-serif text-[15px] text-ink-soft leading-relaxed">{getShortDescription(watch)}</div>
      </div>
      <div className="font-sans font-semibold text-[16px] tracking-[0.04em] shrink-0">{watch.precio_mxn}</div>
    </Link>
  );
}

export default function WatchesExplorer({ watches, categories }: { watches: Watch[]; categories: string[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");
  const [viewMode, setViewMode] = useState<ViewMode>("cuadricula");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const visibleWatches = useMemo(() => {
    const filtered = selectedCategories.length
      ? watches.filter((w) => w.categorias.some((c) => selectedCategories.includes(c)))
      : watches;

    const sorted = [...filtered];
    if (sortBy === "nombre") {
      sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (sortBy === "precio-asc" || sortBy === "precio-desc") {
      sorted.sort((a, b) => {
        const pa = parsePrice(a.precio_mxn);
        const pb = parsePrice(b.precio_mxn);
        if (pa === null && pb === null) return 0;
        if (pa === null) return 1;
        if (pb === null) return -1;
        return sortBy === "precio-asc" ? pa - pb : pb - pa;
      });
    }
    return sorted;
  }, [watches, selectedCategories, sortBy]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  return (
    <>
      <div className="flex justify-center border-t border-b border-line relative">
        <div
          onClick={() => {
            setFilterOpen((v) => !v);
            setSortOpen(false);
          }}
          className="flex-1 max-w-[220px] flex items-center justify-center gap-3 py-5 border-r border-line text-[13px] tracking-[0.14em] uppercase cursor-pointer select-none"
        >
          Filtrar{selectedCategories.length ? ` (${selectedCategories.length})` : ""}
        </div>
        <div
          onClick={() => {
            setSortOpen((v) => !v);
            setFilterOpen(false);
          }}
          className="flex-1 max-w-[220px] flex items-center justify-center gap-3 py-5 text-[13px] tracking-[0.14em] uppercase cursor-pointer select-none"
        >
          {SORT_LABELS[sortBy]}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {filterOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-20 bg-white border border-line w-[280px] max-h-[320px] overflow-y-auto shadow-sm">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 px-5 py-3 text-[13px] tracking-wide cursor-pointer hover:bg-brass-soft/40"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-ink"
                />
                {cat}
              </label>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="w-full text-left px-5 py-3 text-[13px] tracking-wide uppercase text-ink-soft hover:text-ink border-t border-line"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {sortOpen && (
          <div className="absolute top-full right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 z-20 bg-white border border-line w-[240px] shadow-sm">
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  setSortBy(opt);
                  setSortOpen(false);
                }}
                className={`px-5 py-3 text-[13px] tracking-wide cursor-pointer hover:bg-brass-soft/40 ${
                  opt === sortBy ? "text-ink font-semibold" : "text-ink-soft"
                }`}
              >
                {SORT_LABELS[opt]}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="font-serif italic text-[19px] text-center text-ink-soft pt-8 pb-6">
        {visibleWatches.length} Modelos
      </div>

      <div className="flex justify-center items-center gap-8 pb-10 text-[15px] tracking-wide">
        <div
          onClick={() => setViewMode("cuadricula")}
          className={`flex items-center gap-2.5 cursor-pointer select-none ${
            viewMode === "cuadricula" ? "text-ink" : "text-ink-soft"
          }`}
        >
          Cuadrícula
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" />
            <rect x="13" y="3" width="8" height="8" />
            <rect x="3" y="13" width="8" height="8" />
            <rect x="13" y="13" width="8" height="8" />
          </svg>
        </div>
        <div
          onClick={() => setViewMode("catalogo")}
          className={`flex items-center gap-2.5 cursor-pointer select-none ${
            viewMode === "catalogo" ? "text-ink" : "text-ink-soft"
          }`}
        >
          Catálogo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
            <rect x="3" y="3" width="18" height="18" />
          </svg>
        </div>
      </div>

      {visibleWatches.length === 0 ? (
        <div className="text-center text-ink-soft text-[15px] pb-24">No hay modelos con esos filtros.</div>
      ) : viewMode === "cuadricula" ? (
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 px-6 md:px-14 pb-24">
          {visibleWatches.map((w) => (
            <StaggerItem key={w.id}>
              <WatchCard watch={w} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <StaggerGrid className="flex flex-col px-6 md:px-14 pb-24 border-t border-line">
          {visibleWatches.map((w) => (
            <StaggerItem key={w.id}>
              <WatchListItem watch={w} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </>
  );
}
