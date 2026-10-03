"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { WatchImage } from "@/components/WatchCard";
import { getPrecioLabel, type Watch } from "@/lib/watches";

export default function HeroCarousel({ watches }: { watches: Watch[] }) {
  const [i, setI] = useState(0);
  const n = watches.length;
  const at = (k: number) => watches[(k + n) % n];

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);

  const actual = at(i);

  return (
    <section className="relative flex flex-col items-center px-5 md:px-8 pt-10 md:pt-16 pb-16">
      <div className="relative w-full flex items-center justify-between h-[52vh] min-h-[320px] max-h-[560px]">
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => setI((v) => (v - 1 + n) % n)}
          className="w-[18%] h-full flex items-center justify-center opacity-40 grayscale hover:opacity-70 transition-opacity"
        >
          <WatchImage watch={at(i - 1)} className="max-h-[45%] max-w-full" />
        </button>

        <Link href={`/relojes/${actual.id}`} className="relative w-[50%] h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={actual.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <WatchImage watch={actual} className="max-h-[85%] max-w-full" />
            </motion.div>
          </AnimatePresence>
        </Link>

        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => setI((v) => (v + 1) % n)}
          className="w-[18%] h-full flex items-center justify-center opacity-40 grayscale hover:opacity-70 transition-opacity"
        >
          <WatchImage watch={at(i + 1)} className="max-h-[45%] max-w-full" />
        </button>
      </div>

      <div className="text-center mt-8 mb-10 min-h-[44px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={actual.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-[13px] md:text-[14px] uppercase tracking-[0.04em]">{actual.nombre}</div>
            <div className="text-[13px] text-ink-soft mt-1">{getPrecioLabel(actual)}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <a
        href="#catalogo"
        className="bg-ink text-white px-10 py-4 text-[13px] uppercase tracking-[0.06em] hover:opacity-85 transition-opacity"
      >
        Ver todos
      </a>
    </section>
  );
}
