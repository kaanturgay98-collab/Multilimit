import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { OrderItem } from "@/lib/typeorm/entities/OrderItem"
import type { User } from "@/lib/typeorm/entities/User"

export type OrderStatus =
  | "pending_payment"
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed"

@Entity()
@Index(["createdAt"])
@Index(["status"])
export class Order extends BaseEntityWithTimestamps {

  @Column({ unique: true })
  orderNo!: string

  // New naming for checkout pages (keep orderNo for backwards compatibility)
  @Column({ type: "text", nullable: true, unique: true })
  orderNumber!: string | null

  @Column({ type: "text", nullable: true })
  customerName!: string | null

  @Column({ type: "varchar", default: "pending_payment" })
  status!: OrderStatus

  @Column({ type: "varchar", default: "pending" })
  paymentStatus!: PaymentStatus

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  email!: string

  @Column()
  phone!: string

  @Column()
  address!: string

  @Column()
  city!: string

  @Column()
  district!: string

  @Column()
  postalCode!: string

  @Column({ default: "TRY" })
  currency!: string

  @Column({ type: "integer", default: 0 })
  subtotal!: number

  @Column({ type: "integer", default: 0 })
  discountTotal!: number

  @Column({ type: "integer", default: 0 })
  shippingTotal!: number

  @Column({ type: "integer", default: 0 })
  grandTotal!: number

  // Backwards compatibility
  @Column({ type: "integer", default: 0 })
  totalAmount!: number

  @Column({ type: "simple-json" })
  items!: unknown

  @Column({ type: "text", nullable: true })
  couponCode!: string | null

  @Column({ type: "text", nullable: true })
  notes!: string | null

  @ManyToOne("User", (user: any) => user.orders, { nullable: true })
  user!: User | null

  @OneToMany("OrderItem", (item: any) => item.order, { cascade: ["insert"] })
  orderItems!: OrderItem[]
}

