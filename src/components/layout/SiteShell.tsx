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

  if (isAdmin) {
    return (
      <div className="min-h-screen w-full bg-[#070D18] text-slate-100 selection:bg-brand-steel/30 selection:text-brand-navy">
        {children}
      </div>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow relative z-0">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
