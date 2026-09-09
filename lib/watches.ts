import data from "@/data/relojes.json";

export type RadarScores = {
  Diseño: number;
  Construcción: number;
  "Precio-calidad": number;
  Precisión: number;
  Comodidad: number;
  Prestigio: number;
  Versatilidad: number;
};

export type Watch = {
  id: string;
  marca: string;
  coleccion: string;
  nombre: string;
  categorias: string[];
  tag: string;
  precio_mxn: string;
  specs: Record<string, string>;
  radar: RadarScores;
  puntaje_global: number;
  analisis: string;
  nota_verificacion?: string;
  imagen?: string;
  amazon_url?: string;
};

const watches = data as unknown as Watch[];

export function getAllWatches(): Watch[] {
  return watches;
}

export function getWatchById(id: string): Watch | undefined {
  return watches.find((w) => w.id === id);
}

export function getWatchesByCategory(category: string): Watch[] {
  return watches.filter((w) => w.categorias.includes(category));
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  watches.forEach((w) => w.categorias.forEach((c) => set.add(c)));
  return Array.from(set);
}

export function categoryToSlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryBySlug(slug: string): string | undefined {
  return getAllCategories().find((c) => categoryToSlug(c) === slug);
}

export function getShortDescription(watch: Watch): string {
  const movimiento = watch.specs["Movimiento"]?.split(",")[0]?.split("(")[0]?.trim();
  const material = watch.specs["Material de caja"]?.split(",")[0]?.trim();
  const parts = [movimiento, material].filter(Boolean);
  return parts.length ? parts.join(", ") : watch.categorias[0];
}
