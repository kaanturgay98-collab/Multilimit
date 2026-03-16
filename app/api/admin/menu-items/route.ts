import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

const CreateSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1).nullable().optional(),
  external: z.boolean().optional(),
  location: z.enum(["header", "footer"]),
  group: z.enum(["quick", "product", "legal"]).nullable().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
})

export async function GET(req: Request) {
  const url = new URL(req.url)
  const location = url.searchParams.get("location")

  const ds = await getDb()
  const repo = ds.getRepository("MenuItem")
  const where = location ? ({ location } as any) : ({} as any)
  const rows = await repo.find({ where, order: { location: "ASC" as any, sortOrder: "ASC", createdAt: "ASC" } })
  return NextResponse.json({ ok: true, rows })
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = CreateSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository("MenuItem")

  const row = await repo.save(
    repo.create({
      label: parsed.data.label,
      href: parsed.data.href ?? null,
      external: parsed.data.external ?? false,
      location: parsed.data.location,
      group: parsed.data.location === "footer" ? (parsed.data.group ?? "quick") : null,
      sortOrder: parsed.data.sortOrder ?? 0,
      isActive: parsed.data.isActive ?? true,
      parent: null,
    })
  )

  return NextResponse.json({ ok: true, row })
}

