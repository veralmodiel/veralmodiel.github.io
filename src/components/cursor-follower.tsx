"use client"

import React, { useEffect, useRef, useSyncExternalStore } from "react"
import gsap from "gsap"

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)"
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
const useEnabled = () => useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)

const INTERACTIVE = 'a, button, [role="slider"], [role="button"], label, summary, select'
/** Areas with their own pointer feedback (logo chip, canvas crosshair, text fields). */
const HIDE = '[data-cursor="hide"], input, textarea'

/**
 * Small square outline that trails the native cursor. Grows and fills faintly
 * over links/buttons; hides where something else already follows the pointer.
 * Mouse/trackpad only, and off for reduced-motion visitors.
 */
export const CursorFollower: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useEnabled()

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    const xTo = gsap.quickTo(el, "x", { duration: 0.28, ease: "power3.out" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.28, ease: "power3.out" })
    let seen = false

    const onMove = (e: PointerEvent) => {
      if (!seen) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        seen = true
      }
      xTo(e.clientX)
      yTo(e.clientY)
      const target = e.target as Element | null
      el.dataset.state = target?.closest(HIDE) ? "hidden" : target?.closest(INTERACTIVE) ? "active" : "idle"
    }
    const onLeave = () => {
      el.dataset.state = "hidden"
    }
    const onDown = () => el.classList.add("is-pressed")
    const onUp = () => el.classList.remove("is-pressed")

    window.addEventListener("pointermove", onMove)
    document.documentElement.addEventListener("pointerleave", onLeave)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} data-state="hidden" className="cursor-follower pointer-events-none fixed left-0 top-0 z-[190]" aria-hidden="true">
      <span />
    </div>
  )
}
