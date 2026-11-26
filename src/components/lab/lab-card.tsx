import React from "react"
import { FigCaption } from "@/components/ui/fig-caption"

interface LabCardProps {
  index: number
  title: string
  blurb: string
  children: React.ReactNode
}

/** One Lab entry as an editorial row: narrow text column left, framed live demo right. */
export const LabCard: React.FC<LabCardProps> = ({ index, title, blurb, children }) => {
  const num = String(index).padStart(2, "0")
  return (
    <article className="grid grid-cols-12 gap-6 border-t border-border-hairline pt-6 pb-24 md:pb-40">
      <div className="col-span-12 md:col-span-4">
        <p className="label mb-6"><span className="text-primary">{num}</span> / Lab</p>
        <h3 className="text-2xl md:text-3xl leading-tight mb-4">{title}</h3>
        <p className="text-text-muted max-w-xs">{blurb}</p>
      </div>
      <figure className="col-span-12 md:col-span-7 md:col-start-6">
        <div className="figure-frame p-6 md:p-8 min-h-[22rem] flex flex-col">{children}</div>
        <FigCaption index={num}>{title.toLowerCase()}</FigCaption>
      </figure>
    </article>
  )
}
