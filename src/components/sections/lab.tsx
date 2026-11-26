"use client"

import React from "react"
import { labItems } from "@/lib/lab-items"
import { SectionMarker } from "@/components/ui/section-marker"
import { useSectionReveal } from "@/hooks/use-section-reveal"

export const Lab: React.FC = () => {
  const headerRef = useSectionReveal<HTMLDivElement>()
  const gridRef = useSectionReveal<HTMLDivElement>({ selector: ".reveal-card", stagger: 0.08 })

  return (
    <section id="lab" className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className="max-w-xl mb-16">
          <SectionMarker marker="C" label="Lab" className="mb-4" />
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            The Lab
          </h2>
          <p className="text-text-muted text-lg mb-4">
            Most of my client work sits behind agency NDAs, so instead of screenshots, here are a few small builds you can actually touch.
          </p>
          <p className="text-text-muted text-sm">
            Happy to share a few live client sites privately on request, just ask.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labItems.map((item) => (
            <div key={item.id} className="reveal-card">
              {item.node}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
