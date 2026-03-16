import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const ds = await getDb()
  const page = await ds.getRepository("Page").findOne({
    where: { slug },
    relations: { images: true },
    order: { images: { sortOrder: "ASC", createdAt: "ASC" } },
  })
  if (!page) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true, page })
}

const UpdateSchema = z.object({
  title: z.string().min(1).optional(),
  data: z.unknown().optional(),
})

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const json = await req.json().catch(() => null)
  const parsed = UpdateSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })
  }

  const ds = await getDb()
  const repo = ds.getRepository("Page")
  const existing = await repo.findOne({ where: { slug }, relations: { images: true } })
  if (!existing) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  if (parsed.data.title !== undefined) existing.title = parsed.data.title
  if (parsed.data.data !== undefined) existing.data = parsed.data.data

  const saved = await repo.save(existing)
  const page = await repo.findOne({
    where: { id: saved.id },
    relations: { images: true },
    order: { images: { sortOrder: "ASC", createdAt: "ASC" } },
  })

  return NextResponse.json({ ok: true, page })
}

