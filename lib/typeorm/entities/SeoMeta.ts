import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import { Product } from "@/lib/typeorm/entities/Product"
import { BlogPost } from "@/lib/typeorm/entities/BlogPost"
import { Page } from "@/lib/typeorm/entities/Page"

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

  @ManyToOne(() => Product, (p) => p.seoEntries, { nullable: true })
  product!: Product | null

  @ManyToOne(() => BlogPost, (p) => p.seoOverride, { nullable: true })
  blogPost!: BlogPost | null

  @ManyToOne(() => Page, (p) => p.seoEntries, { nullable: true })
  page!: Page | null
}

