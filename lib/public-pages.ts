import { db } from "@/lib/db"

export async function getPageBySlug(slug: string) {
  return await db.page.findUnique({
    where: { slug },
    include: { images: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] } },
  })
}

