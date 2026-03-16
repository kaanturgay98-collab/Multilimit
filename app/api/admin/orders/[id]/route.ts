import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { z } from "zod"

export const runtime = "nodejs"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ds = await getDb()
  const order = await ds.getRepository("Order").findOne({ where: { id }, relations: { orderItems: true, user: true } })
  if (!order) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true, order })
}

const PatchSchema = z.object({
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const json = await req.json().catch(() => null)
  const parsed = PatchSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 })

  const ds = await getDb()
  const repo = ds.getRepository("Order")
  const order = await repo.findOne({ where: { id } })
  if (!order) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 })

  if (parsed.data.status) (order as any).status = parsed.data.status
  if (parsed.data.paymentStatus) (order as any).paymentStatus = parsed.data.paymentStatus
  await repo.save(order)

  return NextResponse.json({ ok: true })
}

