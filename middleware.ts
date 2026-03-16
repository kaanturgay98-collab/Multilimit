import { NextResponse, type NextRequest } from "next/server"
import { getAdminCookieName, verifyAdminJwt } from "@/lib/admin-jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always ensure a lightweight anonymous session id for analytics
  const res = NextResponse.next()
  if (!req.cookies.get("ml_sid")?.value) {
    // Edge runtime supports crypto.randomUUID()
    res.cookies.set("ml_sid", crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30d
    })
  }

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/")
  const isAdminApi = pathname.startsWith("/api/admin/")
  if (!isAdminPage && !isAdminApi) return res

  // Allow unauthenticated access to login + auth endpoints
  if (pathname === "/admin/login") return res
  if (pathname.startsWith("/api/admin/auth/")) return res

  const token = req.cookies.get(getAdminCookieName())?.value
  if (!token) return reject(req, isAdminApi)

  try {
    await verifyAdminJwt(token)
    return res
  } catch {
    return reject(req, isAdminApi)
  }
}

function reject(req: NextRequest, isAdminApi: boolean) {
  if (isAdminApi) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  const url = req.nextUrl.clone()
  url.pathname = "/admin/login"
  url.searchParams.set("next", req.nextUrl.pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/:path*"],
}

