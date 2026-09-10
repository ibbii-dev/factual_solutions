import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import AiAdvisoryChatbot from "@/components/AiAdvisoryChatbot";

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
            <AnimatedBackground />
            <Navbar />
            <main className="flex-grow relative z-0">{children}</main>
            <Footer />
            <WhatsAppButton />
            <AiAdvisoryChatbot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
