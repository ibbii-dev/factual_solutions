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
      {/* Global Fixed Background Video across every page with pure smooth HD and zero grain */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#070D18]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.01]"
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
          src={BG_VIDEO}
        />
        {/* Anti-grain noise smoothing dark scrim that absorbs video film grain and keeps text 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D18]/50 via-black/25 to-[#070D18]/60 pointer-events-none" />
      </div>

      <Navbar />
      <main className="flex-grow relative z-0 bg-transparent">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
