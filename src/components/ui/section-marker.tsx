import React from "react"
import { cn } from "@/lib/utils"

interface SectionMarkerProps {
  marker: string
  label: string
  className?: string
}

export const SectionMarker: React.FC<SectionMarkerProps> = ({ marker, label, className }) => {
  return (
    <div className={cn("font-mono text-xs uppercase tracking-[0.3em] text-text-muted flex items-center gap-2", className)}>
      <span className="text-primary">{"{"}{marker}{"}"}</span>
      <span>{label}</span>
    </div>
  )
}
