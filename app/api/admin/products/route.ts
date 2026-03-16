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
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = CreateSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository("Product")
  const saved = await repo.save(
    repo.create({
      ...parsed.data,
      salePrice: parsed.data.salePrice ?? null,
      stock: parsed.data.stock ?? 0,
      featured: parsed.data.featured ?? false,
      badge: (parsed.data.badge as any) ?? null,
      isActive: parsed.data.isActive ?? true,
    } as any)
  )

  return NextResponse.json({ ok: true, row: saved })
}

