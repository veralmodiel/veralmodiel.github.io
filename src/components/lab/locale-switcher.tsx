"use client"

import React, { useState } from "react"
import { Globe2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Region {
  id: string
  label: string
  currency: string
  price: number
  timezone: string
  dateFormat: string
}

const regions: Region[] = [
  { id: "au", label: "Australia", currency: "AUD $", price: 129, timezone: "AEST, UTC+10", dateFormat: "31/07/2026" },
  { id: "sg", label: "Singapore", currency: "SGD $", price: 149, timezone: "SGT, UTC+8", dateFormat: "31-07-2026" },
  { id: "us", label: "United States", currency: "USD $", price: 89, timezone: "EST, UTC-5", dateFormat: "07/31/2026" },
]

export const LocaleSwitcher: React.FC = () => {
  const [regionId, setRegionId] = useState(regions[0].id)
  const region = regions.find((r) => r.id === regionId) ?? regions[0]

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
          <Globe2 size={20} className="text-lime-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Multi-Region Storefront</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Same product, localised currency, date format and timezone. Built for clients running AU and Singapore storefronts side by side.
      </p>

      <div className="flex gap-2 mb-6">
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => setRegionId(r.id)}
            className={cn(
              "flex-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all",
              regionId === r.id
                ? "border-primary text-primary bg-primary/10"
                : "border-border-subtle text-text-muted hover:border-primary/30"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-bg-subtle/50 border border-border-subtle p-6 flex-1 flex flex-col justify-center">
        <div className="text-3xl font-extrabold font-mono mb-4">
          {region.currency}{region.price}
        </div>
        <div className="space-y-2 text-xs text-text-muted">
          <div className="flex justify-between">
            <span>Timezone</span>
            <span className="text-text-base font-medium">{region.timezone}</span>
          </div>
          <div className="flex justify-between">
            <span>Date format</span>
            <span className="text-text-base font-medium">{region.dateFormat}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
