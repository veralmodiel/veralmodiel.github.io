"use client"

import React from "react"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { StatFigure } from "@/components/stats/stat-figure"
import { FigCaption } from "@/components/ui/fig-caption"

const results = [
  {
    fig: "1.2",
    label: "Websites delivered across e-commerce & corporate",
    caption: "delivery volume",
    stat: { kind: "count" as const, target: 40, suffix: "+" },
  },
  {
    fig: "1.3",
    label: "Faster load times through performance tuning",
    caption: "load time gain",
    stat: { kind: "range" as const, rangeMin: 30, rangeMax: 50, rangeSuffix: "%" },
  },
  {
    fig: "1.4",
    label: "Faster delivery using AI-assisted workflows",
    caption: "delivery speed gain",
    stat: { kind: "range" as const, rangeMin: 20, rangeMax: 40, rangeSuffix: "%" },
  },
  {
    fig: "1.5",
    label: "International clients, fully remote delivery",
    caption: "delivery model",
    stat: { kind: "glyph" as const, value: "Remote" },
  },
]

export const Results: React.FC = () => {
  const ref = useSectionReveal<HTMLDivElement>({ selector: ".reveal-stat" })

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <div key={item.fig} className="reveal-stat panel px-6 py-8">
              <StatFigure {...item.stat} label={item.label} />
              <FigCaption index={item.fig} className="mt-4 pt-4 border-t border-border-hairline">
                {item.caption}
              </FigCaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
