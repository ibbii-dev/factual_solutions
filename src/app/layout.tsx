import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { LANG_BOOT_SCRIPT } from "@/lib/i18n";
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

// Fonts (classic design, restored 2026-10-21): Plus Jakarta Sans for headings, Inter for
// text, Tajawal for right-to-left pages. next/font serves them from this site with
// size-matched fallbacks, so text shows instantly without layout shift.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: true,
});

// Arabic face: only downloaded when right-to-left text is actually shown.
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
  fallback: ["Segoe UI", "Tahoma", "Geeza Pro", "Arial", "sans-serif"],
});

// Sets data-theme before first paint so there is no flash of the wrong theme.
// A saved choice ("fs-theme") wins; otherwise follow the device setting.
const THEME_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");function a(){var s=null;try{s=localStorage.getItem("fs-theme")}catch(e){}d.dataset.theme=(s==="dark"||s==="light")?s:(m.matches?"dark":"light")}a();m.addEventListener("change",a)}catch(e){}})();`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Browser bar colours: the --c-bg token values (meta tags cannot read CSS variables).
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F6F8FC" }, { media: "(prefers-color-scheme: dark)", color: "#081229" }],
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
      className={`scroll-smooth ${inter.variable} ${jakarta.variable} ${tajawal.variable}`} 
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
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
