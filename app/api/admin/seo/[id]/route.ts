import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

export const runtime = "nodejs"

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  await ds.getRepository(SeoMeta).delete({ id })
  return NextResponse.json({ ok: true })
}

