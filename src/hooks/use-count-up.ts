"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface UseCountUpOptions {
  target: number
  duration?: number
  format?: (value: number) => string
}

/**
 * Tweens a plain number and writes the formatted result directly to the
 * element's textContent via onUpdate, rather than React state — avoids a
 * re-render on every animation frame. Gated behind gsap.matchMedia so
 * reduced-motion visitors get the target value immediately, no tween.
 */
export function useCountUp<T extends HTMLElement>({ target, duration = 1.4, format }: UseCountUpOptions) {
  const ref = useRef<T>(null)
  const formatValue = format ?? ((v: number) => String(Math.round(v)))

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      el.textContent = formatValue(0)
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { value: 0 }
        gsap.to(obj, {
          value: target,
          duration,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = formatValue(obj.value)
          },
        })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = formatValue(target)
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return ref
}
