import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Video Experience | Factual Solutions",
  description: "Full-screen background video experience",
};

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

export default function VideoPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        className="w-full h-full object-cover absolute inset-0 scale-[1.03]"
        style={{
          filter: "blur(0.45px) contrast(1.08) saturate(1.1) brightness(1.02)",
          transform: "scale(1.03) translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden"
        }}
        autoPlay
        muted
        loop
        playsInline
        src={BG_VIDEO}
      />
    </div>
  );
}
