import type { MetadataRoute } from "next";

const BASE_URL = "https://relojes-amazon-afiliados-5hvi60b9b-bull19.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
