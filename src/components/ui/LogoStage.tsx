"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * LogoStage — the Factual Solutions puzzle cube, assembled live in the browser.
 *
 * The three pieces are the real logo artwork (split into navy / steel / rust layers),
 * so the assembled state is pixel-exact with the brand mark and can never glitch
 * the way a pre-rendered 3D video can. Pieces fly in with 3D depth, lock together
 * with a light pulse, catch a glossy sheen, then drift apart and repeat.
 *
 *  - "hero":  full size, mouse-parallax tilt, particles.
 *  - "ambient": faint, smaller presence behind inner-page headers.
 */
const CYCLE = 12; // seconds
// apart -> (pause) -> assemble -> hold -> drift apart -> (pause): start == end, so it loops seamlessly
const TIMES = [0, 0.08, 0.3, 0.74, 0.92, 1];

type Piece = {
  src: string;
  x: string; y: string;
  rx: number; ry: number; rz: number;
  delay: number;
};

const PIECES: Piece[] = [
  { src: "/images/logo-layer-top.webp",   x: "0%",   y: "-16%", rx: 32,  ry: 0,   rz: -6, delay: 0 },
  { src: "/images/logo-layer-left.webp",  x: "-15%", y: "9%",   rx: 0,   ry: -32, rz: 7,  delay: 0.012 },
  { src: "/images/logo-layer-right.webp", x: "15%",  y: "9%",   rx: 0,   ry: 32,  rz: -6, delay: 0.024 },
];

function seq<T>(apart: T, together: T): T[] {
  return [apart, apart, together, together, apart, apart];
}

export default function LogoStage({ variant = "hero", className = "" }: { variant?: "hero" | "ambient"; className?: string }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Mouse parallax (hero only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(mx, { stiffness: 60, damping: 18 });
  const tiltX = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    setMounted(true);
    if (variant !== "hero") return;
    const onMove = (e: PointerEvent) => {
      mx.set(((e.clientX / window.innerWidth) - 0.5) * 16);
      my.set(-((e.clientY / window.innerHeight) - 0.5) * 12);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [variant, mx, my]);

  const animated = mounted && !reduce;
  const hero = variant === "hero";

  return (
    <div aria-hidden="true" className={`relative select-none pointer-events-none ${className}`} style={{ perspective: 1400 }}>
      {/* Spotlight behind the mark so the navy piece reads on the dark stage */}
      <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(closest-side,rgba(130,169,226,0.30),rgba(31,58,125,0.18)_45%,transparent_72%)]" />
      <motion.div
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(218,106,79,0.22),transparent_70%)] blur-2xl"
        animate={animated ? { opacity: [0.35, 0.35, 0.9, 0.6, 0.35, 0.35] } : undefined}
        transition={{ duration: CYCLE, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Parallax + slow idle sway */}
      <motion.div className="relative w-full aspect-[720/705]" style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={animated ? { rotateY: [-7, 7, -7], y: ["0%", "-2%", "0%"] } : undefined}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          {PIECES.map((p) => (
            <motion.div
              key={p.src}
              className="absolute inset-0"
              initial={false}
              animate={
                animated
                  ? {
                      x: seq(p.x, "0%"),
                      y: seq(p.y, "0%"),
                      rotateX: seq(p.rx, 0),
                      rotateY: seq(p.ry, 0),
                      rotateZ: seq(p.rz, 0),
                      scale: seq(0.9, 1),
                      filter: seq("blur(2.5px)", "blur(0px)"),
                    }
                  : { x: "0%", y: "0%", rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={{
                duration: CYCLE,
                times: TIMES.map((t, i) => (i === 0 || i === TIMES.length - 1 ? t : Math.min(0.99, t + p.delay))),
                repeat: Infinity,
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt=""
                draggable={false}
                className="w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 0 0.6px rgba(180,205,240,0.75)) drop-shadow(0 24px 30px rgba(0,0,0,0.45))" }}
              />
            </motion.div>
          ))}

          {/* Glossy sheen sweeping across the assembled mark */}
          {animated && (
            <motion.div
              className="absolute inset-0 mix-blend-soft-light"
              style={{
                WebkitMaskImage: "url(/images/logo-mask.webp)",
                maskImage: "url(/images/logo-mask.webp)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                backgroundImage: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)",
                backgroundSize: "260% 100%",
              }}
              animate={{
                backgroundPosition: ["160% 0%", "160% 0%", "160% 0%", "-60% 0%", "-60% 0%", "-60% 0%"],
                opacity: [0, 0, 1, 1, 0, 0],
              }}
              transition={{ duration: CYCLE, times: [0, 0.08, 0.34, 0.6, 0.74, 1], repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Lock-in pulse at the moment the pieces meet */}
          {animated && (
            <motion.div
              className="absolute left-1/2 top-[49%] w-[46%] aspect-square rounded-full border-2 border-steel/70"
              style={{ x: "-50%", y: "-50%" }}
              animate={{ scale: [0.6, 0.6, 0.6, 1.5, 1.5], opacity: [0, 0, 0.8, 0, 0] }}
              transition={{ duration: CYCLE, times: [0, 0.27, 0.31, 0.42, 1], repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Drifting light particles */}
      {animated && hero && (
        <div className="absolute inset-[-10%] overflow-visible">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full fs-particle"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${30 + ((i * 53) % 70)}%`,
                width: i % 4 === 0 ? 5 : 3,
                height: i % 4 === 0 ? 5 : 3,
                background: i % 5 === 0 ? "rgba(218,106,79,0.9)" : "rgba(180,205,240,0.85)",
                boxShadow: i % 5 === 0 ? "0 0 10px rgba(218,106,79,0.8)" : "0 0 8px rgba(130,169,226,0.8)",
                animationDelay: `${(i * 0.73) % 9}s`,
                animationDuration: `${8 + (i % 5) * 1.6}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
