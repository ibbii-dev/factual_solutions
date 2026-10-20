import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog: Insights on Operational Excellence",
  description:
    "Practical insights and tools on operational excellence, Lean Six Sigma, quality, strategy, ERP and digital transformation, from practitioners.",
  path: "/blog",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
