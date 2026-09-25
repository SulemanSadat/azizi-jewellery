import { API_URL } from "@/lib/api/config";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status = 0,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export class AuthRequestError extends ApiError {
  constructor(
    message: string,
    status = 0,
    errors?: Record<string, string[]>,
  ) {
    super(message, status, errors);
    this.name = "AuthRequestError";
  }
}

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstValidationMessage(errors?: Record<string, string[]>) {
  if (!errors) return undefined;
  return Object.values(errors)
    .flat()
    .find((message) => typeof message === "string" && message.trim());
}

function parseErrorPayload(data: unknown, status: number): AuthRequestError {
  if (status >= 500) {
    return new AuthRequestError(
      "Unable to complete this request. Please try again.",
      status,
    );
  }
  if (!isJsonObject(data)) {
    return new AuthRequestError(
      status === 0
        ? "Unable to reach the server. Please try again."
        : "Unable to complete this request.",
      status,
    );
  }

  const errors =
    isJsonObject(data.errors) &&
    Object.values(data.errors).every(
      (value) =>
        Array.isArray(value) && value.every((item) => typeof item === "string"),
    )
      ? (data.errors as Record<string, string[]>)
      : undefined;

  const messageFromBody =
    typeof data.message === "string" && data.message.trim()
      ? data.message.trim()
      : undefined;

  const message =
    messageFromBody ||
    firstValidationMessage(errors) ||
    "Unable to complete this request.";

  return new AuthRequestError(message, status, errors);
}

export type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  token?: string | null;
  headers?: HeadersInit;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, token, headers, ...init } = options;
  const requestPath = path.startsWith("/") ? path : `/${path}`;

  let response: Response;

  try {
    response = await fetch(`${API_URL}${requestPath}`, {
      ...init,
      credentials: "omit",
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new AuthRequestError(
      "Unable to reach the server. Please try again.",
      0,
    );
  }

  let data: unknown = null;
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw parseErrorPayload(data, response.status);
  }

  return data as T;
}
