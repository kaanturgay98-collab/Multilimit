import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import path from "path"
import { mkdir, writeFile } from "fs/promises"
import { PageImage } from "@/lib/typeorm/entities/PageImage"

export const runtime = "nodejs"

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"])
const MAX_BYTES = 5 * 1024 * 1024

function safeFilename(input: string) {
  const base = path.basename(input).replace(/[^\w.\-()]/g, "_")
  return base.length ? base : `upload_${Date.now()}`
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const ds = await getDb()
  const page = await ds.getRepository("Page").findOne({ where: { slug } })
  if (!page) return NextResponse.json({ ok: false, error: "Page not found" }, { status: 404 })

  const form = await req.formData().catch(() => null)
  if (!form) return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 })

  const file = form.get("file")
  const alt = (form.get("alt") as string | null) ?? null
  const sortOrder = Number((form.get("sortOrder") as string | null) ?? "0")

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 })
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ ok: false, error: "Unsupported file type" }, { status: 415 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "File too large" }, { status: 413 })
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  const filename = safeFilename(file.name)
  const dirFs = path.join(process.cwd(), "public", "uploads", slug)
  const fileFs = path.join(dirFs, `${Date.now()}_${filename}`)
  const urlPath = `/uploads/${slug}/${path.basename(fileFs)}`

  await mkdir(dirFs, { recursive: true })
  await writeFile(fileFs, bytes)

  const repo = ds.getRepository(PageImage)
  const img = await repo.save(
    repo.create({
      pageId: page.id,
      page,
      url: urlPath,
      alt: alt?.trim() || null,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    })
  )

  return NextResponse.json({ ok: true, image: img })
}

