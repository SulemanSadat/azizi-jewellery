import { apiRequest, AuthRequestError } from "@/lib/api/client";
import { clearSession, readSession, writeSession } from "@/lib/auth/session";
import type {
  AuthSession,
  AuthUser,
  LaravelAuthResponse,
  LaravelMeResponse,
  LoginCredentials,
  RegisterPayload,
} from "@/lib/auth/types";

export { AuthRequestError };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseUser(value: unknown): AuthUser | null {
  if (!isRecord(value)) return null;

  const rawId = value.id;
  const id =
    typeof rawId === "number"
      ? rawId
      : typeof rawId === "string" && /^\d+$/.test(rawId)
        ? Number(rawId)
        : NaN;

  if (!Number.isFinite(id)) return null;
  if (typeof value.name !== "string" || !value.name.trim()) return null;
  if (typeof value.email !== "string" || !value.email.trim()) return null;

  const user: AuthUser = {
    id,
    name: value.name.trim(),
    email: value.email.trim(),
  };

  if (typeof value.role === "string" && value.role.trim()) {
    user.role = value.role.trim();
  }

  return user;
}

function parseAuthSession(data: LaravelAuthResponse): AuthSession {
  if (typeof data.token !== "string" || !data.token.trim()) {
    throw new AuthRequestError("Unexpected response from the server.");
  }

  const user = parseUser(data.user);
  if (!user) {
    throw new AuthRequestError("Unexpected response from the server.");
  }

  return { token: data.token, user };
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const session = parseAuthSession(
    await apiRequest<LaravelAuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: {
        email: credentials.email.trim(),
        password: credentials.password,
      },
    }),
  );

  writeSession(session);
  return session;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthSession> {
  const session = parseAuthSession(
    await apiRequest<LaravelAuthResponse>("/api/v1/auth/register", {
      method: "POST",
      body: {
        name: payload.name.trim(),
        email: payload.email.trim(),
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      },
    }),
  );

  writeSession(session);
  return session;
}

export async function logout() {
  try {
    await apiRequest("/api/v1/auth/logout", {
      method: "POST",
      token: readSession()?.token,
    });
  } catch {
    /* still clear the local session */
  }

  clearSession();
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const session = readSession();
  if (!session) return null;

  try {
    const data = await apiRequest<LaravelMeResponse>("/api/v1/auth/me", {
      method: "GET",
      token: session.token,
    });
    const user = parseUser(data.user);

    if (!user) {
      clearSession();
      return null;
    }

    writeSession({ token: session.token, user });
    return user;
  } catch (error) {
    if (
      error instanceof AuthRequestError &&
      (error.status === 401 || error.status === 403)
    ) {
      clearSession();
      return null;
    }

    return session.user;
  }
}
