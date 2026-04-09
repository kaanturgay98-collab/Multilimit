import { NextResponse } from "next/server"
import path from "path"
import { mkdir, writeFile } from "fs/promises"
import {
  insertLibraryMedia,
  listLibraryMedia,
  normalizeMediaDbError,
} from "@/lib/media-db"

export const runtime = "nodejs"

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"])
const MAX_BYTES = 6 * 1024 * 1024

function safeFilename(input: string) {
  const base = path.basename(input).replace(/[^\w.\-()]/g, "_")
  return base.length ? base : `upload_${Date.now()}`
}

export async function GET() {
  try {
    const assets = listLibraryMedia(200)
    return NextResponse.json({ ok: true, assets })
  } catch (error: unknown) {
    console.error("[Media API] GET Error:", error)
    return NextResponse.json({ ok: false, error: normalizeMediaDbError(error) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData().catch(() => null)
    if (!form) return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 })

    const file = form.get("file")
    const alt = (form.get("alt") as string | null) ?? null
    const collection = (form.get("collection") as string | null) ?? "general"

    if (!(file instanceof File)) return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 })
    if (!ALLOWED_MIME.has(file.type)) return NextResponse.json({ ok: false, error: "Unsupported file type" }, { status: 415 })
    if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "File too large" }, { status: 413 })

    const bytes = Buffer.from(await file.arrayBuffer())
    const filename = safeFilename(file.name)
    const dirFs = path.join(process.cwd(), "public", "uploads", "media", collection)
    const fileFs = path.join(dirFs, `${Date.now()}_${filename}`)
    const urlPath = `/uploads/media/${collection}/${path.basename(fileFs)}`

    await mkdir(dirFs, { recursive: true })
    await writeFile(fileFs, bytes)

    const saved = insertLibraryMedia({
      url: urlPath,
      alt: alt?.trim() || null,
      collection: collection?.trim() || "general",
      sortOrder: 0,
    })

    return NextResponse.json({ ok: true, asset: saved })
  } catch (error: unknown) {
    console.error("[Media API] POST Error:", error)
    return NextResponse.json({ ok: false, error: normalizeMediaDbError(error) }, { status: 500 })
  }
}
