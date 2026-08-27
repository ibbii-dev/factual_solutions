import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="en" className={`dark scroll-smooth ${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#0B1320] text-slate-100 selection:bg-brand-steel/40 selection:text-white min-h-screen flex flex-col justify-between transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
