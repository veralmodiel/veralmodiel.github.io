"use client"

import React from "react"
import { motion } from "framer-motion"

export const ModernBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-bg-base overflow-hidden pointer-events-none transition-colors duration-700">
      {/* Mesh Gradient Layer 1 */}
      {/* <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, var(--secondary) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, var(--accent) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, var(--primary) 0%, transparent 50%)
          `,
          filter: "blur(80px)"
        }}
      /> */}
      
      {/* Mesh Gradient Layer 2 (Animated) */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 180, 270, 360],
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-[-10%] opacity-20 dark:opacity-10"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, var(--secondary) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, var(--accent) 0%, transparent 50%)
          `,
          filter: "blur(120px)"
        }}
      />
      
      {/* Noise Overlay */}
      {/* <div className="absolute inset-0 noise opacity-[0.03] dark:opacity-[0.05]" /> */}
      
      {/* Vignette Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base/20" /> */}
    </div>
  )
}
