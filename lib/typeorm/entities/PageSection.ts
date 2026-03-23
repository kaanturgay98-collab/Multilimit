import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Page } from "@/lib/typeorm/entities/Page"

export type PageSectionType =
  | "hero"
  | "content"
  | "features"
  | "faq"
  | "testimonials"
  | "cta"
  | "custom"

@Entity()
export class PageSection extends BaseEntityWithTimestamps {
  @ManyToOne(() => require("./Page").Page, (page: any) => page.sections, { onDelete: "CASCADE" })
  page!: Page

  @Column({ type: "varchar" })
  key!: string

  @Column({ type: "varchar" })
  type!: PageSectionType

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @Column({ type: "simple-json", nullable: true })
  content!: unknown
}

