"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/carrito" className="relative" aria-label="Ver carrito">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-wine text-white text-[10px] leading-4 text-center font-semibold">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
