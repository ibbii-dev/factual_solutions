import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import AuthModal from "@/components/auth/AuthModal";
import SiteShell from "@/components/layout/SiteShell";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F6F8FC" }, { media: "(prefers-color-scheme: dark)", color: "#081229" }],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Factual Solutions",
    title: "Factual Solutions | Consulting, Training & Digital Transformation",
    description: "Consulting, training, and ERP & digital transformation that help organizations perform better.",
    url: SITE_URL,
  },
  title: "Factual Solutions | Consulting, Training & Digital Transformation",
  description: "Factual Solutions helps organizations perform better through consulting, training, and ERP & digital transformation—Lean Six Sigma, operational excellence, strategy, quality, and continuous improvement.",
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
      className={`scroll-smooth ${inter.variable} ${plusJakarta.variable} ${tajawal.variable}`} 
      suppressHydrationWarning
    >
      <head>
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
