"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

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
      {/* Solid background replacing the video */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#070D18]" />

      <Navbar />
      <main className="flex-grow relative z-0 bg-transparent">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}