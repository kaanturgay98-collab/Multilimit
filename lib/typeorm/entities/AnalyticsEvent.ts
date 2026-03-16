import { Column, Entity, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type AnalyticsEventType = "page_view" | "click"

@Entity()
@Index(["createdAt"])
@Index(["type", "path"])
export class AnalyticsEvent extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  type!: AnalyticsEventType

  @Column({ type: "text", nullable: true })
  name!: string | null

  @Column()
  path!: string

  @Column({ type: "text", nullable: true })
  referrer!: string | null

  @Column()
  sessionId!: string

  @Column({ type: "text", nullable: true })
  userAgent!: string | null
}

