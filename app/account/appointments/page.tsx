"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

type Appointment = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
};

export default function AppointmentsPage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    const loadAppointments = async () => {
      try {
        const sessionRaw = localStorage.getItem("azizi-auth-session");

        if (!sessionRaw) {
          router.replace("/login");
          return;
        }

        const session = JSON.parse(sessionRaw);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointments`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${session.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load your appointments."
          );
        }

        setAppointments(data.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadAppointments();
  }, [ready, user, router]);

  if (!ready || loading) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <p className="text-[#242321]">
          Loading your appointments...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#242321]">
      <div className="mx-auto max-w-5xl px-6 py-16">

        <button
          type="button"
          onClick={() => router.push("/account")}
          className="mb-8 text-sm text-[#6f6b63] hover:text-[#242321]"
        >
          ← Back to Account
        </button>

        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#a98d58]">
            My Appointments
          </p>

          <h1 className="text-4xl font-light tracking-tight">
            Your Appointments
          </h1>

          <p className="mt-3 text-[#6f6b63]">
            View your upcoming and previous AZIZI JEWELLERY appointments.
          </p>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && appointments.length === 0 && (
          <div className="border border-[#ded8cc] bg-white p-10 text-center">
            <h2 className="text-xl font-medium">
              No appointments yet
            </h2>

            <p className="mt-3 text-sm text-[#6f6b63]">
              You haven't booked an appointment yet.
            </p>

            <button
              type="button"
              onClick={() => router.push("/appointment")}
              className="mt-6 border border-[#242321] px-6 py-3 text-sm transition hover:bg-[#242321] hover:text-white"
            >
              Book an Appointment
            </button>
          </div>
        )}

        <div className="space-y-5">
          {appointments.map((appointment) => (
            <article
              key={appointment.id}
              className="border border-[#ded8cc] bg-white p-7"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#a98d58]">
                    {appointment.service}
                  </p>

                  <h2 className="mt-2 text-xl font-medium">
                    {appointment.appointment_date}
                  </h2>

                  <p className="mt-1 text-sm text-[#6f6b63]">
                    {appointment.appointment_time}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit px-3 py-1 text-xs uppercase tracking-wider ${
                    appointment.status === "confirmed"
                      ? "bg-green-50 text-green-700"
                      : appointment.status === "cancelled"
                        ? "bg-red-50 text-red-700"
                        : appointment.status === "completed"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              {appointment.notes && (
                <div className="mt-6 border-t border-[#eeeae2] pt-5">
                  <p className="text-xs uppercase tracking-wider text-[#a98d58]">
                    Notes
                  </p>

                  <p className="mt-2 text-sm text-[#6f6b63]">
                    {appointment.notes}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}