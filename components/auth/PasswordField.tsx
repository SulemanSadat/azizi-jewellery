"use client";

import { useId, useState } from "react";
import { authFieldClass, authFieldErrorClass } from "@/components/auth/fieldStyles";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export default function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  autoComplete,
  disabled,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;
  const hintId = useId();

  return (
    <div>
      <label className="block" htmlFor={id}>
        <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
          {label}
        </span>
        <span className="relative mt-3 block">
          <input
            id={id}
            name={name}
            type={visible ? "text" : "password"}
            value={value}
            autoComplete={autoComplete}
            disabled={disabled}
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${hintId} ${errorId}` : hintId}
            onChange={(event) => onChange(event.target.value)}
            className={`${authFieldClass} mt-0 pr-12 ${error ? authFieldErrorClass : ""}`}
          />
          <button
            type="button"
            className="absolute top-0 right-0 inline-flex h-12 w-12 items-center justify-center text-muted transition-colors hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-champagne-dark"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M3 3l18 18M10.5 10.7a2.5 2.5 0 003.8 3.2M9.9 5.3A10.8 10.8 0 0121 12a10.9 10.9 0 01-3.1 4.1M6.2 6.6A11 11 0 003 12a10.9 10.9 0 009 6.8 10.6 10.6 0 003.3-.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M2.5 12S6.2 6 12 6s9.5 6 9.5 6-3.7 6-9.5 6S2.5 12 2.5 12z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </span>
      </label>
      <span id={hintId} className="sr-only">
        {visible ? "Password is visible" : "Password is hidden"}
      </span>
      {error ? (
        <span id={errorId} className="mt-2 block text-sm text-red-700" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
