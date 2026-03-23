import { Column, Entity, OneToMany } from "typeorm"
import type { PageImage } from "@/lib/typeorm/entities/PageImage"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import type { PageSection } from "@/lib/typeorm/entities/PageSection"
import type { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

@Entity()
export class Page extends BaseEntityWithTimestamps {

  @Column({ unique: true })
  slug!: string

  @Column()
  title!: string

  @Column({ type: "simple-json" })
  data!: unknown

  @OneToMany("PageImage", (image: any) => image.page, { cascade: ["insert", "update"] })
  images!: PageImage[]

  @OneToMany("PageSection", (section: any) => section.page, { cascade: ["insert", "update"] })
  sections!: PageSection[]

  @OneToMany("SeoMeta", (seo: any) => seo.page)
  seoEntries!: SeoMeta[]
}

