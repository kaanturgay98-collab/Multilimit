import { Column, Entity, Index, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import { Order } from "@/lib/typeorm/entities/Order"

export type UserAuthProvider = "email" | "google" | "facebook" | "guest"

@Entity()
@Index(["email"], { unique: true })
export class User extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "varchar" })
  email!: string

  @Column({ type: "text", nullable: true })
  phone!: string | null

  @Column({ type: "varchar", default: "email" })
  provider!: UserAuthProvider

  @Column({ type: "integer", default: 0 })
  orderCount!: number

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[]
}
