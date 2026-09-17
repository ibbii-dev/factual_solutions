import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import AuthModal from "@/components/auth/AuthModal";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Factual Solutions | Business & Management Consulting",
  description: "Factual Solutions provides practical business planning, market analysis, investment modeling, and management consulting.",
  keywords: ["Factual Solutions", "Business Consulting", "Management Consulting", "Market Analysis", "Business Idea", "Investment Planning", "Risk Management"],
  icons: {
    icon: "/images/logo-symbol.svg",
    apple: "/images/logo-symbol.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-white dark:bg-[#0E1626] text-[#0F172A] dark:text-slate-100 selection:bg-brand-steel/30 selection:text-brand-navy min-h-screen flex flex-col justify-between transition-colors duration-300 relative">
        <ThemeProvider>
          <LanguageProvider>
            <UserAuthProvider>
              <SiteShell>{children}</SiteShell>
              <AuthModal />
            </UserAuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
