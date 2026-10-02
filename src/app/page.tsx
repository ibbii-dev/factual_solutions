"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#152238] dark:text-white overflow-hidden bg-transparent">

      {/* 1. Immersive Motion Hero */}
      <HeroSection />

      {/* 2. Key Industry Sectors (Clean Glass Grid) */}
      <IndustrySectorsSection />

      {/* 3. Pre-Footer Executive Consultation Callout */}
      <ConsultationBanner />
    </div>
  );
}
