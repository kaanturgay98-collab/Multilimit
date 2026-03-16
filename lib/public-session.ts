"use client"

export type PublicUserSession = {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

const KEY = "ml_user_v1"

export function getPublicSession(): PublicUserSession | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return null
  try {
    const v = JSON.parse(raw) as any
    if (!v || typeof v !== "object") return null
    if (!v.email || !v.firstName || !v.lastName) return null
    return {
      firstName: String(v.firstName),
      lastName: String(v.lastName),
      email: String(v.email),
      phone: v.phone ? String(v.phone) : undefined,
    }
  } catch {
    return null
  }
}

export function setPublicSession(s: PublicUserSession) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(KEY, JSON.stringify(s))
}

export function clearPublicSession() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(KEY)
}

