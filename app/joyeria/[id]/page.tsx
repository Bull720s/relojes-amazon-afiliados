import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RadarChart from "@/components/RadarChart";
import { ZoomImage } from "@/components/ZoomImage";
import { getAllJewelry, getJewelryById } from "@/lib/joyeria";

export function generateStaticParams() {
  return getAllJewelry().map((j) => ({ id: j.id }));
}

export default function JewelryPage({ params }: { params: { id: string } }) {
  const item = getJewelryById(params.id);
  if (!item) return notFound();

  const specEntries = Object.entries(item.specs);
  const analysisParagraphs = item.analisis.split("\n\n");

  return (
    <main>
      <Header breadcrumb={`Inicio / ${item.categorias[0]} / ${item.nombre}`} />

      <div className="grid grid-cols-1 md:grid-cols-[560px_1fr] gap-10 md:gap-14 px-6 md:px-16 py-10 md:py-14 border-b border-line">
        <div>
          <div className="aspect-[4/5] md:h-[420px] bg-brass-soft border border-line flex items-center justify-center mb-3.5 overflow-hidden">
            <ZoomImage className="flex items-center justify-center w-full h-full">
              {item.imagen ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imagen} alt={item.nombre} className="max-h-[85%] max-w-[70%] object-contain" />
              ) : (
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth={0.9}>
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2.4" />
                </svg>
              )}
            </ZoomImage>
          </div>
          <div className="flex gap-3">
            {["Vista frontal", "Vista lateral", "Detalle", "En muñeca"].map((t) => (
              <div
                key={t}
                className="w-24 h-24 bg-card border border-line flex items-center justify-center text-[11px] text-ink-soft text-center p-1.5 cursor-pointer hover:border-ink transition-colors"
              >
                {t}
              </div>
            ))}
          </div>
          <div className="text-xs text-ink-soft mt-2.5">
            {item.imagen
              ? "Imagen real de Amazon.com.mx — vista previa, pendiente tu tag de afiliado."
              : "Fotos de producto — se reemplazan por las imágenes reales de Amazon.com.mx."}
          </div>
        </div>

        <div>
          <div className="text-[13px] tracking-[0.14em] uppercase text-ink-soft mb-3">
            {item.marca} · Colección {item.coleccion}
          </div>
          <h1 className="font-sans uppercase font-semibold tracking-[0.02em] text-[32px] md:text-[40px] leading-tight mb-5">
            {item.nombre}
          </h1>
          <p className="font-serif text-[19px] text-ink-soft leading-relaxed max-w-xl mb-8">
            {analysisParagraphs[0]}
          </p>

          <div className="flex items-center gap-7 mb-8">
            <div className="font-sans font-semibold tracking-[0.02em] text-[32px]">{item.precio_mxn}</div>
            <div className="flex items-center gap-2 text-[15px]">
              <span className="font-semibold">{item.puntaje_global.toFixed(1)} / 10</span>
              <span className="text-ink-soft">— valoración editorial</span>
            </div>
          </div>

          <a
            href={item.amazon_url || `https://www.amazon.com.mx/s?k=${encodeURIComponent(item.nombre)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ink text-white px-9 py-4 text-[13px] tracking-[0.12em] uppercase font-medium mb-3 hover:opacity-85 transition-opacity"
          >
            Comprar en Amazon México
          </a>
          <div className="text-sm text-ink-soft">
            Enlace sin tag de afiliado todavía — se actualizará cuando tengas tu cuenta de Amazon
            Associates aprobada.
          </div>
          {item.nota_verificacion && (
            <div className="text-sm text-wine mt-3 max-w-xl">⚠️ {item.nota_verificacion}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_560px] gap-10 md:gap-14 px-6 md:px-16 py-12 md:py-16 border-b border-line">
        <div>
          <div className="font-serif text-[28px] md:text-[32px] mb-6.5">Especificaciones técnicas</div>
          <table className="w-full border-collapse text-[16px]">
            <tbody>
              {specEntries.map(([label, value]) => (
                <tr key={label} className="border-b border-line">
                  <td className="py-3.5 px-2 text-ink-soft w-[38%]">{label}</td>
                  <td className="py-3.5 px-2 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="font-serif text-[28px] md:text-[32px] mb-6.5">Valoración por aspecto</div>
          <RadarChart radar={item.radar} />
        </div>
      </div>

      <div className="px-6 md:px-16 py-12 md:py-16 pb-20 md:pb-24 max-w-3xl">
        <div className="font-serif text-[28px] md:text-[32px] mb-5">Análisis</div>
        {analysisParagraphs.map((p, i) => (
          <p key={i} className="font-serif text-lg text-ink-soft leading-relaxed mb-5">
            {p}
          </p>
        ))}
      </div>

      <Footer />
    </main>
  );
}
