import { Column, Entity, ManyToOne, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import { User } from "@/lib/typeorm/entities/User"

@Entity("Address")
@Index(["createdAt"])
export class Address extends BaseEntityWithTimestamps {
  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  user!: User | null

  @Column({ type: "text" })
  fullName!: string

  @Column({ type: "text" })
  email!: string

  @Column({ type: "text" })
  phone!: string

  @Column({ type: "text" })
  addressLine!: string

  @Column({ type: "text" })
  city!: string

  @Column({ type: "text" })
  district!: string

  @Column({ type: "text" })
  postalCode!: string
}

