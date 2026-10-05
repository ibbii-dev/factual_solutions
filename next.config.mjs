/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async headers() {
    const security = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
      // allow-popups keeps the Google sign-in popup working
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    ];
    return [
      { source: '/:path*', headers: security },
      {
        source: '/videos/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin.html",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
