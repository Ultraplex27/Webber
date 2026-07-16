import type { MetadataRoute } from "next";
import { products } from "@/content/products";

const BASE = "https://webberec.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1 },
    { url: `${BASE}/products`, priority: 0.9 },
    { url: `${BASE}/technology`, priority: 0.8 },
    { url: `${BASE}/company`, priority: 0.7 },
    { url: `${BASE}/contact`, priority: 0.7 },
  ];
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    priority: 0.8,
  }));
  return [...staticRoutes, ...productRoutes];
}
