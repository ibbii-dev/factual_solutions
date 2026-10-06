"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One shared IntersectionObserver for the whole site. Elements opt in with
 * `data-reveal` (text/blocks rise in) or the `fs-rule` class (hairline draws in).
 * Pure CSS does the animating; this only flips `is-in` once per element.
 */
export default function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      root.classList.remove("fs-motion");
      return;
    }
    root.classList.add("fs-motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), .fs-rule:not(.is-in)").forEach((el) => io.observe(el));
    };
    scan();
    // Pick up content that renders after data loads (e.g. blog lists).
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
