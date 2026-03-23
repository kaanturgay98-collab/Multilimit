import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { z } from "zod"

export const runtime = "nodejs"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  const row = await ds.getRepository("Product").findOne({ where: { id }, relations: { variants: true, media: true } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true, row })
}

const UpdateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  shortDescription: z.string().min(1).optional(),
  longDescription: z.string().min(1).optional(),
  price: z.number().int().nonnegative().optional(),
  salePrice: z.number().int().nonnegative().nullable().optional(),
  stock: z.number().int().nonnegative().optional(),
  featured: z.boolean().optional(),
  badge: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  trendyolLink: z.string().nullable().optional(),
})

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const json = await req.json().catch(() => null)
  const parsed = UpdateSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository("Product")
  const row = await repo.findOne({ where: { id } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  Object.assign(row as any, parsed.data)
  const saved = await repo.save(row)
  return NextResponse.json({ ok: true, row: saved })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  await ds.getRepository("Product").delete({ id })
  return NextResponse.json({ ok: true })
}

