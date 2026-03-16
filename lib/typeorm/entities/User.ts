import { Column, Entity, Index, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Order } from "@/lib/typeorm/entities/Order"

export type UserAuthProvider = "email" | "google" | "facebook" | "guest"

@Entity()
@Index(["email"], { unique: true })
export class User extends BaseEntityWithTimestamps {
  @Column()
  name!: string

  @Column()
  email!: string

  @Column({ type: "text", nullable: true })
  phone!: string | null

  @Column({ type: "varchar", default: "email" })
  provider!: UserAuthProvider

  @Column({ default: 0 })
  orderCount!: number

  @OneToMany("Order", "user")
  orders!: Order[]
}

