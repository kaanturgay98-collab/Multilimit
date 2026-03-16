import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from "typeorm"

export abstract class BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @Column({ default: true })
  isActive!: boolean
}

