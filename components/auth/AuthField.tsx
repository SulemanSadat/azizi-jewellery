"use client";

import { authFieldClass, authFieldErrorClass } from "@/components/auth/fieldStyles";

type AuthFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export default function AuthField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  disabled,
}: AuthFieldProps) {
  const errorId = `${id}-error`;

  return (
    <label className="block" htmlFor={id}>
      <span className="text-[0.65rem] tracking-[0.24em] text-champagne-dark uppercase">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${authFieldClass} ${error ? authFieldErrorClass : ""}`}
      />
      {error ? (
        <span id={errorId} className="mt-2 block text-sm text-red-700" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
