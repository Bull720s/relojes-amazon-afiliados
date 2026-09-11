import data from "@/data/joyeria.json";
import type { RadarScores } from "@/lib/watches";
import { categoryToSlug } from "@/lib/watches";

export type Jewelry = {
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
  mercadolibre_url?: string;
};

const joyeria = data as unknown as Jewelry[];

export function getAllJewelry(): Jewelry[] {
  return joyeria;
}

export function getJewelryById(id: string): Jewelry | undefined {
  return joyeria.find((j) => j.id === id);
}

export function getJewelryByCategory(category: string): Jewelry[] {
  return joyeria.filter((j) => j.categorias.includes(category));
}

export function getAllJewelryCategories(): string[] {
  const set = new Set<string>();
  joyeria.forEach((j) => j.categorias.forEach((c) => set.add(c)));
  return Array.from(set);
}

export { categoryToSlug };

export function getShortDescription(item: Jewelry): string {
  const material = item.specs["Material"]?.split(",")[0]?.trim();
  const cierre = item.specs["Cierre"]?.trim();
  const parts = [material, cierre].filter(Boolean);
  return parts.length ? parts.join(", ") : item.categorias[0];
}
