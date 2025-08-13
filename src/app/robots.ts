import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.granturismoriviera.com";
  return {
    rules: [{ userAgent: "*" }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


