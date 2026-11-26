"use client"

import React from "react"
import { labItems } from "@/lib/lab-items"
import { SectionMarker } from "@/components/ui/section-marker"
import { useSectionReveal } from "@/hooks/use-section-reveal"
import { LabCard } from "@/components/lab/lab-card"

export const Lab: React.FC = () => {
  const headerRef = useSectionReveal<HTMLDivElement>()

  return (
    <section id="lab" className="shell py-24 md:py-40">
      <div ref={headerRef} className="grid grid-cols-12 gap-6 mb-24 md:mb-40">
        <SectionMarker label="Lab" className="col-span-12 md:col-span-4" />
        <div className="col-span-12 md:col-span-6 md:col-start-6">
          <h2 className="text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] mb-8">Small builds you can actually touch.</h2>
          <p className="text-text-muted max-w-md mb-3">
            Most of my client work sits behind agency NDAs, so instead of screenshots, here are a few working pieces.
          </p>
          <p className="label">Live client sites shared privately on request.</p>
        </div>
      </div>

      <div>
        {labItems.map((item) => (
          <LabCard key={item.id} index={item.index} title={item.title} blurb={item.blurb}>
            {item.node}
          </LabCard>
        ))}
      </div>
    </section>
  )
}
