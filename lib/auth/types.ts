export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "password_confirmation", string>
>;

export type AuthApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export type LaravelAuthResponse = {
  success?: boolean;
  message?: string;
  user?: unknown;
  token?: unknown;
};

export type LaravelMeResponse = {
  success?: boolean;
  user?: unknown;
};
