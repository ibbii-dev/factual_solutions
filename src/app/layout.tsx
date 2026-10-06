import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import AuthModal from "@/components/auth/AuthModalLazy";
import SiteShell from "@/components/layout/SiteShell";
import { contactDetails } from "@/data/companyData";
import { LANG_BOOT_SCRIPT } from "@/lib/i18n";

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

// Typography: Plus Jakarta Sans (friendly, rounded geometric) for headings and
// Inter (built for screen reading) for text. Both are variable fonts, so each is a
// single self-hosted .woff2 file covering every weight; font-display: swap plus a
// size-matched system fallback means text shows instantly with no layout jump.
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

// Arabic face: only downloaded when Arabic text is actually rendered (not preloaded).
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
  fallback: ["Segoe UI", "Tahoma", "Geeza Pro", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Purge previous stale dark defaults from older versions
                  if (localStorage.getItem('factual_theme_pref') === null) {
                    localStorage.removeItem('factual_theme');
                    localStorage.setItem('factual_theme_pref', 'light');
                  }
                  var saved = localStorage.getItem('factual_theme_pref');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-canvas text-ink dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300 relative">
        <ThemeProvider>
          <LanguageProvider>
            <UserAuthProvider>
              <SiteShell>{children}</SiteShell>
              <AuthModal />
            </UserAuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
