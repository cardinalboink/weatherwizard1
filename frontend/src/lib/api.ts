import type { ApiSuccess, ApiError } from "@/lib/types";

export async function fetchAverageWeather(
  city: string,
  days: number
): Promise<ApiSuccess> {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const url = new URL("/weather/average", backendUrl);
  url.searchParams.set("city", city.trim());
  url.searchParams.set("days", String(days));

  const res = await fetch(url.toString());

  const body: ApiSuccess | ApiError | null = await res
    .json()
    .catch(() => null);

  if (!res.ok) {
    const message =
      body && "error" in body
        ? body.error.message
        : `Request failed (${res.status})`;

    throw new Error(message);
  }

  return body as ApiSuccess;
}
