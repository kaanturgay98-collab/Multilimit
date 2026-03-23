import { Column, Entity, ManyToOne, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import { Product } from "@/lib/typeorm/entities/Product"
import { Page } from "@/lib/typeorm/entities/Page"

@Entity()
@Index(["collection"])
export class MediaAsset extends BaseEntityWithTimestamps {
  @Column()
  url!: string

  @Column({ type: "text", nullable: true })
  alt!: string | null

  @Column({ type: "varchar", nullable: true })
  collection!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @ManyToOne(() => Product, (product) => product.media, { nullable: true })
  product!: Product | null

  @ManyToOne(() => Page, { nullable: true })
  page!: Page | null
}

