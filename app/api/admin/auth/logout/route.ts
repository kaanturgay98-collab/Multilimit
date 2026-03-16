import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminCookieName } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function POST() {
  const jar = await cookies()
  jar.set(getAdminCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return NextResponse.json({ ok: true })
}

