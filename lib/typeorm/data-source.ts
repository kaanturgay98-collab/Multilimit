import "reflect-metadata"
import path from "path"
import { DataSource } from "typeorm"

// Entities
import { Page } from "@/lib/typeorm/entities/Page"
import { PageImage } from "@/lib/typeorm/entities/PageImage"
import { PageSection } from "@/lib/typeorm/entities/PageSection"
import { Product } from "@/lib/typeorm/entities/Product"
import { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"
import { Ingredient } from "@/lib/typeorm/entities/Ingredient"
import { BlogCategory } from "@/lib/typeorm/entities/BlogCategory"
import { Faq } from "@/lib/typeorm/entities/Faq"
import { Testimonial } from "@/lib/typeorm/entities/Testimonial"
import { Order } from "@/lib/typeorm/entities/Order"
import { OrderItem } from "@/lib/typeorm/entities/OrderItem"
import { Coupon } from "@/lib/typeorm/entities/Coupon"
import { ContactMessage } from "@/lib/typeorm/entities/ContactMessage"
import { MenuItem } from "@/lib/typeorm/entities/MenuItem"
import { SiteSetting } from "@/lib/typeorm/entities/SiteSetting"
import { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"
import { ActivityLog } from "@/lib/typeorm/entities/ActivityLog"
import { User } from "@/lib/typeorm/entities/User"
import { AdminUser } from "@/lib/typeorm/entities/AdminUser"
import { Role } from "@/lib/typeorm/entities/Role"
import { AnalyticsEvent } from "@/lib/typeorm/entities/AnalyticsEvent"
import { PaymentTransaction } from "@/lib/typeorm/entities/PaymentTransaction"
import { Address } from "@/lib/typeorm/entities/Address"

import { ensureAdminSeed } from "@/lib/admin/seed"

const entities = [
  Page,
  PageImage,
  PageSection,
  Product,
  ProductVariant,
  Ingredient,
  BlogCategory,
  Faq,
  Testimonial,
  Order,
  OrderItem,
  Coupon,
  ContactMessage,
  MenuItem,
  SiteSetting,
  SeoMeta,
  ActivityLog,
  User,
  AdminUser,
  Role,
  AnalyticsEvent,
  PaymentTransaction,
  Address,
]

declare global {
  // eslint-disable-next-line no-var
  var __typeorm: DataSource | undefined
  // eslint-disable-next-line no-var
  var __typeormInit: Promise<DataSource> | undefined
  // eslint-disable-next-line no-var
  var __typeormSeeded: boolean | undefined
}

function getSqlitePath() {
  const raw = process.env.DATABASE_URL || "file:./app.db"
  const p = raw.startsWith("file:") ? raw.replace(/^file:/, "") : raw
  const resolved = path.isAbsolute(p) ? p : path.join(process.cwd(), p)
  console.log(`[Database] Resolving SQLite path: ${resolved} (via process.cwd: ${process.cwd()})`);
  return resolved
}

export function getDataSource() {
  if (global.__typeorm) return global.__typeorm

  global.__typeorm = new DataSource({
    type: "sqlite",
    database: getSqlitePath(),
    busyTimeout: 5000,
    entities,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    logging: process.env.TYPEORM_LOGGING === "true",
  })

  return global.__typeorm
}

export async function getDb() {
  const ds = getDataSource()

  if (!ds.isInitialized) {
    if (!global.__typeormInit) {
      global.__typeormInit = ds.initialize().then((instance) => {
        console.log(`TypeORM DataSource initialized. Entities: ${instance.entityMetadatas.map(m => m.name).join(", ")}`)
        return instance
      }).catch((err) => {
        global.__typeormInit = undefined
        console.error("TypeORM initialization error:", err)
        throw err
      })
    }
    await global.__typeormInit
  }

  // Auto-seed if not seeded
  if (!global.__typeormSeeded) {
    global.__typeormSeeded = true
    await ensureAdminSeed(ds)
  }

  return ds
}

