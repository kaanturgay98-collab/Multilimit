import { NextResponse } from "next/server"
import path from "path"
import { unlink } from "fs/promises"
import { deleteLibraryMedia, getLibraryMediaById, normalizeMediaDbError } from "@/lib/media-db"

export const runtime = "nodejs"

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const asset = getLibraryMediaById(id)
    if (!asset) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

    deleteLibraryMedia(id)

    if (asset.url.startsWith("/uploads/")) {
      const rel = asset.url.replace(/^\/uploads\//, "")
      const fsPath = path.join(process.cwd(), "public", "uploads", rel)
      await unlink(fsPath).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    console.error("[Media API] DELETE Error:", error)
    return NextResponse.json({ ok: false, error: normalizeMediaDbError(error) }, { status: 500 })
  }
}
