"use client";

import Link from "next/link";
import { getPrecioLabel, type Watch } from "@/lib/watches";

export function WatchImage({ watch, className = "" }: { watch: Watch; className?: string }) {
  return watch.imagen ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={watch.imagen} alt={watch.nombre} className={`object-contain mix-blend-multiply ${className}`} />
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth={0.9} className={`w-16 h-16 ${className}`}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
      <path d="M9 2.5h6M9 21.5h6" />
    </svg>
  );
}

export default function WatchCard({ watch }: { watch: Watch }) {
  return (
    <Link href={`/relojes/${watch.id}`} className="group block">
      <div className="relative aspect-square bg-brass-soft flex items-center justify-center overflow-hidden mb-4">
        {watch.tag && (
          <div className="absolute top-3 left-3 z-10 bg-white px-2 py-1 text-[11px] uppercase tracking-[0.04em]">
            {watch.tag}
          </div>
        )}
        <WatchImage
          watch={watch}
          className="max-h-[72%] max-w-[72%] transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="text-[13px] uppercase tracking-[0.04em] leading-snug mb-1">{watch.nombre}</div>
      <div className="text-[13px] text-ink-soft">{getPrecioLabel(watch)}</div>
    </Link>
  );
}
