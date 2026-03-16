import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type ContactStatus = "new" | "read" | "replied"

@Entity()
export class ContactMessage extends BaseEntityWithTimestamps {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column({ type: "text", nullable: true })
  phone!: string | null

  @Column()
  subject!: string

  @Column({ type: "text" })
  message!: string

  @Column({ type: "varchar", default: "new" })
  status!: ContactStatus
}

