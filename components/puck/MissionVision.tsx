import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Target, Eye } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export type MissionVisionProps = {
  missionTitle: string
  missionText: string
  visionTitle: string
  visionText: string
}

export const MissionVisionConfig: ComponentConfig<MissionVisionProps> = {
  fields: {
    missionTitle: { type: "text" },
    missionText: { type: "textarea" },
    visionTitle: { type: "text" },
    visionText: { type: "textarea" },
  },
  defaultProps: {
    missionTitle: "Misyonumuz",
    missionText: "Doğal ve yüksek kaliteli içeriklerle formüle edilmiş premium ürünler sunarak, kullanıcılarımızın günlük yaşam rutinlerini desteklemek.",
    visionTitle: "Vizyonumuz",
    visionText: "Türkiye'nin ve bölgenin lider premium wellness markası olmak. Yenilikçi formüller ve müşteri odaklı yaklaşımımızla fark yaratmak.",
  },
  render: ({ missionTitle, missionText, visionTitle, visionText }) => (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <Reveal className="bg-card border border-border rounded-3xl p-8 lg:p-10" y={18}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{missionTitle}</h3>
            <p className="text-muted-foreground leading-relaxed">{missionText}</p>
          </Reveal>

          {/* Vision */}
          <Reveal className="bg-card border border-border rounded-3xl p-8 lg:p-10" delayMs={120} y={18}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{visionTitle}</h3>
            <p className="text-muted-foreground leading-relaxed">{visionText}</p>
          </Reveal>
        </div>
      </div>
    </section>
  ),
}
