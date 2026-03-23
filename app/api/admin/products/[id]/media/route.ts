import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { MediaAsset } from "@/lib/typeorm/entities/MediaAsset"
import path from "path"
import { mkdir, writeFile } from "fs/promises"

export const runtime = "nodejs"

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"])
const MAX_BYTES = 10 * 1024 * 1024

function safeFilename(input: string) {
  const base = path.basename(input).replace(/[^\w.\-()]/g, "_")
  return base.length ? base : `upload_${Date.now()}`
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  const productRepo = ds.getRepository("Product")
  // Cast id to whatever is expected, normally TypeORM handles string/uuid string.
  const product = await productRepo.findOne({ where: { id } })
  if (!product) return NextResponse.json({ ok: false, error: "Product not found" }, { status: 404 })

  const form = await req.formData().catch(() => null)
  if (!form) return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 })

  const file = form.get("file")
  const alt = (form.get("alt") as string | null) ?? null

  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 })
  if (!ALLOWED_MIME.has(file.type)) return NextResponse.json({ ok: false, error: "Unsupported file type" }, { status: 415 })
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "File too large" }, { status: 413 })

  const bytes = Buffer.from(await file.arrayBuffer())
  const filename = safeFilename(file.name)
  const dirFs = path.join(process.cwd(), "public", "uploads", "products")
  const fileFs = path.join(dirFs, `${Date.now()}_${filename}`)
  const urlPath = `/uploads/products/${path.basename(fileFs)}`

  await mkdir(dirFs, { recursive: true })
  await writeFile(fileFs, bytes)

  const mediaRepo = ds.getRepository("MediaAsset")
  const saved = await mediaRepo.save(
    mediaRepo.create({
      url: urlPath,
      alt: alt?.trim() || product.name,
      collection: "products",
      product: { id } as any,
    })
  )

  return NextResponse.json({ ok: true, asset: { id: saved.id, url: saved.url, alt: saved.alt } })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { searchParams } = new URL(req.url)
    const mediaId = searchParams.get('mediaId')
    
    if(!mediaId) return NextResponse.json({ ok: false, error: "Missing mediaId" }, { status: 400 })
    
    const ds = await getDb()
    await ds.getRepository("MediaAsset").delete({ id: mediaId, product: { id } as any })
    return NextResponse.json({ ok: true })
}
