"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { categoryToSlug } from "@/lib/watches";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Todos los relojes", href: "/#catalogo" },
  { label: "Automáticos", href: `/categorias/${categoryToSlug("Automáticos")}` },
  { label: "Cuarzo", href: `/categorias/${categoryToSlug("Cuarzo")}` },
  { label: "Smartwatches", href: `/categorias/${categoryToSlug("Smartwatches")}` },
  { label: "Deportivos", href: `/categorias/${categoryToSlug("Deportivos")}` },
  { label: "Lujo", href: "/categorias/lujo" },
  { label: "Joyería", href: "/joyeria" },
  { label: "Tienda", href: "/tienda" },
  { label: "Guías", href: "/guias" },
  { label: "Comparador", href: "/comparador" },
];

export default function Header({ breadcrumb }: { breadcrumb?: string }) {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-line">
        <div className="relative flex items-center justify-between px-5 md:px-8 h-14 text-[12px] md:text-[13px] uppercase tracking-[0.06em]">
          <button type="button" onClick={() => setOpen((v) => !v)} className="uppercase">
            {open ? "Cerrar" : "Menú"}
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-bold italic normal-case text-[17px] md:text-[19px] tracking-[-0.02em] whitespace-nowrap"
            style={{ fontStyle: "italic" }}
          >
            el cronista<sup className="text-[9px] not-italic ml-0.5">TM</sup>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/comparador" className="hidden md:inline hover:opacity-60 transition-opacity">
              Comparar
            </Link>
            <Link href="/guias" className="hidden md:inline hover:opacity-60 transition-opacity">
              Guías
            </Link>
            <Link href="/carrito" className="hover:opacity-60 transition-opacity">
              Carrito{totalItems > 0 ? ` (${totalItems})` : ""}
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-line bg-white"
            >
              <ul className="px-5 md:px-8 py-6 grid grid-cols-1 md:grid-cols-5 gap-y-4 gap-x-8 text-[13px] uppercase tracking-[0.06em]">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="hover:opacity-60 transition-opacity">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {breadcrumb && (
        <div className="px-5 md:px-8 pt-6 text-[12px] uppercase tracking-[0.06em] text-ink-soft">{breadcrumb}</div>
      )}
    </>
  );
}
