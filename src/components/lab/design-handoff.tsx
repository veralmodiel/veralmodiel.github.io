"use client"

import React, { useRef, useState } from "react"
import { Layers } from "lucide-react"

export const DesignHandoff: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setSplit(Math.min(100, Math.max(0, pct)))
  }

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
          <Layers size={20} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Design Handoff</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Drag the divider. Most of my solo builds start as a designer&apos;s file and end up pixel-matched in the browser.
      </p>

      <div
        ref={containerRef}
        className="relative flex-1 min-h-[220px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-border-subtle"
        onPointerDown={(e) => {
          setDragging(true)
          updateFromClientX(e.clientX)
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (dragging) updateFromClientX(e.clientX)
        }}
        onPointerUp={() => setDragging(false)}
      >
        {/* Design side */}
        <div className="absolute inset-0 bg-bg-subtle flex items-center justify-center p-6">
          <div className="w-full h-full border-2 border-dashed border-text-muted/40 rounded-xl flex flex-col gap-3 p-4">
            <div className="h-4 w-1/2 rounded bg-text-muted/30" />
            <div className="h-20 w-full rounded bg-text-muted/20" />
            <div className="h-3 w-3/4 rounded bg-text-muted/30" />
            <div className="h-3 w-2/3 rounded bg-text-muted/30" />
            <span className="mt-auto text-[10px] uppercase tracking-widest text-text-muted">Design File</span>
          </div>
        </div>

        {/* Code side, clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-6">
            <div className="w-full h-full rounded-xl flex flex-col gap-3 p-4 glass">
              <div className="h-4 w-1/2 rounded-full bg-linear-to-r from-primary to-secondary" />
              <div className="h-20 w-full rounded-lg bg-bg-base/60 border border-border-subtle" />
              <div className="h-3 w-3/4 rounded-full bg-text-muted/40" />
              <div className="h-3 w-2/3 rounded-full bg-text-muted/40" />
              <span className="mt-auto text-[10px] uppercase tracking-widest text-primary">Shipped</span>
            </div>
          </div>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-text-base"
          style={{ left: `${split}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-text-base text-bg-base flex items-center justify-center text-xs font-bold shadow-lg">
            ⟷
          </div>
        </div>
      </div>
    </div>
  )
}
