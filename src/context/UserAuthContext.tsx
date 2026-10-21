"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface UserProfile {
  email: string;
  name: string;
  avatar?: string;
  provider: "google";
}

interface UserAuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  /** False until the site's Google client ID is configured. */
  signInEnabled: boolean;
  /** Verifies a Google credential on the server; returns an error message on failure. */
  loginWithGoogle: (credential: string) => Promise<string | null>;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

/**
 * Client portal sign-in (restored 2026-10-21, rebuilt for security): Google only, verified
 * on the server, which sets a signed session cookie. The browser never decides who is
 * signed in; it asks the server.
 */
export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signInEnabled, setSignInEnabled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/google", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setSignInEnabled(Boolean(data.enabled));
        setUser(data.user ?? null);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const loginWithGoogle = useCallback(async (credential: string): Promise<string | null> => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success || !data.user) return data.message || "Sign-in failed. Please try again.";
      setUser({ email: data.user.email, name: data.user.name, avatar: data.user.avatar, provider: "google" });
      setIsAuthModalOpen(false);
      return null;
    } catch {
      return "We couldn't reach the server. Please check your connection.";
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    fetch("/api/auth/google", { method: "DELETE" }).catch(() => {});
  }, []);

  return (
    <UserAuthContext.Provider
      value={{ user, isLoading, signInEnabled, loginWithGoogle, logout, isAuthModalOpen, openAuthModal, closeAuthModal }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("useUserAuth must be used within a UserAuthProvider");
  return context;
}
