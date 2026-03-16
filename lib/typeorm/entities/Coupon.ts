import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type CouponType = "percentage" | "amount"

@Entity()
export class Coupon extends BaseEntityWithTimestamps {
  @Column()
  code!: string

  @Column({ type: "text", nullable: true })
  description!: string | null

  @Column({ type: "varchar" })
  discountType!: CouponType

  @Column({ type: "integer" })
  discountValue!: number

  @Column({ type: "integer", nullable: true })
  minOrderAmount!: number | null

  @Column({ type: "datetime", nullable: true })
  startsAt!: Date | null

  @Column({ type: "datetime", nullable: true })
  endsAt!: Date | null

  @Column({ type: "integer", nullable: true })
  usageLimit!: number | null

  @Column({ type: "integer", default: 0 })
  usedCount!: number
}

