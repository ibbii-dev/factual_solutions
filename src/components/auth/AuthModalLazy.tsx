"use client";

import dynamic from "next/dynamic";
import { useUserAuth } from "@/context/UserAuthContext";

const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

/** The sign-in modal (and its animation code) is only downloaded when someone opens it. */
export default function AuthModalLazy() {
  const { isAuthModalOpen } = useUserAuth();
  return isAuthModalOpen ? <AuthModal /> : null;
}
