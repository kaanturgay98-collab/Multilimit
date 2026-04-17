import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getDb } from "@/lib/db"
import { z } from "zod"
import { createHash } from "crypto"

export const runtime = "nodejs"

const BodySchema = z.object({
  type: z.enum(["page_view", "click"]),
  path: z.string().min(1),
  name: z.string().min(1).optional(),
  referrer: z.string().optional(),
})

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for")
  const fromXff = xff?.split(",")[0]?.trim() || null
  const fromRealIp = req.headers.get("x-real-ip")?.trim() || null
  const ip = fromXff || fromRealIp
  if (!ip) return null
  return ip.startsWith("::ffff:") ? ip.replace("::ffff:", "") : ip
}

function hashIp(ip: string | null) {
  if (!ip) return null
  return createHash("sha256").update(ip).digest("hex")
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const parsed = BodySchema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })

    const jar = await cookies()
    const sessionId = jar.get("ml_sid")?.value ?? "unknown"
    const ipHash = hashIp(getClientIp(req))

    const ds = await getDb()
    const repo = ds.getRepository("AnalyticsEvent")
    await repo.save(
      repo.create({
        type: parsed.data.type,
        path: parsed.data.path,
        name: parsed.data.name ?? null,
        referrer: parsed.data.referrer ?? null,
        sessionId,
        ipHash,
        userAgent: req.headers.get("user-agent"),
        isActive: true,
      })
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Track API error:", error)
    // Analytics should never break the page UX.
    return NextResponse.json({ ok: true })
  }
}

