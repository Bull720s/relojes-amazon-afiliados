import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/FadeIn";
import { GUIAS } from "@/lib/guias";

export default function GuiasPage() {
  return (
    <main>
      <Header breadcrumb="Inicio / Guías" />
      <div className="px-8 md:px-16 pt-14 pb-4 text-center">
        <FadeIn>
          <div className="font-serif text-[32px] mb-3">Guías de compra</div>
          <p className="text-ink-soft max-w-xl mx-auto">
            Criterios reales para elegir, sin relleno ni superlativos de catálogo.
          </p>
        </FadeIn>
      </div>
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-16 py-14">
        {GUIAS.map((g) => (
          <StaggerItem key={g.slug}>
            <Link href={`/guias/${g.slug}`} className="block border-t border-ink pt-5 h-full group">
              <div className="text-[12px] tracking-[0.1em] uppercase text-ink-soft mb-3">{g.tag}</div>
              <div className="font-serif text-[22px] leading-snug mb-3 group-hover:underline">{g.titulo}</div>
              <p className="text-ink-soft text-[15px] leading-relaxed">{g.resumen}</p>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>
      <Footer />
    </main>
  );
}
