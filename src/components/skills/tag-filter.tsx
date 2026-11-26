"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  active: string[]
  onToggle: (tag: string) => void
}

export const TagFilter: React.FC<TagFilterProps> = ({ tags, active, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter toolkit by tag">
      {tags.map((tag) => {
        const isActive = active.includes(tag)
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            aria-pressed={isActive}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-all",
              isActive
                ? "border-primary text-primary bg-primary/10"
                : "border-border-subtle text-text-muted hover:border-primary/30"
            )}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
