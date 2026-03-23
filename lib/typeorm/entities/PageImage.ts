import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import type { Page } from "@/lib/typeorm/entities/Page"

@Entity()
@Index(["pageId", "sortOrder"])
export class PageImage {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar" })
  pageId!: string

  @ManyToOne(() => require("./Page").Page, (page: any) => page.images, { onDelete: "CASCADE" })
  page!: Page

  @Column({ type: "varchar" })
  url!: string

  @Column({ type: "text", nullable: true })
  alt!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date

  @UpdateDateColumn({ type: "datetime" })
  updatedAt!: Date
}
