import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()
  const repo = ds.getRepository(ProductVariant)

  const rows = await repo.find({ relations: { product: true }, order: { createdAt: "DESC" } })

  return NextResponse.json({
    ok: true,
    rows: rows.map((v) => ({
      id: v.id,
      name: v.name,
      productName: v.product?.name ?? "",
      productId: v.product?.id ?? null,
      price: v.price,
      salePrice: v.salePrice,
      stock: v.stock,
      isOnSale: v.isOnSale,
      isDefault: v.isDefault,
    })),
  })
}

