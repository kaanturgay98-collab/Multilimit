import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import path from "path"
import { unlink } from "fs/promises"
import { PageImage } from "@/lib/typeorm/entities/PageImage"

export const runtime = "nodejs"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ds = await getDb()
  const repo = ds.getRepository(PageImage)
  const img = await repo.findOne({ where: { id } })
  if (!img) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  await repo.delete({ id })

  // Best-effort remove from disk (only if under /public/uploads)
  if (img.url.startsWith("/uploads/")) {
    const rel = img.url.replace(/^\/uploads\//, "")
    const fsPath = path.join(process.cwd(), "public", "uploads", rel)
    await unlink(fsPath).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}

