import Link from "next/link";
import { categoryToSlug } from "@/lib/watches";

const NAV = [
  { label: "Automáticos", href: `/categorias/${categoryToSlug("Automáticos")}` },
  { label: "Cuarzo", href: `/categorias/${categoryToSlug("Cuarzo")}` },
  { label: "Smartwatches", href: `/categorias/${categoryToSlug("Smartwatches")}` },
  { label: "Deportivos", href: `/categorias/${categoryToSlug("Deportivos")}` },
  { label: "Lujo", href: "/categorias/lujo" },
  { label: "Guías", href: "/guias" },
  { label: "Comparador", href: "/comparador" },
];

export default function Header({ breadcrumb }: { breadcrumb?: string }) {
  return (
    <>
      <div className="relative bg-wine text-white text-[13px] text-center py-3 px-6 tracking-[0.08em] font-medium">
        <svg
          className="absolute left-6 top-1/2 -translate-y-1/2"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
        ENTREGA SEGURA EN TODO MÉXICO
        <svg
          className="absolute right-6 top-1/2 -translate-y-1/2"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>

      <div className="relative flex items-center justify-between px-5 md:px-8 py-5 bg-white">
        <div className="flex items-center gap-4 md:gap-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.6" y2="16.6" />
          </svg>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif italic font-semibold text-[22px] md:text-[30px] tracking-wide text-ink whitespace-nowrap"
        >
          El Cronista
        </Link>

        <div className="flex items-center gap-4 md:gap-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
        </div>
      </div>

      <div className="bg-white pb-5 pt-1 text-center border-b border-line overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex justify-start md:justify-center gap-7 md:gap-10 text-[14px] md:text-[15px] tracking-wide px-5 md:px-8 w-max mx-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer text-ink-soft hover:text-ink transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {breadcrumb && (
        <div className="px-5 md:px-8 py-5 md:py-6 text-[13px] md:text-[15px] text-ink-soft bg-white">{breadcrumb}</div>
      )}
    </>
  );
}
