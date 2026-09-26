import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ClientTestimonials from "@/components/home/ClientTestimonials";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import DualEngineSection from "@/components/home/DualEngineSection";
import MethodologySection from "@/components/home/MethodologySection";
import LatestInsightsSection from "@/components/home/LatestInsightsSection";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320]">
      {/* 1. Hero with Left Copy & Right Factual Enterprise Engine Dashboard */}
      <HeroSection />

      {/* 2. Client Trust & Consulting Value Pillars */}
      <ClientTestimonials />

      {/* 3. Industry Specializations: Advising Businesses Across Key Industry Sectors */}
      <IndustrySectorsSection />

      {/* 4. Comprehensive Consulting Services (01 to 06 Cards) */}
      <DualEngineSection />

      {/* 5. A Structured 4-Step Advisory Framework */}
      <MethodologySection />

      {/* 6. Thought Leadership & Latest Strategic Blog */}
      <LatestInsightsSection />

      {/* 7. Pre-Footer High-Conversion Consultation CTA */}
      <ConsultationBanner />
    </div>
  );
}
