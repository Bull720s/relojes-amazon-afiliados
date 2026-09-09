"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getShortDescription, type Watch } from "@/lib/watches";

export default function WatchCard({ watch }: { watch: Watch }) {
  return (
    <Link href={`/relojes/${watch.id}`} className="group block">
      <motion.div
        whileHover={{ opacity: 0.92 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative aspect-[4/5] bg-brass-soft flex items-center justify-center mb-6 overflow-hidden"
      >
        <div className="absolute top-4 left-4 text-[11px] tracking-[0.12em] uppercase text-ink-soft z-10">
          {watch.tag}
        </div>
        <motion.svg
          whileHover={{ scale: 1.12 }}
          className="absolute bottom-4 right-4 z-10"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path d="M12 21s-7.5-4.6-10-9.2C.5 8.4 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.5C11 6.1 12.4 5 14.4 5c3.4 0 5.2 3.4 3.7 6.8C15.5 16.4 12 21 12 21z" />
        </motion.svg>
        {watch.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={watch.imagen}
            alt={watch.nombre}
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
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
            <path d="M9 2.5h6M9 21.5h6" />
          </svg>
        )}
      </motion.div>
      <div className="text-center px-2">
        <div className="font-sans uppercase font-semibold text-[15px] tracking-[0.06em] leading-snug mb-3">
          {watch.nombre}
        </div>
        <div className="font-serif text-[16px] text-ink-soft leading-relaxed mb-4">
          {getShortDescription(watch)}
        </div>
        <div className="font-sans font-semibold text-[16px] tracking-[0.04em]">{watch.precio_mxn}</div>
      </div>
    </Link>
  );
}
