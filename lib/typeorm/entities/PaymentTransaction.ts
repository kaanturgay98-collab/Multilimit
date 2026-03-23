import { Column, Entity, Index, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import { Order } from "@/lib/typeorm/entities/Order"

export type PaymentProvider = "mock"
export type PaymentTxStatus = "created" | "pending" | "paid" | "failed" | "cancelled"

@Entity()
@Index(["createdAt"])
@Index(["provider", "providerSessionId"])
export class PaymentTransaction extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  provider!: PaymentProvider

  @Column({ type: "text" })
  providerSessionId!: string

  @Column({ type: "text", nullable: true })
  providerPaymentId!: string | null

  @Column({ type: "integer" })
  amount!: number

  @Column({ type: "varchar", default: "TRY" })
  currency!: string

  @Column({ type: "varchar" })
  status!: PaymentTxStatus

  @ManyToOne(() => Order, { onDelete: "CASCADE" })
  order!: Order

  @Column({ type: "simple-json", nullable: true })
  rawResponse!: unknown
}

