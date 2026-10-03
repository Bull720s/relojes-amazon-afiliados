"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StaggerGrid, StaggerItem } from "@/components/FadeIn";
import WatchCard, { WatchImage } from "@/components/WatchCard";
import { getShortDescription, getPrecioLabel, type Watch } from "@/lib/watches";

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
    <Link href={`/relojes/${watch.id}`} className="group flex items-center gap-5 md:gap-8 py-5 border-b border-line">
      <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-brass-soft flex items-center justify-center overflow-hidden">
        <WatchImage
          watch={watch}
          className="max-h-[72%] max-w-[72%] transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-[0.06em] text-ink-soft mb-1.5">{watch.tag}</div>
        <div className="text-[14px] uppercase tracking-[0.04em] leading-snug mb-1.5">{watch.nombre}</div>
        <div className="text-[13px] text-ink-soft">{getShortDescription(watch)}</div>
      </div>
      <div className="text-[13px] text-ink-soft shrink-0 text-right">{getPrecioLabel(watch)}</div>
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
    <div className="px-5 md:px-8 pt-14 pb-24 border-t border-line">
      <h2 className="text-[22px] md:text-[28px] uppercase tracking-[0.02em] mb-10">Todos los relojes</h2>

      <div className="relative flex items-center justify-between border-b border-line pb-4 mb-8 text-[13px] md:text-[14px] uppercase tracking-[0.04em]">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => {
              setFilterOpen((v) => !v);
              setSortOpen(false);
            }}
            className="flex items-center gap-2.5 uppercase"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
              <path d="M16 4v4M10 10v4M18 16v4" />
            </svg>
            Filtros{selectedCategories.length ? ` (${selectedCategories.length})` : ""}
          </button>
          <button
            type="button"
            onClick={() => {
              setSortOpen((v) => !v);
              setFilterOpen(false);
            }}
            className="hidden sm:flex items-center gap-2 uppercase text-ink-soft hover:text-ink"
          >
            {SORT_LABELS[sortBy]}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "cuadricula" ? "catalogo" : "cuadricula")}
            className="hidden md:inline uppercase text-ink-soft hover:text-ink"
          >
            {viewMode === "cuadricula" ? "Vista lista" : "Vista cuadrícula"}
          </button>
          <span className="normal-case text-ink-soft">{visibleWatches.length} modelos</span>
        </div>

        {filterOpen && (
          <div className="absolute top-full left-0 mt-px z-20 bg-white border border-line w-[280px] max-h-[340px] overflow-y-auto normal-case tracking-normal">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 px-4 py-3 text-[13px] cursor-pointer hover:bg-brass-soft"
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
                className="w-full text-left px-4 py-3 text-[12px] uppercase text-ink-soft hover:text-ink border-t border-line"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {sortOpen && (
          <div className="absolute top-full left-0 sm:left-40 mt-px z-20 bg-white border border-line w-[240px] normal-case tracking-normal">
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  setSortBy(opt);
                  setSortOpen(false);
                }}
                className={`px-4 py-3 text-[13px] cursor-pointer hover:bg-brass-soft ${
                  opt === sortBy ? "text-ink font-bold" : "text-ink-soft"
                }`}
              >
                {SORT_LABELS[opt]}
              </div>
            ))}
          </div>
        )}
      </div>

      {visibleWatches.length === 0 ? (
        <div className="text-center text-ink-soft text-[14px] py-20">No hay modelos con esos filtros.</div>
      ) : viewMode === "cuadricula" ? (
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {visibleWatches.map((w) => (
            <StaggerItem key={w.id}>
              <WatchCard watch={w} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <StaggerGrid className="flex flex-col border-t border-line">
          {visibleWatches.map((w) => (
            <StaggerItem key={w.id}>
              <WatchListItem watch={w} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
