import React from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import RevealObserver from "@/components/ui/RevealObserver";

// Public pages get the header and footer; the admin panel (outside this group) does not.
// The header is fixed over each page's deep hero (components/layout/PageHero.tsx).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
