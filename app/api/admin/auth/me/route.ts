import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminCookieName, verifyAdminJwt } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function GET() {
  const jar = await cookies()
  const token = jar.get(getAdminCookieName())?.value
  if (!token) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const payload = await verifyAdminJwt(token)
    return NextResponse.json({ ok: true, payload })
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}

