import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JewelryCard from "@/components/JewelryCard";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/FadeIn";
import { getAllJewelry } from "@/lib/joyeria";

export default function JoyeriaPage() {
  const items = getAllJewelry();

  return (
    <main>
      <Header breadcrumb="Inicio / Joyería" />

      <FadeIn>
        <div className="font-serif italic text-[19px] text-center text-ink-soft pt-8 pb-2">
          Joyería y pulseras para hombre
        </div>
        <p className="text-ink-soft max-w-xl mx-auto text-center text-[15px] px-8 pb-8">
          El mismo criterio que usamos para relojes, aplicado a pulseras y cadenas pensadas para
          combinarse en la misma muñeca — el complemento perfecto para tu reloj, no un sustituto.
        </p>
      </FadeIn>

      <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 px-6 md:px-14 pb-24">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <JewelryCard item={item} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="text-center pb-24">
        <Link href="/joyeria/comparador" className="text-[13px] tracking-[0.12em] uppercase underline underline-offset-4">
          Comparar piezas de joyería
        </Link>
      </div>

      <Footer />
    </main>
  );
}
