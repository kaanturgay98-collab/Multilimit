import { Column, Entity, ManyToOne, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Product } from "@/lib/typeorm/entities/Product"
import type { Page } from "@/lib/typeorm/entities/Page"

@Entity()
@Index(["collection"])
export class MediaAsset extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  url!: string

  @Column({ type: "text", nullable: true })
  alt!: string | null

  @Column({ type: "varchar", nullable: true })
  collection!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @ManyToOne(() => require("./Product").Product, (product: any) => product.media, { nullable: true })
  product!: Product | null

  @ManyToOne(() => require("./Page").Page, { nullable: true })
  page!: Page | null
}
