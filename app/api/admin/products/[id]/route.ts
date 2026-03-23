import { NextResponse } from "next/server"
import { z } from "zod"
import { deleteProduct, getProductById, normalizeSqliteError, updateProduct } from "@/lib/products-db"

export const runtime = "nodejs"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = getProductById(id)
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true, row: { ...row, variants: [], media: [] } })
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
  try {
    const { id } = await params
    const json = await req.json().catch(() => null)
    const parsed = UpdateSchema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

    const row = updateProduct(id, parsed.data as any)
    if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
    return NextResponse.json({ ok: true, row })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: normalizeSqliteError(error) }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  deleteProduct(id)
  return NextResponse.json({ ok: true })
}

