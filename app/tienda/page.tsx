import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropiaCard from "@/components/PropiaCard";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/FadeIn";
import { getAllProductos } from "@/lib/propia";

export const metadata = {
  title: "Tienda",
};

export default function TiendaPage() {
  const items = getAllProductos();

  return (
    <main>
      <Header breadcrumb="Inicio / Tienda" />

      <FadeIn>
        <div className="font-serif italic text-[19px] text-center text-ink-soft pt-8 pb-2">
          Mercancía propia de El Cronista
        </div>
        <p className="text-ink-soft max-w-xl mx-auto text-center text-[15px] px-8 pb-8">
          Piezas que diseñamos y vendemos nosotros mismos — agrega lo que quieras al carrito y
          cerramos tu pedido directo, sin pasar por Amazon ni Mercado Libre.
        </p>
      </FadeIn>

      <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 px-6 md:px-14 pb-24">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <PropiaCard item={item} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <Footer />
    </main>
  );
}
