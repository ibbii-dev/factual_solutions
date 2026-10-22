import type { Metadata } from "next";
import { NotifyProvider } from "@/components/ui/Notify";

export const metadata: Metadata = { title: "Staff Admin", robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NotifyProvider>{children}</NotifyProvider>;
}
