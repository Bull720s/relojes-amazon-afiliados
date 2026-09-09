import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparadorClient from "@/components/ComparadorClient";
import { getAllJewelry } from "@/lib/joyeria";

export default function ComparadorJoyeriaPage() {
  const items = getAllJewelry();

  return (
    <main>
      <Header breadcrumb="Inicio / Joyería / Comparador" />
      <div className="text-center pt-10 px-8">
        <div className="font-serif italic text-[26px] mb-2">Comparador de joyería</div>
        <p className="text-ink-soft max-w-xl mx-auto text-[15px]">
          Pon dos o tres piezas lado a lado: specs completas y el radar de valoración superpuesto.
        </p>
      </div>
      <ComparadorClient watches={items} basePath="/joyeria" itemLabel="Pieza" />
      <Footer />
    </main>
  );
}
