import { MetadataRoute } from "next";
import { dbGetBlogPosts } from "@/lib/mongodb";
import { allServices, lines } from "@/data/servicePages";

// Rebuild hourly so newly published posts appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://factual-solutions.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...lines.map((l) => ({ url: `${baseUrl}/services/${l.id}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.85 })),
    ...allServices.map((sv) => ({ url: `${baseUrl}/services/${sv.id}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];

  const posts = await dbGetBlogPosts({ status: "published" });
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
