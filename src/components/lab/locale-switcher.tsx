"use client"

import React, { useState } from "react"
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
    <>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => setRegionId(r.id)}
            className={cn(
              "label min-w-0 px-2 py-2 leading-tight border transition-colors",
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
    </>
  )
}
