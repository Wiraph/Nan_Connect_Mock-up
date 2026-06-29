"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AdminRole = "admin" | "operator";
export type AdminUser = { role: AdminRole; name: string };

type AuthValue = {
  ready: boolean;
  user: AdminUser | null;
  login: (u: AdminUser) => void;
  logout: () => void;
};

const Ctx = createContext<AuthValue | null>(null);
const LS = "nc-admin";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(LS);
      if (v) setUser(JSON.parse(v));
    } catch {}
    setReady(true);
  }, []);

  const login = (u: AdminUser) => {
    setUser(u);
    localStorage.setItem(LS, JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS);
  };

  return <Ctx.Provider value={{ ready, user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAdminAuth(): AuthValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
