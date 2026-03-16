import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"
import { mockPaymentProvider } from "@/lib/payments/mock-provider"

export const runtime = "nodejs"

const BodySchema = z.object({
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
  couponCode: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  currency: z.string().min(1).default("TRY"),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      productName: z.string().min(1),
      variantId: z.string().min(1),
      variantName: z.string().min(1),
      unitPrice: z.number().int().nonnegative(),
      quantity: z.number().int().positive(),
    })
  ),
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
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const orderRepo = ds.getRepository("Order")
  const itemRepo = ds.getRepository("OrderItem")
  const txRepo = ds.getRepository("PaymentTransaction")

  const subtotal = parsed.data.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0)

  // Basic coupon (optional, best-effort)
  let discountTotal = 0
  const couponCode = parsed.data.couponCode?.trim() || null
  if (couponCode) {
    const coupon = await ds.getRepository("Coupon").findOne({ where: { code: couponCode } as any }).catch(() => null)
    if (coupon && (coupon as any).isActive !== false) {
      if ((coupon as any).discountType === "percentage") {
        discountTotal = Math.round((subtotal * Number((coupon as any).discountValue ?? 0)) / 100)
      } else {
        discountTotal = Math.min(subtotal, Number((coupon as any).discountValue ?? 0))
      }
    } else {
      // Mock fallback coupons (keep system simple)
      const code = couponCode.trim().toUpperCase()
      if (code === "ML10") discountTotal = Math.round(subtotal * 0.1)
      if (code === "ML50") discountTotal = Math.min(subtotal, 50)
    }
  }

  const shippingTotal = 0
  const grandTotal = Math.max(0, subtotal - discountTotal + shippingTotal)

  const orderNo = generateOrderNo()
  const customerName = `${parsed.data.shipping.firstName} ${parsed.data.shipping.lastName}`.trim()

  const order = await orderRepo.save(
    orderRepo.create({
      orderNo,
      orderNumber: orderNo,
      customerName,
      status: "pending_payment",
      paymentStatus: "pending",
      firstName: parsed.data.shipping.firstName,
      lastName: parsed.data.shipping.lastName,
      email: parsed.data.shipping.email,
      phone: parsed.data.shipping.phone,
      address: parsed.data.shipping.address,
      city: parsed.data.shipping.city,
      district: parsed.data.shipping.district,
      postalCode: parsed.data.shipping.postalCode,
      currency: parsed.data.currency,
      subtotal,
      discountTotal,
      shippingTotal,
      grandTotal,
      totalAmount: grandTotal,
      couponCode,
      notes: parsed.data.notes?.trim() || null,
      items: parsed.data.items,
      isActive: true,
    } as any)
  )

  await itemRepo.save(
    parsed.data.items.map((it) =>
      itemRepo.create({
        productName: it.productName,
        variantName: it.variantName,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        lineTotal: it.unitPrice * it.quantity,
        order,
        product: null,
        variant: null,
        isActive: true,
      })
    )
  )

  const successUrl = `/checkout/success?order=${encodeURIComponent(order.id)}&orderNumber=${encodeURIComponent(
    order.orderNumber ?? order.orderNo
  )}`
  const cancelUrl = `/checkout/cancel?order=${encodeURIComponent(order.id)}&orderNumber=${encodeURIComponent(
    order.orderNumber ?? order.orderNo
  )}`
  const failUrl = `/checkout/fail?order=${encodeURIComponent(order.id)}&orderNumber=${encodeURIComponent(
    order.orderNumber ?? order.orderNo
  )}`

  const session = await mockPaymentProvider.createPaymentSession({
    orderId: order.id,
    amount: grandTotal,
    currency: order.currency,
    successUrl,
    cancelUrl,
    failUrl,
  })

  await txRepo.save(
    txRepo.create({
      provider: "mock",
      providerSessionId: session.sessionId,
      providerPaymentId: null,
      amount: grandTotal,
      currency: order.currency,
      status: "created",
      order,
      rawResponse: session,
      isActive: true,
    } as any)
  )

  return NextResponse.json({
    ok: true,
    order: { id: order.id, orderNumber: order.orderNumber ?? order.orderNo },
    totals: { subtotal, discountTotal, shippingTotal, grandTotal, currency: order.currency },
    payment: session,
  })
}

