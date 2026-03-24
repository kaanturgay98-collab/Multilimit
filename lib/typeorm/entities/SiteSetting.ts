import { Column, Entity } from "typeorm"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"

@Entity("SiteSetting")
export class SiteSetting extends BaseEntityWithTimestamps {
  @Column({ type: "varchar" })
  siteName!: string

  @Column({ type: "text", nullable: true })
  logoUrl!: string | null

  @Column({ type: "text", nullable: true })
  faviconUrl!: string | null

  @Column({ type: "text", nullable: true })
  phone!: string | null

  @Column({ type: "text", nullable: true })
  email!: string | null

  @Column({ type: "text", nullable: true })
  whatsapp!: string | null

  @Column({ type: "text", nullable: true })
  footerText!: string | null

  @Column({ type: "text", nullable: true })
  copyright!: string | null
}
