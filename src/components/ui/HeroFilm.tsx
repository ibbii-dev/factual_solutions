"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * HeroFilm — full-bleed 3D puzzle-cube film behind the home hero.
 *
 * Performance:
 *  - The poster frame (≈40 KB) paints immediately; the video is only attached
 *    after the page has finished loading and the browser is idle.
 *  - Small screens, data-saver and reduced-motion users get the poster only.
 *  - Playback pauses while the hero is off-screen.
 */
const MP4 = "/videos/hero-film.mp4";
const WEBM = "/videos/hero-film.webm";
const POSTER = "/videos/hero-film-poster.jpg";

export default function HeroFilm({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveData = (navigator as any).connection?.saveData === true;
    if (reduce || small || saveData) return;

    let idle: number | undefined;
    const start = () => {
      const ric = (window as any).requestIdleCallback as ((cb: () => void, o?: { timeout: number }) => number) | undefined;
      if (ric) idle = ric(() => setLoad(true), { timeout: 1500 });
      else idle = window.setTimeout(() => setLoad(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idle) window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [load]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${variant === "hero" ? "bg-night-950" : ""}`}>
      <picture>
        <source media="(max-width: 767px)" srcSet="/videos/hero-film-poster-768.webp" type="image/webp" />
        <source srcSet="/videos/hero-film-poster.webp" type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER}
          alt=""
          width={1280}
          height={720}
          decoding="async"
          fetchPriority={variant === "hero" ? "high" : "auto"}
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      </picture>
      {load && (
        <video
          ref={ref}
          className={`absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setReady(true)}
        >
          <source src={WEBM} type="video/webm" />
          <source src={MP4} type="video/mp4" />
        </video>
      )}
      {variant === "hero" ? (
        <>
          {/* keep the headline side dark and calm */}
          <div className="absolute inset-0 bg-gradient-to-r from-night-950/95 via-night-950/55 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 md:hidden bg-night-950/60" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-night-950" />
        </>
      ) : (
        <>
          {/* inner pages: centred titles, so a softer, even wash that fades into the page */}
          <div className="absolute inset-0 bg-canvas/[0.84] dark:bg-night-950/60" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-canvas" />
        </>
      )}
    </div>
  );
}
