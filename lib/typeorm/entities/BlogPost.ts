import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { BlogCategory } from "@/lib/typeorm/entities/BlogCategory"
import type { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

export type BlogStatus = "draft" | "published"

@Entity()
export class BlogPost extends BaseEntityWithTimestamps {
  @Column()
  title!: string

  @Column()
  slug!: string

  @Column({ type: "text" })
  excerpt!: string

  @Column({ type: "text" })
  content!: string

  @Column({ type: "text", nullable: true })
  coverImage!: string | null

  @ManyToOne("BlogCategory", "posts", { nullable: true })
  category!: BlogCategory | null

  @Column("simple-array", { nullable: true })
  tags!: string[] | null

  @Column()
  authorName!: string

  @Column({ type: "datetime", nullable: true })
  publishedAt!: Date | null

  @Column({ type: "varchar", default: "draft" })
  status!: BlogStatus

  @Column({ default: false })
  isFeatured!: boolean

  @ManyToOne("SeoMeta", "blogPost", { nullable: true })
  seoOverride!: SeoMeta | null
}

