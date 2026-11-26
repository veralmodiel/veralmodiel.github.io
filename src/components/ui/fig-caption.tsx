import React from "react"
import { cn } from "@/lib/utils"

interface FigCaptionProps {
  index: number | string
  children: React.ReactNode
  className?: string
}

/** Caption under a framed visual: "[01] label". */
export const FigCaption: React.FC<FigCaptionProps> = ({ index, children, className }) => {
  const num = typeof index === "number" ? String(index).padStart(2, "0") : index
  return (
    <figcaption className={cn("label mt-3 flex flex-col gap-0.5 sm:flex-row sm:gap-2", className)}>
      <span className="text-primary">[{num}]</span>
      <span>{children}</span>
    </figcaption>
  )
}
