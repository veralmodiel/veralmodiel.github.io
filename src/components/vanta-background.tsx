"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
// @ts-ignore
import NET from "vanta/dist/vanta.net.min"
import { useTheme } from "next-themes"

export const VantaBackground: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && theme === "modern") {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3b82f6,
          backgroundColor: 0x0f172a,
          points: 10.0,
          maxDistance: 20.0,
          spacing: 16.0,
        })
      )
    }
    
    if (vantaEffect && theme !== "modern") {
      vantaEffect.destroy()
      setVantaEffect(null)
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect, theme])

  return (
    <div
      ref={vantaRef}
      className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
        theme === "modern" ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    />
  )
}
