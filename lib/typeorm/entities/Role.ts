import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { AdminUser } from "@/lib/typeorm/entities/AdminUser"

export type RoleKey = "super_admin" | "editor" | "order_manager" | "content_manager"

@Entity()
export class Role extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  key!: RoleKey

  @Column()
  name!: string

  @Column({ type: "text", nullable: true })
  description!: string | null

  @OneToMany(() => require("./AdminUser").AdminUser, (u: any) => u.role)
  adminUsers!: AdminUser[]
}

