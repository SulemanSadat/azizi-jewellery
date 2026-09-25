import type { FieldErrors, LoginCredentials, RegisterPayload } from "@/lib/auth/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateLogin(values: LoginCredentials): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
}

export function validateRegister(values: RegisterPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please choose a password.";
  } else if (values.password.length < 8) {
    errors.password = "Password should be at least 8 characters.";
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = "Please confirm your password.";
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Passwords do not match.";
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}

const AUTH_FIELDS = [
  "name",
  "email",
  "password",
  "password_confirmation",
] as const;

export function mapLaravelFieldErrors(
  errors?: Record<string, string[]>,
): FieldErrors {
  if (!errors) return {};

  const next: FieldErrors = {};

  for (const field of AUTH_FIELDS) {
    const message = errors[field]?.[0];
    if (message) next[field] = message;
  }

  return next;
}
