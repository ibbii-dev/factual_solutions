import React from "react";

/**
 * Route transition: every page fades and rises in softly on navigation.
 * Pure CSS (no JS), so the first paint is never held back waiting for hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="fs-page-in">{children}</div>;
}
