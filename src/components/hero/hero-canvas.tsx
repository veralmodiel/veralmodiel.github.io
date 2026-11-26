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

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * spacing
          const baseY = offsetY + row * spacing
          const phase = col * 0.4 + row * 0.6 + t * 0.0009
          const wave = Math.sin(phase)
          const y = baseY + wave * spacing * 0.35
          const intensity = (wave + 1) / 2

          ctx!.fillStyle = intensity > 0.82 ? accent : muted
          ctx!.globalAlpha = 0.15 + intensity * 0.35
          const size = 1 + intensity * 1.6
          ctx!.fillRect(x - size / 2, y - size / 2, size, size)
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
      observer?.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
