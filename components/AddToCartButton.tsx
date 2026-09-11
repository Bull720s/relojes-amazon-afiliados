"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Producto } from "@/lib/propia";

export default function AddToCartButton({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(producto, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (!producto.disponible) {
    return (
      <div className="inline-block bg-brass-soft text-ink-soft px-9 py-4 text-[13px] tracking-[0.12em] uppercase font-medium">
        Agotado
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-block bg-ink text-white px-9 py-4 text-[13px] tracking-[0.12em] uppercase font-medium hover:opacity-85 transition-opacity"
    >
      {added ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
