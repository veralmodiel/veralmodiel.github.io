"use client"

import { useEffect } from "react"

export const MouseTracker = () => {
  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!canHover || reducedMotion) return

    let rafId = 0
    let pendingX = 0
    let pendingY = 0

    const applyUpdate = () => {
      document.body.style.setProperty("--mouse-x", `${pendingX}px`)
      document.body.style.setProperty("--mouse-y", `${pendingY}px`)
      rafId = 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX
      pendingY = e.clientY
      if (!rafId) rafId = requestAnimationFrame(applyUpdate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
