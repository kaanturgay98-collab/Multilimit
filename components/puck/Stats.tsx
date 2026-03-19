import React from "react"
import type { ComponentConfig } from "@measured/puck"

export type StatItem = {
  value: string
  label: string
}

export type StatsProps = {
  items: StatItem[]
}

export const StatsConfig: ComponentConfig<StatsProps> = {
  fields: {
    items: {
      type: "array",
      getItemSummary: (item) => `${item.label}: ${item.value}`,
      arrayFields: {
        value: { type: "text" },
        label: { type: "text" },
      },
    },
  },
  defaultProps: {
    items: [
      { value: "10.000+", label: "Mutlu Müşteri" },
      { value: "4.9/5", label: "Müşteri Puanı" },
      { value: "%100", label: "Doğal İçerik" },
      { value: "2+ Yıl", label: "Tecrübe" },
    ],
  },
  render: ({ items }) => (
    <section className="py-16 lg:py-20 border-y border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}
