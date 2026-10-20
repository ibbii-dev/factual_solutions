"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@/components/layout/Icons";

const STORAGE_KEY = "fs-theme";

/** Switches between light and dark and remembers the choice (see THEME_BOOT_SCRIPT). */
export default function ThemeToggle({
  className = "",
  withLabel = false,
  onDeep = false,
}: {
  className?: string;
  withLabel?: boolean;
  /** Styled for a deep navy background (header over a hero). */
  onDeep?: boolean;
}) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: the switch still works for this visit */
    }
  };

  const tone = onDeep
    ? "border-on-deep/25 bg-transparent text-on-deep hover:border-on-deep/60"
    : "border-line bg-bg text-heading hover:border-primary";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      className={`inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] rounded-full border transition-colors ${tone} ${className}`}
    >
      <MoonIcon className="w-5 h-5 dark:hidden" />
      <SunIcon className="w-5 h-5 hidden dark:block" />
      {withLabel && (
        <span className="text-small font-medium pe-1">
          <span className="dark:hidden">Dark mode</span>
          <span className="hidden dark:inline">Light mode</span>
        </span>
      )}
    </button>
  );
}
