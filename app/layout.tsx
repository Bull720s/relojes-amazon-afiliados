import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart";
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

const BASE_URL = "https://relojes-amazon-afiliados-5hvi60b9b-bull19.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "El Cronista — Guía de relojería en México",
    template: "%s — El Cronista",
  },
  description:
    "Fichas técnicas completas, comparador y guías de compra para elegir el reloj correcto en Amazon México.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "El Cronista",
    title: "El Cronista — Guía de relojería en México",
    description:
      "Fichas técnicas completas, comparador y guías de compra para elegir el reloj correcto en Amazon México.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${workSans.variable} font-sans bg-bg text-ink`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
