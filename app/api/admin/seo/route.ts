import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"
import { z } from "zod"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()
  const rows = await ds.getRepository(SeoMeta).find({ order: { createdAt: "DESC" }, take: 200 })
  return NextResponse.json({ ok: true, rows })
}

const CreateSchema = z.object({
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  canonicalUrl: z.string().nullable().optional(),
  ogTitle: z.string().nullable().optional(),
  ogDescription: z.string().nullable().optional(),
  ogImage: z.string().nullable().optional(),
  indexable: z.boolean().optional(),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = CreateSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository(SeoMeta)
  const saved = await repo.save(
    repo.create({
      seoTitle: parsed.data.seoTitle,
      seoDescription: parsed.data.seoDescription,
      canonicalUrl: parsed.data.canonicalUrl ?? null,
      ogTitle: parsed.data.ogTitle ?? null,
      ogDescription: parsed.data.ogDescription ?? null,
      ogImage: parsed.data.ogImage ?? null,
      indexable: parsed.data.indexable ?? true,
      isActive: true,
    })
  )

  return NextResponse.json({ ok: true, row: saved })
}

