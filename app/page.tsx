import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchesExplorer from "@/components/WatchesExplorer";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/FadeIn";
import { getAllWatches, getAllCategories, categoryToSlug } from "@/lib/watches";
import { GUIAS } from "@/lib/guias";

export default function Home() {
  const watches = getAllWatches();
  const categories = getAllCategories();

  return (
    <main>
      <Header breadcrumb="Inicio / Relojes" />

      <WatchesExplorer watches={watches} categories={categories} />

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
