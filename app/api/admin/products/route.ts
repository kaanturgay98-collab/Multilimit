import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { z } from "zod"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()
  const rows = await ds.getRepository("Product").find({ order: { updatedAt: "DESC" }, take: 500 })
  return NextResponse.json({ ok: true, rows })
}

const CreateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  sku: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  price: z.number().int().nonnegative(),
  salePrice: z.number().int().nonnegative().nullable().optional(),
  stock: z.number().int().nonnegative().optional(),
  featured: z.boolean().optional(),
  badge: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  trendyolLink: z.string().nullable().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const parsed = CreateSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Validation failed", details: parsed.error.format() }, { status: 400 })
    }

    const ds = await getDb()
    const repo = ds.getRepository("Product")
    
    const product = repo.create({
      name: parsed.data.name,
      slug: parsed.data.slug,
      sku: parsed.data.sku,
      shortDescription: parsed.data.shortDescription,
      longDescription: parsed.data.longDescription,
      price: parsed.data.price,
      salePrice: parsed.data.salePrice ?? null,
      stock: parsed.data.stock ?? 0,
      featured: parsed.data.featured ?? false,
      badge: (parsed.data.badge as any) ?? null,
      isActive: parsed.data.isActive ?? true,
      trendyolLink: parsed.data.trendyolLink ?? null,
    })

    const saved = await repo.save(product)
    return NextResponse.json({ ok: true, row: saved })
  } catch (error: any) {
    console.error("Product creation error:", error)
    return NextResponse.json({ ok: false, error: error.message || "Server error" }, { status: 500 })
  }
}

