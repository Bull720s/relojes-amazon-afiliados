import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/FadeIn";
import { getAllWatches, getAllCategories, categoryToSlug } from "@/lib/watches";
import { GUIAS } from "@/lib/guias";

export default function Home() {
  const watches = getAllWatches();
  const categories = getAllCategories();

  return (
    <main>
      <Header breadcrumb="Inicio / Relojes" />

      <div className="flex justify-center border-t border-b border-line">
        <div className="flex-1 max-w-[220px] flex items-center justify-center gap-3 py-5 border-r border-line text-[13px] tracking-[0.14em] uppercase cursor-pointer">
          Filtrar
        </div>
        <div className="flex-1 max-w-[220px] flex items-center justify-center gap-3 py-5 text-[13px] tracking-[0.14em] uppercase cursor-pointer">
          Relevancia
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <FadeIn>
        <div className="font-serif italic text-[19px] text-center text-ink-soft pt-8 pb-6">
          {watches.length} Modelos
        </div>
      </FadeIn>

      <div className="flex justify-center items-center gap-8 pb-10 text-[15px] tracking-wide">
        <div className="flex items-center gap-2.5 text-ink cursor-pointer">
          Cuadrícula
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" />
            <rect x="13" y="3" width="8" height="8" />
            <rect x="3" y="13" width="8" height="8" />
            <rect x="13" y="13" width="8" height="8" />
          </svg>
        </div>
        <div className="flex items-center gap-2.5 text-ink cursor-pointer">
          Catálogo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
            <rect x="3" y="3" width="18" height="18" />
          </svg>
        </div>
      </div>

      <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 px-6 md:px-14 pb-24">
        {watches.map((w) => (
          <StaggerItem key={w.id}>
            <WatchCard watch={w} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="px-8 md:px-16 py-16 border-t border-line">
        <FadeIn>
          <div className="font-serif text-[26px] text-center mb-8">Explora por categoría</div>
        </FadeIn>
        <StaggerGrid className="flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <StaggerItem key={cat}>
              <Link
                href={`/categorias/${categoryToSlug(cat)}`}
                className="block border border-line px-5 py-2.5 text-[13px] tracking-wide cursor-pointer text-ink-soft hover:text-ink hover:border-ink transition-colors"
              >
                {cat}
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      <div className="px-8 md:px-16 pt-8 pb-24 border-t border-line">
        <FadeIn>
          <div className="font-serif text-[26px] text-center mb-9">Guías de compra</div>
        </FadeIn>
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUIAS.map((g) => (
            <StaggerItem key={g.slug}>
              <Link href={`/guias/${g.slug}`} className="block border-t border-ink pt-5 h-full group">
                <div className="text-[12px] tracking-[0.1em] uppercase text-ink-soft mb-3">{g.tag}</div>
                <div className="font-serif text-[21px] leading-snug group-hover:underline">{g.titulo}</div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      <Footer />
    </main>
  );
}
