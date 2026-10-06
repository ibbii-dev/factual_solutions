"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServiceLinesStrip from "@/components/home/ServiceLinesStrip";
import LatestInsightsSection from "@/components/home/LatestInsightsSection";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="relative text-ink dark:text-white">
      <HeroSection />
      <ServiceLinesStrip />
      <IndustrySectorsSection />
      <LatestInsightsSection />
      <ConsultationBanner />
    </div>
  );
}
