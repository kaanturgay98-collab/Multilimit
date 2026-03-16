import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Product } from "@/lib/typeorm/entities/Product"
import type { BlogPost } from "@/lib/typeorm/entities/BlogPost"
import type { Page } from "@/lib/typeorm/entities/Page"

@Entity()
export class SeoMeta extends BaseEntityWithTimestamps {
  @Column()
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

  @Column({ default: true })
  indexable!: boolean

  @ManyToOne("Product", "seoEntries", { nullable: true })
  product!: Product | null

  @ManyToOne("BlogPost", "seoOverride", { nullable: true })
  blogPost!: BlogPost | null

  @ManyToOne("Page", "seoEntries", { nullable: true })
  page!: Page | null
}

