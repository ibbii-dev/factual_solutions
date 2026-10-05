"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import HeroFilm from "@/components/ui/HeroFilm";

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
      {/* Dynamic theme background */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-canvas transition-colors duration-300" />

      <ScrollProgress />
      <Navbar />
      <main className="flex-grow relative z-0 bg-transparent">
        {/* Brand backdrop for inner pages: soft logo-color glows */}
        {pathname !== "/" && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[620px] -z-10 overflow-hidden">
            <HeroFilm variant="page" />
            <div className="absolute -top-48 left-1/4 w-[560px] h-[560px] rounded-full bg-steel/20 dark:bg-steel/10 blur-3xl" />
            <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-rust/[0.07] dark:bg-rust/10 blur-3xl" />
          </div>
        )}
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
