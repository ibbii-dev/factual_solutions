import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import ApproachPanel from "@/components/services/ApproachPanel";
import ServiceMatcherQuiz from "@/components/services/ServiceMatcherQuiz";

export const metadata: Metadata = pageMetadata({
  title: "What We Do: Consulting, Training and ERP & Digital",
  description:
    "Consulting, training and ERP & digital transformation from Factual Solutions: operational excellence, strategy, quality, Lean Six Sigma training and ERPNext implementation.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What we do", path: "/services" }])) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="What we do"
          title="Consulting, training and systems that work together"
          lede="Consulting identifies what needs to change, training builds the capability to change it, and the right systems make the better way of working easy to run."
        />
        <ServiceCatalog />
        <ApproachPanel />
        <ServiceMatcherQuiz />
      </div>
    </div>
  );
}
