"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-colored reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left rtl:origin-right bg-gradient-to-r from-navy via-steel to-rust pointer-events-none"
    />
  );
}
