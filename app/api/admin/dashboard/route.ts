import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { countPublishedBlogPosts } from "@/lib/blog-db"

export const runtime = "nodejs"

export async function GET() {
  try {
    const ds = await getDb()

    const orderRepo = ds.getRepository("Order")
    const productRepo = ds.getRepository("Product")
    const msgRepo = ds.getRepository("ContactMessage")
    const logRepo = ds.getRepository("ActivityLog")

    const [totalOrders, pendingOrders, activeProducts, unreadMessages] = await Promise.all([
      orderRepo.count().catch(() => 0),
      orderRepo.count({ where: { status: "pending" as any } }).catch(() => 0),
      productRepo.count({ where: { isActive: true } }).catch(() => 0),
      msgRepo.count({ where: { status: "new" as any } }).catch(() => 0),
    ])
    const publishedBlogs = countPublishedBlogPosts()

    const [recentOrders, recentMessages, recentActivities] = await Promise.all([
      orderRepo.find({ order: { createdAt: "DESC" }, take: 5 }).catch(() => []),
      msgRepo.find({ order: { createdAt: "DESC" }, take: 5 }).catch(() => []),
      logRepo.find({ order: { createdAt: "DESC" }, take: 8 }).catch(() => []),
    ])

    return NextResponse.json({
      ok: true,
      kpis: { totalOrders, pendingOrders, activeProducts, publishedBlogs, unreadMessages },
      recentOrders,
      recentMessages,
      recentActivities,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({
      ok: true,
      kpis: { totalOrders: 0, pendingOrders: 0, activeProducts: 0, publishedBlogs: 0, unreadMessages: 0 },
      recentOrders: [],
      recentMessages: [],
      recentActivities: [],
    })
  }
}

