"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle floating particles matching logo colors
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

    // Logo brand colors in RGBA
    const colors = [
      "142, 169, 211", // Steel Blue #8EA9D3
      "163, 63, 46",   // Terracotta Rust #A33F2E
      "30, 46, 89",    // Deep Midnight Navy #1E2E59
      "191, 74, 51",   // Warm Rust Light #BF4A33
    ];

    const particleCount = Math.min(Math.floor((width * height) / 28000), 45);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: 0.015 + Math.random() * 0.02,
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw faint constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(142, 169, 211, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Mouse gentle interaction
        if (mouseX > 0 && mouseY > 0) {
          const mdx = p1.x - mouseX;
          const mdy = p1.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const force = (1 - mdist / 140) * 0.5;
            p1.x += (mdx / mdist) * force;
            p1.y += (mdy / mdist) * force;
          }
        }

        // Particle update
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < -20) p1.x = width + 20;
        if (p1.x > width + 20) p1.x = -20;
        if (p1.y < -20) p1.y = height + 20;
        if (p1.y > height + 20) p1.y = -20;

        // Draw particle
        const currentAlpha = p1.alpha + Math.sin(tick * p1.pulseSpeed) * 0.08;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, ${Math.max(0.05, currentAlpha)})`;
        ctx.shadowColor = `rgba(${p1.color}, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-white dark:bg-[#0E1626] transition-colors duration-300"
    >
      {/* 1. Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.045] bg-[radial-gradient(#152238_1px,transparent_1px)] dark:bg-[radial-gradient(#8EA9D3_1px,transparent_1px)] [background-size:28px_28px]" 
      />

      {/* 2. Brand Midnight Navy Ambient Mesh Orb (Deep Upper Left) */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[520px] sm:w-[720px] h-[520px] sm:h-[720px] rounded-full bg-gradient-to-br from-[#8EA9D3]/12 via-[#152238]/5 to-transparent blur-[120px] dark:from-[#1E2E59]/35 dark:via-[#131E33]/25"
      />

      {/* 3. Brand Terracotta Rust Ambient Orb (Warm Strategic Glow - Center Right) */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/4 -right-28 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-bl from-[#A33C29]/10 via-[#BF4A33]/5 to-transparent blur-[125px] dark:from-[#A33C29]/18 dark:via-[#BF4A33]/10"
      />

      {/* 4. Brand Ice Steel Blue Ambient Orb (Lower Left & Center) */}
      <motion.div
        animate={{
          x: [0, 70, -50, 0],
          y: [0, -60, 50, 0],
          scale: [0.95, 1.18, 1, 0.95],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-36 left-1/4 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full bg-gradient-to-tr from-[#8EA9D3]/12 via-[#4A72B2]/6 to-transparent blur-[120px] dark:from-[#8EA9D3]/18 dark:via-[#1E3150]/20"
      />

      {/* 5. Subtle Interlocking Light Accents (Inspired by Cube Axis) */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          scale: [0.98, 1.05, 0.98],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-brand-steel/6 via-transparent to-transparent blur-[130px] dark:from-brand-steel/8"
      />

      {/* 6. Dynamic Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-90"
      />

      {/* 7. Soft Vignette for Depth Focus in Dark Mode */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-transparent dark:to-[#0E1626]/40" />
    </div>
  );
}
