"use client"

type FetchJsonOptions = RequestInit & { redirectToLogin?: boolean }

export async function adminFetchJson<T>(input: RequestInfo | URL, init?: FetchJsonOptions): Promise<T> {
  const res = await fetch(input, { ...init, cache: "no-store" })

  if (res.status === 401 && (init?.redirectToLogin ?? true)) {
    if (typeof window !== "undefined") window.location.href = "/admin/login"
    throw new Error("Unauthorized")
  }

  const ct = res.headers.get("content-type") ?? ""
  if (!ct.includes("application/json")) {
    const text = await res.text().catch(() => "")
    throw new Error(`Non-JSON response (${res.status}): ${text.slice(0, 120)}`)
  }

  const json = (await res.json().catch(() => null)) as T | null
  if (!json) throw new Error(`Invalid JSON (${res.status})`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return json
}

