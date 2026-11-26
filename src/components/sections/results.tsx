"use client"

import React from "react"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { StatFigure } from "@/components/stats/stat-figure"

const results = [
  { fig: "1.2", label: "Websites delivered, e-commerce & corporate", stat: { kind: "count" as const, target: 40, suffix: "+" } },
  { fig: "1.3", label: "Faster load times from performance tuning", stat: { kind: "range" as const, rangeMin: 30, rangeMax: 50, rangeSuffix: "%" } },
  { fig: "1.4", label: "Faster delivery with AI-assisted workflows", stat: { kind: "range" as const, rangeMin: 20, rangeMax: 40, rangeSuffix: "%" } },
  { fig: "1.5", label: "International clients, fully remote", stat: { kind: "glyph" as const, value: "Remote" } },
]

export const Results: React.FC = () => {
  const ref = useSectionReveal<HTMLDivElement>({ selector: ".reveal-stat" })

  return (
    <section className="shell py-24 md:py-40">
      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 border-t border-border-hairline">
        {results.map((item, i) => (
          <div
            key={item.fig}
            className={cn("reveal-stat pt-6 pb-10 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "border-l pl-6 lg:pl-6")}
          >
            <p className="label mb-10 text-primary">[{String(i + 1).padStart(2, "0")}]</p>
            <StatFigure {...item.stat} label={item.label} />
          </div>
        ))}
      </div>
    </section>
  )
}

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ")
}
