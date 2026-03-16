import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  const ds = await getDb()

  const orderRepo = ds.getRepository("Order")
  const productRepo = ds.getRepository("Product")
  const blogRepo = ds.getRepository("BlogPost")
  const msgRepo = ds.getRepository("ContactMessage")
  const logRepo = ds.getRepository("ActivityLog")

  const [totalOrders, pendingOrders, activeProducts, publishedBlogs, unreadMessages] = await Promise.all([
    orderRepo.count(),
    orderRepo.count({ where: { status: "pending" as any } }),
    productRepo.count({ where: { isActive: true } }),
    blogRepo.count({ where: { status: "published" as any } }),
    msgRepo.count({ where: { status: "new" as any } }),
  ])

  const [recentOrders, recentMessages, recentActivities] = await Promise.all([
    orderRepo.find({ order: { createdAt: "DESC" }, take: 5 }),
    msgRepo.find({ order: { createdAt: "DESC" }, take: 5 }),
    logRepo.find({ order: { createdAt: "DESC" }, take: 8 }),
  ])

  return NextResponse.json({
    ok: true,
    kpis: { totalOrders, pendingOrders, activeProducts, publishedBlogs, unreadMessages },
    recentOrders,
    recentMessages,
    recentActivities,
  })
}

