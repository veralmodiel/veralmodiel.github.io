import React from "react"
import { cn } from "@/lib/utils"

interface FigCaptionProps {
  index: number | string
  children: React.ReactNode
  className?: string
}

export const FigCaption: React.FC<FigCaptionProps> = ({ index, children, className }) => {
  return (
    <figcaption className={cn("font-mono text-[11px] uppercase tracking-widest text-text-muted", className)}>
      Fig. {index} — {children}
    </figcaption>
  )
}
