import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import WatchesExplorer from "@/components/WatchesExplorer";
import { getAllWatches, getAllCategories, categoryToSlug } from "@/lib/watches";
import { GUIAS } from "@/lib/guias";

export default function Home() {
  const watches = getAllWatches();
  const categories = getAllCategories();
  const destacados = watches.filter((w) => w.imagen).slice(0, 8);

  return (
    <main>
      <Header />

      <HeroCarousel watches={destacados} />

      <section id="catalogo" className="scroll-mt-14">
        <WatchesExplorer watches={watches} categories={categories} />
      </section>

      <section className="px-5 md:px-8 py-14 border-t border-line">
        <h2 className="text-[18px] md:text-[22px] uppercase tracking-[0.02em] mb-8">Categorías</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categorias/${categoryToSlug(cat)}`}
              className="border border-line px-4 py-2.5 text-[12px] uppercase tracking-[0.04em] hover:bg-ink hover:text-white hover:border-ink transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-8 pb-20 border-t border-line">
        <h2 className="text-[18px] md:text-[22px] uppercase tracking-[0.02em] mt-14 mb-8">Guías de compra</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIAS.map((g) => (
            <Link key={g.slug} href={`/guias/${g.slug}`} className="group block border-t border-ink pt-4">
              <div className="text-[11px] uppercase tracking-[0.06em] text-ink-soft mb-2">{g.tag}</div>
              <div className="text-[15px] uppercase leading-snug group-hover:underline">{g.titulo}</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
