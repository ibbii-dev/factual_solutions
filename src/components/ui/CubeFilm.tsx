"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CubeFilm — the 3D-rendered puzzle cube (navy / steel / rust) assembling and separating.
 * Square film shown at its native size (no stretching), with a soft radial fade so it
 * blends into the dark hero stage. Falls back to the poster frame for reduced motion.
 */
const MP4 = "/videos/cube-film.mp4";
const WEBM = "/videos/cube-film.webm";
const POSTER = "/videos/cube-film-poster.jpg";

const FADE = "radial-gradient(closest-side, black 62%, transparent 100%)";
// film backdrop is baked to the hero colour (#050B1C) so only the cube shows
const LAYER: React.CSSProperties = { WebkitMaskImage: FADE, maskImage: FADE };

export default function CubeFilm({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause while off-screen to save battery
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-square pointer-events-none select-none ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POSTER} alt="" style={LAYER} className="absolute inset-0 w-full h-full object-contain" />
      {!reduce && (
        <video
          ref={ref}
          style={LAYER}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
        >
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
