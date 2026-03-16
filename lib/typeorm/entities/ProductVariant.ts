import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Product } from "@/lib/typeorm/entities/Product"

@Entity()
export class ProductVariant extends BaseEntityWithTimestamps {
  @Column()
  name!: string

  @ManyToOne("Product", "variants", { onDelete: "CASCADE" })
  product!: Product

  @Column({ type: "integer" })
  price!: number

  @Column({ type: "integer", nullable: true })
  salePrice!: number | null

  @Column({ type: "integer", default: 0 })
  stock!: number

  @Column({ type: "text", nullable: true })
  capsuleInfo!: string | null

  @Column({ type: "text", nullable: true })
  sachetInfo!: string | null

  @Column({ default: true })
  isOnSale!: boolean

  @Column({ default: false })
  isDefault!: boolean
}

