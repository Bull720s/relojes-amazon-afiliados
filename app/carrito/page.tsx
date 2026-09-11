"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatPrecio } from "@/lib/propia";

type EstadoEnvio = "idle" | "enviando" | "ok" | "error";

export default function CarritoPage() {
  const { items, totalPrecio, removeItem, setQuantity, clearCart } = useCart();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !nombre.trim() || !telefono.trim()) return;

    setEstado("enviando");
    setErrorMsg("");
    try {
      const res = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, nombre, telefono, notas, total: totalPrecio }),
      });
      if (!res.ok) throw new Error();
      setEstado("ok");
      clearCart();
    } catch {
      setEstado("error");
      setErrorMsg("No se pudo enviar el pedido. Inténtalo de nuevo en un momento.");
    }
  };

  if (estado === "ok") {
    return (
      <main>
        <Header breadcrumb="Inicio / Carrito" />
        <div className="px-6 md:px-16 py-24 text-center max-w-xl mx-auto">
          <div className="font-serif text-[28px] mb-4">Pedido recibido</div>
          <p className="text-ink-soft mb-8">
            Gracias{nombre ? `, ${nombre}` : ""}. Te contactamos pronto al {telefono} para confirmar
            pago y envío.
          </p>
          <Link href="/tienda" className="text-[13px] tracking-[0.12em] uppercase underline underline-offset-4">
            Seguir viendo la tienda
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header breadcrumb="Inicio / Carrito" />

      <div className="px-6 md:px-16 py-10 md:py-14 max-w-3xl mx-auto">
        <h1 className="font-serif text-[28px] md:text-[32px] mb-8">Tu carrito</h1>

        {items.length === 0 ? (
          <div className="text-ink-soft">
            Tu carrito está vacío.{" "}
            <Link href="/tienda" className="underline underline-offset-4">
              Ve a la tienda
            </Link>
            .
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-5 mb-10">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 border-b border-line pb-5">
                  <div>
                    <div className="font-sans font-semibold text-[15px] mb-1">{item.nombre}</div>
                    <div className="text-ink-soft text-[14px]">{formatPrecio(item.precio)} c/u</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.cantidad}
                      onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                      className="w-14 border border-line px-2 py-1 text-center"
                    />
                    <div className="font-semibold w-24 text-right">{formatPrecio(item.precio * item.cantidad)}</div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-ink-soft hover:text-wine text-[13px] underline underline-offset-4"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-10 text-[19px] font-semibold">
              <span>Total</span>
              <span>{formatPrecio(totalPrecio)}</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
              <div className="font-serif text-[22px] mb-1">Datos para cerrar tu pedido</div>
              <label className="flex flex-col gap-1.5 text-[14px]">
                Nombre
                <input
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="border border-line px-3 py-2.5"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[14px]">
                Teléfono (para contactarte)
                <input
                  required
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="border border-line px-3 py-2.5"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[14px]">
                Notas (opcional — color, talla, dirección, lo que sea)
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={3}
                  className="border border-line px-3 py-2.5"
                />
              </label>

              {estado === "error" && <div className="text-wine text-[14px]">{errorMsg}</div>}

              <button
                type="submit"
                disabled={estado === "enviando"}
                className="inline-block bg-ink text-white px-9 py-4 text-[13px] tracking-[0.12em] uppercase font-medium hover:opacity-85 transition-opacity disabled:opacity-50"
              >
                {estado === "enviando" ? "Enviando…" : "Enviar pedido"}
              </button>
              <div className="text-[13px] text-ink-soft">
                No se cobra nada en este paso. Te contactamos para confirmar pago y envío.
              </div>
            </form>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
