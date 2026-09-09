import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-worksans",
});

export const metadata: Metadata = {
  title: "El Cronista — Guía de relojería en México",
  description:
    "Fichas técnicas completas, comparador y guías de compra para elegir el reloj correcto en Amazon México.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${workSans.variable} font-sans bg-bg text-ink`}>
        {children}
      </body>
    </html>
  );
}
