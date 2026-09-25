"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchCurrentUser, login, logout, register } from "@/lib/auth/api";
import { readSession } from "@/lib/auth/session";
import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
} from "@/lib/auth/types";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (credentials: LoginCredentials) => Promise<AuthSession>;
  signUp: (payload: RegisterPayload) => Promise<AuthSession>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const session = readSession();
      if (!session) {
        if (!cancelled) {
          setUser(null);
          setReady(true);
        }
        return;
      }

      const current = await fetchCurrentUser();
      if (!cancelled) {
        setUser(current);
        setReady(true);
      }
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    const session = await login(credentials);
    setUser(session.user);
    return session;
  }, []);

  const signUp = useCallback(async (payload: RegisterPayload) => {
    const session = await register(payload);
    setUser(session.user);
    return session;
  }, []);

  const signOut = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, signOut }),
    [user, ready, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
