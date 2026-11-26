"use client"

import React, { useRef, useState } from "react"
import { ChevronsLeftRight } from "lucide-react"

/**
 * Before/after slider: the same product card as a design wireframe (left)
 * and as the shipped UI (right). Both are inline SVGs on one shared
 * coordinate system, so dragging the divider shows they match exactly.
 * No image requests; colours come from the theme, so light/dark both work.
 */

const VB = "0 0 480 300"

/** Left: the design file. Dashed outlines, grey text bars, orange spec notes. */
function DesignLayer() {
  return (
    <svg viewBox={VB} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" className="fill-bg-subtle" />
      <g className="fill-none stroke-text-muted" strokeWidth="1" strokeDasharray="4 3" opacity="0.6">
        {/* nav */}
        <rect x="24" y="18" width="64" height="14" />
        <rect x="336" y="20" width="36" height="10" />
        <rect x="384" y="20" width="36" height="10" />
        <rect x="432" y="20" width="24" height="10" />
        {/* image placeholder */}
        <rect x="24" y="52" width="200" height="208" />
        <line x1="24" y1="52" x2="224" y2="260" />
        <line x1="224" y1="52" x2="24" y2="260" />
        {/* button */}
        <rect x="248" y="208" width="140" height="36" />
      </g>
      <g className="fill-text-muted" opacity="0.45">
        <rect x="248" y="60" width="168" height="18" />
        <rect x="248" y="92" width="64" height="14" />
        <rect x="248" y="126" width="196" height="7" />
        <rect x="248" y="141" width="180" height="7" />
        <rect x="248" y="156" width="132" height="7" />
        <rect x="282" y="222" width="72" height="8" />
      </g>
      {/* spec annotations */}
      <g className="fill-primary" fontSize="9" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.5">
        <text x="420" y="73">H2 22/28</text>
        <text x="318" y="103">accent</text>
        <text x="394" y="230">btn/primary</text>
      </g>
      <g className="stroke-primary" strokeWidth="1">
        <line x1="226" y1="69" x2="246" y2="69" />
        <line x1="226" y1="65" x2="226" y2="73" />
        <line x1="246" y1="65" x2="246" y2="73" />
      </g>
      <text x="230" y="62" className="fill-primary" fontSize="8" fontFamily="var(--font-geist-mono), monospace">24</text>
    </svg>
  )
}

/** Right: the shipped card. Same coordinates, real content and styling. */
function BuiltLayer() {
  return (
    <svg viewBox={VB} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="dh-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--secondary)" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="480" height="300" className="fill-bg-base" />
      {/* nav */}
      <text x="24" y="29" className="fill-text-base" fontSize="11" fontFamily="var(--font-geist-mono), monospace" letterSpacing="1.5">NORTHFORM</text>
      <g className="fill-text-muted" fontSize="9" fontFamily="var(--font-geist-mono), monospace">
        <text x="336" y="28">SHOP</text>
        <text x="384" y="28">JOURNAL</text>
        <text x="432" y="28">CART</text>
      </g>
      {/* product image */}
      <rect x="24" y="52" width="200" height="208" fill="url(#dh-img)" />
      <g className="fill-bg-base" opacity="0.9">
        <path d="M84 120 h80 l-10 84 a8 8 0 0 1 -8 7 h-44 a8 8 0 0 1 -8 -7 z" />
        <rect x="80" y="112" width="88" height="10" />
      </g>
      <ellipse cx="124" cy="226" rx="54" ry="6" className="fill-bg-base" opacity="0.25" />
      {/* copy */}
      <text x="248" y="76" className="fill-text-base" fontSize="21" fontFamily="var(--font-geist-sans), sans-serif" letterSpacing="-0.6">Ceramic Dripper</text>
      <text x="248" y="105" className="fill-primary" fontSize="14" fontFamily="var(--font-geist-mono), monospace">$48.00</text>
      <g className="fill-text-muted" fontSize="10" fontFamily="var(--font-geist-mono), monospace">
        <text x="248" y="133">Hand-thrown stoneware that</text>
        <text x="248" y="148">brews one clean, bright cup.</text>
        <text x="248" y="163">Fits most mugs.</text>
      </g>
      {/* button */}
      <rect x="248" y="208" width="140" height="36" className="fill-primary" />
      <text x="318" y="230" textAnchor="middle" className="fill-bg-base" fontSize="10" fontFamily="var(--font-geist-mono), monospace" letterSpacing="1.2">ADD TO CART</text>
    </svg>
  )
}

export const DesignHandoff: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(38)
  const [dragging, setDragging] = useState(false)
  // The handle pulses until the visitor first moves it.
  const [touched, setTouched] = useState(false)

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setSplit(Math.min(100, Math.max(0, pct)))
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Compare design file and shipped build"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(split)}
      className="relative w-full aspect-[8/5] my-auto overflow-hidden select-none cursor-ew-resize border border-border-hairline touch-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
      onPointerDown={(e) => {
        setDragging(true)
        setTouched(true)
        updateFromClientX(e.clientX)
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") setTouched(true)
        if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 5))
        if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 5))
      }}
    >
      <DesignLayer />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
        <BuiltLayer />
      </div>

      {/* Corner labels */}
      <span className="label absolute left-2 bottom-2 bg-bg-subtle/90 px-1.5 py-0.5">Design</span>
      <span className="label absolute right-2 bottom-2 bg-bg-base/90 px-1.5 py-0.5 text-primary">Built</span>

      {/* Handle */}
      <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-primary" style={{ left: `${split}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-primary bg-bg-base text-primary">
          {!touched && (
            <span className="absolute inset-0 border border-primary motion-safe:animate-ping" aria-hidden="true" />
          )}
          <ChevronsLeftRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
