import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RevealObserver from "@/components/ui/RevealObserver";
import AuthModal from "@/components/auth/AuthModalLazy";

// Public pages: classic design shell (restored 2026-10-21). The admin panel is outside this group.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserAuthProvider>
          <div className="min-h-screen flex flex-col bg-canvas">
            <ScrollProgress />
            <Navbar />
            <main id="main" className="flex-1 relative">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
          <AuthModal />
          <RevealObserver />
        </UserAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
