import type { MetadataRoute } from "next";
import { getAllWatches, getAllCategories, categoryToSlug } from "@/lib/watches";
import { getAllJewelry } from "@/lib/joyeria";
import { getAllProductos } from "@/lib/propia";
import { GUIAS } from "@/lib/guias";

const BASE_URL = "https://relojes-amazon-afiliados-5hvi60b9b-bull19.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/comparador", "/joyeria", "/joyeria/comparador", "/tienda", "/guias"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const watchRoutes = getAllWatches().map((w) => ({
    url: `${BASE_URL}/relojes/${w.id}`,
    lastModified: new Date(),
  }));

  const jewelryRoutes = getAllJewelry().map((j) => ({
    url: `${BASE_URL}/joyeria/${j.id}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = getAllCategories().map((c) => ({
    url: `${BASE_URL}/categorias/${categoryToSlug(c)}`,
    lastModified: new Date(),
  }));

  const guideRoutes = GUIAS.map((g) => ({
    url: `${BASE_URL}/guias/${g.slug}`,
    lastModified: new Date(),
  }));

  const propiaRoutes = getAllProductos().map((p) => ({
    url: `${BASE_URL}/tienda/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...watchRoutes,
    ...jewelryRoutes,
    ...categoryRoutes,
    ...guideRoutes,
    ...propiaRoutes,
  ];
}
