import { ProductBadge } from "@/lib/typeorm/entities/Product"

export type ProductRow = {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  salePrice?: number | null
  stock: number
  badge: ProductBadge
  isActive: boolean
}

export const mockProducts: ProductRow[] = [
  {
    id: "1",
    name: "Multilimit Premium Detoks Kompleksi",
    slug: "multilimit-premium-detoks",
    sku: "ML-DETOKS-001",
    price: 999,
    salePrice: 799,
    stock: 150,
    badge: "premium",
    isActive: true,
  },
]

export type ProductVariantRow = {
  id: string
  name: string
  productName: string
  price: number
  salePrice?: number | null
  stock: number
  isOnSale: boolean
  isDefault: boolean
}

export const mockProductVariants: ProductVariantRow[] = [
  {
    id: "v1",
    name: "Kucuk Paket",
    productName: "Multilimit Premium Detoks Kompleksi",
    price: 599,
    salePrice: 549,
    stock: 80,
    isOnSale: true,
    isDefault: false,
  },
  {
    id: "v2",
    name: "Buyuk Paket",
    productName: "Multilimit Premium Detoks Kompleksi",
    price: 999,
    salePrice: 899,
    stock: 70,
    isOnSale: true,
    isDefault: true,
  },
]

export type FaqRow = {
  id: string
  question: string
  category?: string
  isActive: boolean
}

export const mockFaqs: FaqRow[] = [
  {
    id: "f1",
    question: "Multilimit nasil kullanilir?",
    category: "Kullanim",
    isActive: true,
  },
  {
    id: "f2",
    question: "Kimler icin uygundur?",
    category: "Genel",
    isActive: true,
  },
]

export type BlogPostRow = {
  id: string
  title: string
  slug: string
  category?: string
  status: "draft" | "published"
  isFeatured: boolean
}

export const mockBlogPosts: BlogPostRow[] = [
  {
    id: "b1",
    title: "Detoks ve Gunluk Yasam Dengesi",
    slug: "detoks-ve-gunluk-yasam-dengesi",
    category: "Detoks",
    status: "published",
    isFeatured: true,
  },
  {
    id: "b2",
    title: "Zeolit ve L-Sistein Nedir?",
    slug: "zeolit-ve-l-sistein-nedir",
    category: "Icerikler",
    status: "draft",
    isFeatured: false,
  },
]

