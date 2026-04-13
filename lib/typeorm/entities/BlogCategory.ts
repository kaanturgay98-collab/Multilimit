import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

@Entity("BlogCategory")
export class BlogCategory extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "varchar" })
  slug!: string

  @Column({ type: "text", nullable: true })
  description!: string | null
}
