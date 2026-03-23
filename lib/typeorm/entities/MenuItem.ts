import { Column, Entity, Index, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type MenuLocation = "header" | "footer"
export type FooterMenuGroup = "quick" | "product" | "legal"

@Entity()
@Index(["location", "sortOrder"])
export class MenuItem extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  label!: string

  @Column({ type: "text", nullable: true })
  href!: string | null

  @Column({ type: "boolean", default: false })
  external!: boolean

  @Column({ type: "varchar" })
  location!: MenuLocation

  @Column({ type: "text", nullable: true })
  subtitle!: string | null

  @Column({ type: "text", nullable: true })
  imageUrl!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @Column({ type: "boolean", default: true })
  isActive!: boolean

  @ManyToOne(() => MenuItem, { nullable: true })
  parent!: MenuItem | null
}
