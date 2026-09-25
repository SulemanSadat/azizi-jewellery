"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
      return;
    }

    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [ready, user, router]);

  const getToken = () => {
    const raw = localStorage.getItem("azizi-auth-session");
    if (!raw) return null;

    try {
      return JSON.parse(raw).token;
    } catch {
      return null;
    }
  };

  const updateProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    setSavingProfile(true);
    setProfileMessage("");
    setError("");

    try {
      const token = getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile.");
      }

      setProfileMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault();

    setSavingPassword(true);
    setPasswordMessage("");
    setError("");

    try {
      const token = getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/password`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirmation,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to change password.");
      }

      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");

      setPasswordMessage("Password changed successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  if (!ready || !user) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#242321]">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <button
          onClick={() => router.push("/account")}
          className="mb-8 text-sm text-[#6f6b63] hover:text-[#242321]"
        >
          ← Back to Account
        </button>

        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#a98d58]">
            Account Settings
          </p>

          <h1 className="text-4xl font-light">
            Profile & Security
          </h1>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-8">

          <form
            onSubmit={updateProfile}
            className="border border-[#ded8cc] bg-white p-8"
          >
            <h2 className="text-2xl font-light">
              Personal Details
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                  required
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                  required
                />
              </div>
            </div>

            {profileMessage && (
              <p className="mt-5 text-sm text-green-700">
                {profileMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={savingProfile}
              className="mt-6 border border-[#242321] px-6 py-3 text-sm transition hover:bg-[#242321] hover:text-white disabled:opacity-50"
            >
              {savingProfile ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <form
            onSubmit={updatePassword}
            className="border border-[#ded8cc] bg-white p-8"
          >
            <h2 className="text-2xl font-light">
              Change Password
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                  required
                />
              </div>

              <div>
                <label className="text-sm">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                  required
                />
              </div>

              <div>
                <label className="text-sm">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) =>
                    setPasswordConfirmation(e.target.value)
                  }
                  className="mt-2 w-full border border-[#ded8cc] px-4 py-3 outline-none focus:border-[#a98d58]"
                  required
                />
              </div>
            </div>

            {passwordMessage && (
              <p className="mt-5 text-sm text-green-700">
                {passwordMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={savingPassword}
              className="mt-6 border border-[#242321] px-6 py-3 text-sm transition hover:bg-[#242321] hover:text-white disabled:opacity-50"
            >
              {savingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}