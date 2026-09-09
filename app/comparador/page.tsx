import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparadorClient from "@/components/ComparadorClient";
import { getAllWatches } from "@/lib/watches";

export default function ComparadorPage() {
  const watches = getAllWatches();

  return (
    <main>
      <Header breadcrumb="Inicio / Comparador" />
      <div className="text-center pt-10 px-8">
        <div className="font-serif italic text-[26px] mb-2">El comparador</div>
        <p className="text-ink-soft max-w-xl mx-auto text-[15px]">
          Pon dos o tres relojes lado a lado: specs completas y el radar de valoración superpuesto.
        </p>
      </div>
      <ComparadorClient watches={watches} />
      <Footer />
    </main>
  );
}
