"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface SectionRevealOptions {
  /** CSS selector (within the ref element) of items to reveal with a stagger. Defaults to the ref element itself. */
  selector?: string
  y?: number
  stagger?: number
  start?: string
}

/**
 * Scroll-triggered fade/rise reveal. Gated entirely behind
 * `(prefers-reduced-motion: no-preference)` via gsap.matchMedia — under
 * reduced motion the callback never runs, so elements keep their natural
 * (visible) state instead of being set to opacity:0 and never animated in.
 */
export function useSectionReveal<T extends HTMLElement>(options: SectionRevealOptions = {}) {
  const ref = useRef<T | null>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = options.selector ? el.querySelectorAll(options.selector) : [el]

        gsap.set(targets, { opacity: 0, y: options.y ?? 24 })
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: options.stagger ?? 0.08,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 85%",
          },
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return ref
}
