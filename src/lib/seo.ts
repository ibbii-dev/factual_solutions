import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://factual-solutions.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "Factual Solutions";

/** Consistent per-page metadata: title, description, canonical URL and social cards. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url, siteName: SITE_NAME, type, locale: "en_US" },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

/** Render-ready JSON-LD for a breadcrumb trail. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
