"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrecio, type Producto } from "@/lib/propia";

export default function PropiaCard({ item }: { item: Producto }) {
  return (
    <Link href={`/tienda/${item.id}`} className="group block">
      <motion.div
        whileHover={{ opacity: 0.92 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative aspect-[4/5] bg-brass-soft flex items-center justify-center mb-6 overflow-hidden"
      >
        <div className="absolute top-4 left-4 text-[11px] tracking-[0.12em] uppercase text-ink-soft z-10">
          {item.categoria}
        </div>
        {!item.disponible && (
          <div className="absolute top-4 right-4 text-[11px] tracking-[0.12em] uppercase text-white bg-wine px-2 py-1 z-10">
            Agotado
          </div>
        )}
        {item.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imagen}
            alt={item.nombre}
            className="max-h-[70%] max-w-[55%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111111"
            strokeWidth={0.9}
            className="transition-transform duration-500 ease-out group-hover:scale-110"
          >
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
        )}
      </motion.div>
      <div className="text-center px-2">
        <div className="font-sans uppercase font-semibold text-[15px] tracking-[0.06em] leading-snug mb-3">
          {item.nombre}
        </div>
        <div className="font-sans font-semibold text-[16px] tracking-[0.04em]">{formatPrecio(item.precio)}</div>
      </div>
    </Link>
  );
}
