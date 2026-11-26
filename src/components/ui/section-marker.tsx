import React from "react"
import { cn } from "@/lib/utils"

interface SectionMarkerProps {
  label: string
  /** Kept for compatibility; no longer rendered. */
  marker?: string
  className?: string
}

/** Small section label: accent square + name. */
export const SectionMarker: React.FC<SectionMarkerProps> = ({ label, className }) => {
  return (
    <div className={cn("label flex items-center gap-2.5", className)}>
      <span className="inline-block h-1.5 w-1.5 bg-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
