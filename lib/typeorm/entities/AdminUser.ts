import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Role } from "@/lib/typeorm/entities/Role"

@Entity("AdminUser")
export class AdminUser extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  username!: string

  @Column({ type: "varchar" })
  displayName!: string

  @Column({ type: "varchar" })
  email!: string

  @Column({ type: "datetime", nullable: true })
  lastLoginAt!: Date | null

  @ManyToOne("Role", (role: any) => role.adminUsers, { nullable: true })
  role!: Role | null
}
