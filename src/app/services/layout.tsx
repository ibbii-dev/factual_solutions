import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Consulting, Training & ERP Services",
  description:
    "Lean Six Sigma and operational excellence consulting, practical training, and ERP, automation and custom software that help organizations perform better.",
  path: "/services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
