import "reflect-metadata"
import path from "path"
import { DataSource } from "typeorm"
import { Page } from "@/lib/typeorm/entities/Page"
import { PageImage } from "@/lib/typeorm/entities/PageImage"
import { Order } from "@/lib/typeorm/entities/Order"
import { OrderItem } from "@/lib/typeorm/entities/OrderItem"
import { Product } from "@/lib/typeorm/entities/Product"
import { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"
import { Ingredient } from "@/lib/typeorm/entities/Ingredient"
import { BlogPost } from "@/lib/typeorm/entities/BlogPost"
import { BlogCategory } from "@/lib/typeorm/entities/BlogCategory"
import { Faq } from "@/lib/typeorm/entities/Faq"
import { Testimonial } from "@/lib/typeorm/entities/Testimonial"
import { Coupon } from "@/lib/typeorm/entities/Coupon"
import { ContactMessage } from "@/lib/typeorm/entities/ContactMessage"
import { MenuItem } from "@/lib/typeorm/entities/MenuItem"
import { SiteSetting } from "@/lib/typeorm/entities/SiteSetting"
import { MediaAsset } from "@/lib/typeorm/entities/MediaAsset"
import { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"
import { ActivityLog } from "@/lib/typeorm/entities/ActivityLog"
import { User } from "@/lib/typeorm/entities/User"
import { AdminUser } from "@/lib/typeorm/entities/AdminUser"
import { Role } from "@/lib/typeorm/entities/Role"
import { PageSection } from "@/lib/typeorm/entities/PageSection"
import { ensureAdminSeed } from "@/lib/admin/seed"
import { AnalyticsEvent } from "@/lib/typeorm/entities/AnalyticsEvent"
import { PaymentTransaction } from "@/lib/typeorm/entities/PaymentTransaction"
import { Address } from "@/lib/typeorm/entities/Address"

declare global {
  // eslint-disable-next-line no-var
  var __typeorm: DataSource | undefined
  // eslint-disable-next-line no-var
  var __typeormInit: Promise<DataSource> | undefined
  // eslint-disable-next-line no-var
  var __typeormSeeded: boolean | undefined
}

function getSqlitePath() {
  // Accept both Prisma-style and plain path
  const raw = process.env.DATABASE_URL || "file:./dev.db"
  const p = raw.startsWith("file:") ? raw.replace(/^file:/, "") : raw
  return path.isAbsolute(p) ? p : path.join(process.cwd(), p)
}

export function getDataSource() {
  if (global.__typeorm && global.__typeorm.isInitialized) return global.__typeorm

  const ds = new DataSource({
    type: "sqlite",
    database: getSqlitePath(),
    // Helps when multiple requests initialize simultaneously on Windows
    busyTimeout: 5000,
    entities: [
      Page,
      PageImage,
      PageSection,
      Product,
      ProductVariant,
      Ingredient,
      BlogPost,
      BlogCategory,
      Faq,
      Testimonial,
      Order,
      OrderItem,
      Coupon,
      ContactMessage,
      MenuItem,
      SiteSetting,
      MediaAsset,
      SeoMeta,
      ActivityLog,
      User,
      AdminUser,
      Role,
      AnalyticsEvent,
      PaymentTransaction,
      Address,
    ],
    synchronize: true, // dev: auto-create tables (later can switch to migrations)
    dropSchema: false,
    logging: false,
  })

  global.__typeorm = ds
  return ds
}

export async function getDb() {
  const ds = getDataSource()
  if (!ds.isInitialized) {
    if (!global.__typeormInit) {
      global.__typeormInit = (async () => {
        await ds.initialize()
        return ds
      })().finally(() => {
        // allow retry if init fails
        global.__typeormInit = undefined
      })
    }
    await global.__typeormInit
  }

  // Dev safety: if hot reload produced a DS without some entities, rebuild once.
  if (
    !ds.hasMetadata("MenuItem") ||
    !ds.hasMetadata("AnalyticsEvent") ||
    !ds.hasMetadata("Page") ||
    !ds.hasMetadata("Product") ||
    !ds.hasMetadata("Order") ||
    !ds.hasMetadata("OrderItem") ||
    !ds.hasMetadata("PaymentTransaction") ||
    !ds.hasMetadata("Address")
  ) {
    try {
      if (ds.isInitialized) await ds.destroy()
    } catch {
      // ignore
    }
    global.__typeorm = undefined
    global.__typeormSeeded = false
    const ds2 = getDataSource()
    await ds2.initialize()
    await ensureAdminSeed(ds2)
    return ds2
  }

  if (!global.__typeormSeeded) {
    global.__typeormSeeded = true
    await ensureAdminSeed(ds)
  }

  return ds
}

