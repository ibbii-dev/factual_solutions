"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export default function InteractiveHeroCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tracking spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-16, 16]), { stiffness: 120, damping: 20 });
  const scale = useSpring(isHovered ? 1.03 : 1, { stiffness: 180, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[320px] sm:max-w-[420px] h-[300px] sm:h-[380px] flex items-center justify-center select-none perspective-[1000px] mx-auto"
    >
      {/* Interactive 3D Puzzle Cube Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* User Uploaded HD 3D Puzzle Cube Symbol */}
        <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_12px_24px_rgba(21,34,56,0.18)] dark:drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]">
          <Image
            src="/images/logo-symbol.png"
            alt="Factual Solutions 3D Symbol"
            width={320}
            height={320}
            priority
            className="object-contain select-none pointer-events-none max-w-full h-auto"
          />
        </div>
      </motion.div>
    </div>
  );
}
