import data from "@/data/propia.json";

export type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen?: string | null;
  disponible: boolean;
};

const productos = data as unknown as Producto[];

export function getAllProductos(): Producto[] {
  return productos;
}

export function getProductoById(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function formatPrecio(precio: number): string {
  return precio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}
