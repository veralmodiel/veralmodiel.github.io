"use client"

import React, { useEffect, useRef } from "react"
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion"

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const section = canvas.closest("section")
    const reduced = prefersReducedMotion()

    let width = 0
    let height = 0
    let spacing = 36
    let cols = 0
    let rows = 0
    let running = false
    let rafId = 0

    // Pointer interaction: dots lean away from the mouse and light up near it;
    // a click or tap sends a ripple across the field.
    const pointer = { x: 0, y: 0, inside: false }
    let influence = 0 // eased 0→1 while the mouse is over the canvas
    const ripples: { x: number; y: number; start: number }[] = []

    const mutedColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--text-muted").trim() || "#8f8f8f"
    const accentColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#ff5a1f"

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (width <= 0 || height <= 0) {
        cols = 0
        rows = 0
        return
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targetCount = isMobileViewport()
        ? Math.min(140, Math.max(50, Math.round((width * height) / 20000)))
        : Math.min(450, Math.max(80, Math.round((width * height) / 14000)))

      spacing = Math.sqrt((width * height) / targetCount)
      cols = Math.max(1, Math.floor(width / spacing))
      rows = Math.max(1, Math.floor(height / spacing))
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height)
      if (cols === 0 || rows === 0) return

      const muted = mutedColor()
      const accent = accentColor()
      const offsetX = (width - cols * spacing) / 2 + spacing / 2
      const offsetY = (height - rows * spacing) / 2 + spacing / 2
      const reach = Math.max(width, height)

      influence += ((pointer.inside ? 1 : 0) - influence) * 0.12
      while (ripples.length && t - ripples[0].start > 1100) ripples.shift()

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * spacing
          const baseY = offsetY + row * spacing
          const phase = col * 0.4 + row * 0.6 + t * 0.0009
          const wave = Math.sin(phase)
          const y = baseY + wave * spacing * 0.35
          const intensity = (wave + 1) / 2

          let px = x
          let py = y
          let lit = 0

          if (influence > 0.01) {
            const dx = x - pointer.x
            const dy = y - pointer.y
            const dist = Math.hypot(dx, dy) || 1
            const radius = reach * 0.45
            if (dist < radius) {
              const f = (1 - dist / radius) ** 2 * influence
              px += (dx / dist) * f * spacing * 1.2
              py += (dy / dist) * f * spacing * 1.2
              lit = Math.max(lit, f)
            }
          }

          for (const r of ripples) {
            const age = (t - r.start) / 1100
            const dx = x - r.x
            const dy = y - r.y
            const dist = Math.hypot(dx, dy) || 1
            const band = 1 - Math.abs(dist - age * reach * 1.3) / (spacing * 1.4)
            if (band > 0) {
              const f = band * (1 - age)
              px += (dx / dist) * f * spacing * 0.6
              py += (dy / dist) * f * spacing * 0.6
              lit = Math.max(lit, f)
            }
          }

          const glow = Math.max(intensity, lit)
          ctx!.fillStyle = intensity > 0.82 || lit > 0.3 ? accent : muted
          ctx!.globalAlpha = 0.15 + glow * 0.45
          const size = 1 + glow * 1.8
          ctx!.fillRect(px - size / 2, py - size / 2, size, size)
        }
      }
      ctx!.globalAlpha = 1
    }

    function loop(t: number) {
      draw(t)
      if (running) rafId = requestAnimationFrame(loop)
    }

    resize()

    if (reduced) {
      draw(0)
    } else {
      running = true
      rafId = requestAnimationFrame(loop)
    }

    const handleResize = () => {
      resize()
      if (reduced) draw(0)
    }
    window.addEventListener("resize", handleResize)

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onMove = (e: PointerEvent) => {
      toLocal(e)
      pointer.inside = e.pointerType === "mouse" // touch only gets ripples, so scrolling stays normal
    }
    const onLeave = () => {
      pointer.inside = false
    }
    const onDown = (e: PointerEvent) => {
      toLocal(e)
      ripples.push({ x: pointer.x, y: pointer.y, start: performance.now() })
      if (ripples.length > 4) ripples.shift()
    }
    if (!reduced) {
      canvas.addEventListener("pointermove", onMove)
      canvas.addEventListener("pointerleave", onLeave)
      canvas.addEventListener("pointerdown", onDown)
    }

    let observer: IntersectionObserver | null = null
    if (!reduced && section) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true
            rafId = requestAnimationFrame(loop)
          } else if (!entry.isIntersecting && running) {
            running = false
            cancelAnimationFrame(rafId)
          }
        },
        { threshold: 0 }
      )
      observer.observe(section)
    }

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
      canvas.removeEventListener("pointerdown", onDown)
      observer?.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" data-cursor="hide" aria-hidden="true" />
}
