"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthAlert from "@/components/auth/AuthAlert";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AccountView() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const onSignOut = async () => {
    setLoading(true);
    setError("");
    try {
      await signOut();
      router.replace("/login");
    } catch {
      setError("Unable to sign out just now. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[40rem] px-5 py-16 pb-28 md:px-8 md:py-20 lg:py-24">
      <p className="text-[0.68rem] tracking-[0.3em] text-champagne-dark uppercase">
        Private account
      </p>
      <h1 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl lg:text-[2.75rem]">
        Welcome, {user.name}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted md:text-[0.95rem] md:leading-8">
        Your client page is ready. Appointments, valuations, and saved
        details will appear here once the house account is connected.
      </p>

      {error ? (
        <div className="mt-6">
          <AuthAlert tone="error">{error}</AuthAlert>
        </div>
      ) : null}

      <dl className="mt-10 space-y-4 border-t border-gold-line pt-6 text-sm">
        <div className="flex justify-between gap-6">
          <dt className="text-muted">Name</dt>
          <dd className="text-charcoal">{user.name}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="text-muted">Email</dt>
          <dd className="break-all text-charcoal">{user.email}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/appointment"
          className="inline-flex min-h-12 items-center justify-center bg-charcoal px-7 text-[0.72rem] tracking-[0.2em] text-ivory-soft uppercase transition-colors hover:bg-champagne-dark"
        >
          Book an appointment
        </Link>
        <button
          type="button"
          onClick={() => void onSignOut()}
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center border border-gold-line px-7 text-[0.72rem] tracking-[0.2em] text-charcoal uppercase transition-colors hover:border-charcoal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
