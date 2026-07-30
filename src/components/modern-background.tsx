"use client"

import React from "react"
import { motion } from "framer-motion"

export const ModernBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-bg-base overflow-hidden pointer-events-none transition-colors duration-700">
      {/* Grid */}
      <div className="absolute inset-0 grid-overlay opacity-60" />

      {/* Primary Blob */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: ["0%", "8%", "0%"],
          y: ["0%", "-6%", "0%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] max-w-225 max-h-225 opacity-30 dark:opacity-25"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      {/* Secondary Blob */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 180, 270, 360],
          x: ["0%", "-5%", "5%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 -right-1/4 w-[60vw] h-[60vw] max-w-200 max-h-200 opacity-25 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, var(--secondary) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* Accent Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: ["0%", "6%", "0%"],
          y: ["0%", "-8%", "0%"],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/3 w-[50vw] h-[50vw] max-w-175 max-h-175 opacity-20 dark:opacity-15"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
          filter: "blur(110px)",
        }}
      />

      {/* Vignette to keep edges legible */}
      <div className="absolute inset-0 bg-linear-to-b from-bg-base/40 via-transparent to-bg-base/60" />
    </div>
  )
}
