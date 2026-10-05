import type { Metadata } from "next";
import { getServiceById, allServices } from "@/data/servicesData";
import { pageMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

const LINE_LABEL: Record<string, string> = {
  consulting: "Consulting",
  training: "Training",
  digital: "ERP & Digital Transformation",
};

export function generateStaticParams() {
  return allServices.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = getServiceById(params.id, "en");
  if (!s) return { title: "Service not found", robots: { index: false } };
  return pageMetadata({
    title: s.title,
    description: s.shortDescription.slice(0, 160),
    path: `/services/${s.id}`,
  });
}

export default function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const s = getServiceById(params.id, "en");
  const jsonLd = s
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.shortDescription,
          serviceType: LINE_LABEL[s.category],
          url: `${SITE_URL}/services/${s.id}`,
          provider: { "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL },
          areaServed: "Worldwide",
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "What We Do", path: "/services" },
          { name: s.title, path: `/services/${s.id}` },
        ]),
      ]
    : null;
  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {children}
    </>
  );
}
