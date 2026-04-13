import { Column, Entity, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

@Entity("Faq")
@Index(["category", "sortOrder"])
export class Faq extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  question!: string

  @Column({ type: "text" })
  answer!: string

  @Column({ type: "text", nullable: true })
  category!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number
}
