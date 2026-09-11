import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ZoomImage } from "@/components/ZoomImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getAllProductos, getProductoById, formatPrecio } from "@/lib/propia";

export function generateStaticParams() {
  return getAllProductos().map((p) => ({ id: p.id }));
}

export default function ProductoPage({ params }: { params: { id: string } }) {
  const item = getProductoById(params.id);
  if (!item) return notFound();

  return (
    <main>
      <Header breadcrumb={`Inicio / Tienda / ${item.nombre}`} />

      <div className="grid grid-cols-1 md:grid-cols-[560px_1fr] gap-10 md:gap-14 px-6 md:px-16 py-10 md:py-14 border-b border-line">
        <div>
          <div className="aspect-[4/5] md:h-[420px] bg-brass-soft border border-line flex items-center justify-center mb-3.5 overflow-hidden">
            <ZoomImage className="flex items-center justify-center w-full h-full">
              {item.imagen ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imagen} alt={item.nombre} className="max-h-[85%] max-w-[70%] object-contain" />
              ) : (
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth={0.9}>
                  <path d="M6 7h12l-1 13H7L6 7z" />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                </svg>
              )}
            </ZoomImage>
          </div>
          <div className="text-xs text-ink-soft mt-2.5">
            {item.imagen ? "Foto de producto." : "Foto pendiente — se reemplaza por la imagen real del producto."}
          </div>
        </div>

        <div>
          <div className="text-[13px] tracking-[0.14em] uppercase text-ink-soft mb-3">{item.categoria}</div>
          <h1 className="font-sans uppercase font-semibold tracking-[0.02em] text-[32px] md:text-[40px] leading-tight mb-5">
            {item.nombre}
          </h1>
          <p className="font-serif text-[19px] text-ink-soft leading-relaxed max-w-xl mb-8">{item.descripcion}</p>

          <div className="font-sans font-semibold tracking-[0.02em] text-[32px] mb-8">
            {formatPrecio(item.precio)}
          </div>

          <div className="flex flex-wrap gap-3 mb-3">
            <AddToCartButton producto={item} />
          </div>
          <div className="text-sm text-ink-soft">
            Al agregarlo, arma tu pedido en el carrito y ciérralo ahí — te contactamos para confirmar
            pago y envío.
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
