"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServiceLinesStrip from "@/components/home/ServiceLinesStrip";
import ApproachSection from "@/components/home/ApproachSection";
import PrinciplesSection from "@/components/home/PrinciplesSection";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import LatestInsightsSection from "@/components/home/LatestInsightsSection";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="relative text-ink dark:text-white">
      <HeroSection />
      <ServiceLinesStrip />
      <ApproachSection />
      <PrinciplesSection />
      <IndustrySectorsSection />
      <LatestInsightsSection />
      <ConsultationBanner />
    </div>
  );
}
