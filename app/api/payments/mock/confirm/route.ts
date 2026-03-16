import { NextResponse } from "next/server"
import { z } from "zod"
import { getDb } from "@/lib/db"
import { mockPaymentProvider } from "@/lib/payments/mock-provider"

export const runtime = "nodejs"

const BodySchema = z.object({
  sessionId: z.string().min(1),
  outcome: z.enum(["success", "fail", "cancel"]).default("success"),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const txRepo = ds.getRepository("PaymentTransaction")
  const tx = await txRepo.findOne({ where: { providerSessionId: parsed.data.sessionId } as any, relations: { order: true } as any })
  if (!tx) return NextResponse.json({ ok: false, error: "Session not found" }, { status: 404 })

  const orderRepo = ds.getRepository("Order")
  const order = await orderRepo.findOne({ where: { id: (tx as any).order?.id ?? (tx as any).orderId } as any })
  if (!order) return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 })

  if (parsed.data.outcome === "success") {
    const verified = await mockPaymentProvider.verifyPayment({ sessionId: parsed.data.sessionId })
    ;(tx as any).status = "paid"
    ;(tx as any).providerPaymentId = verified.providerPaymentId ?? null
    ;(tx as any).rawResponse = verified.raw ?? (tx as any).rawResponse

    ;(order as any).paymentStatus = "paid"
    ;(order as any).status = "pending"
  } else if (parsed.data.outcome === "cancel") {
    ;(tx as any).status = "cancelled"
    ;(order as any).paymentStatus = "failed"
    ;(order as any).status = "cancelled"
  } else {
    ;(tx as any).status = "failed"
    ;(order as any).paymentStatus = "failed"
    ;(order as any).status = "cancelled"
  }

  await txRepo.save(tx as any)
  await orderRepo.save(order as any)

  return NextResponse.json({ ok: true, order: { id: (order as any).id, orderNumber: (order as any).orderNumber } })
}

