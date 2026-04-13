import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type ContactStatus = "new" | "read" | "replied"

@Entity("ContactMessage")
export class ContactMessage extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "varchar" })
  email!: string

  @Column({ type: "text", nullable: true })
  phone!: string | null

  @Column({ type: "varchar" })
  subject!: string

  @Column({ type: "text" })
  message!: string

  @Column({ type: "varchar", default: "new" })
  status!: ContactStatus
}
