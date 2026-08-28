import React from "react";
import HeroSection from "@/components/home/HeroSection";
import DualEngineSection from "@/components/home/DualEngineSection";
import MethodologySection from "@/components/home/MethodologySection";
import ClientTestimonials from "@/components/home/ClientTestimonials";
import ConsultationBanner from "@/components/home/ConsultationBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Interactive 3D Brand Symbol */}
      <HeroSection />

      {/* 2. Client Trust & Consulting Principles */}
      <ClientTestimonials />

      {/* 3. Dual Engine: Business Solutions vs. Consultancy Services */}
      <DualEngineSection />

      {/* 4. The Factual Method (4-Step Framework) */}
      <MethodologySection />

      {/* 5. High-Conversion Consultation CTA */}
      <ConsultationBanner />
    </div>
  );
}
