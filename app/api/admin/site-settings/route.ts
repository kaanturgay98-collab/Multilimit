import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { SiteSetting } from "@/lib/typeorm/entities/SiteSetting"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()
  const repo = ds.getRepository(SiteSetting)
  let setting = await repo.findOne({ where: {} })
  
  if (!setting) {
    // Return a default object if none exists, or empty
    return NextResponse.json({ 
      ok: true, 
      row: {
        siteName: "Multilimit",
        logoUrl: "",
        faviconUrl: "",
        phone: "",
        email: "",
        whatsapp: "",
        footerText: "",
        copyright: ""
      } 
    })
  }
  
  return NextResponse.json({ ok: true, row: setting })
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  if (!json) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository(SiteSetting)
  let setting = await repo.findOne({ where: {} })

  if (setting) {
    // Explicitly update only the target fields to avoid potential issues with updatedAt/createdAt
    // if SiteSetting has they defined as non-nullable class properties
    setting.siteName = json.siteName ?? setting.siteName
    setting.logoUrl = json.logoUrl ?? setting.logoUrl
    setting.faviconUrl = json.faviconUrl ?? setting.faviconUrl
    setting.phone = json.phone ?? setting.phone
    setting.email = json.email ?? setting.email
    setting.whatsapp = json.whatsapp ?? setting.whatsapp
    setting.footerText = json.footerText ?? setting.footerText
    setting.copyright = json.copyright ?? setting.copyright
    
    await repo.save(setting)
  } else {
    setting = repo.create({
      siteName: json.siteName || "Multilimit",
      logoUrl: json.logoUrl || null,
      faviconUrl: json.faviconUrl || null,
      phone: json.phone || null,
      email: json.email || null,
      whatsapp: json.whatsapp || null,
      footerText: json.footerText || null,
      copyright: json.copyright || null
    })
    await repo.save(setting)
  }

  return NextResponse.json({ ok: true, row: setting })
}
