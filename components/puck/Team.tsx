import React from "react"
import type { ComponentConfig } from "@measured/puck"
import { Users } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"

export type TeamMember = {
  name: string
  role: string
}

export type TeamProps = {
  tagline: string
  titleHighlight: string
  titleEnd: string
  description: string
  members: TeamMember[]
}

export const TeamConfig: ComponentConfig<TeamProps> = {
  fields: {
    tagline: { type: "text" },
    titleHighlight: { type: "text" },
    titleEnd: { type: "text" },
    description: { type: "textarea" },
    members: {
      type: "array",
      getItemSummary: (m) => `${m.name} - ${m.role}`,
      arrayFields: {
        name: { type: "text" },
        role: { type: "text" },
      },
    },
  },
  defaultProps: {
    tagline: "Ekibimiz",
    titleHighlight: "Uzman",
    titleEnd: "Ekibimiz",
    description: "Deneyimli ekibimiz, sizlere en iyi hizmeti sunmak için çalışıyor.",
    members: [
      { name: "Dr. Ahmet Yılmaz", role: "Formül Uzmanı" },
      { name: "Elif Demir", role: "Kalite Güvence Müdürü" },
      { name: "Can Öztürk", role: "Ürün Geliştirme" },
    ],
  },
  render: ({ tagline, titleHighlight, titleEnd, description, members }) => (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{tagline}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            <span className="text-gradient-gold">{titleHighlight}</span> {titleEnd}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, i) => (
            <Reveal key={i} className="bg-card border border-border rounded-2xl p-6 text-center card-hover" delayMs={i * 90}>
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary border border-border flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-primary/50" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  ),
}
