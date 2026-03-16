import { Column, Entity, Index, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type MenuLocation = "header" | "footer"
export type FooterMenuGroup = "quick" | "product" | "legal"

@Entity()
@Index(["location", "sortOrder"])
export class MenuItem extends BaseEntityWithTimestamps {
  @Column()
  label!: string

  @Column({ type: "text", nullable: true })
  href!: string | null

  @Column({ default: false })
  external!: boolean

  @Column({ type: "varchar" })
  location!: MenuLocation

  // For footer only: which column/group should it render under.
  @Column({ type: "varchar", nullable: true })
  group!: FooterMenuGroup | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @ManyToOne(() => MenuItem, { nullable: true })
  parent!: MenuItem | null
}

