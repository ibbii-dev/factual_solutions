"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";

export default function PortalLoginPage() {
  const router = useRouter();
  const { user, openAuthModal } = useUserAuth();

  useEffect(() => {
    if (user) {
      router.push("/portal");
    } else {
      openAuthModal("login");
    }
  }, [user, router, openAuthModal]);

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#A33C29] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Redirecting to Client Portal authentication...</p>
      </div>
    </div>
  );
}
