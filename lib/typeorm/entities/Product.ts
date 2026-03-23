import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"
import type { MediaAsset } from "@/lib/typeorm/entities/MediaAsset"
import type { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

export type ProductBadge = "premium" | "new" | "bestseller" | null

@Entity()
export class Product extends BaseEntityWithTimestamps {
  @Column()
  name!: string

  @Column()
  slug!: string

  @Column()
  sku!: string

  @Column({ type: "text" })
  shortDescription!: string

  @Column({ type: "text" })
  longDescription!: string

  @Column({ type: "integer" })
  price!: number

  @Column({ type: "integer", nullable: true })
  salePrice!: number | null

  @Column({ type: "integer", default: 0 })
  stock!: number

  @Column({ default: false })
  featured!: boolean

  @Column({ type: "varchar", nullable: true })
  badge!: ProductBadge

  @Column({ type: "text", nullable: true })
  usageInfo!: string | null

  @Column({ type: "text", nullable: true })
  warnings!: string | null

  @Column({ type: "text", nullable: true })
  storageInfo!: string | null

  @Column({ type: "varchar", nullable: true })
  trendyolLink!: string | null

  @OneToMany("ProductVariant", (variant: any) => variant.product)
  variants!: ProductVariant[]

  @OneToMany("MediaAsset", (asset: any) => asset.product)
  media!: MediaAsset[]

  @OneToMany("SeoMeta", (seo: any) => seo.product)
  seoEntries!: SeoMeta[]
}

