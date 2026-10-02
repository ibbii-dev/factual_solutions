"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Route transition: every page fades and rises in softly on navigation.
 * Re-mounts on each route change (Next.js template semantics); purely visual.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transitionEnd: { transform: "none" } }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
