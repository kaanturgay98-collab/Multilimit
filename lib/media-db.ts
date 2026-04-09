import Database from "better-sqlite3"
import path from "path"
import fs from "fs"
import { randomUUID } from "crypto"

export type MediaLibraryRow = {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  url: string
  alt: string | null
  collection: string | null
  sortOrder: number
}

let dbInstance: Database.Database | null = null

function getSqlitePath() {
  const raw = process.env.DATABASE_URL || "file:./app.db"
  const p = raw.startsWith("file:") ? raw.replace(/^file:/, "") : raw
  return path.isAbsolute(p) ? p : path.join(process.cwd(), p)
}

function ensureSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS media_library (
      id TEXT PRIMARY KEY NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      isActive INTEGER NOT NULL DEFAULT 1,
      url TEXT NOT NULL,
      alt TEXT,
      collection TEXT,
      sortOrder INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_media_library_collection ON media_library (collection);
    CREATE INDEX IF NOT EXISTS idx_media_library_createdAt ON media_library (createdAt);
  `)
}

function getDb(): Database.Database {
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

function mapRow(r: Record<string, unknown>): MediaLibraryRow {
  return {
    id: String(r.id),
    createdAt: String(r.createdAt),
    updatedAt: String(r.updatedAt),
    isActive: Boolean(r.isActive),
    url: String(r.url),
    alt: r.alt == null ? null : String(r.alt),
    collection: r.collection == null ? null : String(r.collection),
    sortOrder: Number(r.sortOrder ?? 0),
  }
}

export function listLibraryMedia(limit = 200): MediaLibraryRow[] {
  const db = getDb()
  const rows = db
    .prepare(`SELECT * FROM media_library ORDER BY datetime(createdAt) DESC LIMIT ?`)
    .all(Math.min(Math.max(limit, 1), 500)) as Record<string, unknown>[]
  return rows.map(mapRow)
}

export function getLibraryMediaById(id: string): MediaLibraryRow | null {
  const db = getDb()
  const r = db.prepare(`SELECT * FROM media_library WHERE id = ?`).get(id) as Record<string, unknown> | undefined
  return r ? mapRow(r) : null
}

export function insertLibraryMedia(input: {
  url: string
  alt: string | null
  collection: string | null
  sortOrder?: number
}): MediaLibraryRow {
  const db = getDb()
  const now = new Date().toISOString()
  const row: MediaLibraryRow = {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    isActive: true,
    url: input.url,
    alt: input.alt,
    collection: input.collection ?? "general",
    sortOrder: input.sortOrder ?? 0,
  }
  db.prepare(
    `INSERT INTO media_library (id, createdAt, updatedAt, isActive, url, alt, collection, sortOrder)
     VALUES (@id, @createdAt, @updatedAt, @isActive, @url, @alt, @collection, @sortOrder)`
  ).run({
    ...row,
    isActive: row.isActive ? 1 : 0,
  })
  return row
}

export function deleteLibraryMedia(id: string): boolean {
  const db = getDb()
  const r = db.prepare(`DELETE FROM media_library WHERE id = ?`).run(id)
  return r.changes > 0
}

export function normalizeMediaDbError(error: unknown): string {
  const message = String((error as { message?: string })?.message || error || "")
  if (message.includes("NOT NULL constraint failed")) return "Zorunlu alanlardan biri bos birakildi."
  if (message) return message
  return "Veritabani hatasi"
}
