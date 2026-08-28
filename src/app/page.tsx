import React from "react";
import HeroBentoGrid from "@/components/home/HeroBentoGrid";
import DividedValueBlocks from "@/components/home/DividedValueBlocks";
import DualEngineSection from "@/components/home/DualEngineSection";
import InteractiveFeasibilityBlock from "@/components/home/InteractiveFeasibilityBlock";
import MethodologySection from "@/components/home/MethodologySection";
import DividedSectorGrid from "@/components/home/DividedSectorGrid";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Bento Grid with Divided Blocks & 3D Brand Symbol */}
      <HeroBentoGrid />

      {/* 2. Divided Value Matrix (4-Quadrant Strategic Advantage) */}
      <DividedValueBlocks />

      {/* 3. Dual Engine: Business Solutions vs. Consultancy Services (Divided Cards) */}
      <DualEngineSection />

      {/* 4. Interactive Project Blueprint & Scope Estimator Block */}
      <InteractiveFeasibilityBlock />

      {/* 5. The Factual Method (4-Phase Structured Advisory Roadmap) */}
      <MethodologySection />

      {/* 6. Divided Industry Sector Matrix */}
      <DividedSectorGrid />

      {/* 7. High-Conversion Dual-Panel Consultation CTA Block */}
      <ConsultationBanner />
    </div>
  );
}
