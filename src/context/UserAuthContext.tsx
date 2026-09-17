"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  phone?: string;
  provider: "google" | "email";
  createdAt?: string;
}

interface UserAuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithGoogle: (credential?: string, userInfo?: Partial<UserProfile>) => Promise<boolean>;
  loginWithEmail: (email: string, name?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: "login" | "signup";
  setAuthModalMode: (mode: "login" | "signup") => void;
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "factual_client_session_v1";

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");

  // Load user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse stored user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = useCallback((mode: "login" | "signup" = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Login with Google (decodes JWT or receives direct profile)
  const loginWithGoogle = async (credential?: string, userInfo?: Partial<UserProfile>): Promise<boolean> => {
    try {
      let finalUser: UserProfile;

      if (credential) {
        // Try decoding Google JWT payload
        try {
          const base64Url = credential.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const payload = JSON.parse(jsonPayload);

          finalUser = {
            id: payload.sub || `g_${Date.now()}`,
            name: payload.name || payload.given_name || "Enterprise Client",
            email: payload.email,
            avatar: payload.picture,
            provider: "google",
            createdAt: new Date().toISOString(),
          };
        } catch (err) {
          console.warn("JWT parse fallback", err);
          finalUser = {
            id: `g_${Date.now()}`,
            name: userInfo?.name || "Enterprise Client",
            email: userInfo?.email || "client@enterprise.com",
            avatar: userInfo?.avatar,
            provider: "google",
            createdAt: new Date().toISOString(),
          };
        }
      } else {
        // Direct / simulated Google login
        finalUser = {
          id: userInfo?.id || `g_${Date.now()}`,
          name: userInfo?.name || "Enterprise Client",
          email: userInfo?.email || "client@google.com",
          avatar: userInfo?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          provider: "google",
          createdAt: new Date().toISOString(),
        };
      }

      setUser(finalUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(finalUser));
      setIsAuthModalOpen(false);

      // Notify backend to register / sync client
      try {
        await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalUser),
        });
      } catch (syncErr) {
        // Local session is already valid
      }

      return true;
    } catch (e) {
      console.error("Google authentication error:", e);
      return false;
    }
  };

  // Login with Email
  const loginWithEmail = async (email: string, name?: string, password?: string): Promise<boolean> => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const displayName = name ? name.trim() : cleanEmail.split("@")[0];

      const clientUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: displayName,
        email: cleanEmail,
        provider: "email",
        createdAt: new Date().toISOString(),
      };

      setUser(clientUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(clientUser));
      setIsAuthModalOpen(false);

      // Optional backend sync
      try {
        await fetch("/api/auth/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientUser),
        });
      } catch (err) {
        // Local session preserved
      }

      return true;
    } catch (e) {
      console.error("Email login error:", e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithEmail,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
}
