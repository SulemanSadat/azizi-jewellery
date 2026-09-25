"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthField from "@/components/auth/AuthField";
import { useAuth } from "@/components/auth/AuthProvider";
import PasswordField from "@/components/auth/PasswordField";
import { AuthRequestError } from "@/lib/auth/api";
import { safeNextPath } from "@/lib/auth/session";
import type { FieldErrors } from "@/lib/auth/types";
import {
  hasFieldErrors,
  mapLaravelFieldErrors,
  validateLogin,
} from "@/lib/auth/validation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    setError("");
    setSuccess("");

    if (hasFieldErrors(nextErrors)) return;

    setLoading(true);
    try {
      await signIn({ email, password });
      setSuccess("Signed in. Taking you to your account.");
      const next = safeNextPath(searchParams.get("next"));
      window.setTimeout(() => router.replace(next), 650);
    } catch (err) {
      const message =
        err instanceof AuthRequestError
          ? err.message
          : "Unable to sign in. Please try again.";
      setError(message);
      if (err instanceof AuthRequestError) {
        setErrors(mapLaravelFieldErrors(err.errors));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      {error ? <AuthAlert tone="error">{error}</AuthAlert> : null}
      {success ? <AuthAlert tone="success">{success}</AuthAlert> : null}

      <AuthField
        id="login-email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        error={errors.email}
        disabled={loading}
        onChange={(value) => {
          setEmail(value);
          setErrors((current) => ({ ...current, email: undefined }));
        }}
      />

      <PasswordField
        id="login-password"
        name="password"
        label="Password"
        autoComplete="current-password"
        value={password}
        error={errors.password}
        disabled={loading}
        onChange={(value) => {
          setPassword(value);
          setErrors((current) => ({ ...current, password: undefined }));
        }}
      />

      <AuthButton loading={loading}>Sign in</AuthButton>

      <p className="text-sm leading-7 text-muted">
        New to the house?{" "}
        <Link
          href="/register"
          className="text-charcoal underline decoration-gold-line underline-offset-4 hover:text-champagne-dark"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
