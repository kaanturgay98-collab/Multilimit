import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

type SiteSettingRow = {
  id: string
  createdAt: string
  updatedAt: string
  isActive: number
  siteName: string
  logoUrl: string | null
  faviconUrl: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  youtubeUrl: string | null
  xUrl: string | null
  footerText: string | null
  copyright: string | null
}

async function ensureSiteSettingTable() {
  const ds = await getDb()
  await ds.query(`
    CREATE TABLE IF NOT EXISTS "SiteSetting" (
      "id" varchar PRIMARY KEY NOT NULL,
      "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
      "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
      "isActive" boolean NOT NULL DEFAULT (1),
      "siteName" varchar NOT NULL,
      "logoUrl" text,
      "faviconUrl" text,
      "phone" text,
      "email" text,
      "whatsapp" text,
      "instagramUrl" text,
      "facebookUrl" text,
      "youtubeUrl" text,
      "xUrl" text,
      "footerText" text,
      "copyright" text
    )
  `)

  const cols = (await ds.query(`PRAGMA table_info("SiteSetting")`)) as Array<{ name: string }>
  const names = new Set(cols.map((c) => c.name))
  if (!names.has("instagramUrl")) await ds.query(`ALTER TABLE "SiteSetting" ADD COLUMN "instagramUrl" text`)
  if (!names.has("facebookUrl")) await ds.query(`ALTER TABLE "SiteSetting" ADD COLUMN "facebookUrl" text`)
  if (!names.has("youtubeUrl")) await ds.query(`ALTER TABLE "SiteSetting" ADD COLUMN "youtubeUrl" text`)
  if (!names.has("xUrl")) await ds.query(`ALTER TABLE "SiteSetting" ADD COLUMN "xUrl" text`)

  return ds
}

function toClientRow(row: SiteSettingRow | null) {
  if (!row) {
    return {
      siteName: "Multilimit",
      logoUrl: "/multilimit-logo.png",
      faviconUrl: "/mltlimit-favicon.ico",
      phone: "",
      email: "",
      whatsapp: "",
      instagramUrl: "",
      facebookUrl: "",
      youtubeUrl: "",
      xUrl: "",
      footerText: "",
      copyright: "",
    }
  }

  return {
    ...row,
    isActive: Boolean(row.isActive),
  }
}

export async function GET() {
  try {
    const ds = await ensureSiteSettingTable()
    const rows = (await ds.query(`SELECT * FROM "SiteSetting" ORDER BY "createdAt" ASC LIMIT 1`)) as SiteSettingRow[]
    return NextResponse.json({ ok: true, row: toClientRow(rows[0] ?? null) })
  } catch (error) {
    console.error("Site settings GET error:", error)
    // Public endpoint (header/footer/contact) must always return a usable payload.
    return NextResponse.json({ ok: true, row: toClientRow(null) })
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    if (!json) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })

    const ds = await ensureSiteSettingTable()
    const rows = (await ds.query(`SELECT * FROM "SiteSetting" ORDER BY "createdAt" ASC LIMIT 1`)) as SiteSettingRow[]
    const current = rows[0] ?? null

    const next = {
      siteName: json.siteName ?? current?.siteName ?? "Multilimit",
      logoUrl: json.logoUrl ?? current?.logoUrl ?? null,
      faviconUrl: json.faviconUrl ?? current?.faviconUrl ?? null,
      phone: json.phone ?? current?.phone ?? null,
      email: json.email ?? current?.email ?? null,
      whatsapp: json.whatsapp ?? current?.whatsapp ?? null,
      instagramUrl: json.instagramUrl ?? current?.instagramUrl ?? null,
      facebookUrl: json.facebookUrl ?? current?.facebookUrl ?? null,
      youtubeUrl: json.youtubeUrl ?? current?.youtubeUrl ?? null,
      xUrl: json.xUrl ?? current?.xUrl ?? null,
      footerText: json.footerText ?? current?.footerText ?? null,
      copyright: json.copyright ?? current?.copyright ?? null,
    }

    if (current) {
      await ds.query(
        `UPDATE "SiteSetting"
         SET "siteName" = ?, "logoUrl" = ?, "faviconUrl" = ?, "phone" = ?, "email" = ?, "whatsapp" = ?, "instagramUrl" = ?, "facebookUrl" = ?, "youtubeUrl" = ?, "xUrl" = ?, "footerText" = ?, "copyright" = ?, "updatedAt" = datetime('now')
         WHERE "id" = ?`,
        [
          next.siteName,
          next.logoUrl,
          next.faviconUrl,
          next.phone,
          next.email,
          next.whatsapp,
          next.instagramUrl,
          next.facebookUrl,
          next.youtubeUrl,
          next.xUrl,
          next.footerText,
          next.copyright,
          current.id,
        ],
      )
    } else {
      await ds.query(
        `INSERT INTO "SiteSetting"
         ("id", "createdAt", "updatedAt", "isActive", "siteName", "logoUrl", "faviconUrl", "phone", "email", "whatsapp", "instagramUrl", "facebookUrl", "youtubeUrl", "xUrl", "footerText", "copyright")
         VALUES (?, datetime('now'), datetime('now'), 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          crypto.randomUUID(),
          next.siteName,
          next.logoUrl,
          next.faviconUrl,
          next.phone,
          next.email,
          next.whatsapp,
          next.instagramUrl,
          next.facebookUrl,
          next.youtubeUrl,
          next.xUrl,
          next.footerText,
          next.copyright,
        ],
      )
    }

    const updatedRows = (await ds.query(`SELECT * FROM "SiteSetting" ORDER BY "createdAt" ASC LIMIT 1`)) as SiteSettingRow[]
    return NextResponse.json({ ok: true, row: toClientRow(updatedRows[0] ?? null) })
  } catch (error: any) {
    console.error("Site settings POST error:", error)
    // Surface the actual reason in JSON so the admin UI can show it.
    const msg = String(error?.message || error || "Failed to save site settings")
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
