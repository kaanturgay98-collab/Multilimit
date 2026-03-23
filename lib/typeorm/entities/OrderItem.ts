import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Order } from "@/lib/typeorm/entities/Order"
import type { Product } from "@/lib/typeorm/entities/Product"
import type { ProductVariant } from "@/lib/typeorm/entities/ProductVariant"

@Entity()
export class OrderItem extends BaseEntityWithTimestamps {
  @Column()
  productName!: string

  @Column({ type: "text", nullable: true })
  variantName!: string | null

  @Column({ type: "integer" })
  quantity!: number

  @Column({ type: "integer" })
  unitPrice!: number

  @Column({ type: "integer" })
  lineTotal!: number

  @ManyToOne("Order", (order: any) => order.orderItems, { onDelete: "CASCADE" })
  order!: Order

  @ManyToOne("Product", { nullable: true })
  product!: Product | null

  @ManyToOne("ProductVariant", { nullable: true })
  variant!: ProductVariant | null
}

