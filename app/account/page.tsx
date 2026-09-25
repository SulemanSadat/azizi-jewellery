"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const { user, ready, signOut } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await signOut();
      router.replace("/login");
    } catch {
      setLoggingOut(false);
    }
  };

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p className="text-[#242321]">Loading your account...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#242321]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#a98d58]">
            My Account
          </p>

          <h1 className="text-4xl font-light tracking-tight">
            Welcome, {user.name}
          </h1>

          <p className="mt-3 text-[#6f6b63]">
            Manage your AZIZI JEWELLERY account and appointments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <section className="border border-[#ded8cc] bg-white p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a98d58]">
              Profile
            </p>

            <h2 className="mt-4 text-xl font-medium">
              {user.name}
            </h2>

            <p className="mt-2 text-sm text-[#6f6b63]">
              {user.email}
            </p>

            <button
              type="button"
              onClick={() => router.push("/account/profile")}
              className="mt-6 border border-[#242321] px-5 py-3 text-sm transition hover:bg-[#242321] hover:text-white"
            >
              Edit Profile
            </button>
          </section>

          <section className="border border-[#ded8cc] bg-white p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a98d58]">
              Appointments
            </p>

            <h2 className="mt-4 text-xl font-medium">
              My Appointments
            </h2>

            <p className="mt-2 text-sm text-[#6f6b63]">
              View and manage your jewellery appointments.
            </p>

            <button
              type="button"
              onClick={() => router.push("/account/appointments")}
              className="mt-6 border border-[#242321] px-5 py-3 text-sm transition hover:bg-[#242321] hover:text-white"
            >
              View Appointments
            </button>
          </section>

          <section className="border border-[#ded8cc] bg-white p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a98d58]">
              Security
            </p>

            <h2 className="mt-4 text-xl font-medium">
              Account Security
            </h2>

            <p className="mt-2 text-sm text-[#6f6b63]">
              Change your password and manage account security.
            </p>

            <button
              type="button"
              className="mt-6 border border-[#242321] px-5 py-3 text-sm transition hover:bg-[#242321] hover:text-white"
            >
              Change Password
            </button>
          </section>
        </div>

        <div className="mt-10 border-t border-[#ded8cc] pt-8">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-sm text-red-700 transition hover:text-red-900 disabled:opacity-50"
          >
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </main>
  );
}