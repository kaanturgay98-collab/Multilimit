import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

const CreateOrderSchema = z.object({
  shipping: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    district: z.string().min(1),
    postalCode: z.string().min(1),
  }),
  totalAmount: z.number().int().nonnegative(),
  currency: z.string().min(1).default("TRY"),
  items: z.unknown(),
})

function generateOrderNo() {
  const d = new Date()
  const y = d.getFullYear().toString()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `ML-${y}${m}${day}-${rand}`
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = CreateOrderSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })
  }

  const ds = await getDb()
  const repo = ds.getRepository("Order")
  const itemRepo = ds.getRepository("OrderItem")

  // Retry a few times in case of orderNo collision (very unlikely)
  for (let i = 0; i < 3; i++) {
    const orderNo = generateOrderNo()
    try {
      const o = await repo.save(
        repo.create({
          orderNo,
          status: "pending" as any,
          paymentStatus: "pending" as any,
          firstName: parsed.data.shipping.firstName,
          lastName: parsed.data.shipping.lastName,
          email: parsed.data.shipping.email,
          phone: parsed.data.shipping.phone,
          address: parsed.data.shipping.address,
          city: parsed.data.shipping.city,
          district: parsed.data.shipping.district,
          postalCode: parsed.data.shipping.postalCode,
          currency: parsed.data.currency,
          totalAmount: parsed.data.totalAmount,
          items: parsed.data.items,
        })
      )

      // Best-effort: normalize cart items into OrderItem rows
      const items = Array.isArray((parsed.data as any).items) ? ((parsed.data as any).items as any[]) : []
      if (items.length) {
        await itemRepo.save(
          items.map((it) =>
            itemRepo.create({
              productName: String(it.productName ?? it.name ?? "Urun"),
              variantName: it.variantName
                ? String(it.variantName)
                : it.variant
                  ? String(it.variant)
                  : it.packageName
                    ? String(it.packageName)
                    : null,
              quantity: Number(it.quantity ?? 1),
              unitPrice: Number(it.unitPrice ?? it.price ?? 0),
              lineTotal: Number((it.unitPrice ?? it.price ?? 0) * (it.quantity ?? 1)),
              order: o,
              product: null,
              variant: null,
              isActive: true,
            })
          )
        )
      }

      return NextResponse.json({ ok: true, order: { id: o.id, orderNo: o.orderNo } })
    } catch {
      // try again
    }
  }

  return NextResponse.json({ ok: false, error: "Could not create order" }, { status: 500 })
}

