const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const sessionRaw =
    typeof window !== "undefined"
      ? localStorage.getItem("azizi-auth-session")
      : null;

  const session = sessionRaw
    ? JSON.parse(sessionRaw)
    : null;

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to complete this request."
    );
  }

  return data;
}

export async function getMyAppointments() {
  return apiRequest("/api/v1/appointments");
}