import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "What We Think: Principles for Lasting Improvement",
  description:
    "Fix the process before buying software, decide with data, and build people's capability so change sticks: the principles behind our work.",
  path: "/what-we-think",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
