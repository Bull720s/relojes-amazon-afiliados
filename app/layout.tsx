import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
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
      <body className={`${mono.variable} font-mono bg-bg text-ink antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
