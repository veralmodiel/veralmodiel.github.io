import React from "react"
import { LucideIcon } from "lucide-react"
import { FigCaption } from "@/components/ui/fig-caption"

interface LabCardProps {
  index: number
  title: string
  blurb: string
  Icon: LucideIcon
  iconColor: string
  children: React.ReactNode
}

export const LabCard: React.FC<LabCardProps> = ({ index, title, blurb, Icon, iconColor, children }) => {
  return (
    <figure className="panel p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
          <Icon size={20} className={iconColor} />
        </div>
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">{blurb}</p>

      <div className="flex-1 flex flex-col min-h-0">{children}</div>

      <FigCaption index={index} className="mt-6 pt-4 border-t border-border-hairline">
        {title.toLowerCase()}
      </FigCaption>
    </figure>
  )
}
