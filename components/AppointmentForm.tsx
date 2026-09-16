"use client";

import { FormEvent, useState } from "react";
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
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      "Appointment enquiry",
      `Name: ${name}`,
      email ? `Email: ${email}` : null,
      phone ? `Phone: ${phone}` : null,
      date ? `Preferred date: ${date}` : null,
      time ? `Preferred time: ${time}` : null,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean);

    const href = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(href, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="glass-panel calculator-lift px-5 py-6 md:px-8 md:py-8" onSubmit={onSubmit}>
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
            type="text"
            name="time"
            placeholder="Morning or afternoon"
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
        className="mt-7 inline-flex min-h-12 items-center justify-center bg-charcoal px-7 text-[0.72rem] tracking-[0.2em] text-ivory-soft uppercase transition-colors hover:bg-champagne-dark"
      >
        Send enquiry
      </button>

      {sent ? (
        <p className="mt-4 text-sm leading-6 text-muted" role="status">
          WhatsApp will open with your request. If it does not, write to us on{" "}
          {CONTACT.phoneDisplay}.
        </p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-muted">
          This form prepares a private enquiry. Online booking can be connected
          here later without changing the page.
        </p>
      )}
    </form>
  );
}
