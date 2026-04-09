import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"
import type { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

export type ProductBadge = "premium" | "new" | "bestseller" | null

@Entity()
export class Product extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "varchar" })
  slug!: string

  @Column({ type: "varchar" })
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

  @Column({ type: "boolean", default: false })
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

  @OneToMany(() => require("./ProductVariant").ProductVariant, (variant: any) => variant.product)
  variants!: ProductVariant[]

  @OneToMany(() => require("./SeoMeta").SeoMeta, (seo: any) => seo.product)
  seoEntries!: SeoMeta[]
}

