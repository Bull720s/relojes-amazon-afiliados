"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Producto } from "@/lib/propia";

export type CartItem = {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string | null;
  cantidad: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrecio: number;
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "elcronista_carrito";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage no disponible (modo privado, etc.) — el carrito sigue funcionando en memoria.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignorar si no se puede persistir
    }
  }, [items, hydrated]);

  const addItem = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === producto.id);
      if (existing) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [
        ...prev,
        { id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const setQuantity = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.cantidad, 0), [items]);
  const totalPrecio = useMemo(() => items.reduce((sum, i) => sum + i.precio * i.cantidad, 0), [items]);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrecio, addItem, removeItem, setQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
