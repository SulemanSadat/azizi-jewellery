"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import AuthAlert from "@/components/auth/AuthAlert";
import AuthButton from "@/components/auth/AuthButton";
import AuthField from "@/components/auth/AuthField";
import { useAuth } from "@/components/auth/AuthProvider";
import PasswordField from "@/components/auth/PasswordField";
import { AuthRequestError } from "@/lib/auth/api";
import type { FieldErrors } from "@/lib/auth/types";
import {
  hasFieldErrors,
  mapLaravelFieldErrors,
  validateRegister,
} from "@/lib/auth/validation";

export default function RegisterForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };
    const nextErrors = validateRegister(payload);
    setErrors(nextErrors);
    setError("");
    setSuccess("");

    if (hasFieldErrors(nextErrors)) return;

    setLoading(true);
    try {
      await signUp(payload);
      setSuccess("Your account has been created. Opening your private page.");
      window.setTimeout(() => router.replace("/account"), 700);
    } catch (err) {
      const message =
        err instanceof AuthRequestError
          ? err.message
          : "Unable to create your account. Please try again.";
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
        id="register-name"
        name="name"
        label="Full name"
        autoComplete="name"
        value={name}
        error={errors.name}
        disabled={loading}
        onChange={(value) => {
          setName(value);
          setErrors((current) => ({ ...current, name: undefined }));
        }}
      />

      <AuthField
        id="register-email"
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
        id="register-password"
        name="password"
        label="Password"
        autoComplete="new-password"
        value={password}
        error={errors.password}
        disabled={loading}
        onChange={(value) => {
          setPassword(value);
          setErrors((current) => ({ ...current, password: undefined }));
        }}
      />

      <PasswordField
        id="register-password-confirmation"
        name="password_confirmation"
        label="Confirm password"
        autoComplete="new-password"
        value={passwordConfirmation}
        error={errors.password_confirmation}
        disabled={loading}
        onChange={(value) => {
          setPasswordConfirmation(value);
          setErrors((current) => ({
            ...current,
            password_confirmation: undefined,
          }));
        }}
      />

      <AuthButton loading={loading}>Create account</AuthButton>

      <p className="text-sm leading-7 text-muted">
        Already a client?{" "}
        <Link
          href="/login"
          className="text-charcoal underline decoration-gold-line underline-offset-4 hover:text-champagne-dark"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
