"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isVideoPage = pathname === "/video";

  if (isAdmin || isVideoPage) {
    return (
      <div className="w-full h-screen overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Global Fixed Background Video across every page with pure transparency - no grey scrim */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src={BG_VIDEO}
        />
      </div>

      <Navbar />
      <main className="flex-grow relative z-0 bg-transparent">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
