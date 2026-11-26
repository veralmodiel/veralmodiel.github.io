"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCountUp } from "@/hooks/use-count-up"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface CountStatProps {
  kind: "count"
  target: number
  prefix?: string
  suffix?: string
  padLength?: number
  label: string
  className?: string
}

interface RangeStatProps {
  kind: "range"
  rangeMin: number
  rangeMax: number
  rangeSuffix?: string
  label: string
  className?: string
}

interface GlyphStatProps {
  kind: "glyph"
  value: string
  label: string
  className?: string
}

type StatFigureProps = CountStatProps | RangeStatProps | GlyphStatProps

function CountStat({ target, prefix = "", suffix = "", padLength = 1, label, className }: CountStatProps) {
  const format = (v: number) => `${prefix}${String(Math.round(v)).padStart(padLength, "0")}${suffix}`
  const countRef = useCountUp<HTMLDivElement>({ target, format })
  const barRef = useRef<SVGRectElement>(null)

  useGSAP(
    () => {
      if (!barRef.current) return
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          barRef.current,
          { attr: { width: 0 } },
          {
            attr: { width: 100 },
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: barRef.current, start: "top 90%", once: true },
          }
        )
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(barRef.current, { attr: { width: 100 } })
      })

      return () => mm.revert()
    },
    { scope: barRef }
  )

  return (
    <div className={cn("text-left", className)}>
      <svg width="100%" height="6" viewBox="0 0 100 6" preserveAspectRatio="none" className="mb-4 block">
        <rect x="0" y="0" width="100" height="6" rx="3" className="fill-bg-subtle" />
        <rect ref={barRef} x="0" y="0" width="0" height="6" rx="3" className="fill-primary" />
      </svg>
      <div ref={countRef} className="text-3xl md:text-4xl font-extrabold font-mono mb-1">
        {prefix}{String(0).padStart(padLength, "0")}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-text-muted leading-relaxed">{label}</div>
    </div>
  )
}

function RangeStat({ rangeMin, rangeMax, rangeSuffix = "", label, className }: RangeStatProps) {
  const barRef = useRef<SVGRectElement>(null)
  const minRef = useRef<HTMLSpanElement>(null)
  const maxRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!barRef.current || !minRef.current || !maxRef.current) return
      const min = minRef.current
      const max = maxRef.current

      min.textContent = `0${rangeSuffix}`
      max.textContent = `0${rangeSuffix}`

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { min: 0, max: 0 }
        gsap.to(obj, {
          min: rangeMin,
          max: rangeMax,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: barRef.current, start: "top 90%", once: true },
          onUpdate: () => {
            min.textContent = `${Math.round(obj.min)}${rangeSuffix}`
            max.textContent = `${Math.round(obj.max)}${rangeSuffix}`
            gsap.set(barRef.current, { attr: { x: obj.min, width: Math.max(0, obj.max - obj.min) } })
          },
        })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        min.textContent = `${rangeMin}${rangeSuffix}`
        max.textContent = `${rangeMax}${rangeSuffix}`
        gsap.set(barRef.current, { attr: { x: rangeMin, width: rangeMax - rangeMin } })
      })

      return () => mm.revert()
    },
    { scope: barRef }
  )

  return (
    <div className={cn("text-left", className)}>
      <svg width="100%" height="16" viewBox="0 0 100 16" preserveAspectRatio="none" className="mb-4 block overflow-visible">
        <rect x="0" y="5" width="100" height="6" rx="3" className="fill-bg-subtle" />
        <rect ref={barRef} x={rangeMin} y="5" width="0" height="6" rx="3" className="fill-primary" />
      </svg>
      <div className="text-3xl md:text-4xl font-extrabold font-mono mb-1">
        <span ref={minRef} />–<span ref={maxRef} />
      </div>
      <div className="text-xs uppercase tracking-widest text-text-muted leading-relaxed">{label}</div>
    </div>
  )
}

function GlyphStat({ value, label, className }: GlyphStatProps) {
  return (
    <div className={cn("text-left", className)}>
      <div className="relative flex items-center mb-4 h-[22px] w-[22px]">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" />
        <span className="relative inline-flex items-center justify-center h-[22px] w-[22px] rounded-full bg-primary/10 border border-primary/40">
          <Globe size={12} className="text-primary" />
        </span>
      </div>
      <div className="text-3xl md:text-4xl font-extrabold font-mono mb-1">{value}</div>
      <div className="text-xs uppercase tracking-widest text-text-muted leading-relaxed">{label}</div>
    </div>
  )
}

export const StatFigure: React.FC<StatFigureProps> = (props) => {
  if (props.kind === "count") return <CountStat {...props} />
  if (props.kind === "range") return <RangeStat {...props} />
  return <GlyphStat {...props} />
}
