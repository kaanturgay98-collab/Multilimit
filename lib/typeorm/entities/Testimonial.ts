import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

@Entity()
export class Testimonial extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "integer", default: 5 })
  rating!: number

  @Column({ type: "text" })
  content!: string

  @Column({ type: "boolean", default: false })
  isFeatured!: boolean
}
