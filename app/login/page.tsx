import type { Metadata } from "next";
import { Suspense } from "react";
import AuthGate from "@/components/auth/AuthGate";
import AuthPage from "@/components/auth/AuthPage";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | AZIZI JEWELLERY",
  description:
    "Sign in to your AZIZI JEWELLERY client account for private appointments and valuations.",
};

export default function LoginPage() {
  return (
    <AuthPage
      kicker="Client access"
      title="Sign in"
      description="Enter the email and password for your private account. Appointments remain available without signing in."
    >
      <AuthGate mode="guest">
        <Suspense
          fallback={
            <p className="text-sm tracking-[0.18em] text-muted uppercase" role="status">
              Loading…
            </p>
          }
        >
          <LoginForm />
        </Suspense>
      </AuthGate>
    </AuthPage>
  );
}
