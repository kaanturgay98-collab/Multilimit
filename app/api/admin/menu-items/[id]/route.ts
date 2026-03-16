import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

const UpdateSchema = z.object({
  label: z.string().min(1).optional(),
  href: z.string().min(1).nullable().optional(),
  external: z.boolean().optional(),
  location: z.enum(["header", "footer"]).optional(),
  group: z.enum(["quick", "product", "legal"]).nullable().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
})

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const json = await req.json().catch(() => null)
  const parsed = UpdateSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository("MenuItem")
  const row = await repo.findOne({ where: { id } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  if (parsed.data.label !== undefined) row.label = parsed.data.label
  if (parsed.data.href !== undefined) row.href = parsed.data.href
  if (parsed.data.external !== undefined) row.external = parsed.data.external
  if (parsed.data.location !== undefined) (row as any).location = parsed.data.location
  if (parsed.data.group !== undefined) (row as any).group = parsed.data.group
  if (parsed.data.sortOrder !== undefined) row.sortOrder = parsed.data.sortOrder
  if (parsed.data.isActive !== undefined) row.isActive = parsed.data.isActive
  await repo.save(row)

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  const repo = ds.getRepository("MenuItem")
  const row = await repo.findOne({ where: { id } })
  if (!row) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  await repo.remove(row)
  return NextResponse.json({ ok: true })
}

