import Database from "better-sqlite3"
import path from "path"
import fs from "fs"
import { randomUUID } from "crypto"

export type BlogStatus = "draft" | "published"

export type BlogPostRow = {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[] | null
  authorName: string
  publishedAt: string | null
  status: BlogStatus
  isFeatured: boolean
  categoryId: string | null
  seoOverrideId: string | null
}

export type BlogPostInsert = {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[] | null
  authorName: string
  publishedAt: string | null
  status: BlogStatus
  isFeatured: boolean
  isActive: boolean
  categoryId?: string | null
  seoOverrideId?: string | null
}

let dbInstance: Database.Database | null = null

function getSqlitePath() {
  const raw = process.env.DATABASE_URL || "file:./app.db"
  const p = raw.startsWith("file:") ? raw.replace(/^file:/, "") : raw
  const resolved = path.isAbsolute(p) ? p : path.join(process.cwd(), p)
  return resolved
}

function parseTags(raw: string | null | undefined): string[] | null {
  if (raw == null || raw === "") return null
  const parts = String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  return parts.length ? parts : null
}

function serializeTags(tags: string[] | null | undefined): string | null {
  if (!tags || tags.length === 0) return null
  return tags.join(",")
}

function ensureSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_post (
      id varchar PRIMARY KEY NOT NULL,
      createdAt datetime NOT NULL DEFAULT (datetime('now')),
      updatedAt datetime NOT NULL DEFAULT (datetime('now')),
      isActive boolean NOT NULL DEFAULT (1),
      title varchar NOT NULL,
      slug varchar NOT NULL,
      excerpt text NOT NULL,
      content text NOT NULL,
      coverImage text,
      tags text,
      authorName varchar NOT NULL,
      publishedAt datetime,
      status varchar NOT NULL DEFAULT ('draft'),
      isFeatured boolean NOT NULL DEFAULT (0),
      categoryId varchar,
      seoOverrideId varchar,
      FOREIGN KEY (categoryId) REFERENCES blog_category (id),
      FOREIGN KEY (seoOverrideId) REFERENCES seo_meta (id)
    );
  `)
}

function getRawDb(): Database.Database {
  if (dbInstance) return dbInstance

  const dbPath = getSqlitePath()
  const dir = path.dirname(dbPath)
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch {
    /* empty */
  }

  dbInstance = new Database(dbPath)
  dbInstance.pragma("journal_mode = WAL")
  dbInstance.pragma("foreign_keys = ON")
  ensureSchema(dbInstance)
  return dbInstance
}

function rowFromStmt(r: Record<string, unknown>): BlogPostRow {
  return {
    id: String(r.id),
    createdAt: String(r.createdAt),
    updatedAt: String(r.updatedAt),
    isActive: Boolean(r.isActive),
    title: String(r.title),
    slug: String(r.slug),
    excerpt: String(r.excerpt),
    content: String(r.content),
    coverImage: r.coverImage == null ? null : String(r.coverImage),
    tags: parseTags(r.tags == null ? null : String(r.tags)),
    authorName: String(r.authorName),
    publishedAt: r.publishedAt == null ? null : String(r.publishedAt),
    status: r.status === "published" ? "published" : "draft",
    isFeatured: Boolean(r.isFeatured),
    categoryId: r.categoryId == null ? null : String(r.categoryId),
    seoOverrideId: r.seoOverrideId == null ? null : String(r.seoOverrideId),
  }
}

export function listPostsForAdmin(): BlogPostRow[] {
  const db = getRawDb()
  const rows = db.prepare(`SELECT * FROM blog_post ORDER BY datetime(createdAt) DESC`).all() as Record<string, unknown>[]
  return rows.map(rowFromStmt)
}

export function getBlogPostById(id: string): BlogPostRow | undefined {
  const db = getRawDb()
  const r = db.prepare(`SELECT * FROM blog_post WHERE id = ?`).get(id) as Record<string, unknown> | undefined
  return r ? rowFromStmt(r) : undefined
}

export function getBlogPostBySlugPublished(slug: string): BlogPostRow | undefined {
  const db = getRawDb()
  const r = db
    .prepare(`SELECT * FROM blog_post WHERE slug = ? AND status = 'published' AND isActive = 1`)
    .get(slug) as Record<string, unknown> | undefined
  return r ? rowFromStmt(r) : undefined
}

export function insertBlogPost(input: BlogPostInsert): string {
  const db = getRawDb()
  const id = randomUUID()
  const now = new Date().toISOString()
  db.prepare(
    `INSERT INTO blog_post (
      id, createdAt, updatedAt, isActive, title, slug, excerpt, content, coverImage, tags, authorName,
      publishedAt, status, isFeatured, categoryId, seoOverrideId
    ) VALUES (
      @id, @createdAt, @updatedAt, @isActive, @title, @slug, @excerpt, @content, @coverImage, @tags, @authorName,
      @publishedAt, @status, @isFeatured, @categoryId, @seoOverrideId
    )`
  ).run({
    id,
    createdAt: now,
    updatedAt: now,
    isActive: input.isActive ? 1 : 0,
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage,
    tags: serializeTags(input.tags),
    authorName: input.authorName,
    publishedAt: input.publishedAt,
    status: input.status,
    isFeatured: input.isFeatured ? 1 : 0,
    categoryId: input.categoryId ?? null,
    seoOverrideId: input.seoOverrideId ?? null,
  })
  return id
}

export function updateBlogPost(
  id: string,
  patch: Partial<{
    title: string
    slug: string
    excerpt: string
    content: string
    coverImage: string | null
    tags: string[] | null
    authorName: string
    status: BlogStatus
    isFeatured: boolean
    isActive: boolean
    publishedAt: string | null
    categoryId: string | null
    seoOverrideId: string | null
  }>
): boolean {
  const existing = getBlogPostById(id)
  if (!existing) return false

  const title = patch.title ?? existing.title
  const slug = patch.slug ?? existing.slug
  const excerpt = patch.excerpt ?? existing.excerpt
  const content = patch.content ?? existing.content
  const coverImage = patch.coverImage !== undefined ? patch.coverImage : existing.coverImage
  const tags = patch.tags !== undefined ? patch.tags : existing.tags
  const authorName = patch.authorName ?? existing.authorName
  const isFeatured = patch.isFeatured !== undefined ? patch.isFeatured : existing.isFeatured
  const isActive = patch.isActive !== undefined ? patch.isActive : existing.isActive
  const finalStatus = patch.status ?? existing.status
  let publishedAt = patch.publishedAt !== undefined ? patch.publishedAt : existing.publishedAt
  if (finalStatus === "published" && !publishedAt) publishedAt = new Date().toISOString()
  if (finalStatus === "draft") publishedAt = null
  const categoryId = patch.categoryId !== undefined ? patch.categoryId : existing.categoryId
  const seoOverrideId = patch.seoOverrideId !== undefined ? patch.seoOverrideId : existing.seoOverrideId

  const db = getRawDb()
  const now = new Date().toISOString()
  db.prepare(
    `UPDATE blog_post SET
      updatedAt = @updatedAt,
      isActive = @isActive,
      title = @title,
      slug = @slug,
      excerpt = @excerpt,
      content = @content,
      coverImage = @coverImage,
      tags = @tags,
      authorName = @authorName,
      publishedAt = @publishedAt,
      status = @status,
      isFeatured = @isFeatured,
      categoryId = @categoryId,
      seoOverrideId = @seoOverrideId
    WHERE id = @id`
  ).run({
    id,
    updatedAt: now,
    isActive: isActive ? 1 : 0,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags: serializeTags(tags),
    authorName,
    publishedAt,
    status: finalStatus,
    isFeatured: isFeatured ? 1 : 0,
    categoryId,
    seoOverrideId,
  })
  return true
}

export function deleteBlogPostById(id: string): boolean {
  const db = getRawDb()
  const res = db.prepare(`DELETE FROM blog_post WHERE id = ?`).run(id)
  return res.changes > 0
}

export function countPublishedBlogPosts(): number {
  const db = getRawDb()
  const row = db
    .prepare(`SELECT COUNT(*) AS c FROM blog_post WHERE status = 'published' AND isActive = 1`)
    .get() as { c: number }
  return row.c
}

export function listLatestPublishedPosts(limit: number, excludeId?: string): BlogPostRow[] {
  const db = getRawDb()
  if (excludeId) {
    const rows = db
      .prepare(
        `SELECT * FROM blog_post WHERE status = 'published' AND isActive = 1 AND id != ? ORDER BY datetime(createdAt) DESC LIMIT ?`
      )
      .all(excludeId, limit) as Record<string, unknown>[]
    return rows.map(rowFromStmt)
  }
  const rows = db
    .prepare(`SELECT * FROM blog_post WHERE status = 'published' AND isActive = 1 ORDER BY datetime(createdAt) DESC LIMIT ?`)
    .all(limit) as Record<string, unknown>[]
  return rows.map(rowFromStmt)
}
