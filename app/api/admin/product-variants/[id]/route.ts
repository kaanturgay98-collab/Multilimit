import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"
import { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"

export const runtime = "nodejs"

const PatchSchema = z.object({
  isOnSale: z.boolean().optional(),
  isDefault: z.boolean().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const json = await req.json().catch(() => null)
  const parsed = PatchSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository(ProductVariant)
  const row = await repo.findOne({ where: { id } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  Object.assign(row as any, parsed.data)
  await repo.save(row)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  await ds.getRepository(ProductVariant).delete({ id })
  return NextResponse.json({ ok: true })
}

