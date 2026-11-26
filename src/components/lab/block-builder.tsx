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
  { id: "hero", label: "Hero Banner", color: "from-blue-500/40 to-blue-500/10" },
  { id: "grid", label: "Product Grid", color: "from-sky-500/40 to-sky-500/10" },
  { id: "reviews", label: "Reviews Carousel", color: "from-amber-500/40 to-amber-500/10" },
  { id: "cta", label: "Newsletter CTA", color: "from-emerald-500/40 to-emerald-500/10" },
]

const BlockItem: React.FC<{ block: Block }> = ({ block }) => {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={block}
      dragListener={false}
      dragControls={controls}
      className="rounded-2xl bg-bg-subtle/60 border border-border-subtle overflow-hidden"
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
          <span className="text-xs font-bold">{block.label}</span>
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
