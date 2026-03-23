import { Column, Entity, OneToMany } from "typeorm"
import { PageImage } from "@/lib/typeorm/entities/PageImage"
import { BaseEntityWithTimestamps } from "@/lib/typeorm/entities/BaseColumns"
import { PageSection } from "@/lib/typeorm/entities/PageSection"
import { SeoMeta } from "@/lib/typeorm/entities/SeoMeta"

@Entity()
export class Page extends BaseEntityWithTimestamps {

  @Column({ unique: true })
  slug!: string

  @Column()
  title!: string

  @Column({ type: "simple-json" })
  data!: unknown

  @OneToMany(() => PageImage, (image) => image.page, { cascade: ["insert", "update"] })
  images!: PageImage[]

  @OneToMany(() => PageSection, (section) => section.page, { cascade: ["insert", "update"] })
  sections!: PageSection[]

  @OneToMany(() => SeoMeta, (seo) => seo.page)
  seoEntries!: SeoMeta[]
}

