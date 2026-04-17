import { Column, Entity, Index } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

export type AnalyticsEventType = "page_view" | "click"

@Entity("AnalyticsEvent")
@Index(["createdAt"])
@Index(["type", "path"])
@Index(["createdAt", "ipHash"])
export class AnalyticsEvent extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  type!: AnalyticsEventType

  @Column({ type: "text", nullable: true })
  name!: string | null

  @Column({ type: "varchar" })
  path!: string

  @Column({ type: "text", nullable: true })
  referrer!: string | null

  @Column({ type: "varchar" })
  sessionId!: string

  @Column({ type: "text", nullable: true })
  ipHash!: string | null

  @Column({ type: "text", nullable: true })
  userAgent!: string | null
}
