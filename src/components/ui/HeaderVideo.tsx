"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Cinematic brand video used behind page headers.
 * Original 3D render: the logo's puzzle pieces (navy / steel / rust) assembling into the cube.
 *
 *  - variant "hero":  full cinematic treatment (home page), always shown on a dark stage.
 *  - variant "page":  softer treatment behind inner-page headers; washed out in light mode.
 *
 * Falls back to the poster frame when the user prefers reduced motion.
 */
const SRC_MP4 = "/videos/header-cinematic.mp4";
const SRC_WEBM = "/videos/header-cinematic.webm";
const POSTER = "/videos/header-cinematic-poster.jpg";

export default function HeaderVideo({ variant = "page", className = "" }: { variant?: "hero" | "page"; className?: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause when off-screen to save battery/CPU
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden bg-night-950 ${className}`}>
      {/* Poster frame always underneath, so there is never an empty stage while the film loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={POSTER} alt="" className="absolute inset-0 w-full h-full object-cover object-right" />
      {!reduceMotion && (
        <video
          ref={ref}
          className={`absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
        >
          <source src={SRC_WEBM} type="video/webm" />
          <source src={SRC_MP4} type="video/mp4" />
        </video>
      )}

      {variant === "hero" ? (
        <>
          {/* keep the headline side dark and calm */}
          <div className="absolute inset-0 bg-gradient-to-r from-night-950/95 via-night-950/60 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 sm:hidden bg-night-950/55" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-night-950" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-canvas/[0.86] dark:bg-night-950/55" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-canvas" />
        </>
      )}
    </div>
  );
}
