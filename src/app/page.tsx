"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServiceLinesStrip from "@/components/home/ServiceLinesStrip";
import LatestInsightsSection from "@/components/home/LatestInsightsSection";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-ink dark:text-white overflow-hidden bg-transparent">
      {/* 1. Hero: who we are + primary CTA */}
      <HeroSection />

      {/* 2. Clear navigation into the three service lines */}
      <ServiceLinesStrip />

      {/* 3. Blog: featured post, recent posts, sidebar (search, categories, newsletter, author) */}
      <LatestInsightsSection />

      {/* 4. Industries served */}
      <IndustrySectorsSection />

      {/* 5. Closing call to action */}
      <ConsultationBanner />
    </div>
  );
}
