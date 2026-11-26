"use client"

import React, { useEffect, useRef } from "react"

/**
 * Very faint galaxy backdrop: sparse twinkling stars (a few warm ones in the
 * accent colour) with slight scroll parallax, plus a soft glow in two corners.
 * Fixed behind the content, dark mode only, ~30fps, pauses when the tab is hidden.
 */
export const Starfield: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const css = getComputedStyle(document.documentElement)
    const warm = css.getPropertyValue("--primary").trim() || "#ff5a1f"
    const cool = "#f2f2ee"

    type Star = { x: number; y: number; r: number; a: number; speed: number; phase: number; warm: boolean }
    let stars: Star[] = []
    let w = 0
    let h = 0
    let raf = 0
    let last = 0

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const scroll = reduce ? 0 : window.scrollY
      for (const s of stars) {
        // Bigger stars drift a little faster on scroll, which reads as depth.
        const y = (((s.y - scroll * 0.03 * s.r) % h) + h) % h
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(t * 0.0007 * s.speed + s.phase)
        ctx.globalAlpha = s.a * twinkle
        ctx.fillStyle = s.warm ? warm : cool
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(220, (w * h) / 9000))
      stars = Array.from({ length: count }, () => {
        const big = Math.random() > 0.9
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? 0.9 + Math.random() * 0.6 : 0.3 + Math.random() * 0.6,
          a: 0.12 + Math.random() * 0.4,
          speed: 0.3 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          warm: Math.random() < 0.1,
        }
      })
      draw(performance.now())
    }

    const loop = (t: number) => {
      if (t - last > 33) {
        draw(t)
        last = t
      }
      raf = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener("resize", resize)
    if (!reduce) {
      raf = requestAnimationFrame(loop)
      document.addEventListener("visibilitychange", onVisibility)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <div className="starfield pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="nebula absolute inset-0" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
