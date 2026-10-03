import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import RadarChart from "@/components/RadarChart";
import { ZoomImage } from "@/components/ZoomImage";
import { WatchImage } from "@/components/WatchCard";
import { getAllWatches, getWatchById, getPrecioLabel, hasPrecio } from "@/lib/watches";

export function generateStaticParams() {
  return getAllWatches().map((w) => ({ id: w.id }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const watch = getWatchById(params.id);
  if (!watch) return notFound();

  const specEntries = Object.entries(watch.specs);
  const analysisParagraphs = watch.analisis.split("\n\n");
  const amazonUrl = watch.amazon_url || `https://www.amazon.com.mx/s?k=${encodeURIComponent(watch.nombre)}`;

  const relacionados = getAllWatches()
    .filter((w) => w.id !== watch.id && w.categorias.some((c) => watch.categorias.includes(c)))
    .slice(0, 2);

  return (
    <main>
      <Header />

      <div className="px-5 md:px-8 pt-8">
        <Link href="/#catalogo" className="inline-flex items-center gap-2 text-[13px] text-ink-soft hover:text-ink">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-8 lg:gap-12 px-5 md:px-8 pt-8 pb-20">
        {/* Columna izquierda: nombre, precio y acordeones */}
        <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
          <div className="text-[11px] uppercase tracking-[0.06em] text-ink-soft mb-2">
            {watch.marca} · {watch.coleccion}
          </div>
          <h1 className="text-[18px] md:text-[20px] uppercase tracking-[0.02em] leading-snug mb-2">{watch.nombre}</h1>
          <div className="text-[16px] text-ink-soft mb-2">{getPrecioLabel(watch)}</div>
          <div className="text-[13px] mb-8">
            <span className="font-bold">{watch.puntaje_global.toFixed(1)} / 10</span>
            <span className="text-ink-soft"> — valoración editorial</span>
          </div>

          <Accordion title="Análisis" defaultOpen>
            {analysisParagraphs.map((p, i) => (
              <p key={i} className="text-[13px] text-ink-soft leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </Accordion>

          <Accordion title="Especificaciones técnicas">
            <table className="w-full border-collapse text-[12px]">
              <tbody>
                {specEntries.map(([label, value]) => (
                  <tr key={label} className="border-b border-line last:border-0">
                    <td className="py-2.5 pr-3 text-ink-soft w-[42%] align-top">{label}</td>
                    <td className="py-2.5">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion>

          <Accordion title="Valoración por aspecto">
            <RadarChart radar={watch.radar} />
          </Accordion>

          {relacionados.length > 0 && (
            <Accordion title="También te puede interesar" defaultOpen>
              <div className="grid grid-cols-2 gap-3">
                {relacionados.map((r) => (
                  <Link key={r.id} href={`/relojes/${r.id}`} className="group block">
                    <div className="aspect-square bg-brass-soft flex items-center justify-center mb-2 overflow-hidden">
                      <WatchImage
                        watch={r}
                        className="max-h-[72%] max-w-[72%] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[11px] uppercase leading-snug">{r.nombre}</div>
                    <div className="text-[11px] text-ink-soft">{getPrecioLabel(r)}</div>
                  </Link>
                ))}
              </div>
            </Accordion>
          )}

          <div className="border-t border-line" />
        </div>

        {/* Columna central: imagen grande */}
        <div className="order-1 lg:order-2">
          <div className="aspect-square bg-brass-soft flex items-center justify-center overflow-hidden">
            <ZoomImage className="flex items-center justify-center w-full h-full bg-brass-soft">
              <WatchImage watch={watch} className="max-h-[78%] max-w-[78%] w-auto h-auto" />
            </ZoomImage>
          </div>
          <div className="text-[11px] text-ink-soft mt-2">
            {watch.imagen ? "Imagen de Amazon.com.mx." : "Imagen pendiente — se reemplaza por la foto de Amazon.com.mx."}
          </div>
        </div>

        {/* Columna derecha: compra */}
        <div className="order-3 lg:sticky lg:top-24 lg:self-start lg:pt-40">
          <div className="text-[13px] text-ink-soft mb-3">
            Categoría: <span className="text-ink">{watch.categorias.join(", ")}</span>
          </div>
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full text-center bg-ink text-white px-6 py-4 text-[13px] uppercase tracking-[0.06em] hover:opacity-85 transition-opacity mb-3"
          >
            Comprar en Amazon{hasPrecio(watch) ? ` — ${watch.precio_mxn}` : ""}
          </a>
          {watch.mercadolibre_url && (
            <a
              href={watch.mercadolibre_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full text-center border border-ink px-6 py-4 text-[13px] uppercase tracking-[0.06em] hover:bg-ink hover:text-white transition-colors mb-3"
            >
              Comprar en Mercado Libre
            </a>
          )}
          <Link
            href="/comparador"
            className="block w-full text-center border border-line px-6 py-4 text-[13px] uppercase tracking-[0.06em] hover:border-ink transition-colors"
          >
            Comparar modelos
          </Link>
          {watch.nota_verificacion && (
            <div className="text-[12px] text-ink-soft mt-4 leading-relaxed">⚠ {watch.nota_verificacion}</div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
