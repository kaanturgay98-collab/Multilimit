import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

@Entity()
export class Testimonial extends BaseEntityWithTimestamps {
  @Column()
  name!: string

  @Column({ type: "integer", default: 5 })
  rating!: number

  @Column({ type: "text" })
  content!: string

  @Column({ default: false })
  isFeatured!: boolean
}

