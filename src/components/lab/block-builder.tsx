"use client"

import React, { useState } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { GripVertical, LayoutTemplate } from "lucide-react"

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
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
          <LayoutTemplate size={20} className="text-sky-400" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Page Builder</h3>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Drag to reorder sections, the same block-based thinking behind every WordPress, Shopify and Webflow page.
      </p>

      <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-3">
        {blocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </Reorder.Group>
    </div>
  )
}
