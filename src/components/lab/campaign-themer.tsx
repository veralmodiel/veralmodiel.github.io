"use client"

import React, { useState } from "react"
import { Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface Theme {
  id: string
  label: string
  headline: string
  gradient: string
  font: string
}

const themes: Theme[] = [
  { id: "wellness", label: "Wellness", headline: "Breathe. Move. Belong.", gradient: "from-emerald-400 to-teal-500", font: "font-sans" },
  { id: "festival", label: "Festival", headline: "One Night Only.", gradient: "from-amber-400 to-orange-600", font: "font-sans" },
  { id: "corporate", label: "Corporate", headline: "Partnerships That Perform.", gradient: "from-blue-500 to-slate-600", font: "font-sans" },
  { id: "night", label: "After Dark", headline: "Doors Open at 9.", gradient: "from-slate-700 to-blue-950", font: "font-mono" },
]

export const CampaignThemer: React.FC = () => {
  const [activeId, setActiveId] = useState(themes[0].id)
  const active = themes.find((t) => t.id === activeId) ?? themes[0]

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
          <Palette size={20} className="text-amber-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Campaign Themer</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">
        One layout, four brands. Built for teams that need a fresh event or campaign page every few weeks.
      </p>

      <div className={cn("rounded-2xl p-8 mb-6 flex-1 flex items-center justify-center text-center bg-linear-to-br", active.gradient)}>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/70 mb-2">Now Announcing</div>
          <div className={cn("text-2xl font-extrabold text-white", active.font)}>{active.headline}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setActiveId(theme.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
              activeId === theme.id
                ? "border-primary text-primary bg-primary/10"
                : "border-border-subtle text-text-muted hover:border-primary/30"
            )}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  )
}
