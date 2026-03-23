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

  @Column()
  pageId!: string

  @ManyToOne(() => require("./Page").Page, (page: any) => page.images, { onDelete: "CASCADE" })
  page!: Page

  @Column()
  url!: string

  @Column({ type: "text", nullable: true })
  alt!: string | null

  @Column({ type: "integer", default: 0 })
  sortOrder!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

