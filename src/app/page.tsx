"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import DualEngineSection from "@/components/home/DualEngineSection";
import IndustrySectorsSection from "@/components/home/IndustrySectorsSection";
import ConsultationBanner from "@/components/home/ConsultationBanner";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[#152238] dark:text-white overflow-hidden bg-transparent">
      {/* Fully Visible Fixed Looping Background Video - MotionSites Style */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src={BG_VIDEO}
        />
        {/* Subtle adaptive scrim: video is fully visible in both light & dark */}
        <div className="absolute inset-0 bg-white/20 dark:bg-[#070D18]/45 transition-colors duration-300" />
      </div>

      {/* 1. Immersive Motion Hero */}
      <HeroSection />

      {/* 2. Core Advisory Practices (Frosted Glass) */}
      <DualEngineSection />

      {/* 3. Key Industry Sectors (Clean Glass Grid) */}
      <IndustrySectorsSection />

      {/* 4. Pre-Footer Executive Consultation Callout */}
      <ConsultationBanner />
    </div>
  );
}
