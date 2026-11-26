"use client"

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { glyphFor, type Glyph } from "@/lib/skill-glyphs"

const FINE = "(pointer: fine)"
const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia(FINE)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
const useFinePointer = () =>
  useSyncExternalStore(subscribePointer, () => window.matchMedia(FINE).matches, () => false)

function GlyphMark({ glyph }: { glyph: Glyph }) {
  if (glyph.kind === "brand") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-primary" aria-hidden="true">
        <path d={glyph.icon.path} />
      </svg>
    )
  }
  if (glyph.kind === "icon") {
    const { Icon } = glyph
    return <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
  }
  return <span className="text-[13px] leading-none tracking-tight text-primary">{glyph.text}</span>
}

interface LogoCursorProps {
  /** Currently hovered tool, or null when nothing is hovered. */
  name: string | null
}

/**
 * A small chip (logo/icon + name) that trails the pointer while a tool name is hovered.
 * Mouse/trackpad only; nothing renders on touch devices.
 */
export const LogoCursor: React.FC<LogoCursorProps> = ({ name }) => {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useFinePointer()
  // Keep the last name so the chip doesn't go blank while fading out.
  const [lastName, setLastName] = useState<string | null>(null)
  if (name && name !== lastName) setLastName(name)
  const shown = name ?? lastName

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dur = reduce ? 0 : 0.35
    const xTo = gsap.quickTo(el, "x", { duration: dur, ease: "power3.out" })
    const yTo = gsap.quickTo(el, "y", { duration: dur, ease: "power3.out" })
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX + 18)
      yTo(e.clientY + 18)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[200] flex items-center gap-3 border border-border-hairline bg-bg-base px-3 py-2.5",
        "transition-[opacity,scale] duration-200",
        name ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center">
        {shown && <GlyphMark glyph={glyphFor(shown)} />}
      </span>
      <span className="label text-text-base whitespace-nowrap">{shown}</span>
    </div>
  )
}
