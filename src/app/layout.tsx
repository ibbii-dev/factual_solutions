import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { contactDetails } from "@/data/companyData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://factual-solutions.vercel.app";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Factual Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-symbol.png`,
  image: `${SITE_URL}/images/logo-symbol.png`,
  description:
    "Consulting, training, and ERP & digital transformation: Lean Six Sigma, operational excellence, strategy, quality, and continuous improvement.",
  email: contactDetails.email,
  telephone: contactDetails.phone,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
  areaServed: "Worldwide",
  knowsAbout: ["Lean Six Sigma", "Operational Excellence", "Strategy", "Quality Management", "ERP Implementation", "Digital Transformation", "Training"],
};

// Fonts (approved 2026-10-20): Manrope for headings, Inter for all text. next/font
// downloads them at build time and serves them from this site, with size-matched
// fallbacks so text shows instantly without layout shift.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true,
});

// Sets data-theme before first paint so there is no flash of the wrong theme.
// A saved choice ("fs-theme") wins; otherwise follow the device setting.
const THEME_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,s=localStorage.getItem("fs-theme"),m=window.matchMedia("(prefers-color-scheme: dark)");function a(){d.dataset.theme=(s==="dark"||s==="light")?s:(m.matches?"dark":"light")}a();m.addEventListener("change",a)}catch(e){}})();`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Browser bar colours: the --c-bg token values (meta tags cannot read CSS variables).
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, { media: "(prefers-color-scheme: dark)", color: "#0F1A2E" }],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: "Factual Solutions",
    title: "Factual Solutions | Consulting, Training & Digital Transformation",
    description: "Consulting, training, and ERP & digital transformation that help organizations perform better.",
    url: SITE_URL,
  },
  title: {
    default: "Factual Solutions | Consulting, Training & Digital Transformation",
    template: "%s | Factual Solutions",
  },
  description: "Consulting, training and ERP & digital transformation: Lean Six Sigma, operational excellence, strategy and quality that help organizations perform better.",
  keywords: ["Factual Solutions", "Management Consulting", "Lean Six Sigma", "Operational Excellence", "Training", "ERP", "ERPNext", "Digital Transformation", "TPM", "Balanced Scorecard"],
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
    <html 
      lang="en" 
      className={`scroll-smooth ${inter.variable} ${manrope.variable}`} 
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased bg-bg text-ink min-h-screen">
        {children}
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
