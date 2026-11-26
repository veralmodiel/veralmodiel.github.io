"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface Theme {
  id: string
  label: string
  headline: string
  /** Background, headline colour and eyebrow colour for this brand. */
  bg: string
  fg: string
  eyebrow: string
  font: string
  /** Headline treatment, so brands differ in type as well as colour. */
  type: string
}

const themes: Theme[] = [
  { id: "wellness", label: "Wellness", headline: "Breathe. Move. Belong.", bg: "#dfe3d3", fg: "#26331f", eyebrow: "#5f6f52", font: "font-sans", type: "tracking-tight" },
  { id: "festival", label: "Festival", headline: "One Night Only.", bg: "#ff5a1f", fg: "#111111", eyebrow: "#3a1405", font: "font-sans", type: "uppercase tracking-tighter" },
  { id: "corporate", label: "Corporate", headline: "Partnerships That Perform.", bg: "#142033", fg: "#eef1f6", eyebrow: "#8fa3c2", font: "font-sans", type: "tracking-tight" },
  { id: "night", label: "After Dark", headline: "Doors Open at 9.", bg: "#0b0b0d", fg: "#c9b8ff", eyebrow: "#6d6585", font: "font-mono", type: "uppercase tracking-widest" },
]

export const CampaignThemer: React.FC = () => {
  const [activeId, setActiveId] = useState(themes[0].id)
  const active = themes.find((t) => t.id === activeId) ?? themes[0]

  return (
    <>
      <div
        className="p-8 mb-6 flex-1 flex items-center justify-center text-center border border-border-hairline transition-colors duration-500"
        style={{ backgroundColor: active.bg }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-widest mb-2 font-mono" style={{ color: active.eyebrow }}>
            Now Announcing
          </div>
          <div className={cn("text-2xl", active.font, active.type)} style={{ color: active.fg }}>
            {active.headline}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setActiveId(theme.id)}
            className={cn(
              "label px-3 py-2 border transition-colors",
              activeId === theme.id
                ? "border-primary text-primary bg-primary/10"
                : "border-border-subtle text-text-muted hover:border-primary/30"
            )}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </>
  )
}
