import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us: Book a Discussion",
  description:
    "Talk to Factual Solutions about consulting, training or ERP & digital transformation. Send a message, book a discussion or request an assessment.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
