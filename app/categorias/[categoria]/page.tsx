import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { StaggerGrid, StaggerItem } from "@/components/FadeIn";
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

      <div className="px-5 md:px-8 pt-8">
        <h1 className="text-[22px] md:text-[28px] uppercase tracking-[0.02em] mb-10">{category}</h1>
        <div className="flex items-center justify-between border-b border-line pb-4 mb-8 text-[13px] uppercase tracking-[0.04em]">
          <span>Categoría</span>
          <span className="normal-case text-ink-soft">
            {watches.length} {watches.length === 1 ? "modelo" : "modelos"}
          </span>
        </div>
      </div>

      {watches.length > 0 ? (
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 px-5 md:px-8 pb-24">
          {watches.map((w) => (
            <StaggerItem key={w.id}>
              <WatchCard watch={w} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      ) : (
        <div className="text-center py-24 px-8">
          <div className="text-[20px] uppercase mb-3">Próximamente</div>
          <p className="text-ink-soft max-w-md mx-auto">
            Esta categoría se anuncia pronto con piezas seleccionadas directamente por nosotros.
          </p>
        </div>
      )}

      <Footer />
    </main>
  );
}
