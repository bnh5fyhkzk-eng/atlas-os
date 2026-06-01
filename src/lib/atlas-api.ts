const ATLAS_API_BASE = process.env.ATLAS_API_BASE || "https://atlas-api.upliftai.app";

export async function proxyToAtlasApi(
  path: string,
  init?: RequestInit & { cookies?: string },
): Promise<Response> {
  const url = `${ATLAS_API_BASE}${path}`;
  const headers = new Headers(init?.headers);
  const secret = process.env.ATLAS_SESSION_SECRET;
  if (secret) {
    headers.set("cookie", `atlas_session=${secret}`);
    headers.set("x-atlas-secret", secret);
  }
  if (!headers.has("content-type") && init?.body) {
    headers.set("content-type", "application/json");
  }
  return fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });
}

export async function atlasApiJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const res = await proxyToAtlasApi(path, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
