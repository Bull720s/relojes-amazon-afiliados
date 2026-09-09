import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { GUIAS, getGuiaBySlug } from "@/lib/guias";
import { getAllWatches } from "@/lib/watches";

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export default function GuiaPage({ params }: { params: { slug: string } }) {
  const guia = getGuiaBySlug(params.slug);
  if (!guia) return notFound();

  const allWatches = getAllWatches();
  const relacionados = (guia.relacionados ?? [])
    .map((id) => allWatches.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <main>
      <Header breadcrumb={`Inicio / Guías / ${guia.titulo}`} />

      <div className="px-8 md:px-16 pt-14 pb-10 max-w-3xl mx-auto">
        <div className="text-[12px] tracking-[0.1em] uppercase text-ink-soft mb-3 text-center">{guia.tag}</div>
        <h1 className="font-serif text-[32px] md:text-[40px] leading-tight text-center mb-10">{guia.titulo}</h1>
        {guia.parrafos.map((p, i) => (
          <p key={i} className="font-serif text-lg text-ink-soft leading-relaxed mb-5">
            {p}
          </p>
        ))}
      </div>

      {relacionados.length > 0 && (
        <div className="px-8 md:px-16 pt-4 pb-20 border-t border-line">
          <div className="font-serif text-[24px] text-center mb-10 pt-14">Relojes mencionados</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 max-w-4xl mx-auto">
            {relacionados.map((w) => w && <WatchCard key={w.id} watch={w} />)}
          </div>
        </div>
      )}

      <div className="text-center pb-16">
        <Link href="/guias" className="text-[13px] tracking-[0.12em] uppercase underline">
          Ver todas las guías
        </Link>
      </div>

      <Footer />
    </main>
  );
}
