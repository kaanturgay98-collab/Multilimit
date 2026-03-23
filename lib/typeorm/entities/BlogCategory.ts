import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { BlogPost } from "@/lib/typeorm/entities/BlogPost"

@Entity()
export class BlogCategory extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "varchar" })
  slug!: string

  @Column({ type: "text", nullable: true })
  description!: string | null

  @OneToMany(() => require("./BlogPost").BlogPost, (post: any) => post.category)
  posts!: BlogPost[]
}
