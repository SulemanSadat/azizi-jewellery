"use client";

import { FormEvent, useState } from "react";
import { API_URL } from "@/lib/api/config";
import { CONTACT } from "@/lib/contact";

const fieldClass =
  "mt-3 h-12 w-full border border-gold-line bg-ivory-soft/70 px-4 text-sm text-charcoal outline-none transition-colors focus:border-champagne-dark";

export default function AppointmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setSent(false);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: "Appointment",
          appointment_date: date,
          appointment_time: time,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to submit your appointment request."
        );
      }

      const lines = [
        "Appointment enquiry",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        notes ? `Notes: ${notes}` : null,
      ].filter(Boolean);

      const href = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(
        lines.join("\n")
      )}`;

      window.open(href, "_blank", "noopener,noreferrer");

      setSent(true);

      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setNotes("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="glass-panel calculator-lift px-5 py-6 md:px-8 md:py-8"
      onSubmit={onSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Full name
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Telephone
          </span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Preferred date
          </span>
          <input
            required
            type="date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Preferred time
          </span>
          <input
            required
            type="time"
            name="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={fieldClass}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
            Notes
          </span>
          <textarea
            name="notes"
            rows={4}
            maxLength={1000}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className={`${fieldClass} h-32 min-h-32 max-h-64 resize-y overflow-y-auto py-3`}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex min-h-12 items-center justify-center bg-charcoal px-7 text-[0.72rem] tracking-[0.2em] text-ivory-soft uppercase transition-colors hover:bg-champagne-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Book Appointment"}
      </button>

      {sent && (
        <p className="mt-4 text-sm leading-6 text-muted" role="status">
          Your appointment request has been received. WhatsApp has also been
          opened so you can continue the conversation with us.
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm leading-6 text-red-700" role="alert">
          {error}
        </p>
      )}

      {!sent && !error && (
        <p className="mt-4 text-sm leading-6 text-muted">
          Your details will be securely submitted for appointment processing.
        </p>
      )}
    </form>
  );
}