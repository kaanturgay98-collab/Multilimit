import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()
  const orders = await ds.getRepository("Order").find({
    order: { createdAt: "DESC" },
    take: 200,
  })
  return NextResponse.json({ ok: true, orders })
}

