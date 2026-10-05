import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Video Experience | Factual Solutions",
  description: "Full-screen background video experience",
  robots: { index: false, follow: false },
};

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

export default function VideoPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-night-950">
      <video
        className="w-full h-full object-cover absolute inset-0"
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        autoPlay
        muted
        loop
        playsInline
        src={BG_VIDEO}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/50 via-black/25 to-night-950/60 pointer-events-none" />
    </div>
  );
}
