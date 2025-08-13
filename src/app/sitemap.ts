import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.granturismoriviera.com";
  const now = new Date();
  const routes = ["/", "/about", "/services", "/pricing", "/contact", "/privacy"];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.6,
  }));
}


