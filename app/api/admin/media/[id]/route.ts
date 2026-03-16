import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { MediaAsset } from "@/lib/typeorm/entities/MediaAsset"
import path from "path"
import { unlink } from "fs/promises"

export const runtime = "nodejs"

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  const repo = ds.getRepository(MediaAsset)
  const asset = await repo.findOne({ where: { id } })
  if (!asset) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  await repo.delete({ id })

  if (asset.url.startsWith("/uploads/")) {
    const rel = asset.url.replace(/^\/uploads\//, "")
    const fsPath = path.join(process.cwd(), "public", "uploads", rel)
    await unlink(fsPath).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}

