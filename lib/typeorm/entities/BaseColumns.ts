import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from "typeorm"

export abstract class BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date

  @UpdateDateColumn({ type: "datetime" })
  updatedAt!: Date

  @Column({ type: "boolean", default: true })
  isActive!: boolean
}
