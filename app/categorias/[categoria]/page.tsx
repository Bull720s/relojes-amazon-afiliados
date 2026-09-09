import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/FadeIn";
import { getAllCategories, getCategoryBySlug, getWatchesByCategory, categoryToSlug } from "@/lib/watches";

export function generateStaticParams() {
  const slugs = getAllCategories().map((c) => ({ categoria: categoryToSlug(c) }));
  return [...slugs, { categoria: "lujo" }];
}

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const category = params.categoria === "lujo" ? "Lujo" : getCategoryBySlug(params.categoria);
  if (!category) return notFound();

  const watches = getWatchesByCategory(category);

  return (
    <main>
      <Header breadcrumb={`Inicio / ${category}`} />

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
        <div className="font-serif italic text-[19px] text-center text-ink-soft pt-8 pb-2">{category}</div>
        <div className="font-sans text-[13px] text-center text-ink-soft pb-8 tracking-wide">
          {watches.length} {watches.length === 1 ? "modelo" : "modelos"}
        </div>
      </FadeIn>

      {watches.length > 0 ? (
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 px-6 md:px-14 pb-24">
          {watches.map((w) => (
            <StaggerItem key={w.id}>
              <WatchCard watch={w} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <div className="text-center py-24 px-8">
          <div className="font-serif text-[26px] mb-3">Próximamente</div>
          <p className="text-ink-soft max-w-md mx-auto">
            Esta categoría se anuncia pronto con piezas seleccionadas directamente por nosotros.
          </p>
        </div>
      )}

      <Footer />
    </main>
  );
}
