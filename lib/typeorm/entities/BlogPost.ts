import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { BlogCategory } from "@/lib/typeorm/entities/BlogCategory"
import type { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

export type BlogStatus = "draft" | "published"

@Entity()
export class BlogPost extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  title!: string

  @Column({ type: "varchar" })
  slug!: string

  @Column({ type: "text" })
  excerpt!: string

  @Column({ type: "text" })
  content!: string

  @Column({ type: "text", nullable: true })
  coverImage!: string | null

  @Column("simple-array", { nullable: true })
  tags!: string[] | null

  @Column({ type: "varchar" })
  authorName!: string

  @Column({ type: "datetime", nullable: true })
  publishedAt!: Date | null

  @Column({ type: "varchar", default: "draft" })
  status!: BlogStatus

  @Column({ type: "boolean", default: false })
  isFeatured!: boolean

  @ManyToOne(() => require("./SeoMeta").SeoMeta, "blogPost", { nullable: true })
  seoOverride!: SeoMeta | null
}
