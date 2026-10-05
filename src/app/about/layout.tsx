import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Lean, Strategy & Digital Practitioners",
  description:
    "Consultants and trainers with 60+ years of combined experience in Lean, strategy, operations and digital transformation, led by Qadeer Bhatti.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
