import { AUTH_SESSION_KEY } from "@/lib/auth/config";
import type { AuthSession, AuthUser } from "@/lib/auth/types";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function readSession(): AuthSession | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.token || !parsed?.user?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeSession(session: AuthSession) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

export function readUser(): AuthUser | null {
  return readSession()?.user ?? null;
}

export function safeNextPath(value: string | null | undefined) {
  if (!value) return "/account";
  if (!value.startsWith("/")) return "/account";
  if (value.startsWith("//") || value.startsWith("/\\")) return "/account";
  if (value.includes("://")) return "/account";
  return value;
}
