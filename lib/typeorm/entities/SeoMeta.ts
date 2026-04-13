import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Product } from "@/lib/typeorm/entities/Product"
import type { Page } from "@/lib/typeorm/entities/Page"

@Entity("SeoMeta")
export class SeoMeta extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  seoTitle!: string

  @Column({ type: "text" })
  seoDescription!: string

  @Column({ type: "text", nullable: true })
  canonicalUrl!: string | null

  @Column({ type: "text", nullable: true })
  ogTitle!: string | null

  @Column({ type: "text", nullable: true })
  ogDescription!: string | null

  @Column({ type: "text", nullable: true })
  ogImage!: string | null

  @Column({ type: "boolean", default: true })
  indexable!: boolean

  @ManyToOne("Product", (p: any) => p.seoEntries, { nullable: true })
  product!: Product | null

  @ManyToOne("Page", (p: any) => p.seoEntries, { nullable: true })
  page!: Page | null
}
