import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { Role } from "@/lib/typeorm/entities/Role"

@Entity()
export class AdminUser extends BaseEntityWithTimestamps {
  @Column()
  username!: string

  @Column()
  displayName!: string

  @Column()
  email!: string

  @Column({ type: "datetime", nullable: true })
  lastLoginAt!: Date | null

  @ManyToOne("Role", "adminUsers", { nullable: true })
  role!: Role | null
}

