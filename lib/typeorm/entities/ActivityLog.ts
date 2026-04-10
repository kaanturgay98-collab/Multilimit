import { Column, Entity, Index, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { AdminUser } from "@/lib/typeorm/entities/AdminUser"

@Entity()
@Index(["createdAt"])
export class ActivityLog extends BaseEntityWithTimestamps {
  @ManyToOne("AdminUser", { nullable: true })
  adminUser!: AdminUser | null

  @Column({ type: "varchar" })
  action!: string

  @Column({ type: "text", nullable: true })
  entityName!: string | null

  @Column({ type: "text", nullable: true })
  entityId!: string | null

  @Column({ type: "simple-json", nullable: true })
  meta!: unknown
}

