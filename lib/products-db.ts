import Database from "better-sqlite3"
import path from "path"

export type ProductBadge = "premium" | "new" | "bestseller" | null

export type ProductRow = {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  longDescription: string
  price: number
  salePrice: number | null
  stock: number
  featured: boolean
  badge: ProductBadge
  isActive: boolean
  trendyolLink: string | null
  createdAt: string
  updatedAt: string
}

type ProductInput = Omit<ProductRow, "id" | "createdAt" | "updatedAt">
type ProductUpdate = Partial<ProductInput>

let dbInstance: Database.Database | null = null

function getSqlitePath() {
  const raw = process.env.DATABASE_URL || "file:./app.db"
  const p = raw.startsWith("file:") ? raw.replace(/^file:/, "") : raw
  return path.isAbsolute(p) ? p : path.join(process.cwd(), p)
}

function getDb() {
  if (dbInstance) return dbInstance
  dbInstance = new Database(getSqlitePath())
  dbInstance.pragma("journal_mode = WAL")
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      sku TEXT NOT NULL,
      shortDescription TEXT NOT NULL,
      longDescription TEXT NOT NULL,
      price INTEGER NOT NULL,
      salePrice INTEGER,
      stock INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      badge TEXT,
      isActive INTEGER NOT NULL DEFAULT 1,
      trendyolLink TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug_unique ON products (slug);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_products_sku_unique ON products (sku);
    CREATE INDEX IF NOT EXISTS idx_products_updatedAt ON products (updatedAt);
    CREATE INDEX IF NOT EXISTS idx_products_isActive ON products (isActive);
  `)
  return dbInstance
}

function mapProduct(row: any): ProductRow {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    shortDescription: row.shortDescription,
    longDescription: row.longDescription,
    price: Number(row.price),
    salePrice: row.salePrice === null ? null : Number(row.salePrice),
    stock: Number(row.stock),
    featured: Boolean(row.featured),
    badge: (row.badge ?? null) as ProductBadge,
    isActive: Boolean(row.isActive),
    trendyolLink: row.trendyolLink ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

export function listProducts() {
  const db = getDb()
  const rows = db.prepare(`SELECT * FROM products ORDER BY datetime(updatedAt) DESC LIMIT 500`).all()
  return rows.map(mapProduct)
}

export function listActiveProducts() {
  const db = getDb()
  const rows = db
    .prepare(`SELECT * FROM products WHERE isActive = 1 ORDER BY datetime(createdAt) DESC LIMIT 500`)
    .all()
  return rows.map(mapProduct)
}

export function getProductById(id: string) {
  const db = getDb()
  const row = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id)
  return row ? mapProduct(row) : null
}

export function createProduct(input: ProductInput) {
  const db = getDb()
  const now = new Date().toISOString()
  const row: ProductRow = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: now,
    updatedAt: now,
  }

  db.prepare(
    `INSERT INTO products
     (id, name, slug, sku, shortDescription, longDescription, price, salePrice, stock, featured, badge, isActive, trendyolLink, createdAt, updatedAt)
     VALUES
     (@id, @name, @slug, @sku, @shortDescription, @longDescription, @price, @salePrice, @stock, @featured, @badge, @isActive, @trendyolLink, @createdAt, @updatedAt)`
  ).run({
    ...row,
    featured: row.featured ? 1 : 0,
    isActive: row.isActive ? 1 : 0,
  })

  return row
}

export function updateProduct(id: string, patch: ProductUpdate) {
  const current = getProductById(id)
  if (!current) return null

  const next: ProductRow = {
    ...current,
    ...patch,
    salePrice: patch.salePrice === undefined ? current.salePrice : patch.salePrice,
    badge: patch.badge === undefined ? current.badge : patch.badge,
    trendyolLink: patch.trendyolLink === undefined ? current.trendyolLink : patch.trendyolLink,
    updatedAt: new Date().toISOString(),
  }

  const db = getDb()
  db.prepare(
    `UPDATE products SET
      name = @name,
      slug = @slug,
      sku = @sku,
      shortDescription = @shortDescription,
      longDescription = @longDescription,
      price = @price,
      salePrice = @salePrice,
      stock = @stock,
      featured = @featured,
      badge = @badge,
      isActive = @isActive,
      trendyolLink = @trendyolLink,
      updatedAt = @updatedAt
    WHERE id = @id`
  ).run({
    ...next,
    featured: next.featured ? 1 : 0,
    isActive: next.isActive ? 1 : 0,
  })

  return next
}

export function deleteProduct(id: string) {
  const db = getDb()
  const result = db.prepare(`DELETE FROM products WHERE id = ?`).run(id)
  return result.changes > 0
}

export function normalizeSqliteError(error: any) {
  const message = String(error?.message || "")
  if (message.includes("UNIQUE constraint failed: products.slug")) return "Slug zaten kullaniliyor."
  if (message.includes("UNIQUE constraint failed: products.sku")) return "SKU zaten kullaniliyor."
  if (message.includes("NOT NULL constraint failed")) return "Zorunlu alanlardan biri bos birakildi."
  return "Veritabani hatasi"
}
