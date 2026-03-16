import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminCookieName, signAdminJwt, verifyAdminPassword } from "@/lib/admin-auth"
import { z } from "zod"

export const runtime = "nodejs"

const BodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })
  }

  const adminUsername = process.env.ADMIN_USERNAME
  if (!adminUsername) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 })
  }

  const { username, password } = parsed.data
  if (username !== adminUsername || !verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 })
  }

  const token = await signAdminJwt()
  const ttl = Number(process.env.ADMIN_JWT_TTL_SECONDS ?? "86400")

  const jar = await cookies()
  jar.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ttl,
  })

  return NextResponse.json({ ok: true })
}

