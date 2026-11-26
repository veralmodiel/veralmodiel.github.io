"use client"

import React from "react"
import { useSectionReveal } from "@/hooks/use-section-reveal"

const results = [
  { value: "40+", label: "Websites delivered across e-commerce & corporate" },
  { value: "30–50%", label: "Faster load times through performance tuning" },
  { value: "20–40%", label: "Faster delivery using AI-assisted workflows" },
  { value: "Remote", label: "International clients, fully remote delivery" },
]

export const Results: React.FC = () => {
  const ref = useSectionReveal<HTMLDivElement>({ selector: ".reveal-stat" })

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((stat) => (
            <div key={stat.label} className="reveal-stat panel px-6 py-8 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2 font-mono">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-text-muted leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
