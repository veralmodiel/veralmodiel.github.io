"use client"

import React, { useState } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { GripVertical } from "lucide-react"

interface Block {
  id: string
  label: string
  color: string
}

const initialBlocks: Block[] = [
  // One accent at four strengths, so each block keeps its identity when reordered.
  { id: "hero", label: "Hero Banner", color: "from-primary/45 to-primary/10" },
  { id: "grid", label: "Product Grid", color: "from-primary/30 to-primary/5" },
  { id: "reviews", label: "Reviews Carousel", color: "from-text-muted/35 to-text-muted/5" },
  { id: "cta", label: "Newsletter CTA", color: "from-text-muted/20 to-transparent" },
]

const BlockItem: React.FC<{ block: Block }> = ({ block }) => {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={controls}
      className="bg-bg-subtle/60 border border-border-hairline overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab active:cursor-grabbing text-text-muted hover:text-primary touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>
        <div className={`h-8 flex-1 rounded-xl bg-linear-to-r ${block.color} flex items-center px-3`}>
          <span className="label text-text-base">{block.label}</span>
        </div>
      </div>
    </Reorder.Item>
  )
}

export const BlockBuilder: React.FC = () => {
  const [blocks, setBlocks] = useState(initialBlocks)

  return (
    <Reorder.Group
      axis="y"
      values={blocks}
      onReorder={setBlocks}
      data-lenis-prevent
      className="space-y-3 flex-1"
    >
      {blocks.map((block) => (
        <BlockItem key={block.id} block={block} />
      ))}
    </Reorder.Group>
  )
}
