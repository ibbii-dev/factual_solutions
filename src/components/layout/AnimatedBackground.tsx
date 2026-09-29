"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Skip canvas loop on small mobile viewports or if user prefers reduced motion to preserve 100% CPU
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Floating particles matching logo colors
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const colors = [
      "142, 169, 211", // Steel Blue #8EA9D3
      "163, 63, 46",   // Terracotta Rust #A33F2E
      "30, 46, 89",    // Deep Midnight Navy #1E2E59
      "191, 74, 51",   // Warm Rust Light #BF4A33
    ];

    const particleCount = 20; // Lightweight particle count for optimal fps
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.25 + 0.1,
        pulseSpeed: 0.015 + Math.random() * 0.015,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let tick = 0;
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isPaused) {
        tick += 1;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];

          // Gentle mouse reaction
          if (mouseX > 0 && mouseY > 0) {
            const mdx = p1.x - mouseX;
            const mdy = p1.y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 120) {
              const force = (1 - mdist / 120) * 0.35;
              p1.x += (mdx / mdist) * force;
              p1.y += (mdy / mdist) * force;
            }
          }

          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < -10) p1.x = width + 10;
          if (p1.x > width + 10) p1.x = -10;
          if (p1.y < -10) p1.y = height + 10;
          if (p1.y > height + 10) p1.y = -10;

          // Pure fill without expensive shadowBlur for max CPU/GPU efficiency
          const currentAlpha = p1.alpha + Math.sin(tick * p1.pulseSpeed) * 0.05;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p1.color}, ${Math.max(0.04, currentAlpha)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-white dark:bg-[#131B2E] transition-colors duration-300"
    >
      {/* 1. Brand Midnight Navy Ambient Mesh Orb (Deep Upper Left) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-br from-[#8EA9D3]/10 via-[#152238]/5 to-transparent blur-[90px] dark:from-[#1E2E4E]/30 dark:via-[#131B2E]/20 transform-gpu will-change-transform"
      />

      {/* 2. Brand Terracotta Rust Ambient Orb (Warm Strategic Glow - Center Right) */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/4 -right-28 w-[400px] sm:w-[580px] h-[400px] sm:h-[580px] rounded-full bg-gradient-to-bl from-[#A33C29]/8 via-[#BF4A33]/4 to-transparent blur-[95px] dark:from-[#A33C29]/15 dark:via-[#BF4A33]/8 transform-gpu will-change-transform"
      />

      {/* 3. Brand Ice Steel Blue Ambient Orb (Lower Left & Center) */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -50, 40, 0],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-36 left-1/4 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#8EA9D3]/10 via-[#4A72B2]/5 to-transparent blur-[90px] dark:from-[#8EA9D3]/12 dark:via-[#18233C]/20 transform-gpu will-change-transform"
      />

      {/* 4. Dynamic Interactive Ambient Dust / Bokeh Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30 hidden md:block"
      />

      {/* 5. Soft Vignette for Depth Focus in Dark Mode */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-transparent dark:to-[#131B2E]/50" />
    </div>
  );
}
