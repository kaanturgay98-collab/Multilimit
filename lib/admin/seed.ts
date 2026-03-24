import { DataSource } from "typeorm"
import { insertBlogPost } from "@/lib/blog-db"

declare global {
  // eslint-disable-next-line no-var
  var __admin_seeded: boolean | undefined
}

export async function ensureAdminSeed(ds: DataSource) {
  if (global.__admin_seeded) return

  const productRepo = ds.getRepository("Product")
  const variantRepo = ds.getRepository("ProductVariant")
  const blogCatRepo = ds.getRepository("BlogCategory")
  const faqRepo = ds.getRepository("Faq")

  const existing = await productRepo.count()
  if (existing === 0) {
    const p = await productRepo.save(
      productRepo.create({
        name: "Multilimit Premium Detoks Kompleksi",
        slug: "multilimit-premium-detoks",
        sku: "ML-DETOKS-001",
        shortDescription: "Gunluk yasam temposuna destek veren premium formul.",
        longDescription: "Zeolit, L-Sistein ve Pirinc Kepegi iceren ozel kompozisyon.",
        price: 999,
        salePrice: 799,
        stock: 150,
        featured: true,
        badge: "premium",
        usageInfo: "Gunluk 1 kapsul ve 1 sase.",
        warnings: "Takviye edici gida; hastaliklari onleme/tedavi amacli degildir.",
        storageInfo: "Serin ve kuru yerde saklayin.",
        isActive: true,
      })
    )

    await variantRepo.save([
      variantRepo.create({
        name: "Kucuk Paket",
        product: p,
        price: 599,
        salePrice: 549,
        stock: 80,
        capsuleInfo: "30 kapsul",
        sachetInfo: "30 sase",
        isOnSale: true,
        isDefault: false,
        isActive: true,
      }),
      variantRepo.create({
        name: "Buyuk Paket",
        product: p,
        price: 999,
        salePrice: 899,
        stock: 70,
        capsuleInfo: "60 kapsul",
        sachetInfo: "60 sase",
        isOnSale: true,
        isDefault: true,
        isActive: true,
      }),
    ])
  }

  if ((await blogCatRepo.count()) === 0) {
    const cat = await blogCatRepo.save(blogCatRepo.create({ name: "Detoks", slug: "detoks", description: null, isActive: true }))
    insertBlogPost({
      title: "Detoks ve Gunluk Yasam Dengesi",
      slug: "detoks-ve-gunluk-yasam-dengesi",
      excerpt: "Modern yasamda denge kurmak icin ipuclari.",
      content: "Bu alan admin panelden duzenlenecek.",
      coverImage: null,
      categoryId: cat.id,
      tags: ["detoks", "wellness"],
      authorName: "Multilimit",
      publishedAt: new Date().toISOString(),
      status: "published",
      isFeatured: true,
      isActive: true,
    })
  }

  if ((await faqRepo.count()) === 0) {
    await faqRepo.save([
      faqRepo.create({ question: "Multilimit nasil kullanilir?", answer: "Gunluk 1 kapsul ve 1 sase.", category: "Kullanim", sortOrder: 1, isActive: true }),
      faqRepo.create({ question: "Kimler icin uygundur?", answer: "Yetiskin bireyler icin; ozel durumlarda uzmana danisin.", category: "Genel", sortOrder: 2, isActive: true }),
    ])
  }

  global.__admin_seeded = true
}

