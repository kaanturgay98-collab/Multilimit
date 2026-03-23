import { Column, Entity, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

@Entity()
@Index(["sortOrder"])
export class Ingredient extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "text" })
  shortDescription!: string

  @Column({ type: "text" })
  longDescription!: string

  @Column({ type: "text", nullable: true })
  icon!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number
}
