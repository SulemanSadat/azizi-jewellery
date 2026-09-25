"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

type AuthGateProps = {
  mode: "guest" | "protected";
  children: React.ReactNode;
};

export default function AuthGate({ mode, children }: AuthGateProps) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;

    if (mode === "protected" && !user) {
      router.replace("/login?next=/account");
      return;
    }

    if (mode === "guest" && user) {
      router.replace("/account");
    }
  }, [mode, ready, router, user]);

  if (!ready) {
    if (mode === "guest") return children;
    return (
      <p className="px-5 py-16 text-sm tracking-[0.18em] text-muted uppercase" role="status">
        Loading…
      </p>
    );
  }

  if (mode === "protected" && !user) return null;
  if (mode === "guest" && user) return null;

  return children;
}
